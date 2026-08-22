import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { usePortfolio } from '../context/PortfolioContext';
import {
  LayoutDashboard, UtensilsCrossed, Layers, User,
  CalendarCheck, RotateCcw, Plus, Edit2, Trash2,
  Eye, EyeOff, Save, Camera, Check,
  Star, Award, MessageSquare, Phone, Menu,
  Sparkles, ArrowLeft, Sun, Moon, Download,
  ChefHat, BarChart2, X, Lock, LogOut, ShieldCheck, KeyRound
} from 'lucide-react';
import Toast from '../components/Toast';
import ImageUploadField from '../components/ImageUploadField';

/* ── shared styles ── */
const lbl = "block text-xs uppercase tracking-wider text-theme-muted font-semibold mb-1.5";
const inp = "input-theme w-full rounded-xl px-3 py-2.5 text-sm";
const ta  = "input-theme w-full rounded-xl px-3 py-2.5 text-sm resize-none";
const card = "glass-card border border-theme rounded-2xl";

/* ── Badge ── */
function Badge({ children, color = 'orange' }) {
  const c = {
    orange: 'bg-orange-100 text-orange-600 border-orange-200 dark:bg-orange-500/15 dark:text-orange-400 dark:border-orange-500/30',
    green:  'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-500/15 dark:text-emerald-400',
    red:    'bg-rose-100 text-rose-600 border-rose-200 dark:bg-rose-500/15 dark:text-rose-400',
    amber:  'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-500/15 dark:text-amber-400',
  };
  return <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${c[color]}`}>{children}</span>;
}

/* ── Section Row ── */
function SectionRow({ id, section, onToggle, onTitleChange }) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(section.title || '');
  const ICONS = { hero: Menu, bio: User, dishes: UtensilsCrossed, experience: Award, gallery: Camera, reviews: MessageSquare, contact: Phone };
  const Icon = ICONS[id] || Layers;
  const save = () => { onTitleChange(id, title); setEditing(false); };

  return (
    <div className={`${card} p-4 flex flex-col sm:flex-row sm:items-center gap-4`}>
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <div className="p-2.5 rounded-xl bg-theme-muted border border-theme text-orange-500 shrink-0"><Icon className="w-4 h-4" /></div>
        <div className="flex-1 min-w-0">
          <div className="text-[10px] uppercase tracking-wider text-theme-muted font-semibold mb-0.5">{id}</div>
          {editing ? (
            <div className="flex gap-2 items-center">
              <input value={title} onChange={e => setTitle(e.target.value)} onKeyDown={e => e.key === 'Enter' && save()} className="input-theme rounded-lg px-2 py-1 text-sm flex-1" autoFocus />
              <button onClick={save} className="p-1.5 rounded-lg bg-orange-500 text-white hover:bg-orange-600 transition-all"><Check className="w-3.5 h-3.5" /></button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <span className="font-serif font-semibold text-sm text-theme-primary truncate">{section.title || id}</span>
              <button onClick={() => setEditing(true)} className="text-theme-muted hover:text-orange-500 transition-colors shrink-0"><Edit2 className="w-3 h-3" /></button>
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <Badge color={section.visible ? 'green' : 'red'}>{section.visible ? 'Visible' : 'Hidden'}</Badge>
        <button onClick={() => onToggle(id)} className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all border ${section.visible ? 'border-rose-200 text-rose-600 bg-rose-50 hover:bg-rose-500 hover:text-white hover:border-rose-500 dark:border-rose-500/30 dark:text-rose-400 dark:bg-rose-500/10' : 'border-emerald-200 text-emerald-700 bg-emerald-50 hover:bg-emerald-500 hover:text-white hover:border-emerald-500 dark:border-emerald-500/30 dark:text-emerald-400 dark:bg-emerald-500/10'}`}>
          {section.visible ? <><EyeOff className="w-3.5 h-3.5" />Hide</> : <><Eye className="w-3.5 h-3.5" />Show</>}
        </button>
      </div>
    </div>
  );
}

