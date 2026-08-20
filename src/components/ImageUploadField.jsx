import React, { useRef, useState, useEffect } from 'react';
import { Upload, Link2, X, Image as ImageIcon, Loader2, Key, Check } from 'lucide-react';

/**
 * ImageUploadField
 * ─────────────────
 * Props:
 *   value       – current image src (URL string or base64)
 *   onChange    – (newSrc: string) => void
 *   label       – field label text
 *   placeholder – URL placeholder text
 *   aspectClass – Tailwind aspect ratio class, default 'aspect-video'
 */
export default function ImageUploadField({
  value = '',
  onChange,
  label = 'Image',
  placeholder = 'https://...',
  aspectClass = 'aspect-video',
}) {
  const inputRef = useRef(null);
  const [mode, setMode] = useState('url'); // 'url' | 'file'
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);

  // ImgBB API Key state (saved in localStorage)
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('imgbb_api_key') || '');
  const [showKeyInput, setShowKeyInput] = useState(false);

  const saveApiKey = (key) => {
    const trimmed = key.trim();
    setApiKey(trimmed);
    localStorage.setItem('imgbb_api_key', trimmed);
  };

  /* ── ImgBB API Upload ── */
  const uploadToImgBB = async (file) => {
    if (!apiKey) return false;
    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (data.success && data.data?.url) {
        onChange(data.data.url);
        return true;
      } else {
        throw new Error(data.error?.message || 'ImgBB upload failed');
      }
    } catch (err) {
      console.warn('ImgBB API upload failed, falling back to base64:', err);
      setUploadError(err.message || 'ImgBB upload error, using local fallback');
      setTimeout(() => setUploadError(null), 4000);
      return false;
    }
  };

  /* ── Handle local file selection ── */
  const processFile = async (file) => {
    if (!file || !file.type.startsWith('image/')) return;
    setUploading(true);

    // Try ImgBB API upload first if key is present
    let success = false;
    if (apiKey) {
      success = await uploadToImgBB(file);
    }

    // Fallback to local Base64 Data URL if ImgBB not used or failed
    if (!success) {
      const reader = new FileReader();
      reader.onload = (e) => {
        onChange(e.target.result);
        setUploading(false);
      };
      reader.readAsDataURL(file);
    } else {
      setUploading(false);
    }
  };

  const handleFileInput = (e) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) processFile(file);
  };

  const handleDragOver = (e) => { e.preventDefault(); setDragging(true); };
  const handleDragLeave = () => setDragging(false);

  return (
    <div className="space-y-2">
      {/* Header Label + Control Buttons */}
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <label className="block text-xs uppercase tracking-wider text-theme-muted font-semibold">
          {label}
        </label>
        <div className="flex items-center gap-2">
          {/* ImgBB API Key Toggle */}
          <button
            type="button"
            onClick={() => setShowKeyInput(!showKeyInput)}
            title="Configure ImgBB API Key"
            className={`flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-semibold uppercase tracking-wide border transition-all ${
              apiKey
                ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/30'
                : 'bg-theme-muted text-theme-muted border-theme hover:text-orange-500'
            }`}
          >
            <Key className="w-3 h-3" />
            <span>{apiKey ? 'ImgBB Connected' : 'ImgBB Key'}</span>
          </button>

          {/* Mode Switcher */}
          <div className="flex items-center bg-theme-muted rounded-lg p-0.5 border border-theme">
            <button
              type="button"
              onClick={() => setMode('url')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-semibold uppercase tracking-wide transition-all ${
                mode === 'url'
                  ? 'bg-orange-500 text-white shadow-sm'
                  : 'text-theme-muted hover:text-orange-500'
              }`}
            >
              <Link2 className="w-3 h-3" /> URL
            </button>
            <button
              type="button"
              onClick={() => setMode('file')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-semibold uppercase tracking-wide transition-all ${
                mode === 'file'
                  ? 'bg-orange-500 text-white shadow-sm'
                  : 'text-theme-muted hover:text-orange-500'
              }`}
            >
              <Upload className="w-3 h-3" /> Upload
            </button>
          </div>
        </div>
      </div>

      {/* ImgBB API Key Input Drawer */}
      {showKeyInput && (
        <div className="p-3 bg-theme-muted border border-theme rounded-xl space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-theme-primary">ImgBB API Key</span>
            <a
              href="https://api.imgbb.com/"
              target="_blank"
              rel="noreferrer"
              className="text-[10px] text-orange-500 hover:underline"
            >
              Get Free Key →
            </a>
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={apiKey}
              onChange={(e) => saveApiKey(e.target.value)}
              placeholder="Paste ImgBB API key here..."
              className="input-theme flex-1 px-3 py-1.5 text-xs rounded-lg"
            />
            <button
              type="button"
              onClick={() => setShowKeyInput(false)}
              className="px-3 py-1.5 bg-orange-500 text-white rounded-lg text-xs font-semibold"
            >
              Done
            </button>
          </div>
          <p className="text-[10px] text-theme-muted">
            {apiKey
              ? '✓ ImgBB active. Uploads will auto-host to ImgBB and generate image URLs.'
              : 'No key set. Uploads will fall back to local Base64 data.'}
          </p>
        </div>
      )}

      {/* URL Mode */}
      {mode === 'url' && (
        <div className="relative">
          <input
            type="url"
            value={value.startsWith('data:') ? '' : value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="input-theme w-full rounded-xl px-3 py-2.5 text-sm pr-9"
          />
          {value && !value.startsWith('data:') && (
            <button
              type="button"
              onClick={() => onChange('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-theme-muted hover:text-rose-500 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      )}

      {/* File Mode – Drag & Drop Zone */}
      {mode === 'file' && (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => !uploading && inputRef.current?.click()}
          className={`relative flex flex-col items-center justify-center gap-2 w-full rounded-2xl border-2 border-dashed cursor-pointer transition-all p-6 ${
            dragging
              ? 'border-orange-400 bg-orange-50 dark:bg-orange-500/10'
              : 'border-theme hover:border-orange-400 bg-theme-muted hover:bg-orange-50 dark:hover:bg-orange-500/5'
          }`}
        >
          {uploading ? (
            <div className="flex flex-col items-center gap-2 py-2 text-orange-500">
              <Loader2 className="w-6 h-6 animate-spin" />
              <span className="text-xs font-semibold">
                {apiKey ? 'Uploading to ImgBB...' : 'Processing file...'}
              </span>
            </div>
          ) : (
            <>
              <div className="p-3 rounded-full bg-orange-100 dark:bg-orange-500/15 text-orange-500 border border-orange-200 dark:border-orange-500/30">
                <Upload className="w-5 h-5" />
              </div>
              <div className="text-center">
                <p className="text-sm font-semibold text-theme-primary">
                  {dragging ? 'Drop image here' : 'Click or drag & drop image'}
                </p>
                <p className="text-[11px] text-theme-muted mt-0.5">
                  {apiKey ? '⚡ Auto-hosts to ImgBB CDN' : 'PNG, JPG, WEBP, GIF'}
                </p>
              </div>
            </>
          )}

          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileInput}
          />
        </div>
      )}

      {/* Upload Error Alert */}
      {uploadError && (
        <p className="text-xs text-rose-500 italic">{uploadError}</p>
      )}

      {/* Image Preview */}
      {value && (
        <div className={`relative w-full ${aspectClass} rounded-xl overflow-hidden border border-theme group`}>
          <img
            src={value}
            alt="preview"
            className="w-full h-full object-cover"
            onError={(e) => { e.target.style.display = 'none'; }}
          />
          {/* Source badge */}
          <div className="absolute bottom-2 left-2">
            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase shadow-sm ${
              value.includes('ibb.co') || value.includes('imgbb.com')
                ? 'bg-blue-600 text-white'
                : value.startsWith('data:')
                  ? 'bg-amber-600 text-white'
                  : 'bg-black/60 text-white'
            }`}>
              {value.includes('ibb.co') || value.includes('imgbb.com') ? (
                <><Check className="w-2.5 h-2.5" /> ImgBB Hosted</>
              ) : value.startsWith('data:') ? (
                <><Upload className="w-2.5 h-2.5" /> Local Base64</>
              ) : (
                <><Link2 className="w-2.5 h-2.5" /> Direct URL</>
              )}
            </span>
          </div>

          {/* Remove Overlay Button */}
          <button
            type="button"
            onClick={() => onChange('')}
            className="absolute top-2 right-2 p-1.5 rounded-full bg-rose-500/80 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-rose-600"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Empty State */}
      {!value && !uploading && (
        <div className={`w-full ${aspectClass} rounded-xl border border-dashed border-theme flex items-center justify-center bg-theme-muted`}>
          <div className="flex flex-col items-center gap-1.5 text-theme-muted">
            <ImageIcon className="w-7 h-7 opacity-30" />
            <span className="text-[11px]">No image selected</span>
          </div>
        </div>
      )}
    </div>
  );
}
