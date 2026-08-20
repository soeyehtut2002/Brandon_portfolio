import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import {
  X,
  LayoutDashboard,
  UtensilsCrossed,
  Layers,
  User,
  CalendarCheck,
  RotateCcw,
  Plus,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  Check,
  Sparkles,
  Save,
  Upload,
  Image as ImageIcon,
  Camera
} from 'lucide-react';

export default function AdminDashboard() {
  const {
    chefProfile,
    updateProfile,
    sections,
    toggleSectionVisibility,
    updateSectionTitle,
    dishes,
    addDish,
    updateDish,
    deleteDish,
    gallery,
    setGallery,
    reservations,
    updateReservationStatus,
    deleteReservation,
    isAdminOpen,
    setIsAdminOpen,
    resetData,
    showToast
  } = usePortfolio();

  const [activeTab, setActiveTab] = useState('dishes');

  // Dish Form Modal state for Add/Edit
  const [dishModalOpen, setDishModalOpen] = useState(false);
  const [editingDish, setEditingDish] = useState(null);
  const [dishFormData, setDishFormData] = useState({
    name: '',
    category: 'Main Course',
    price: '$85',
    prepTime: '20 min',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=80',
    badge: 'Chef Special',
    shortDescription: '',
    fullDescription: '',
    dietary: 'Gluten-Free, Organic',
    ingredients: 'Fresh Sea Bass, Saffron, Fennel',
    pairing: 'Chablis Premier Cru',
    chefNote: 'Sear with precision over charcoal.',
    flavorProfile: {
      umami: 80,
      richness: 75,
      acidity: 60,
      sweetness: 30,
      texture: 85
    }
  });

  // Gallery item form modal state
  const [galleryModalOpen, setGalleryModalOpen] = useState(false);
  const [newGalleryItem, setNewGalleryItem] = useState({
    title: '',
    category: 'Plated Art',
    image: ''
  });

  // Profile Form state
  const [profileForm, setProfileForm] = useState(chefProfile);

  if (!isAdminOpen) return null;

  // Local File Reader Helper -> converts local image file to base64 Data URL
  const handleLocalFileUpload = (file, callback) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      showToast('Please select a valid image file!');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      callback(e.target.result);
      showToast('Local image file loaded successfully!');
    };
    reader.readAsDataURL(file);
  };

  // Open Add Dish modal
  const handleOpenAddDish = () => {
    setEditingDish(null);
    setDishFormData({
      name: '',
      category: 'Main Course',
      price: '$95',
      prepTime: '20 min',
      image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1000&q=80',
      badge: 'New Creation',
      shortDescription: 'Delicate signature dish with seasonal reduction.',
      fullDescription: 'Crafted with artisanal local harvest and prepared using modern gastronomy technique.',
      dietary: 'Gluten-Free, Organic',
      ingredients: 'Truffle, Artisanal Cream, Micro Herbs',
      pairing: 'Grand Cru Pinot Noir',
      chefNote: 'Serve immediately at peak warmth.',
      flavorProfile: {
        umami: 85,
        richness: 80,
        acidity: 50,
        sweetness: 40,
        texture: 90
      }
    });
    setDishModalOpen(true);
  };

  // Open Edit Dish modal
  const handleOpenEditDish = (dish) => {
    setEditingDish(dish);
    setDishFormData({
      ...dish,
      dietary: Array.isArray(dish.dietary) ? dish.dietary.join(', ') : dish.dietary || '',
      ingredients: Array.isArray(dish.ingredients) ? dish.ingredients.join(', ') : dish.ingredients || ''
    });
    setDishModalOpen(true);
  };

  // Save Dish (Add or Update)
  const handleSaveDish = (e) => {
    e.preventDefault();
    const formattedDish = {
      ...dishFormData,
      dietary: typeof dishFormData.dietary === 'string'
        ? dishFormData.dietary.split(',').map((s) => s.trim()).filter(Boolean)
        : dishFormData.dietary,
      ingredients: typeof dishFormData.ingredients === 'string'
        ? dishFormData.ingredients.split(',').map((s) => s.trim()).filter(Boolean)
        : dishFormData.ingredients
    };

    if (editingDish) {
      updateDish({ ...formattedDish, id: editingDish.id });
    } else {
      addDish(formattedDish);
    }
    setDishModalOpen(false);
  };

  // Save Profile Changes
  const handleSaveProfile = (e) => {
    e.preventDefault();
    updateProfile(profileForm);
  };

  // Add Gallery Photo
  const handleAddGalleryItem = (e) => {
    e.preventDefault();
    if (!newGalleryItem.image || !newGalleryItem.title) return;
    const itemToAdd = {
      ...newGalleryItem,
      id: `gal-${Date.now()}`
    };
    setGallery([itemToAdd, ...gallery]);
    setGalleryModalOpen(false);
    setNewGalleryItem({ title: '', category: 'Plated Art', image: '' });
    showToast('New photo added to gallery!');
  };

  const handleDeleteGalleryItem = (id) => {
    setGallery(gallery.filter((g) => g.id !== id));
    showToast('Photo removed from gallery.');
  };

  return (
    <div className="fixed inset-0 z-50 bg-obsidian-950/90 backdrop-blur-xl flex flex-col overflow-hidden animate-fade-in">
      {/* Top Admin Header Bar */}
      <div className="bg-obsidian-900 border-b border-obsidian-800 px-6 py-4 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-gold-500/20 text-gold-400 border border-gold-500/30">
            <LayoutDashboard className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-lg font-serif font-bold text-stone-100 flex items-center gap-2">
              <span>Chef Portfolio Control Hub</span>
              <span className="px-2 py-0.5 rounded text-[10px] bg-gold-500 text-obsidian-950 font-sans font-extrabold uppercase">
                Admin Mode
              </span>
            </h1>
            <p className="text-xs text-stone-400">
              Manage website sections, signature dishes menu, local image uploads, chef bio, and bookings.
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsAdminOpen(false)}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-obsidian-800 hover:bg-obsidian-700 text-stone-200 text-xs font-semibold uppercase tracking-wider border border-obsidian-700 transition-all"
        >
          <Eye className="w-4 h-4 text-gold-400" />
          <span>Exit Admin</span>
        </button>
      </div>

      {/* Main Admin Content Layout */}
      <div className="flex-grow flex flex-col md:flex-row overflow-hidden">
        {/* Sidebar Nav Tabs */}
        <aside className="w-full md:w-64 bg-obsidian-900/80 border-r border-obsidian-800 p-4 flex flex-row md:flex-col gap-2 overflow-x-auto shrink-0">
          <button
            onClick={() => setActiveTab('dishes')}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider text-left transition-all ${
              activeTab === 'dishes'
                ? 'bg-gold-500 text-obsidian-950 shadow-md font-bold'
                : 'text-stone-300 hover:bg-obsidian-800/60 hover:text-gold-400'
            }`}
          >
            <UtensilsCrossed className="w-4 h-4" />
            <span>Dishes Manager ({dishes.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('sections')}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider text-left transition-all ${
              activeTab === 'sections'
                ? 'bg-gold-500 text-obsidian-950 shadow-md font-bold'
                : 'text-stone-300 hover:bg-obsidian-800/60 hover:text-gold-400'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Section Control</span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider text-left transition-all ${
              activeTab === 'profile'
                ? 'bg-gold-500 text-obsidian-950 shadow-md font-bold'
                : 'text-stone-300 hover:bg-obsidian-800/60 hover:text-gold-400'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Chef Profile & Hero</span>
          </button>

          <button
            onClick={() => setActiveTab('galleryManager')}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider text-left transition-all ${
              activeTab === 'galleryManager'
                ? 'bg-gold-500 text-obsidian-950 shadow-md font-bold'
                : 'text-stone-300 hover:bg-obsidian-800/60 hover:text-gold-400'
            }`}
          >
            <Camera className="w-4 h-4" />
            <span>Gallery Photos ({gallery.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('bookings')}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider text-left transition-all ${
              activeTab === 'bookings'
                ? 'bg-gold-500 text-obsidian-950 shadow-md font-bold'
                : 'text-stone-300 hover:bg-obsidian-800/60 hover:text-gold-400'
            }`}
          >
            <CalendarCheck className="w-4 h-4" />
            <span>Bookings ({reservations.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider text-left transition-all mt-auto ${
              activeTab === 'settings'
                ? 'bg-gold-500 text-obsidian-950 shadow-md font-bold'
                : 'text-stone-400 hover:bg-obsidian-800/60 hover:text-gold-400'
            }`}
          >
            <RotateCcw className="w-4 h-4" />
            <span>System & Reset</span>
          </button>
        </aside>

        {/* Tab Body View */}
        <main className="flex-grow p-6 sm:p-8 overflow-y-auto bg-obsidian-950">
          {/* TAB 1: DISHES MANAGER */}
          {activeTab === 'dishes' && (
            <div className="space-y-6 max-w-6xl mx-auto">
              <div className="flex flex-wrap items-center justify-between gap-4 bg-obsidian-900 p-6 rounded-2xl border border-obsidian-800">
                <div>
                  <h2 className="text-xl font-serif font-bold text-stone-100">
                    Signature Dishes & Menu Management
                  </h2>
                  <p className="text-xs text-stone-400 mt-1">
                    Add, edit, or remove dishes displayed in your portfolio's menu. Supports local image upload!
                  </p>
                </div>
                <button
                  onClick={handleOpenAddDish}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gold-500 text-obsidian-950 font-bold uppercase tracking-wider text-xs hover:bg-gold-400 transition-all shadow-lg"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Dish</span>
                </button>
              </div>

              {/* Dish Table List */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {dishes.map((dish) => (
                  <div
                    key={dish.id}
                    className="glass-panel rounded-2xl overflow-hidden border border-obsidian-800 flex flex-col justify-between"
                  >
                    <div className="relative h-44">
                      <img
                        src={dish.image}
                        alt={dish.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-bold bg-gold-500 text-obsidian-950">
                        {dish.price}
                      </div>
                      <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold bg-obsidian-950/80 text-stone-200 border border-stone-700">
                        {dish.category}
                      </div>
                    </div>

                    <div className="p-4 flex-grow flex flex-col justify-between">
                      <div>
                        <h3 className="font-serif font-bold text-stone-100 text-base line-clamp-1">
                          {dish.name}
                        </h3>
                        <p className="text-xs text-stone-400 mt-1 line-clamp-2">
                          {dish.shortDescription}
                        </p>
                      </div>

                      <div className="flex items-center justify-between gap-2 pt-4 mt-4 border-t border-obsidian-800">
                        <button
                          onClick={() => handleOpenEditDish(dish)}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-obsidian-800 hover:bg-obsidian-700 text-stone-200 text-xs font-medium border border-obsidian-700"
                        >
                          <Edit2 className="w-3.5 h-3.5 text-gold-400" />
                          <span>Edit</span>
                        </button>

                        <button
                          onClick={() => deleteDish(dish.id)}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 text-xs font-medium border border-rose-800/40"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: SECTION CONTROLS */}
          {activeTab === 'sections' && (
            <div className="space-y-6 max-w-4xl mx-auto">
              <div className="bg-obsidian-900 p-6 rounded-2xl border border-obsidian-800">
                <h2 className="text-xl font-serif font-bold text-stone-100">
                  Portfolio Section Visibility & Controls
                </h2>
                <p className="text-xs text-stone-400 mt-1">
                  Enable or disable sections on your live website and customize section headings.
                </p>
              </div>

              <div className="space-y-4">
                {Object.entries(sections).map(([key, sec]) => (
                  <div
                    key={key}
                    className="glass-panel p-5 rounded-2xl border border-obsidian-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => toggleSectionVisibility(key)}
                        className={`p-3 rounded-xl transition-all ${
                          sec.visible
                            ? 'bg-gold-500/20 text-gold-400 border border-gold-500/40'
                            : 'bg-obsidian-950 text-stone-600 border border-obsidian-800'
                        }`}
                      >
                        {sec.visible ? (
                          <Eye className="w-5 h-5" />
                        ) : (
                          <EyeOff className="w-5 h-5" />
                        )}
                      </button>

                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-serif font-bold text-stone-100 text-base">
                            {sec.name}
                          </span>
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                              sec.visible
                                ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                                : 'bg-stone-900 text-stone-500'
                            }`}
                          >
                            {sec.visible ? 'VISIBLE' : 'HIDDEN'}
                          </span>
                        </div>
                        <p className="text-xs text-stone-400 mt-0.5">
                          Section Anchor: #{sec.id}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 sm:w-72">
                      <input
                        type="text"
                        defaultValue={sec.title || ''}
                        onBlur={(e) => updateSectionTitle(key, e.target.value)}
                        placeholder="Section Title..."
                        className="w-full bg-obsidian-950 border border-obsidian-800 focus:border-gold-500 rounded-xl px-3 py-2 text-xs text-stone-200 focus:outline-none"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: CHEF PROFILE & HERO */}
          {activeTab === 'profile' && (
            <div className="space-y-6 max-w-4xl mx-auto">
              <div className="bg-obsidian-900 p-6 rounded-2xl border border-obsidian-800">
                <h2 className="text-xl font-serif font-bold text-stone-100">
                  Chef Profile & Hero Information
                </h2>
                <p className="text-xs text-stone-400 mt-1">
                  Update your public name, tagline, background images (via URL or local device upload), and credentials.
                </p>
              </div>

              <form onSubmit={handleSaveProfile} className="glass-panel p-6 rounded-2xl border border-obsidian-800 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-stone-400 font-semibold mb-2">
                      Chef Full Name
                    </label>
                    <input
                      type="text"
                      value={profileForm.name}
                      onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                      className="w-full bg-obsidian-950 border border-obsidian-800 focus:border-gold-500 rounded-xl px-4 py-2.5 text-xs text-stone-200 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-stone-400 font-semibold mb-2">
                      Title & Position
                    </label>
                    <input
                      type="text"
                      value={profileForm.title}
                      onChange={(e) => setProfileForm({ ...profileForm, title: e.target.value })}
                      className="w-full bg-obsidian-950 border border-obsidian-800 focus:border-gold-500 rounded-xl px-4 py-2.5 text-xs text-stone-200 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-stone-400 font-semibold mb-2">
                      Michelin Stars Count
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="5"
                      value={profileForm.michelinStars}
                      onChange={(e) => setProfileForm({ ...profileForm, michelinStars: parseInt(e.target.value) || 0 })}
                      className="w-full bg-obsidian-950 border border-obsidian-800 focus:border-gold-500 rounded-xl px-4 py-2.5 text-xs text-stone-200 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-stone-400 font-semibold mb-2">
                      Years Experience
                    </label>
                    <input
                      type="number"
                      value={profileForm.yearsExperience}
                      onChange={(e) => setProfileForm({ ...profileForm, yearsExperience: parseInt(e.target.value) || 0 })}
                      className="w-full bg-obsidian-950 border border-obsidian-800 focus:border-gold-500 rounded-xl px-4 py-2.5 text-xs text-stone-200 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-stone-400 font-semibold mb-2">
                      Created Recipes Count
                    </label>
                    <input
                      type="number"
                      value={profileForm.signatureDishesCount}
                      onChange={(e) => setProfileForm({ ...profileForm, signatureDishesCount: parseInt(e.target.value) || 0 })}
                      className="w-full bg-obsidian-950 border border-obsidian-800 focus:border-gold-500 rounded-xl px-4 py-2.5 text-xs text-stone-200 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Hero Background Image Picker */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-stone-400 font-semibold mb-2">
                    Hero Background Image (Local File or Web URL)
                  </label>
                  <div className="flex flex-col sm:flex-row gap-3 items-stretch">
                    <label className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-obsidian-800 hover:bg-obsidian-700 text-gold-400 border border-gold-500/30 text-xs font-semibold cursor-pointer shrink-0">
                      <Upload className="w-4 h-4" />
                      <span>Upload From Local Computer</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleLocalFileUpload(e.target.files[0], (dataUrl) => setProfileForm({ ...profileForm, heroImage: dataUrl }))}
                      />
                    </label>
                    <input
                      type="text"
                      placeholder="Or paste image URL (https://...)"
                      value={profileForm.heroImage}
                      onChange={(e) => setProfileForm({ ...profileForm, heroImage: e.target.value })}
                      className="w-full bg-obsidian-950 border border-obsidian-800 focus:border-gold-500 rounded-xl px-4 py-2.5 text-xs text-stone-200 focus:outline-none"
                    />
                  </div>
                  {profileForm.heroImage && (
                    <div className="mt-2 relative h-28 rounded-xl overflow-hidden border border-obsidian-800">
                      <img src={profileForm.heroImage} alt="Hero preview" className="w-full h-full object-cover" />
                      <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded text-[10px] bg-obsidian-950/80 text-stone-300 font-medium">
                        Hero Preview
                      </span>
                    </div>
                  )}
                </div>

                {/* Chef Bio Portrait Image Picker */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-stone-400 font-semibold mb-2">
                    Chef Bio Portrait Image (Local File or Web URL)
                  </label>
                  <div className="flex flex-col sm:flex-row gap-3 items-stretch">
                    <label className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-obsidian-800 hover:bg-obsidian-700 text-gold-400 border border-gold-500/30 text-xs font-semibold cursor-pointer shrink-0">
                      <Upload className="w-4 h-4" />
                      <span>Upload From Local Computer</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleLocalFileUpload(e.target.files[0], (dataUrl) => setProfileForm({ ...profileForm, bioPortrait: dataUrl }))}
                      />
                    </label>
                    <input
                      type="text"
                      placeholder="Or paste image URL (https://...)"
                      value={profileForm.bioPortrait}
                      onChange={(e) => setProfileForm({ ...profileForm, bioPortrait: e.target.value })}
                      className="w-full bg-obsidian-950 border border-obsidian-800 focus:border-gold-500 rounded-xl px-4 py-2.5 text-xs text-stone-200 focus:outline-none"
                    />
                  </div>
                  {profileForm.bioPortrait && (
                    <div className="mt-2 relative h-28 w-28 rounded-xl overflow-hidden border border-obsidian-800">
                      <img src={profileForm.bioPortrait} alt="Portrait preview" className="w-full h-full object-cover" />
                      <span className="absolute bottom-1 left-1 px-1.5 py-0.5 rounded text-[9px] bg-obsidian-950/80 text-stone-300 font-medium">
                        Portrait
                      </span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-stone-400 font-semibold mb-2">
                    Hero Tagline
                  </label>
                  <input
                    type="text"
                    value={profileForm.tagline}
                    onChange={(e) => setProfileForm({ ...profileForm, tagline: e.target.value })}
                    className="w-full bg-obsidian-950 border border-obsidian-800 focus:border-gold-500 rounded-xl px-4 py-2.5 text-xs text-stone-200 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-stone-400 font-semibold mb-2">
                    Chef's Philosophy Quote
                  </label>
                  <textarea
                    rows={3}
                    value={profileForm.philosophy}
                    onChange={(e) => setProfileForm({ ...profileForm, philosophy: e.target.value })}
                    className="w-full bg-obsidian-950 border border-obsidian-800 focus:border-gold-500 rounded-xl p-4 text-xs text-stone-200 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gold-500 text-obsidian-950 font-bold uppercase tracking-wider text-xs hover:bg-gold-400 transition-all shadow-lg"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Profile Changes</span>
                </button>
              </form>
            </div>
          )}

          {/* TAB GALLERY MANAGER */}
          {activeTab === 'galleryManager' && (
            <div className="space-y-6 max-w-5xl mx-auto">
              <div className="flex flex-wrap items-center justify-between gap-4 bg-obsidian-900 p-6 rounded-2xl border border-obsidian-800">
                <div>
                  <h2 className="text-xl font-serif font-bold text-stone-100">
                    Atmosphere & Gallery Photos Manager
                  </h2>
                  <p className="text-xs text-stone-400 mt-1">
                    Upload new high-res food & atmosphere photos from your computer or web links.
                  </p>
                </div>
                <button
                  onClick={() => setGalleryModalOpen(true)}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gold-500 text-obsidian-950 font-bold uppercase tracking-wider text-xs hover:bg-gold-400 transition-all shadow-lg"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Gallery Photo</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {gallery.map((item) => (
                  <div key={item.id} className="glass-panel rounded-2xl overflow-hidden border border-obsidian-800 relative group">
                    <img src={item.image} alt={item.title} className="w-full h-48 object-cover" />
                    <div className="p-4 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-gold-400">{item.category}</span>
                        <h4 className="text-sm font-serif font-bold text-stone-100">{item.title}</h4>
                      </div>
                      <button
                        onClick={() => handleDeleteGalleryItem(item.id)}
                        className="p-2 rounded-lg bg-rose-950/60 text-rose-300 hover:bg-rose-900 border border-rose-800/40"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: BOOKINGS & INQUIRIES */}
          {activeTab === 'bookings' && (
            <div className="space-y-6 max-w-5xl mx-auto">
              <div className="bg-obsidian-900 p-6 rounded-2xl border border-obsidian-800">
                <h2 className="text-xl font-serif font-bold text-stone-100">
                  Private Dining & Event Reservations
                </h2>
                <p className="text-xs text-stone-400 mt-1">
                  Manage incoming client reservation requests and update booking status.
                </p>
              </div>

              <div className="space-y-4">
                {reservations.length > 0 ? (
                  reservations.map((res) => (
                    <div
                      key={res.id}
                      className="glass-panel p-6 rounded-2xl border border-obsidian-800 flex flex-col lg:flex-row lg:items-center justify-between gap-6"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <span className="font-serif font-bold text-stone-100 text-lg">
                            {res.name}
                          </span>
                          <span
                            className={`px-3 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                              res.status === 'Confirmed'
                                ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                                : res.status === 'Completed'
                                ? 'bg-blue-950 text-blue-400 border border-blue-800'
                                : 'bg-amber-950 text-amber-400 border border-amber-800'
                            }`}
                          >
                            {res.status}
                          </span>
                        </div>

                        <div className="flex flex-wrap gap-4 text-xs text-stone-400">
                          <span>📧 {res.email}</span>
                          <span>📞 {res.phone}</span>
                          <span>📅 Preferred Date: <strong className="text-stone-200">{res.date}</strong></span>
                          <span>👥 Guests: <strong className="text-stone-200">{res.guests}</strong></span>
                          <span>🍽️ Type: <strong className="text-stone-200">{res.eventType}</strong></span>
                        </div>

                        {res.specialRequests && (
                          <p className="text-xs italic text-stone-300 bg-obsidian-950 p-3 rounded-xl border border-obsidian-800">
                            Note: "{res.specialRequests}"
                          </p>
                        )}
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => updateReservationStatus(res.id, 'Confirmed')}
                          className="px-3 py-1.5 rounded-lg bg-emerald-950 hover:bg-emerald-900 text-emerald-300 text-xs font-semibold border border-emerald-800"
                        >
                          Confirm
                        </button>
                        <button
                          onClick={() => updateReservationStatus(res.id, 'Completed')}
                          className="px-3 py-1.5 rounded-lg bg-blue-950 hover:bg-blue-900 text-blue-300 text-xs font-semibold border border-blue-800"
                        >
                          Complete
                        </button>
                        <button
                          onClick={() => deleteReservation(res.id)}
                          className="p-2 rounded-lg bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 text-xs border border-rose-800/40"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="glass-panel p-12 text-center rounded-2xl border border-obsidian-800">
                    <p className="text-xs text-stone-400">No active reservation inquiries.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 5: SYSTEM SETTINGS & RESET */}
          {activeTab === 'settings' && (
            <div className="space-y-6 max-w-3xl mx-auto">
              <div className="bg-obsidian-900 p-6 rounded-2xl border border-obsidian-800">
                <h2 className="text-xl font-serif font-bold text-stone-100">
                  Data Reset & System Controls
                </h2>
                <p className="text-xs text-stone-400 mt-1">
                  Restore original demo dataset or manage local storage state.
                </p>
              </div>

              <div className="glass-panel p-6 rounded-2xl border border-obsidian-800 space-y-4">
                <h3 className="text-base font-serif font-bold text-stone-200">
                  Reset Dataset to Initial Defaults
                </h3>
                <p className="text-xs text-stone-400 leading-relaxed">
                  This will clear all changes saved in your browser's LocalStorage and restore the original 3-Star Michelin dishes, sample reviews, and initial settings.
                </p>
                <button
                  onClick={resetData}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-rose-900/80 hover:bg-rose-800 text-stone-100 font-bold uppercase tracking-wider text-xs border border-rose-700 transition-all shadow-lg"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Reset All Data to Defaults</span>
                </button>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* DISH ADD/EDIT MODAL OVERLAY WITH LOCAL FILE UPLOAD */}
      {dishModalOpen && (
        <div className="fixed inset-0 z-50 bg-obsidian-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-2xl bg-obsidian-900 border border-gold-500/30 rounded-3xl p-6 sm:p-8 overflow-y-auto max-h-[90vh] shadow-2xl">
            <button
              onClick={() => setDishModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-stone-400 hover:text-gold-400"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-2xl font-serif font-bold text-stone-100 mb-6">
              {editingDish ? 'Edit Dish' : 'Add New Signature Dish'}
            </h3>

            <form onSubmit={handleSaveDish} className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-stone-400 font-semibold mb-1">
                  Dish Name *
                </label>
                <input
                  type="text"
                  required
                  value={dishFormData.name}
                  onChange={(e) => setDishFormData({ ...dishFormData, name: e.target.value })}
                  className="w-full bg-obsidian-950 border border-obsidian-800 focus:border-gold-500 rounded-xl px-4 py-2.5 text-xs text-stone-200 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-stone-400 font-semibold mb-1">
                    Category *
                  </label>
                  <select
                    value={dishFormData.category}
                    onChange={(e) => setDishFormData({ ...dishFormData, category: e.target.value })}
                    className="w-full bg-obsidian-950 border border-obsidian-800 focus:border-gold-500 rounded-xl px-4 py-2.5 text-xs text-stone-200 focus:outline-none"
                  >
                    <option value="Appetizers">Appetizers</option>
                    <option value="Main Course">Main Course</option>
                    <option value="Fine Desserts">Fine Desserts</option>
                    <option value="Signature Pairings">Signature Pairings</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-stone-400 font-semibold mb-1">
                    Price Tag *
                  </label>
                  <input
                    type="text"
                    required
                    value={dishFormData.price}
                    onChange={(e) => setDishFormData({ ...dishFormData, price: e.target.value })}
                    className="w-full bg-obsidian-950 border border-obsidian-800 focus:border-gold-500 rounded-xl px-4 py-2.5 text-xs text-stone-200 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-stone-400 font-semibold mb-1">
                    Badge / Tag
                  </label>
                  <input
                    type="text"
                    value={dishFormData.badge}
                    onChange={(e) => setDishFormData({ ...dishFormData, badge: e.target.value })}
                    className="w-full bg-obsidian-950 border border-obsidian-800 focus:border-gold-500 rounded-xl px-4 py-2.5 text-xs text-stone-200 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-stone-400 font-semibold mb-1">
                    Prep Time
                  </label>
                  <input
                    type="text"
                    value={dishFormData.prepTime}
                    onChange={(e) => setDishFormData({ ...dishFormData, prepTime: e.target.value })}
                    className="w-full bg-obsidian-950 border border-obsidian-800 focus:border-gold-500 rounded-xl px-4 py-2.5 text-xs text-stone-200 focus:outline-none"
                  />
                </div>
              </div>

              {/* Dish Image File / URL Input */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-stone-400 font-semibold mb-1">
                  Dish Image (Upload Local File or Web URL) *
                </label>
                <div className="flex flex-col sm:flex-row gap-3 items-stretch">
                  <label className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-obsidian-800 hover:bg-obsidian-700 text-gold-400 border border-gold-500/30 text-xs font-semibold cursor-pointer shrink-0">
                    <Upload className="w-4 h-4" />
                    <span>Upload Local File</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleLocalFileUpload(e.target.files[0], (dataUrl) => setDishFormData({ ...dishFormData, image: dataUrl }))}
                    />
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Or paste web image URL (https://...)"
                    value={dishFormData.image}
                    onChange={(e) => setDishFormData({ ...dishFormData, image: e.target.value })}
                    className="w-full bg-obsidian-950 border border-obsidian-800 focus:border-gold-500 rounded-xl px-4 py-2.5 text-xs text-stone-200 focus:outline-none"
                  />
                </div>

                {/* Preview Thumbnail */}
                {dishFormData.image && (
                  <div className="mt-3 relative h-36 rounded-xl overflow-hidden border border-obsidian-800">
                    <img src={dishFormData.image} alt="Preview" className="w-full h-full object-cover" />
                    <span className="absolute bottom-2 left-2 px-2.5 py-1 rounded text-[10px] font-bold bg-obsidian-950/80 text-gold-400 border border-gold-500/30">
                      Live Image Preview
                    </span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-stone-400 font-semibold mb-1">
                  Short Description
                </label>
                <input
                  type="text"
                  value={dishFormData.shortDescription}
                  onChange={(e) => setDishFormData({ ...dishFormData, shortDescription: e.target.value })}
                  className="w-full bg-obsidian-950 border border-obsidian-800 focus:border-gold-500 rounded-xl px-4 py-2.5 text-xs text-stone-200 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-stone-400 font-semibold mb-1">
                  Full Description & Story
                </label>
                <textarea
                  rows={3}
                  value={dishFormData.fullDescription}
                  onChange={(e) => setDishFormData({ ...dishFormData, fullDescription: e.target.value })}
                  className="w-full bg-obsidian-950 border border-obsidian-800 focus:border-gold-500 rounded-xl p-3 text-xs text-stone-200 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-stone-400 font-semibold mb-1">
                  Ingredients (comma separated)
                </label>
                <input
                  type="text"
                  value={dishFormData.ingredients}
                  onChange={(e) => setDishFormData({ ...dishFormData, ingredients: e.target.value })}
                  className="w-full bg-obsidian-950 border border-obsidian-800 focus:border-gold-500 rounded-xl px-4 py-2.5 text-xs text-stone-200 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-stone-400 font-semibold mb-1">
                  Wine Pairing Suggestion
                </label>
                <input
                  type="text"
                  value={dishFormData.pairing}
                  onChange={(e) => setDishFormData({ ...dishFormData, pairing: e.target.value })}
                  className="w-full bg-obsidian-950 border border-obsidian-800 focus:border-gold-500 rounded-xl px-4 py-2.5 text-xs text-stone-200 focus:outline-none"
                />
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setDishModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-obsidian-800 text-stone-300 text-xs font-semibold uppercase"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gold-500 text-obsidian-950 text-xs font-bold uppercase tracking-wider shadow-lg"
                >
                  Save Dish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* GALLERY ADD MODAL OVERLAY WITH LOCAL FILE UPLOAD */}
      {galleryModalOpen && (
        <div className="fixed inset-0 z-50 bg-obsidian-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-lg bg-obsidian-900 border border-gold-500/30 rounded-3xl p-6 sm:p-8 overflow-y-auto shadow-2xl">
            <button
              onClick={() => setGalleryModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-stone-400 hover:text-gold-400"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-serif font-bold text-stone-100 mb-6">
              Add New Gallery Photo
            </h3>

            <form onSubmit={handleAddGalleryItem} className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-stone-400 font-semibold mb-1">
                  Photo Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Title of photo..."
                  value={newGalleryItem.title}
                  onChange={(e) => setNewGalleryItem({ ...newGalleryItem, title: e.target.value })}
                  className="w-full bg-obsidian-950 border border-obsidian-800 focus:border-gold-500 rounded-xl px-4 py-2.5 text-xs text-stone-200 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-stone-400 font-semibold mb-1">
                  Category *
                </label>
                <select
                  value={newGalleryItem.category}
                  onChange={(e) => setNewGalleryItem({ ...newGalleryItem, category: e.target.value })}
                  className="w-full bg-obsidian-950 border border-obsidian-800 focus:border-gold-500 rounded-xl px-4 py-2.5 text-xs text-stone-200 focus:outline-none"
                >
                  <option value="Plated Art">Plated Art</option>
                  <option value="Atmosphere">Atmosphere</option>
                  <option value="Kitchen Action">Kitchen Action</option>
                </select>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-stone-400 font-semibold mb-1">
                  Image File (Local Upload or Web URL) *
                </label>
                <div className="flex flex-col sm:flex-row gap-3 items-stretch">
                  <label className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-obsidian-800 hover:bg-obsidian-700 text-gold-400 border border-gold-500/30 text-xs font-semibold cursor-pointer shrink-0">
                    <Upload className="w-4 h-4" />
                    <span>Upload Local File</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleLocalFileUpload(e.target.files[0], (dataUrl) => setNewGalleryItem({ ...newGalleryItem, image: dataUrl }))}
                    />
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Or paste web image URL..."
                    value={newGalleryItem.image}
                    onChange={(e) => setNewGalleryItem({ ...newGalleryItem, image: e.target.value })}
                    className="w-full bg-obsidian-950 border border-obsidian-800 focus:border-gold-500 rounded-xl px-4 py-2.5 text-xs text-stone-200 focus:outline-none"
                  />
                </div>

                {newGalleryItem.image && (
                  <div className="mt-3 relative h-36 rounded-xl overflow-hidden border border-obsidian-800">
                    <img src={newGalleryItem.image} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setGalleryModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-obsidian-800 text-stone-300 text-xs font-semibold uppercase"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gold-500 text-obsidian-950 text-xs font-bold uppercase tracking-wider shadow-lg"
                >
                  Add Photo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