/* ── Dish Form Modal ── */
function DishModal({ editingDish, form, setForm, onSave, onClose }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="w-full max-w-2xl glass-card border border-theme rounded-3xl overflow-hidden shadow-2xl my-4">
        <div className="flex items-center justify-between px-6 py-4 border-b border-theme bg-theme-muted">
          <h2 className="font-serif font-bold text-base text-theme-primary">{editingDish ? 'Edit Dish' : 'Add Dish'}</h2>
          <button onClick={onClose} className="p-1.5 rounded-full hover:bg-theme-secondary text-theme-muted hover:text-orange-500 transition-all"><X className="w-5 h-5" /></button>
        </div>
        <form onSubmit={onSave} className="p-6 overflow-y-auto max-h-[75vh] space-y-4">
          <ImageUploadField
            label="Dish Image"
            value={form.image}
            onChange={v => setForm(p => ({ ...p, image: v }))}
            placeholder="https://images.unsplash.com/..."
            aspectClass="aspect-video"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div><label className={lbl}>Name *</label><input required value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} className={inp} /></div>
            <div><label className={lbl}>Category</label>
              <select value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))} className={inp}>
                {['Starters', 'Main Course', 'Desserts', 'Signature Drinks', 'Tasting Menu'].map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div><label className={lbl}>Prep Time</label><input value={form.prepTime} onChange={e => setForm(p => ({ ...p, prepTime: e.target.value }))} className={inp} /></div>
            <div><label className={lbl}>Badge</label><input value={form.badge} onChange={e => setForm(p => ({ ...p, badge: e.target.value }))} className={inp} /></div>
          </div>
          <div><label className={lbl}>Short Description *</label><textarea required rows={2} value={form.shortDescription} onChange={e => setForm(p => ({ ...p, shortDescription: e.target.value }))} className={ta} /></div>
          <div><label className={lbl}>Full Description</label><textarea rows={3} value={form.fullDescription} onChange={e => setForm(p => ({ ...p, fullDescription: e.target.value }))} className={ta} /></div>
          <div><label className={lbl}>Ingredients (comma-separated)</label><textarea rows={2} value={form.ingredients} onChange={e => setForm(p => ({ ...p, ingredients: e.target.value }))} className={ta} /></div>
          <div><label className={lbl}>Dietary Tags (comma-separated)</label><input value={form.dietary} onChange={e => setForm(p => ({ ...p, dietary: e.target.value }))} className={inp} /></div>
          <div><label className={lbl}>Wine Pairing / Drink Suggestion</label><input value={form.pairing} onChange={e => setForm(p => ({ ...p, pairing: e.target.value }))} className={inp} /></div>
          <div><label className={lbl}>Preparation Note</label><textarea rows={2} value={form.chefNote} onChange={e => setForm(p => ({ ...p, chefNote: e.target.value }))} className={ta} /></div>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 py-3 rounded-xl border border-theme text-theme-secondary text-xs font-semibold hover:bg-theme-muted transition-all">Cancel</button>
            <button type="submit" className="flex-1 py-3 rounded-xl bg-orange-500 text-white text-xs font-bold uppercase tracking-wider hover:bg-orange-600 transition-all">
              <span className="flex items-center justify-center gap-2"><Save className="w-4 h-4" />{editingDish ? 'Save Changes' : 'Add Dish'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   Admin Page (standalone full page)
══════════════════════════════════════════ */
export default function AdminPage() {
  const {
    chefProfile, updateProfile,
    sections, toggleSectionVisibility, updateSectionTitle,
    dishes, addDish, updateDish, deleteDish,
    gallery, setGallery,
    reviews, setReviews,
    experience, setExperience,
    reservations, updateReservationStatus, deleteReservation,
    resetData, showToast, darkMode, toggleDarkMode
  } = usePortfolio();

  const [activeTab, setActiveTab] = useState('overview');
  const [dishModal, setDishModal] = useState(false);
  const [editingDish, setEditingDish] = useState(null);
  const [dishForm, setDishForm] = useState({
    name: '', category: 'Main Course', price: '$95', prepTime: '20 min',
    image: '', badge: '', shortDescription: '', fullDescription: '',
    dietary: '', ingredients: '', pairing: '', chefNote: '',
    flavorProfile: { umami: 80, richness: 75, acidity: 60, sweetness: 30, texture: 85 }
  });
  const [profileForm, setProfileForm] = useState({ ...chefProfile });

  React.useEffect(() => {
    if (chefProfile) {
      setProfileForm({ ...chefProfile });
    }
  }, [chefProfile]);
  const [newGallery, setNewGallery] = useState({ title: '', category: 'Plated Art', image: '' });
  const [newReview, setNewReview] = useState({ critic: '', publication: '', quote: '', rating: 5, avatar: 'https://i.pravatar.cc/150?img=10' });
  const [editReview, setEditReview] = useState(null);
  const [newExp, setNewExp] = useState({ year: '', role: '', establishment: '', badge: '', description: '' });
  const [editExp, setEditExp] = useState(null);

  /* dish handlers */
  const openAdd = () => {
    setEditingDish(null);
    setDishForm({ name: '', category: 'Main Course', price: '$95', prepTime: '20 min', image: '', badge: '', shortDescription: '', fullDescription: '', dietary: '', ingredients: '', pairing: '', chefNote: '', flavorProfile: { umami: 80, richness: 75, acidity: 60, sweetness: 30, texture: 85 } });
    setDishModal(true);
  };
  const openEdit = d => {
    setEditingDish(d);
    setDishForm({ ...d, dietary: Array.isArray(d.dietary) ? d.dietary.join(', ') : d.dietary || '', ingredients: Array.isArray(d.ingredients) ? d.ingredients.join(', ') : d.ingredients || '' });
    setDishModal(true);
  };
  const saveDish = e => {
    e.preventDefault();
    const fmt = { ...dishForm, dietary: typeof dishForm.dietary === 'string' ? dishForm.dietary.split(',').map(s => s.trim()).filter(Boolean) : dishForm.dietary, ingredients: typeof dishForm.ingredients === 'string' ? dishForm.ingredients.split(',').map(s => s.trim()).filter(Boolean) : dishForm.ingredients };
    editingDish ? updateDish({ ...fmt, id: editingDish.id }) : addDish(fmt);
    setDishModal(false);
    showToast(editingDish ? 'Dish updated!' : 'Dish added!');
  };

  /* CV download */
  const downloadCV = () => {
    const txt = `CURRICULUM VITAE\n${'='.repeat(40)}\nChef ${chefProfile.name}\n${chefProfile.title || ''}\n\nContact:\nEmail: ${chefProfile.socials?.email}\nPhone: ${chefProfile.socials?.phone}\n\nChef's Belief:\n${chefProfile.philosophy}\n\nAchievements:\n- ${chefProfile.yearsExperience}+ Years Experience\n- ${chefProfile.signatureDishesCount}+ Dishes Created`.trim();
    const blob = new Blob([txt], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = `Chef_${chefProfile.name.replace(' ', '_')}_CV.txt`; a.click(); URL.revokeObjectURL(url);
  };

  // Passcode Auth States
  const [passcode, setPasscode] = useState(() => localStorage.getItem('admin_passcode') || 'admin123');
  const [isAuthenticated, setIsAuthenticated] = useState(() => sessionStorage.getItem('admin_authenticated') === 'true');
  const [inputPassword, setInputPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState('');
  const [newPasscode, setNewPasscode] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (inputPassword === passcode) {
      setIsAuthenticated(true);
      sessionStorage.setItem('admin_authenticated', 'true');
      setAuthError('');
      showToast('Welcome to Admin Dashboard!');
    } else {
      setAuthError('Incorrect passcode. Please try again.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('admin_authenticated');
    setInputPassword('');
    showToast('Logged out of Admin Dashboard.');
  };

  const handleUpdatePasscode = (e) => {
    e.preventDefault();
    if (!newPasscode.trim()) {
      showToast('Please enter a new passcode.');
      return;
    }
    setPasscode(newPasscode.trim());
    localStorage.setItem('admin_passcode', newPasscode.trim());
    setNewPasscode('');
    showToast('Admin passcode updated successfully!');
  };

  const TABS = [
    { id: 'overview',   label: 'Overview',    icon: BarChart2 },
    { id: 'sections',   label: 'Sections',    icon: Layers },
    { id: 'dishes',     label: 'Dishes',      icon: UtensilsCrossed, count: dishes.length },
    { id: 'experience', label: 'Experience',  icon: Award, count: experience.length },
    { id: 'reviews',    label: 'Reviews',     icon: Star, count: reviews.length },
    { id: 'gallery',    label: 'Gallery',     icon: Camera, count: gallery.length },
    { id: 'profile',    label: 'Profile',     icon: User },
    { id: 'bookings',   label: 'Inquiries',   icon: MessageSquare, count: reservations.length },
    { id: 'security',   label: 'Security',    icon: ShieldCheck },
    { id: 'reset',      label: 'Reset',       icon: RotateCcw },
  ];

  /* ── Passcode Lock Screen ── */
  if (!isAuthenticated) {
    return (
      <div className={darkMode ? 'dark' : ''}>
        <div className="min-h-[100dvh] bg-theme-primary text-theme-primary flex flex-col justify-center items-center p-4 sm:p-6 overflow-y-auto transition-colors duration-300">
          <div className="w-full max-w-xs sm:max-w-md glass-card border border-theme rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 my-auto">
            {/* Header & Lock Icon */}
            <div className="text-center space-y-2.5">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-orange-500/10 text-orange-500 border border-orange-500/30 flex items-center justify-center mx-auto shadow-inner">
                <Lock className="w-7 h-7 sm:w-8 sm:h-8" />
              </div>
              <h1 className="text-xl sm:text-2xl font-serif font-bold text-theme-primary">Admin Dashboard</h1>
              <p className="text-xs text-theme-muted">Enter passcode to access dashboard settings</p>
            </div>

            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-theme-muted font-semibold mb-1.5">
                  Admin Passcode
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={inputPassword}
                    onChange={e => setInputPassword(e.target.value)}
                    placeholder="Enter admin passcode..."
                    className="input-theme w-full rounded-2xl pl-4 pr-12 py-3.5 text-sm min-h-[48px] focus:ring-2 focus:ring-orange-500/40"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-theme-muted hover:text-orange-500 transition-colors"
                    aria-label={showPassword ? 'Hide passcode' : 'Show passcode'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {authError && (
                  <p className="text-xs text-rose-500 mt-2 font-medium flex items-center gap-1">
                    <span>⚠️</span> {authError}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full min-h-[48px] py-3.5 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-bold uppercase tracking-wider text-xs shadow-lg shadow-orange-500/20 transition-all active:scale-[0.99] flex items-center justify-center"
              >
                Unlock Dashboard
              </button>
            </form>

            {/* Footer */}
            <div className="pt-4 border-t border-theme flex items-center justify-between text-xs">
              <span className="text-[11px] text-theme-muted font-medium">Portfolio Manager</span>
              <Link to="/" className="text-orange-500 hover:underline flex items-center gap-1 font-semibold">
                <ArrowLeft className="w-3.5 h-3.5" /> Back to Site
              </Link>
            </div>

          </div>
        </div>
        <Toast />
      </div>
    );
  }

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-theme-primary text-theme-primary transition-colors duration-300 flex flex-col">

        {/* ── Top Bar ── */}
        <header className="bg-theme-card border-b border-theme px-4 sm:px-6 py-3.5 flex items-center justify-between shadow-sm shrink-0 sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-orange-100 dark:bg-orange-500/15 text-orange-500 border border-orange-200 dark:border-orange-500/30">
              <LayoutDashboard className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-base font-serif font-bold text-theme-primary flex items-center gap-2">
                Admin Dashboard
                <span className="px-2 py-0.5 rounded text-[10px] bg-orange-500 text-white font-sans font-extrabold uppercase">Control</span>
              </h1>
              <p className="text-xs text-theme-muted hidden sm:block">Chef {chefProfile.name} — Portfolio Manager</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Dark mode toggle */}
            <button onClick={toggleDarkMode} className="p-2.5 rounded-xl bg-theme-muted border border-theme text-theme-secondary hover:text-orange-500 hover:border-orange-300 transition-all" title="Toggle dark mode">
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            {/* CV download */}
            <button onClick={downloadCV} className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-theme-muted border border-theme text-xs font-semibold text-theme-secondary hover:text-orange-500 hover:border-orange-300 transition-all">
              <Download className="w-4 h-4" /> CV
            </button>
            {/* Back to site */}
            <Link to="/" className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl bg-orange-500 text-white text-xs font-bold uppercase tracking-wider hover:bg-orange-600 transition-all shadow-md">
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">View Site</span>
            </Link>
          </div>
        </header>

        {/* ── Mobile Pill Nav Bar ── */}
        <div className="md:hidden w-full bg-theme-card/90 backdrop-blur-md border-b border-theme px-3 py-2 flex gap-1.5 overflow-x-auto shrink-0 sticky top-0 z-20">
          {TABS.map(tab => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider whitespace-nowrap shrink-0 transition-all ${
                  active
                    ? 'bg-orange-500 text-white shadow-md'
                    : 'bg-theme-muted/60 text-theme-muted hover:text-orange-500 border border-theme/60'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${active ? 'bg-white/25 text-white' : 'bg-theme-muted text-theme-muted'}`}>
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <div className="flex flex-grow min-h-0">
          {/* ── Sidebar ── */}
          <aside className="w-56 lg:w-64 bg-theme-secondary border-r border-theme p-3 flex flex-col gap-1 overflow-y-auto shrink-0 hidden md:flex">
            {TABS.map(tab => {
              const Icon = tab.icon;
              const active = activeTab === tab.id;
              return (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wide text-left transition-all ${active ? 'bg-orange-500 text-white shadow-md' : 'text-theme-secondary hover:bg-theme-muted hover:text-orange-500'}`}>
                  <Icon className="w-4 h-4 shrink-0" />
                  <span className="flex-1">{tab.label}</span>
                  {tab.count !== undefined && (
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${active ? 'bg-white/20 text-white' : 'bg-theme-muted text-theme-muted'}`}>{tab.count}</span>
                  )}
                </button>
              );
            })}
          </aside>

          {/* ── Main Content ── */}
          <main className="flex-grow p-4 sm:p-6 overflow-y-auto bg-theme-primary">


            {/* ══ OVERVIEW ══ */}
            {activeTab === 'overview' && (
              <div className="max-w-5xl mx-auto space-y-6">
                <div>
                  <h2 className="text-2xl font-serif font-bold text-theme-primary">Welcome back 👋</h2>
                  <p className="text-sm text-theme-muted mt-1">Here's a quick look at your portfolio data.</p>
                </div>
                {/* Stats cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {[
                    { label: 'Dishes',     value: dishes.length,       icon: UtensilsCrossed, color: 'orange' },
                    { label: 'Bookings',   value: reservations.length, icon: CalendarCheck,   color: 'emerald' },
                    { label: 'Reviews',    value: reviews.length,      icon: Star,            color: 'amber' },
                    { label: 'Photos',     value: gallery.length,      icon: Camera,          color: 'violet' },
                  ].map(({ label, value, icon: Icon, color }) => (
                    <div key={label} className={`${card} p-5 flex flex-col gap-2`}>
                      <div className={`p-2.5 rounded-xl w-fit bg-${color}-100 text-${color}-600 dark:bg-${color}-500/15 dark:text-${color}-400 border border-${color}-200 dark:border-${color}-500/30`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="text-2xl font-serif font-bold text-theme-primary">{value}</div>
                      <div className="text-xs text-theme-muted font-semibold uppercase tracking-wider">{label}</div>
                    </div>
                  ))}
                </div>
                {/* Quick links */}
                <div className={`${card} p-5`}>
                  <h3 className="text-sm font-semibold text-theme-primary uppercase tracking-wider mb-4">Quick Actions</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <button onClick={() => { setActiveTab('dishes'); openAdd(); }} className="flex items-center gap-2 p-3 rounded-xl bg-theme-muted border border-theme hover:border-orange-400 hover:text-orange-500 text-theme-secondary transition-all text-xs font-semibold">
                      <Plus className="w-4 h-4 text-orange-400" /> Add New Dish
                    </button>
                    <button onClick={() => setActiveTab('bookings')} className="flex items-center gap-2 p-3 rounded-xl bg-theme-muted border border-theme hover:border-orange-400 hover:text-orange-500 text-theme-secondary transition-all text-xs font-semibold">
                      <CalendarCheck className="w-4 h-4 text-orange-400" /> View Bookings
                    </button>
                    <button onClick={downloadCV} className="flex items-center gap-2 p-3 rounded-xl bg-theme-muted border border-theme hover:border-orange-400 hover:text-orange-500 text-theme-secondary transition-all text-xs font-semibold">
                      <Download className="w-4 h-4 text-orange-400" /> Download CV
                    </button>
                  </div>
                </div>
                {/* Recent bookings preview */}
                {reservations.length > 0 && (
                  <div className={`${card} p-5`}>
                    <h3 className="text-sm font-semibold text-theme-primary uppercase tracking-wider mb-4">Recent Bookings</h3>
                    <div className="space-y-3">
                      {reservations.slice(0, 3).map(res => (
                        <div key={res.id} className="flex items-center justify-between gap-3 p-3 rounded-xl bg-theme-muted border border-theme">
                          <div>
                            <div className="text-sm font-semibold text-theme-primary">{res.name}</div>
                            <div className="text-xs text-theme-muted">{res.date} · {res.guests} guests · {res.eventType}</div>
                          </div>
                          <Badge color={res.status === 'Confirmed' ? 'green' : res.status === 'Declined' ? 'red' : 'amber'}>{res.status}</Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ══ SECTIONS ══ */}
            {activeTab === 'sections' && (
              <div className="space-y-4 max-w-3xl mx-auto">
                <div><h2 className="text-xl font-serif font-bold text-theme-primary">Section Controls</h2><p className="text-xs text-theme-muted mt-1">Show/hide sections and rename their heading labels.</p></div>
                <div className="space-y-3">
                  {Object.entries(sections).map(([id, section]) => (
                    <SectionRow key={id} id={id} section={section} onToggle={toggleSectionVisibility} onTitleChange={updateSectionTitle} />
                  ))}
                </div>
              </div>
            )}

            {/* ══ DISHES ══ */}
            {activeTab === 'dishes' && (
              <div className="space-y-5 max-w-6xl mx-auto">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div><h2 className="text-xl font-serif font-bold text-theme-primary">Dishes</h2><p className="text-xs text-theme-muted mt-1">{dishes.length} dishes on the menu.</p></div>
                  <button onClick={openAdd} className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-orange-500 text-white font-bold uppercase tracking-wider text-xs hover:bg-orange-600 transition-all shadow-lg"><Plus className="w-4 h-4" /> Add Dish</button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {dishes.map(dish => (
                    <div key={dish.id} className={`${card} flex flex-col`}>
                      <div className="relative h-40">
                        <img src={dish.image} alt={dish.name} className="w-full h-full object-cover" />
                        <div className="absolute top-2 left-2 px-2.5 py-1 rounded-full text-[10px] font-bold bg-black/60 text-white">{dish.category}</div>
                      </div>
                      <div className="p-4 flex-grow flex flex-col justify-between gap-3">
                        <div>
                          <h3 className="font-serif font-bold text-theme-primary text-sm line-clamp-1">{dish.name}</h3>
                          <p className="text-xs text-theme-muted mt-1 line-clamp-2">{dish.shortDescription}</p>
                        </div>
                        <div className="flex gap-2 pt-3 border-t border-theme">
                          <button onClick={() => openEdit(dish)} className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg bg-theme-muted border border-theme text-theme-secondary text-xs font-medium hover:text-orange-500 hover:border-orange-300 transition-all"><Edit2 className="w-3.5 h-3.5" /> Edit</button>
                          <button onClick={() => { deleteDish(dish.id); showToast('Dish deleted.'); }} className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-600 text-xs font-medium hover:bg-rose-500 hover:text-white hover:border-rose-500 transition-all dark:bg-rose-500/10 dark:border-rose-500/30 dark:text-rose-400"><Trash2 className="w-3.5 h-3.5" /> Delete</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ══ AWARDS / EXPERIENCE ══ */}
            {activeTab === 'experience' && (
              <div className="space-y-5 max-w-4xl mx-auto">
                <div><h2 className="text-xl font-serif font-bold text-theme-primary">Awards & Career</h2><p className="text-xs text-theme-muted mt-1">Add, edit or remove milestones.</p></div>
                <div className={`${card} p-5 space-y-4`}>
                  <h3 className="text-sm font-semibold text-theme-primary uppercase tracking-wider">{editExp ? 'Edit Milestone' : 'Add Milestone'}</h3>
                  {[['Year / Period','year','2021 - Present'],['Role / Title','role','Head Chef & Owner'],['Restaurant / Place','establishment',"L'Étoile D'Or"],['Badge','badge','3 Michelin Stars']].map(([l,k,ph]) => (
                    <div key={k}><label className={lbl}>{l}</label><input placeholder={ph} value={(editExp||newExp)[k]} onChange={e => editExp ? setEditExp(p=>({...p,[k]:e.target.value})) : setNewExp(p=>({...p,[k]:e.target.value}))} className={inp} /></div>
                  ))}
                  <div><label className={lbl}>Description</label><textarea rows={3} value={(editExp||newExp).description} onChange={e => editExp ? setEditExp(p=>({...p,description:e.target.value})) : setNewExp(p=>({...p,description:e.target.value}))} className={ta} /></div>
                  <div className="flex gap-3">
                    {editExp && <button onClick={() => setEditExp(null)} className="flex-1 py-2.5 rounded-xl border border-theme text-theme-secondary text-xs font-semibold hover:bg-theme-muted transition-all">Cancel</button>}
                    <button onClick={() => { if(editExp){setExperience(experience.map(e=>e.id===editExp.id?{...editExp}:e));setEditExp(null);}else{setExperience([{...newExp,id:`exp-${Date.now()}`},...experience]);setNewExp({year:'',role:'',establishment:'',badge:'',description:''});} showToast('Saved!'); }} className="flex-1 py-2.5 rounded-xl bg-orange-500 text-white text-xs font-bold uppercase tracking-wider hover:bg-orange-600 transition-all">{editExp ? 'Save Changes' : 'Add Milestone'}</button>
                  </div>
                </div>
                <div className="space-y-3">
                  {experience.map(exp => (
                    <div key={exp.id} className={`${card} p-4 flex gap-4 items-start`}>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-1"><span className="text-xs font-bold text-orange-500">{exp.year}</span>{exp.badge && <Badge color="orange">{exp.badge}</Badge>}</div>
                        <h4 className="font-serif font-bold text-theme-primary text-sm">{exp.role}</h4>
                        <p className="text-xs text-theme-muted">{exp.establishment}</p>
                        <p className="text-xs text-theme-muted mt-1 line-clamp-2">{exp.description}</p>
                      </div>
                      <div className="flex flex-col gap-2 shrink-0">
                        <button onClick={() => setEditExp({...exp})} className="p-2 rounded-lg bg-theme-muted border border-theme text-theme-secondary hover:text-orange-500 hover:border-orange-300 transition-all"><Edit2 className="w-3.5 h-3.5" /></button>
                        <button onClick={() => { setExperience(experience.filter(e=>e.id!==exp.id)); showToast('Removed.'); }} className="p-2 rounded-lg bg-rose-50 border border-rose-200 text-rose-500 hover:bg-rose-500 hover:text-white transition-all dark:bg-rose-500/10 dark:border-rose-500/30"><Trash2 className="w-3.5 h-3.5" /></button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ══ REVIEWS ══ */}
            {activeTab === 'reviews' && (
              <div className="space-y-5 max-w-3xl mx-auto">
                <div><h2 className="text-xl font-serif font-bold text-theme-primary">Reviews</h2><p className="text-xs text-theme-muted mt-1">Manage critic and guest reviews.</p></div>
                <div className={`${card} p-5 space-y-4`}>
                  <h3 className="text-sm font-semibold text-theme-primary uppercase tracking-wider">{editReview ? 'Edit Review' : 'Add Review'}</h3>
                  {[['Critic Name','critic','Elena Vasquez'],['Publication','publication','Le Guide'],['Avatar URL','avatar','https://i.pravatar.cc/150']].map(([l,k,ph]) => (
                    <div key={k}><label className={lbl}>{l}</label><input placeholder={ph} value={(editReview||newReview)[k]} onChange={e => editReview ? setEditReview(p=>({...p,[k]:e.target.value})) : setNewReview(p=>({...p,[k]:e.target.value}))} className={inp} /></div>
                  ))}
                  <div><label className={lbl}>Quote</label><textarea rows={3} value={(editReview||newReview).quote} onChange={e => editReview ? setEditReview(p=>({...p,quote:e.target.value})) : setNewReview(p=>({...p,quote:e.target.value}))} className={ta} /></div>
                  <div><label className={lbl}>Rating (1–5)</label><input type="number" min={1} max={5} value={(editReview||newReview).rating} onChange={e => editReview ? setEditReview(p=>({...p,rating:Number(e.target.value)})) : setNewReview(p=>({...p,rating:Number(e.target.value)}))} className={inp} /></div>
                  <div className="flex gap-3">
                    {editReview && <button onClick={() => setEditReview(null)} className="flex-1 py-2.5 rounded-xl border border-theme text-theme-secondary text-xs font-semibold hover:bg-theme-muted transition-all">Cancel</button>}
                    <button onClick={() => { if(editReview){setReviews(reviews.map(r=>r.id===editReview.id?{...editReview}:r));setEditReview(null);}else{setReviews([{...newReview,id:`rev-${Date.now()}`},...reviews]);setNewReview({critic:'',publication:'',quote:'',rating:5,avatar:'https://i.pravatar.cc/150?img=10'});} showToast('Review saved!'); }} className="flex-1 py-2.5 rounded-xl bg-orange-500 text-white text-xs font-bold uppercase tracking-wider hover:bg-orange-600 transition-all">{editReview ? 'Save Changes' : 'Add Review'}</button>
                  </div>
                </div>
                <div className="space-y-3">
                  {reviews.map(rev => (
                    <div key={rev.id} className={`${card} p-4 flex gap-4`}>
                      <img src={rev.avatar} alt={rev.critic} className="w-12 h-12 rounded-full object-cover border-2 border-orange-200 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5"><h4 className="font-bold text-theme-primary text-sm">{rev.critic}</h4><span className="text-[10px] text-orange-500 font-semibold">{rev.publication}</span></div>
                        <div className="flex gap-0.5 mb-1">{[...Array(rev.rating)].map((_,i)=><Star key={i} className="w-3 h-3 fill-orange-400 text-orange-400" />)}</div>
                        <p className="text-xs text-theme-muted italic line-clamp-2">"{rev.quote}"</p>
                      </div>
                      <div className="flex flex-col gap-2 shrink-0">
                        <button onClick={() => setEditReview({...rev})} className="p-2 rounded-lg bg-theme-muted border border-theme text-theme-secondary hover:text-orange-500 hover:border-orange-300 transition-all"><Edit2 className="w-3.5 h-3.5" /></button>
                        <button onClick={() => { setReviews(reviews.filter(r=>r.id!==rev.id)); showToast('Removed.'); }} className="p-2 rounded-lg bg-rose-50 border border-rose-200 text-rose-500 hover:bg-rose-500 hover:text-white transition-all dark:bg-rose-500/10 dark:border-rose-500/30"><Trash2 className="w-3.5 h-3.5" /></button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ══ GALLERY ══ */}
            {activeTab === 'gallery' && (
              <div className="space-y-5 max-w-5xl mx-auto">
                <div><h2 className="text-xl font-serif font-bold text-theme-primary">Gallery</h2><p className="text-xs text-theme-muted mt-1">{gallery.length} photos.</p></div>
                <form onSubmit={e => {
                    e.preventDefault();
                    if (!newGallery.title) { showToast('Please enter a title.'); return; }
                    if (!newGallery.image) { showToast('Please select or enter an image.'); return; }
                    setGallery([{ ...newGallery, id: `gal-${Date.now()}` }, ...gallery]);
                    setNewGallery({ title: '', category: 'Plated Art', image: '' });
                    showToast('Photo added!');
                  }} className={`${card} p-5 space-y-4`}>
                  <h3 className="text-sm font-semibold text-theme-primary uppercase tracking-wider">Add Photo</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div><label className={lbl}>Title *</label><input required value={newGallery.title} onChange={e => setNewGallery(p=>({...p,title:e.target.value}))} className={inp} /></div>
                    <div><label className={lbl}>Category</label><select value={newGallery.category} onChange={e => setNewGallery(p=>({...p,category:e.target.value}))} className={inp}>{['Plated Art','Restaurant','Kitchen','Events'].map(c=><option key={c}>{c}</option>)}</select></div>
                  </div>
                  <ImageUploadField
                    label="Photo Image"
                    value={newGallery.image}
                    onChange={v => setNewGallery(p => ({ ...p, image: v }))}
                    placeholder="https://images.unsplash.com/..."
                    aspectClass="aspect-video"
                  />
                  <button type="submit" className="w-full py-2.5 rounded-xl bg-orange-500 text-white text-xs font-bold uppercase tracking-wider hover:bg-orange-600 transition-all"><span className="flex items-center justify-center gap-2"><Plus className="w-4 h-4" /> Add Photo</span></button>
                </form>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                  {gallery.map(item => (
                    <div key={item.id} className="relative group rounded-xl overflow-hidden border border-theme aspect-square">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-2">
                        <p className="text-white text-[10px] font-bold text-center line-clamp-2">{item.title}</p>
                        <button onClick={() => { setGallery(gallery.filter(g=>g.id!==item.id)); showToast('Photo removed.'); }} className="p-1.5 rounded-lg bg-rose-500 text-white hover:bg-rose-600"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ══ PROFILE ══ */}
            {activeTab === 'profile' && (
              <form onSubmit={e => { e.preventDefault(); updateProfile(profileForm); }} className="space-y-5 max-w-3xl mx-auto">
                <div><h2 className="text-xl font-serif font-bold text-theme-primary">Chef Profile</h2><p className="text-xs text-theme-muted mt-1">Edit your bio, images, and contact details.</p></div>
                <div className={`${card} p-5 space-y-4`}>
                  <h3 className="text-sm font-semibold text-theme-primary uppercase tracking-wider">Basic Info</h3>
                  <div><label className={lbl}>Name</label><input value={profileForm.name||''} onChange={e => setProfileForm(p=>({...p,name:e.target.value}))} className={inp} /></div>
                  <div><label className={lbl}>Job Title</label><input value={profileForm.title||''} onChange={e => setProfileForm(p=>({...p,title:e.target.value}))} className={inp} /></div>
                  <div><label className={lbl}>Hero Tagline</label><input value={profileForm.tagline||''} onChange={e => setProfileForm(p=>({...p,tagline:e.target.value}))} className={inp} /></div>
                  <div><label className={lbl}>Hero Subtitle</label><input value={profileForm.subtitle||''} onChange={e => setProfileForm(p=>({...p,subtitle:e.target.value}))} className={inp} /></div>
                  <div><label className={lbl}>Philosophy / Belief</label><textarea rows={3} value={profileForm.philosophy||''} onChange={e => setProfileForm(p=>({...p,philosophy:e.target.value}))} className={ta} /></div>
                  <div className="grid grid-cols-2 gap-4">
                    <div><label className={lbl}>Years Exp.</label><input type="number" value={profileForm.yearsExperience||18} onChange={e => setProfileForm(p=>({...p,yearsExperience:Number(e.target.value)}))} className={inp} /></div>
                    <div><label className={lbl}>Dishes Count</label><input type="number" value={profileForm.signatureDishesCount||42} onChange={e => setProfileForm(p=>({...p,signatureDishesCount:Number(e.target.value)}))} className={inp} /></div>
                  </div>
                </div>
                <div className={`${card} p-5 space-y-4`}>
                  <h3 className="text-sm font-semibold text-theme-primary uppercase tracking-wider">Bio Section Text</h3>
                  <div><label className={lbl}>Bio Tagline (large quote)</label><input value={profileForm.bioTagline||''} onChange={e => setProfileForm(p=>({...p,bioTagline:e.target.value}))} className={inp} placeholder="Good food is made with care..." /></div>
                  <div><label className={lbl}>Bio Paragraph 1</label><textarea rows={3} value={profileForm.bioDesc1||''} onChange={e => setProfileForm(p=>({...p,bioDesc1:e.target.value}))} className={ta} placeholder="Chef background and experience..." /></div>
                  <div><label className={lbl}>Bio Paragraph 2</label><textarea rows={3} value={profileForm.bioDesc2||''} onChange={e => setProfileForm(p=>({...p,bioDesc2:e.target.value}))} className={ta} placeholder="Cooking philosophy and style..." /></div>
                  <div><label className={lbl}>Cooking Style Badge</label><input value={profileForm.cookingStyle||''} onChange={e => setProfileForm(p=>({...p,cookingStyle:e.target.value}))} className={inp} placeholder="Modern Fine Dining" /></div>
                </div>
                <div className={`${card} p-5 space-y-4`}>
                  <h3 className="text-sm font-semibold text-theme-primary uppercase tracking-wider">Images</h3>
                  <ImageUploadField
                    label="Hero Background Image"
                    value={profileForm.heroImage || ''}
                    onChange={v => setProfileForm(p => ({ ...p, heroImage: v }))}
                    placeholder="https://images.unsplash.com/..."
                    aspectClass="aspect-video"
                  />
                  <ImageUploadField
                    label="Bio Portrait Image"
                    value={profileForm.bioPortrait || ''}
                    onChange={v => setProfileForm(p => ({ ...p, bioPortrait: v }))}
                    placeholder="https://images.unsplash.com/..."
                    aspectClass="aspect-square sm:aspect-video"
                  />
                </div>
                <div className={`${card} p-5 space-y-4`}>
                  <h3 className="text-sm font-semibold text-theme-primary uppercase tracking-wider">Contact</h3>
                  {[['Email','email'],['Phone','phone'],['Restaurant Name','restaurant']].map(([l,k]) => (
                    <div key={k}><label className={lbl}>{l}</label><input value={profileForm.socials?.[k]||''} onChange={e => setProfileForm(p=>({...p,socials:{...p.socials,[k]:e.target.value}}))} className={inp} /></div>
                  ))}
                </div>
                <div className={`${card} p-5 space-y-4`}>
                  <h3 className="text-sm font-semibold text-theme-primary uppercase tracking-wider flex items-center gap-2">
                    <Download className="w-4 h-4 text-orange-500" /> CV / Resume File
                  </h3>
                  <p className="text-xs text-theme-muted">Upload your CV/Resume PDF or paste a link. This will be used when visitors click "Download CV".</p>

                  {/* Mode toggle */}
                  {(() => {
                    const cvMode = profileForm._cvMode || 'url';
                    return (
                      <div className="space-y-3">
                        <div className="flex items-center bg-theme-muted rounded-lg p-0.5 border border-theme w-fit">
                          {[['url','🔗 URL Link'],['file','📄 Upload PDF']].map(([m, lbl2]) => (
                            <button key={m} type="button"
                              onClick={() => setProfileForm(p => ({ ...p, _cvMode: m }))}
                              className={`px-3 py-1.5 rounded-md text-[11px] font-semibold uppercase tracking-wide transition-all ${cvMode === m ? 'bg-orange-500 text-white shadow-sm' : 'text-theme-muted hover:text-orange-500'}`}>
                              {lbl2}
                            </button>
                          ))}
                        </div>

                        {cvMode === 'url' ? (
                          <div>
                            <label className={lbl}>CV / Resume URL</label>
                            <input
                              type="url"
                              value={profileForm.cvUrl || ''}
                              onChange={e => setProfileForm(p => ({ ...p, cvUrl: e.target.value }))}
                              placeholder="https://drive.google.com/... or https://yoursite.com/cv.pdf"
                              className={inp}
                            />
                            <p className="text-[11px] text-theme-muted mt-1">Google Drive, Dropbox, or any direct PDF link.</p>
                          </div>
                        ) : (
                          <div className="space-y-3">
                            <label className={lbl}>Upload PDF File</label>
                            <label className={`flex flex-col items-center justify-center gap-2 w-full rounded-2xl border-2 border-dashed cursor-pointer transition-all p-6
                              ${profileForm.cvUrl?.startsWith('data:') ? 'border-orange-400 bg-orange-50 dark:bg-orange-500/10' : 'border-theme hover:border-orange-400 bg-theme-muted hover:bg-orange-50 dark:hover:bg-orange-500/5'}`}>
                              <div className="p-3 rounded-full bg-orange-100 dark:bg-orange-500/15 text-orange-500 border border-orange-200 dark:border-orange-500/30">
                                <Download className="w-5 h-5" />
                              </div>
                              {profileForm.cvUrl?.startsWith('data:application/pdf') ? (
                                <div className="text-center">
                                  <p className="text-sm font-semibold text-orange-500">✓ PDF Uploaded</p>
                                  <p className="text-[11px] text-theme-muted mt-0.5">Click to replace file</p>
                                </div>
                              ) : (
                                <div className="text-center">
                                  <p className="text-sm font-semibold text-theme-primary">Click to upload PDF</p>
                                  <p className="text-[11px] text-theme-muted mt-0.5">PDF files only</p>
                                </div>
                              )}
                              <input type="file" accept=".pdf,application/pdf" className="hidden"
                                onChange={e => {
                                  const file = e.target.files?.[0];
                                  if (!file) return;
                                  const reader = new FileReader();
                                  reader.onload = ev => setProfileForm(p => ({ ...p, cvUrl: ev.target.result }));
                                  reader.readAsDataURL(file);
                                }}
                              />
                            </label>
                            {profileForm.cvUrl?.startsWith('data:') && (
                              <button type="button"
                                onClick={() => setProfileForm(p => ({ ...p, cvUrl: '' }))}
                                className="text-xs text-rose-500 hover:underline flex items-center gap-1">
                                <X className="w-3 h-3" /> Remove uploaded file
                              </button>
                            )}
                          </div>
                        )}

                        {/* Preview / status */}
                        {profileForm.cvUrl && (
                          <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/30 text-xs text-emerald-700 dark:text-emerald-400">
                            <Check className="w-3.5 h-3.5 shrink-0" />
                            <span className="font-semibold">CV ready —</span>
                            <span className="truncate">
                              {profileForm.cvUrl.startsWith('data:') ? 'PDF file uploaded (base64)' : profileForm.cvUrl}
                            </span>
                          </div>
                        )}
                      </div>
                    );
                  })()}
                </div>
                <button type="submit" className="w-full py-3.5 rounded-xl bg-orange-500 text-white font-bold uppercase tracking-wider text-xs hover:bg-orange-600 transition-all shadow-lg"><span className="flex items-center justify-center gap-2"><Save className="w-4 h-4" /> Save Profile</span></button>
              </form>

            )}

            {/* ══ BOOKINGS ══ */}
            {activeTab === 'bookings' && (
              <div className="space-y-4 max-w-5xl mx-auto">
                <div><h2 className="text-xl font-serif font-bold text-theme-primary">Bookings</h2><p className="text-xs text-theme-muted mt-1">{reservations.length} reservations total.</p></div>
                {reservations.length === 0 && (
                  <div className={`${card} p-12 text-center`}><CalendarCheck className="w-10 h-10 text-theme-muted mx-auto mb-3" /><p className="text-sm text-theme-muted">No bookings yet.</p></div>
                )}
                <div className="space-y-3">
                  {reservations.map(res => (
                    <div key={res.id} className={`${card} p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center gap-4`}>
                      <div className="flex-1 min-w-0 space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="font-bold text-theme-primary text-sm">{res.name}</h4>
                          <Badge color={res.status==='Confirmed'?'green':res.status==='Declined'?'red':'amber'}>{res.status}</Badge>
                        </div>
                        <p className="text-xs text-theme-muted">{res.email} · {res.phone}</p>
                        <p className="text-xs text-theme-muted">{res.date} · {res.guests} guests · {res.eventType}</p>
                        {res.specialRequests && <p className="text-xs text-orange-500 italic">Note: {res.specialRequests}</p>}
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <select value={res.status} onChange={e => updateReservationStatus(res.id, e.target.value)} className="input-theme rounded-xl px-3 py-2 text-xs">
                          {['Pending','Confirmed','Declined'].map(s=><option key={s}>{s}</option>)}
                        </select>
                        <button onClick={() => deleteReservation(res.id)} className="p-2 rounded-lg bg-rose-50 border border-rose-200 text-rose-500 hover:bg-rose-500 hover:text-white transition-all dark:bg-rose-500/10 dark:border-rose-500/30"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ══ SECURITY ══ */}
            {activeTab === 'security' && (
              <div className="max-w-md mx-auto space-y-6 pt-8">
                <div>
                  <h2 className="text-xl font-serif font-bold text-theme-primary">Security</h2>
                  <p className="text-xs text-theme-muted mt-1">Change your admin dashboard passcode.</p>
                </div>

                {/* Current passcode display */}
                <div className={`${card} p-5 flex items-center gap-4`}>
                  <div className="p-3 rounded-xl bg-emerald-100 dark:bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/30 shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-theme-muted font-semibold uppercase tracking-wider mb-0.5">Current Passcode</p>
                    <code className="text-sm font-bold text-theme-primary font-mono">{passcode}</code>
                  </div>
                </div>

                {/* Change passcode form */}
                <form onSubmit={handleUpdatePasscode} className={`${card} p-5 space-y-4`}>
                  <h3 className="text-sm font-semibold text-theme-primary uppercase tracking-wider flex items-center gap-2">
                    <KeyRound className="w-4 h-4 text-orange-500" /> Change Passcode
                  </h3>
                  <div>
                    <label className={lbl}>New Passcode</label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        minLength={4}
                        value={newPasscode}
                        onChange={e => setNewPasscode(e.target.value)}
                        placeholder="Enter new passcode (min. 4 characters)"
                        className={`${inp} pr-10`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-theme-muted hover:text-orange-500 transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    <p className="text-[11px] text-theme-muted mt-1.5">Passcode is saved in your browser's local storage.</p>
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-orange-500 text-white font-bold uppercase tracking-wider text-xs hover:bg-orange-600 transition-all shadow-lg flex items-center justify-center gap-2"
                  >
                    <ShieldCheck className="w-4 h-4" /> Update Passcode
                  </button>
                </form>

                {/* Logout */}
                <div className={`${card} p-5`}>
                  <h3 className="text-sm font-semibold text-theme-primary uppercase tracking-wider mb-3 flex items-center gap-2">
                    <LogOut className="w-4 h-4 text-rose-500" /> Session
                  </h3>
                  <p className="text-xs text-theme-muted mb-4">You are currently logged in. Click below to lock the dashboard.</p>
                  <button
                    onClick={handleLogout}
                    className="w-full py-3 rounded-xl border border-rose-200 dark:border-rose-500/30 text-rose-600 dark:text-rose-400 text-xs font-bold uppercase tracking-wider hover:bg-rose-500 hover:text-white hover:border-rose-500 transition-all flex items-center justify-center gap-2"
                  >
                    <LogOut className="w-4 h-4" /> Lock Dashboard
                  </button>
                </div>
              </div>
            )}

            {/* ══ RESET ══ */}
            {activeTab === 'reset' && (
              <div className="max-w-md mx-auto space-y-6 pt-8">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-rose-100 dark:bg-rose-500/15 text-rose-500 flex items-center justify-center mx-auto mb-4 border border-rose-200 dark:border-rose-500/30"><RotateCcw className="w-8 h-8" /></div>
                  <h2 className="text-xl font-serif font-bold text-theme-primary">Reset All Data</h2>
                  <p className="text-sm text-theme-muted mt-2">This will restore everything to the default settings. This cannot be undone.</p>
                </div>
                <div className={`${card} p-6`}>
                  <ul className="space-y-2 text-xs text-theme-muted mb-6">{['All dishes reset','Chef profile reset','Gallery reset','Reviews reset','All bookings cleared','Section settings reset'].map(item=>(<li key={item} className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-rose-400 shrink-0" />{item}</li>))}</ul>
                  <button onClick={() => { resetData(); }} className="w-full py-3.5 rounded-xl bg-rose-500 text-white font-bold uppercase tracking-wider text-xs hover:bg-rose-600 transition-all shadow-lg"><span className="flex items-center justify-center gap-2"><RotateCcw className="w-4 h-4" /> Reset Everything</span></button>
                </div>
              </div>
            )}

          </main>
        </div>
      </div>

      {dishModal && <DishModal editingDish={editingDish} form={dishForm} setForm={setDishForm} onSave={saveDish} onClose={() => setDishModal(false)} />}
      <Toast />
    </div>
  );
}
