import React, { useRef, useState } from 'react';
import { Upload, Link2, X, Image as ImageIcon } from 'lucide-react';

/**
 * ImageUploadField
 * ─────────────────
 * Props:
 *   value      – current image src (URL string or base64)
 *   onChange   – (newSrc: string) => void
 *   label      – field label text
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

  /* ── Handle local file ── */
  const readFile = (file) => {
    if (!file || !file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (e) => onChange(e.target.result);
    reader.readAsDataURL(file);
  };

  const handleFileInput = (e) => {
    const file = e.target.files?.[0];
    if (file) readFile(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) readFile(file);
  };

  const handleDragOver = (e) => { e.preventDefault(); setDragging(true); };
  const handleDragLeave = () => setDragging(false);

  return (
    <div className="space-y-2">
      {/* Label */}
      <div className="flex items-center justify-between">
        <label className="block text-xs uppercase tracking-wider text-theme-muted font-semibold">
          {label}
        </label>
        {/* Mode switcher */}
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
            <Upload className="w-3 h-3" /> Local
          </button>
        </div>
      </div>

      {/* URL mode */}
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

      {/* File mode – drag & drop zone */}
      {mode === 'file' && (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => inputRef.current?.click()}
          className={`relative flex flex-col items-center justify-center gap-2 w-full rounded-2xl border-2 border-dashed cursor-pointer transition-all p-6 ${
            dragging
              ? 'border-orange-400 bg-orange-50 dark:bg-orange-500/10'
              : 'border-theme hover:border-orange-400 bg-theme-muted hover:bg-orange-50 dark:hover:bg-orange-500/5'
          }`}
        >
          <div className="p-3 rounded-full bg-orange-100 dark:bg-orange-500/15 text-orange-500 border border-orange-200 dark:border-orange-500/30">
            <Upload className="w-5 h-5" />
          </div>
          <div className="text-center">
            <p className="text-sm font-semibold text-theme-primary">
              {dragging ? 'Drop image here' : 'Click or drag & drop'}
            </p>
            <p className="text-[11px] text-theme-muted mt-0.5">
              PNG, JPG, WEBP, GIF — any size
            </p>
          </div>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileInput}
          />
          {value?.startsWith('data:') && (
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); onChange(''); }}
              className="absolute top-2 right-2 p-1 rounded-full bg-rose-500 text-white hover:bg-rose-600 transition-colors"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>
      )}

      {/* Preview */}
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
            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase ${
              value.startsWith('data:')
                ? 'bg-emerald-500/80 text-white'
                : 'bg-black/50 text-white'
            }`}>
              {value.startsWith('data:')
                ? <><Upload className="w-2.5 h-2.5" /> Local File</>
                : <><Link2 className="w-2.5 h-2.5" /> URL</>
              }
            </span>
          </div>
          {/* Remove overlay */}
          <button
            type="button"
            onClick={() => onChange('')}
            className="absolute top-2 right-2 p-1.5 rounded-full bg-rose-500/80 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-rose-600"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Empty state */}
      {!value && (
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
