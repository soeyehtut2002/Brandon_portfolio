import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import {
  X, LayoutDashboard, UtensilsCrossed, Layers, User,
  CalendarCheck, RotateCcw, Plus, Edit2, Trash2,
  Eye, EyeOff, Sparkles, Save, Camera, Check,
  ChevronDown, ChevronUp, Type, Image as ImageIcon,
  Star, Award, MessageSquare, Phone, Menu
} from 'lucide-react';

/* ─────────────────────────────────────────
   Reusable input/label/field styles
───────────────────────────────────────── */
const label = "block text-xs uppercase tracking-wider text-theme-muted font-semibold mb-1.5";
const input = "input-theme w-full rounded-xl px-3 py-2.5 text-sm";
const textarea = "input-theme w-full rounded-xl px-3 py-2.5 text-sm resize-none";
const card = "glass-card border border-theme rounded-2xl overflow-hidden";

/* ─────────────────────────────────────────
   Badge
───────────────────────────────────────── */
function Badge({ children, color = 'orange' }) {
  const colors = {
    orange: 'bg-orange-100 text-orange-600 border-orange-200 dark:bg-orange-500/15 dark:text-orange-400 dark:border-orange-500/30',
    green: 'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-500/15 dark:text-emerald-400',
    red: 'bg-rose-100 text-rose-600 border-rose-200 dark:bg-rose-500/15 dark:text-rose-400',
    amber: 'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-500/15 dark:text-amber-400',
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${colors[color]}`}>
      {children}
    </span>
  );
}

/* ─────────────────────────────────────────
   Section Row (for Section Control tab)
───────────────────────────────────────── */
function SectionRow({ id, section, onToggle, onTitleChange }) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(section.title || '');

  const SECTION_ICONS = {
    hero: Menu, bio: User, dishes: UtensilsCrossed,
    experience: Award, gallery: Camera, reviews: MessageSquare,
    contact: Phone,
  };
  const Icon = SECTION_ICONS[id] || Layers;

  const save = () => { onTitleChange(id, title); setEditing(false); };

  return (
    <div className={`${card} p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center gap-4`}>
      {/* Icon + Info */}
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <div className="p-2.5 rounded-xl bg-theme-muted border border-theme text-orange-500 shrink-0">
          <Icon className="w-4 h-4" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-[10px] uppercase tracking-wider text-theme-muted font-semibold mb-0.5">{id}</div>
          {editing ? (
            <div className="flex gap-2 items-center">
              <input
                value={title}
                onChange={e => setTitle(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && save()}
                className="input-theme rounded-lg px-2 py-1 text-sm flex-1"
                autoFocus
              />
              <button onClick={save} className="p-1.5 rounded-lg bg-orange-500 text-white hover:bg-orange-600 transition-all">
                <Check className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <span className="font-serif font-semibold text-sm text-theme-primary truncate">
                {section.title || id}
              </span>
              <button onClick={() => setEditing(true)} className="text-theme-muted hover:text-orange-500 transition-colors shrink-0">
                <Edit2 className="w-3 h-3" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-2 shrink-0">
        <Badge color={section.visible ? 'green' : 'red'}>
          {section.visible ? 'Visible' : 'Hidden'}
        </Badge>
        <button
          onClick={() => onToggle(id)}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all border ${
            section.visible
              ? 'border-rose-200 text-rose-600 bg-rose-50 hover:bg-rose-500 hover:text-white hover:border-rose-500 dark:border-rose-500/30 dark:text-rose-400 dark:bg-rose-500/10'
              : 'border-emerald-200 text-emerald-700 bg-emerald-50 hover:bg-emerald-500 hover:text-white hover:border-emerald-500 dark:border-emerald-500/30 dark:text-emerald-400 dark:bg-emerald-500/10'
          }`}
        >
          {section.visible ? <><EyeOff className="w-3.5 h-3.5" /> Hide</> : <><Eye className="w-3.5 h-3.5" /> Show</>}
        </button>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   Dish Form Modal
───────────────────────────────────────── */
function DishFormModal({ editingDish, formData, setFormData, onSave, onClose }) {
  const isEdit = !!editingDish;

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => setFormData(p => ({ ...p, image: ev.target.result }));
    reader.readAsDataURL(file);
  };

  return (
    <div className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="relative w-full max-w-2xl glass-card border border-theme rounded-3xl overflow-hidden shadow-2xl my-4">
        <div className="flex items-center justify-between px-6 py-4 border-b border-theme bg-theme-muted">
          <h2 className="font-serif font-bold text-base text-theme-primary">{isEdit ? 'Edit Dish' : 'Add New Dish'}</h2>
          <button onClick={onClose} className="p-1.5 rounded-full hover:bg-theme-secondary text-theme-muted hover:text-orange-500 transition-all">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={onSave} className="p-6 overflow-y-auto max-h-[75vh] space-y-5">
          {/* Image Preview + Upload */}
          <div>
            <label className={label}>Dish Image</label>
            <div className="flex flex-col sm:flex-row gap-3 items-start">
              {formData.image && (
                <img src={formData.image} alt="preview" className="w-full sm:w-32 h-24 object-cover rounded-xl border border-theme" />
              )}
              <div className="flex flex-col gap-2 flex-1">
                <input type="text" placeholder="https://..." value={formData.image}
                  onChange={e => setFormData(p => ({ ...p, image: e.target.value }))}
                  className={input} />
                <label className="flex items-center gap-2 px-3 py-2 rounded-xl bg-theme-muted border border-theme text-xs text-theme-secondary cursor-pointer hover:border-orange-400 hover:text-orange-500 transition-all">
                  <ImageIcon className="w-4 h-4" /> Upload Local Image
                  <input type="file" accept="image/*" className="hidden" onChange={handleFile} />
                </label>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div><label className={label}>Dish Name *</label><input required value={formData.name} onChange={e => setFormData(p => ({ ...p, name: e.target.value }))} className={input} placeholder="e.g. Truffle Sea Bass" /></div>
            <div>
              <label className={label}>Category</label>
              <select value={formData.category} onChange={e => setFormData(p => ({ ...p, category: e.target.value }))} className={input}>
                {['Starter', 'Main Course', 'Dessert', 'Tasting Menu', 'Signature'].map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div><label className={label}>Price</label><input value={formData.price} onChange={e => setFormData(p => ({ ...p, price: e.target.value }))} className={input} placeholder="$85" /></div>
            <div><label className={label}>Prep Time</label><input value={formData.prepTime} onChange={e => setFormData(p => ({ ...p, prepTime: e.target.value }))} className={input} placeholder="20 min" /></div>
            <div><label className={label}>Badge Label</label><input value={formData.badge} onChange={e => setFormData(p => ({ ...p, badge: e.target.value }))} className={input} placeholder="Chef Special" /></div>
          </div>

          <div><label className={label}>Short Description *</label><textarea required rows={2} value={formData.shortDescription} onChange={e => setFormData(p => ({ ...p, shortDescription: e.target.value }))} className={textarea} /></div>
          <div><label className={label}>Full Description</label><textarea rows={3} value={formData.fullDescription} onChange={e => setFormData(p => ({ ...p, fullDescription: e.target.value }))} className={textarea} /></div>
          <div><label className={label}>Ingredients (comma-separated)</label><textarea rows={2} value={formData.ingredients} onChange={e => setFormData(p => ({ ...p, ingredients: e.target.value }))} className={textarea} placeholder="Truffle, Sea Bass, Saffron" /></div>
          <div><label className={label}>Dietary Tags (comma-separated)</label><input value={formData.dietary} onChange={e => setFormData(p => ({ ...p, dietary: e.target.value }))} className={input} placeholder="Gluten-Free, Organic" /></div>
          <div><label className={label}>Wine Pairing</label><input value={formData.pairing} onChange={e => setFormData(p => ({ ...p, pairing: e.target.value }))} className={input} placeholder="Grand Cru Pinot Noir" /></div>
          <div><label className={label}>Chef's Note</label><textarea rows={2} value={formData.chefNote} onChange={e => setFormData(p => ({ ...p, chefNote: e.target.value }))} className={textarea} /></div>

          {/* Flavor Profile Sliders */}
          <div>
            <label className={label}>Flavor Profile</label>
            <div className="space-y-3 p-4 bg-theme-muted rounded-xl border border-theme">
              {Object.entries(formData.flavorProfile || {}).map(([key, val]) => (
                <div key={key} className="flex items-center gap-3">
                  <span className="capitalize text-xs text-theme-secondary w-20 shrink-0">{key}</span>
                  <input type="range" min="0" max="100" value={val}
                    onChange={e => setFormData(p => ({ ...p, flavorProfile: { ...p.flavorProfile, [key]: Number(e.target.value) } }))}
                    className="flex-1 accent-orange-500" />
                  <span className="text-xs text-orange-500 font-bold w-10 text-right">{val}%</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 py-3 rounded-xl border border-theme text-theme-secondary text-xs font-semibold uppercase tracking-wider hover:bg-theme-muted transition-all">Cancel</button>
            <button type="submit" className="flex-1 py-3 rounded-xl bg-orange-500 text-white text-xs font-bold uppercase tracking-wider hover:bg-orange-600 transition-all shadow-lg">
              <span className="flex items-center justify-center gap-2"><Save className="w-4 h-4" />{isEdit ? 'Save Changes' : 'Add Dish'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   Main Admin Dashboard
───────────────────────────────────────── */
export default function AdminDashboard() {
  const {
    chefProfile, updateProfile,
    sections, toggleSectionVisibility, updateSectionTitle,
    dishes, addDish, updateDish, deleteDish,
    gallery, setGallery,
    reviews, setReviews,
    experience, setExperience,
    reservations, updateReservationStatus, deleteReservation,
    isAdminOpen, setIsAdminOpen,
    resetData, showToast
  } = usePortfolio();

  const [activeTab, setActiveTab] = useState('sections');
  const [dishModalOpen, setDishModalOpen] = useState(false);
  const [editingDish, setEditingDish] = useState(null);
  const [dishFormData, setDishFormData] = useState({
    name: '', category: 'Main Course', price: '$95', prepTime: '20 min',
    image: '', badge: 'Chef Special', shortDescription: '', fullDescription: '',
    dietary: '', ingredients: '', pairing: '', chefNote: '',
    flavorProfile: { umami: 80, richness: 75, acidity: 60, sweetness: 30, texture: 85 }
  });
  const [profileForm, setProfileForm] = useState(chefProfile);
  const [expandedReview, setExpandedReview] = useState(null);
  const [newGalleryItem, setNewGalleryItem] = useState({ title: '', category: 'Plated Art', image: '' });
  const [newReview, setNewReview] = useState({ critic: '', publication: '', quote: '', rating: 5, avatar: 'https://i.pravatar.cc/150?img=10' });
  const [newExperience, setNewExperience] = useState({ year: '', role: '', establishment: '', badge: '', description: '' });
  const [editingReview, setEditingReview] = useState(null);
  const [editingExp, setEditingExp] = useState(null);

  if (!isAdminOpen) return null;

  /* ── Dish handlers ── */
  const openAddDish = () => {
    setEditingDish(null);
    setDishFormData({ name: '', category: 'Main Course', price: '$95', prepTime: '20 min', image: '', badge: 'New Creation', shortDescription: '', fullDescription: '', dietary: '', ingredients: '', pairing: '', chefNote: '', flavorProfile: { umami: 80, richness: 75, acidity: 60, sweetness: 30, texture: 85 } });
    setDishModalOpen(true);
  };
  const openEditDish = (dish) => {
    setEditingDish(dish);
    setDishFormData({ ...dish, dietary: Array.isArray(dish.dietary) ? dish.dietary.join(', ') : dish.dietary || '', ingredients: Array.isArray(dish.ingredients) ? dish.ingredients.join(', ') : dish.ingredients || '' });
    setDishModalOpen(true);
  };
  const saveDish = (e) => {
    e.preventDefault();
    const fmt = { ...dishFormData, dietary: typeof dishFormData.dietary === 'string' ? dishFormData.dietary.split(',').map(s => s.trim()).filter(Boolean) : dishFormData.dietary, ingredients: typeof dishFormData.ingredients === 'string' ? dishFormData.ingredients.split(',').map(s => s.trim()).filter(Boolean) : dishFormData.ingredients };
    editingDish ? updateDish({ ...fmt, id: editingDish.id }) : addDish(fmt);
    setDishModalOpen(false);
  };

  /* ── Profile ── */
  const saveProfile = (e) => { e.preventDefault(); updateProfile(profileForm); };

  /* ── Gallery ── */
  const addGallery = (e) => {
    e.preventDefault();
    if (!newGalleryItem.image || !newGalleryItem.title) return;
    setGallery([{ ...newGalleryItem, id: `gal-${Date.now()}` }, ...gallery]);
    setNewGalleryItem({ title: '', category: 'Plated Art', image: '' });
    showToast('Photo added!');
  };

  /* ── Reviews ── */
  const saveReview = () => {
    if (editingReview) {
      setReviews(reviews.map(r => r.id === editingReview.id ? { ...editingReview } : r));
      setEditingReview(null);
    } else {
      setReviews([{ ...newReview, id: `rev-${Date.now()}` }, ...reviews]);
      setNewReview({ critic: '', publication: '', quote: '', rating: 5, avatar: 'https://i.pravatar.cc/150?img=10' });
    }
    showToast('Review saved!');
  };
  const deleteReviewItem = (id) => { setReviews(reviews.filter(r => r.id !== id)); showToast('Review removed.'); };

  /* ── Experience ── */
  const saveExperience = () => {
    if (editingExp) {
      setExperience(experience.map(e => e.id === editingExp.id ? { ...editingExp } : e));
      setEditingExp(null);
    } else {
      setExperience([{ ...newExperience, id: `exp-${Date.now()}` }, ...experience]);
      setNewExperience({ year: '', role: '', establishment: '', badge: '', description: '' });
    }
    showToast('Experience saved!');
  };
  const deleteExp = (id) => { setExperience(experience.filter(e => e.id !== id)); showToast('Experience removed.'); };

  const TABS = [
    { id: 'sections',   label: 'Sections',    icon: Layers,         count: null },
    { id: 'dishes',     label: 'Dishes',       icon: UtensilsCrossed, count: dishes.length },
    { id: 'experience', label: 'Accolades',    icon: Award,          count: experience.length },
    { id: 'reviews',    label: 'Reviews',      icon: Star,           count: reviews.length },
    { id: 'gallery',    label: 'Gallery',      icon: Camera,         count: gallery.length },
    { id: 'profile',    label: 'Profile',      icon: User,           count: null },
    { id: 'bookings',   label: 'Bookings',     icon: CalendarCheck,  count: reservations.length },
    { id: 'reset',      label: 'Reset',        icon: RotateCcw,      count: null },
  ];

  const STATUS_COLORS = { Pending: 'amber', Confirmed: 'green', Declined: 'red' };

  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xl flex flex-col overflow-hidden">
        {/* ── Top Bar ── */}
        <div className="bg-theme-card border-b border-theme px-4 sm:px-6 py-3.5 flex items-center justify-between shadow-sm shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-orange-100 dark:bg-orange-500/15 text-orange-500 border border-orange-200 dark:border-orange-500/30">
              <LayoutDashboard className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-base font-serif font-bold text-theme-primary flex items-center gap-2 flex-wrap">
                Portfolio Control Hub
                <span className="px-2 py-0.5 rounded text-[10px] bg-orange-500 text-white font-sans font-extrabold uppercase">Admin</span>
              </h1>
              <p className="text-xs text-theme-muted hidden sm:block">Full control over every section, dish, review, experience, and booking.</p>
            </div>
          </div>
          <button onClick={() => setIsAdminOpen(false)}
            className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-theme-muted text-theme-secondary text-xs font-semibold uppercase tracking-wider border border-theme hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-all">
            <Eye className="w-4 h-4" />
            <span className="hidden sm:inline">View Site</span>
          </button>
        </div>

        {/* ── Layout ── */}
        <div className="flex-grow flex flex-col md:flex-row overflow-hidden">

          {/* ── Sidebar ── */}
          <aside className="w-full md:w-56 lg:w-64 bg-theme-secondary border-b md:border-b-0 md:border-r border-theme p-2 sm:p-3 flex flex-row md:flex-col gap-1 overflow-x-auto md:overflow-y-auto shrink-0">
            {TABS.map(tab => {
              const Icon = tab.icon;
              const active = activeTab === tab.id;
              return (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2.5 px-3 sm:px-4 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wide text-left transition-all whitespace-nowrap shrink-0 md:shrink md:whitespace-normal ${
                    active
                      ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20'
                      : 'text-theme-secondary hover:bg-theme-muted hover:text-orange-500'
                  }`}>
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{tab.label}</span>
                  {tab.count !== null && (
                    <span className={`ml-auto text-[10px] px-1.5 py-0.5 rounded-full font-bold ${active ? 'bg-white/20 text-white' : 'bg-theme-muted text-theme-muted'}`}>
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}
          </aside>

          {/* ── Main Content ── */}
          <main className="flex-grow p-4 sm:p-6 overflow-y-auto bg-theme-primary">

            {/* ══ SECTIONS TAB ══ */}
            {activeTab === 'sections' && (
              <div className="space-y-4 max-w-3xl mx-auto">
                <div>
                  <h2 className="text-xl font-serif font-bold text-theme-primary">Section Visibility & Labels</h2>
                  <p className="text-xs text-theme-muted mt-1">Toggle each section on/off and rename its heading label.</p>
                </div>
                <div className="space-y-3">
                  {Object.entries(sections).map(([id, section]) => (
                    <SectionRow key={id} id={id} section={section} onToggle={toggleSectionVisibility} onTitleChange={updateSectionTitle} />
                  ))}
                </div>
              </div>
            )}

            {/* ══ DISHES TAB ══ */}
            {activeTab === 'dishes' && (
              <div className="space-y-5 max-w-6xl mx-auto">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h2 className="text-xl font-serif font-bold text-theme-primary">Dish Menu Manager</h2>
                    <p className="text-xs text-theme-muted mt-1">{dishes.length} dishes on menu. Add, edit or remove.</p>
                  </div>
                  <button onClick={openAddDish}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-orange-500 text-white font-bold uppercase tracking-wider text-xs hover:bg-orange-600 transition-all shadow-lg">
                    <Plus className="w-4 h-4" /> Add Dish
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {dishes.map(dish => (
                    <div key={dish.id} className={`${card} flex flex-col`}>
                      <div className="relative h-40">
                        <img src={dish.image} alt={dish.name} className="w-full h-full object-cover" />
                        <div className="absolute top-2 right-2 px-2.5 py-1 rounded-full text-[10px] font-bold bg-orange-500 text-white">{dish.price}</div>
                        <div className="absolute top-2 left-2 px-2.5 py-1 rounded-full text-[10px] font-bold bg-black/60 text-white border border-white/20">{dish.category}</div>
                      </div>
                      <div className="p-4 flex-grow flex flex-col justify-between gap-3">
                        <div>
                          <h3 className="font-serif font-bold text-theme-primary text-sm line-clamp-1">{dish.name}</h3>
                          <p className="text-xs text-theme-muted mt-1 line-clamp-2">{dish.shortDescription}</p>
                        </div>
                        <div className="flex gap-2 pt-3 border-t border-theme">
                          <button onClick={() => openEditDish(dish)}
                            className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg bg-theme-muted border border-theme text-theme-secondary text-xs font-medium hover:text-orange-500 hover:border-orange-300 transition-all">
                            <Edit2 className="w-3.5 h-3.5" /> Edit
                          </button>
                          <button onClick={() => deleteDish(dish.id)}
                            className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-600 text-xs font-medium hover:bg-rose-500 hover:text-white hover:border-rose-500 transition-all dark:bg-rose-500/10 dark:border-rose-500/30 dark:text-rose-400">
                            <Trash2 className="w-3.5 h-3.5" /> Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ══ EXPERIENCE/ACCOLADES TAB ══ */}
            {activeTab === 'experience' && (
              <div className="space-y-5 max-w-4xl mx-auto">
                <div>
                  <h2 className="text-xl font-serif font-bold text-theme-primary">Accolades & Career History</h2>
                  <p className="text-xs text-theme-muted mt-1">Add, edit or remove career milestones and awards.</p>
                </div>

                {/* Add / Edit Form */}
                <div className={`${card} p-5 space-y-4`}>
                  <h3 className="text-sm font-semibold text-theme-primary uppercase tracking-wider">
                    {editingExp ? 'Edit Milestone' : 'Add New Milestone'}
                  </h3>
                  {[
                    ['Year / Period', 'year', '2021 - Present'],
                    ['Role / Position', 'role', 'Chef Patron & Owner'],
                    ['Establishment', 'establishment', "L'Étoile D'Or — Paris"],
                    ['Badge Label', 'badge', '3 Michelin Stars'],
                  ].map(([lbl, key, ph]) => (
                    <div key={key}>
                      <label className={label}>{lbl}</label>
                      <input placeholder={ph} value={(editingExp || newExperience)[key]}
                        onChange={e => editingExp
                          ? setEditingExp(p => ({ ...p, [key]: e.target.value }))
                          : setNewExperience(p => ({ ...p, [key]: e.target.value }))}
                        className={input} />
                    </div>
                  ))}
                  <div>
                    <label className={label}>Description</label>
                    <textarea rows={3} value={(editingExp || newExperience).description}
                      onChange={e => editingExp
                        ? setEditingExp(p => ({ ...p, description: e.target.value }))
                        : setNewExperience(p => ({ ...p, description: e.target.value }))}
                      className={textarea} />
                  </div>
                  <div className="flex gap-3">
                    {editingExp && <button onClick={() => setEditingExp(null)} className="flex-1 py-2.5 rounded-xl border border-theme text-theme-secondary text-xs font-semibold hover:bg-theme-muted transition-all">Cancel</button>}
                    <button onClick={saveExperience} className="flex-1 py-2.5 rounded-xl bg-orange-500 text-white text-xs font-bold uppercase tracking-wider hover:bg-orange-600 transition-all shadow-md">
                      {editingExp ? 'Save Changes' : 'Add Milestone'}
                    </button>
                  </div>
                </div>

                {/* List */}
                <div className="space-y-3">
                  {experience.map((exp) => (
                    <div key={exp.id} className={`${card} p-4 flex items-start gap-4`}>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <span className="text-xs font-bold text-orange-500">{exp.year}</span>
                          {exp.badge && <Badge color="orange">{exp.badge}</Badge>}
                        </div>
                        <h4 className="font-serif font-bold text-theme-primary text-sm">{exp.role}</h4>
                        <p className="text-xs text-theme-muted">{exp.establishment}</p>
                        <p className="text-xs text-theme-muted mt-1 line-clamp-2">{exp.description}</p>
                      </div>
                      <div className="flex flex-col gap-2 shrink-0">
                        <button onClick={() => setEditingExp({ ...exp })} className="p-2 rounded-lg bg-theme-muted border border-theme text-theme-secondary hover:text-orange-500 hover:border-orange-300 transition-all">
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button onClick={() => deleteExp(exp.id)} className="p-2 rounded-lg bg-rose-50 border border-rose-200 text-rose-500 hover:bg-rose-500 hover:text-white transition-all dark:bg-rose-500/10 dark:border-rose-500/30">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ══ REVIEWS TAB ══ */}
            {activeTab === 'reviews' && (
              <div className="space-y-5 max-w-3xl mx-auto">
                <div>
                  <h2 className="text-xl font-serif font-bold text-theme-primary">Critic Reviews Manager</h2>
                  <p className="text-xs text-theme-muted mt-1">Add, edit or remove critic testimonials.</p>
                </div>

                {/* Form */}
                <div className={`${card} p-5 space-y-4`}>
                  <h3 className="text-sm font-semibold text-theme-primary uppercase tracking-wider">{editingReview ? 'Edit Review' : 'Add Review'}</h3>
                  {[
                    ['Critic Name', 'critic', 'Elena Vasquez'],
                    ['Publication', 'publication', 'Le Guide Gastronomique'],
                    ['Avatar URL', 'avatar', 'https://i.pravatar.cc/150?img=5'],
                  ].map(([lbl, key, ph]) => (
                    <div key={key}><label className={label}>{lbl}</label>
                      <input placeholder={ph} value={(editingReview || newReview)[key]}
                        onChange={e => editingReview ? setEditingReview(p => ({ ...p, [key]: e.target.value })) : setNewReview(p => ({ ...p, [key]: e.target.value }))}
                        className={input} />
                    </div>
                  ))}
                  <div><label className={label}>Quote</label>
                    <textarea rows={3} value={(editingReview || newReview).quote}
                      onChange={e => editingReview ? setEditingReview(p => ({ ...p, quote: e.target.value })) : setNewReview(p => ({ ...p, quote: e.target.value }))}
                      className={textarea} />
                  </div>
                  <div><label className={label}>Rating (1–5)</label>
                    <input type="number" min={1} max={5} value={(editingReview || newReview).rating}
                      onChange={e => editingReview ? setEditingReview(p => ({ ...p, rating: Number(e.target.value) })) : setNewReview(p => ({ ...p, rating: Number(e.target.value) }))}
                      className={input} />
                  </div>
                  <div className="flex gap-3">
                    {editingReview && <button onClick={() => setEditingReview(null)} className="flex-1 py-2.5 rounded-xl border border-theme text-theme-secondary text-xs font-semibold hover:bg-theme-muted transition-all">Cancel</button>}
                    <button onClick={saveReview} className="flex-1 py-2.5 rounded-xl bg-orange-500 text-white text-xs font-bold uppercase tracking-wider hover:bg-orange-600 transition-all shadow-md">
                      {editingReview ? 'Save Changes' : 'Add Review'}
                    </button>
                  </div>
                </div>

                {/* List */}
                <div className="space-y-3">
                  {reviews.map(rev => (
                    <div key={rev.id} className={`${card} p-4 flex gap-4`}>
                      <img src={rev.avatar} alt={rev.critic} className="w-12 h-12 rounded-full object-cover border-2 border-orange-200 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <h4 className="font-bold text-theme-primary text-sm">{rev.critic}</h4>
                          <span className="text-[10px] text-orange-500 font-semibold">{rev.publication}</span>
                        </div>
                        <div className="flex gap-0.5 mb-1">{[...Array(rev.rating)].map((_, i) => <Star key={i} className="w-3 h-3 fill-orange-400 text-orange-400" />)}</div>
                        <p className="text-xs text-theme-muted italic line-clamp-2">"{rev.quote}"</p>
                      </div>
                      <div className="flex flex-col gap-2 shrink-0">
                        <button onClick={() => setEditingReview({ ...rev })} className="p-2 rounded-lg bg-theme-muted border border-theme text-theme-secondary hover:text-orange-500 hover:border-orange-300 transition-all"><Edit2 className="w-3.5 h-3.5" /></button>
                        <button onClick={() => deleteReviewItem(rev.id)} className="p-2 rounded-lg bg-rose-50 border border-rose-200 text-rose-500 hover:bg-rose-500 hover:text-white transition-all dark:bg-rose-500/10 dark:border-rose-500/30"><Trash2 className="w-3.5 h-3.5" /></button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ══ GALLERY TAB ══ */}
            {activeTab === 'gallery' && (
              <div className="space-y-5 max-w-5xl mx-auto">
                <div>
                  <h2 className="text-xl font-serif font-bold text-theme-primary">Gallery Manager</h2>
                  <p className="text-xs text-theme-muted mt-1">{gallery.length} photos in gallery.</p>
                </div>
                <form onSubmit={addGallery} className={`${card} p-5 space-y-4`}>
                  <h3 className="text-sm font-semibold text-theme-primary uppercase tracking-wider">Add New Photo</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div><label className={label}>Title *</label><input required value={newGalleryItem.title} onChange={e => setNewGalleryItem(p => ({ ...p, title: e.target.value }))} className={input} placeholder="Plated Truffle Bisque" /></div>
                    <div><label className={label}>Category</label>
                      <select value={newGalleryItem.category} onChange={e => setNewGalleryItem(p => ({ ...p, category: e.target.value }))} className={input}>
                        {['Plated Art', 'Restaurant', 'Kitchen', 'Events', 'Ingredients'].map(c => <option key={c}>{c}</option>)}
                      </select>
                    </div>
                  </div>
                  <div><label className={label}>Image URL *</label><input required value={newGalleryItem.image} onChange={e => setNewGalleryItem(p => ({ ...p, image: e.target.value }))} className={input} placeholder="https://..." /></div>
                  {newGalleryItem.image && <img src={newGalleryItem.image} alt="preview" className="h-40 w-full object-cover rounded-xl border border-theme" />}
                  <button type="submit" className="w-full py-2.5 rounded-xl bg-orange-500 text-white text-xs font-bold uppercase tracking-wider hover:bg-orange-600 transition-all shadow-md">
                    <span className="flex items-center justify-center gap-2"><Plus className="w-4 h-4" /> Add Photo</span>
                  </button>
                </form>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                  {gallery.map(item => (
                    <div key={item.id} className="relative group rounded-xl overflow-hidden border border-theme aspect-square">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-2">
                        <p className="text-white text-[10px] font-bold text-center line-clamp-2">{item.title}</p>
                        <button onClick={() => { setGallery(gallery.filter(g => g.id !== item.id)); showToast('Photo removed.'); }}
                          className="p-1.5 rounded-lg bg-rose-500 text-white hover:bg-rose-600 transition-all">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ══ PROFILE TAB ══ */}
            {activeTab === 'profile' && (
              <form onSubmit={saveProfile} className="space-y-5 max-w-3xl mx-auto">
                <div>
                  <h2 className="text-xl font-serif font-bold text-theme-primary">Chef Profile & Hero</h2>
                  <p className="text-xs text-theme-muted mt-1">Edit your bio, images, and contact details.</p>
                </div>
                <div className={`${card} p-5 space-y-4`}>
                  <h3 className="text-sm font-semibold text-theme-primary uppercase tracking-wider">Basic Info</h3>
                  {[
                    ['Full Name', 'name', 'text'],
                    ['Title / Role', 'title', 'text'],
                    ['Tagline (Hero quote)', 'tagline', 'text'],
                    ['Subtitle (Hero subtext)', 'subtitle', 'text'],
                  ].map(([lbl, key, type]) => (
                    <div key={key}><label className={label}>{lbl}</label>
                      <input type={type} value={profileForm[key] || ''} onChange={e => setProfileForm(p => ({ ...p, [key]: e.target.value }))} className={input} />
                    </div>
                  ))}
                  <div><label className={label}>Philosophy Quote</label>
                    <textarea rows={3} value={profileForm.philosophy || ''} onChange={e => setProfileForm(p => ({ ...p, philosophy: e.target.value }))} className={textarea} />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div><label className={label}>Michelin Stars</label><input type="number" min={1} max={3} value={profileForm.michelinStars || 3} onChange={e => setProfileForm(p => ({ ...p, michelinStars: Number(e.target.value) }))} className={input} /></div>
                    <div><label className={label}>Years Experience</label><input type="number" value={profileForm.yearsExperience || 20} onChange={e => setProfileForm(p => ({ ...p, yearsExperience: Number(e.target.value) }))} className={input} /></div>
                    <div><label className={label}>Signature Dishes</label><input type="number" value={profileForm.signatureDishesCount || 200} onChange={e => setProfileForm(p => ({ ...p, signatureDishesCount: Number(e.target.value) }))} className={input} /></div>
                  </div>
                </div>
                <div className={`${card} p-5 space-y-4`}>
                  <h3 className="text-sm font-semibold text-theme-primary uppercase tracking-wider">Images</h3>
                  {[['Hero Background Image URL', 'heroImage'], ['Bio Portrait Image URL', 'bioPortrait']].map(([lbl, key]) => (
                    <div key={key}><label className={label}>{lbl}</label>
                      <input value={profileForm[key] || ''} onChange={e => setProfileForm(p => ({ ...p, [key]: e.target.value }))} className={input} placeholder="https://..." />
                      {profileForm[key] && <img src={profileForm[key]} alt="preview" className="mt-2 h-32 w-full object-cover rounded-xl border border-theme" />}
                    </div>
                  ))}
                </div>
                <div className={`${card} p-5 space-y-4`}>
                  <h3 className="text-sm font-semibold text-theme-primary uppercase tracking-wider">Contact & Socials</h3>
                  {[['Email', 'email'], ['Phone', 'phone'], ['Restaurant Name', 'restaurant']].map(([lbl, key]) => (
                    <div key={key}><label className={label}>{lbl}</label>
                      <input value={profileForm.socials?.[key] || ''} onChange={e => setProfileForm(p => ({ ...p, socials: { ...p.socials, [key]: e.target.value } }))} className={input} />
                    </div>
                  ))}
                  <div><label className={label}>CV / Resume URL (optional)</label>
                    <input value={profileForm.cvUrl || ''} onChange={e => setProfileForm(p => ({ ...p, cvUrl: e.target.value }))} className={input} placeholder="https://... or leave blank to auto-generate" />
                  </div>
                </div>
                <button type="submit" className="w-full py-3.5 rounded-xl bg-orange-500 text-white font-bold uppercase tracking-wider text-xs hover:bg-orange-600 transition-all shadow-lg">
                  <span className="flex items-center justify-center gap-2"><Save className="w-4 h-4" /> Save Profile</span>
                </button>
              </form>
            )}

            {/* ══ BOOKINGS TAB ══ */}
            {activeTab === 'bookings' && (
              <div className="space-y-4 max-w-5xl mx-auto">
                <div>
                  <h2 className="text-xl font-serif font-bold text-theme-primary">Reservation Manager</h2>
                  <p className="text-xs text-theme-muted mt-1">{reservations.length} reservations total.</p>
                </div>
                {reservations.length === 0 && (
                  <div className={`${card} p-12 text-center`}>
                    <CalendarCheck className="w-10 h-10 text-theme-muted mx-auto mb-3" />
                    <p className="text-sm text-theme-muted">No reservations yet.</p>
                  </div>
                )}
                <div className="space-y-3">
                  {reservations.map(res => (
                    <div key={res.id} className={`${card} p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center gap-4`}>
                      <div className="flex-1 min-w-0 space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="font-bold text-theme-primary text-sm">{res.name}</h4>
                          <Badge color={STATUS_COLORS[res.status] || 'amber'}>{res.status}</Badge>
                        </div>
                        <p className="text-xs text-theme-muted">{res.email} · {res.phone}</p>
                        <p className="text-xs text-theme-muted">{res.date} · {res.guests} guests · {res.eventType}</p>
                        {res.specialRequests && <p className="text-xs text-orange-500 italic">Note: {res.specialRequests}</p>}
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <select value={res.status} onChange={e => updateReservationStatus(res.id, e.target.value)}
                          className="input-theme rounded-xl px-3 py-2 text-xs">
                          {['Pending', 'Confirmed', 'Declined'].map(s => <option key={s}>{s}</option>)}
                        </select>
                        <button onClick={() => deleteReservation(res.id)} className="p-2 rounded-lg bg-rose-50 border border-rose-200 text-rose-500 hover:bg-rose-500 hover:text-white transition-all dark:bg-rose-500/10 dark:border-rose-500/30">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ══ RESET TAB ══ */}
            {activeTab === 'reset' && (
              <div className="max-w-md mx-auto space-y-6 pt-8">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-rose-100 dark:bg-rose-500/15 text-rose-500 flex items-center justify-center mx-auto mb-4 border border-rose-200 dark:border-rose-500/30">
                    <RotateCcw className="w-8 h-8" />
                  </div>
                  <h2 className="text-xl font-serif font-bold text-theme-primary">Reset All Data</h2>
                  <p className="text-sm text-theme-muted mt-2">This will restore all content to factory defaults. This cannot be undone.</p>
                </div>
                <div className={`${card} p-6 border-rose-200 dark:border-rose-500/30`}>
                  <ul className="space-y-2 text-xs text-theme-muted mb-6">
                    {['All dishes reset to default menu', 'Chef profile reset', 'Gallery reset', 'Reviews reset', 'All reservations cleared', 'Section settings reset'].map(item => (
                      <li key={item} className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-rose-400 shrink-0" />{item}</li>
                    ))}
                  </ul>
                  <button onClick={() => { resetData(); setIsAdminOpen(false); }}
                    className="w-full py-3.5 rounded-xl bg-rose-500 text-white font-bold uppercase tracking-wider text-xs hover:bg-rose-600 transition-all shadow-lg">
                    <span className="flex items-center justify-center gap-2"><RotateCcw className="w-4 h-4" /> Reset Everything to Default</span>
                  </button>
                </div>
              </div>
            )}

          </main>
        </div>
      </div>

      {/* Dish Form Modal */}
      {dishModalOpen && (
        <DishFormModal
          editingDish={editingDish}
          formData={dishFormData}
          setFormData={setDishFormData}
          onSave={saveDish}
          onClose={() => setDishModalOpen(false)}
        />
      )}
    </>
  );
}
