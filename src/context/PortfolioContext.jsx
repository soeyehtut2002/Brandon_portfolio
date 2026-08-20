import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  initialChefProfile,
  initialSections,
  initialDishes,
  initialExperience,
  initialGallery,
  initialReviews,
  initialReservations
} from '../data/initialData';

const PortfolioContext = createContext();

export const PortfolioProvider = ({ children }) => {
  // Primary States
  const [chefProfile, setChefProfile] = useState(() => {
    const saved = localStorage.getItem('chef_portfolio_profile');
    return saved ? JSON.parse(saved) : initialChefProfile;
  });

  const [sections, setSections] = useState(() => {
    const saved = localStorage.getItem('chef_portfolio_sections');
    return saved ? JSON.parse(saved) : initialSections;
  });

  const [dishes, setDishes] = useState(() => {
    const saved = localStorage.getItem('chef_portfolio_dishes');
    return saved ? JSON.parse(saved) : initialDishes;
  });

  const [experience, setExperience] = useState(() => {
    const saved = localStorage.getItem('chef_portfolio_experience');
    return saved ? JSON.parse(saved) : initialExperience;
  });

  const [gallery, setGallery] = useState(() => {
    const saved = localStorage.getItem('chef_portfolio_gallery');
    return saved ? JSON.parse(saved) : initialGallery;
  });

  const [reviews, setReviews] = useState(() => {
    const saved = localStorage.getItem('chef_portfolio_reviews');
    return saved ? JSON.parse(saved) : initialReviews;
  });

  const [reservations, setReservations] = useState(() => {
    const saved = localStorage.getItem('chef_portfolio_reservations');
    return saved ? JSON.parse(saved) : initialReservations;
  });

  // UI Modal & Toast States
  const [selectedDishModal, setSelectedDishModal] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  // Dark Mode
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('chef_portfolio_darkmode');
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    localStorage.setItem('chef_portfolio_darkmode', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(prev => !prev);

  // Fetch initial data from backend API (Neon DB) on mount
  useEffect(() => {
    fetch('/api/data')
      .then(res => {
        if (!res.ok) throw new Error('API offline');
        return res.json();
      })
      .then(data => {
        if (data.profile) setChefProfile(data.profile);
        if (data.sections) setSections(data.sections);
        if (data.dishes) setDishes(data.dishes);
        if (data.experience) setExperience(data.experience);
        if (data.gallery) setGallery(data.gallery);
        if (data.reviews) setReviews(data.reviews);
        if (data.reservations) setReservations(data.reservations);
      })
      .catch(() => {
        // Fallback to local storage (offline/dev mode)
      });
  }, []);

  // Sync to localStorage as local backup
  useEffect(() => { localStorage.setItem('chef_portfolio_profile', JSON.stringify(chefProfile)); }, [chefProfile]);
  useEffect(() => { localStorage.setItem('chef_portfolio_sections', JSON.stringify(sections)); }, [sections]);
  useEffect(() => { localStorage.setItem('chef_portfolio_dishes', JSON.stringify(dishes)); }, [dishes]);
  useEffect(() => { localStorage.setItem('chef_portfolio_experience', JSON.stringify(experience)); }, [experience]);
  useEffect(() => { localStorage.setItem('chef_portfolio_gallery', JSON.stringify(gallery)); }, [gallery]);
  useEffect(() => { localStorage.setItem('chef_portfolio_reviews', JSON.stringify(reviews)); }, [reviews]);
  useEffect(() => { localStorage.setItem('chef_portfolio_reservations', JSON.stringify(reservations)); }, [reservations]);

  // Toast notification helper
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Section toggle & edit
  const toggleSectionVisibility = (sectionId) => {
    const nextSections = {
      ...sections,
      [sectionId]: { ...sections[sectionId], visible: !sections[sectionId].visible }
    };
    setSections(nextSections);
    fetch('/api/sections', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nextSections)
    }).catch(() => {});
    showToast(`Section visibility updated!`);
  };

  const updateSectionTitle = (sectionId, newTitle) => {
    const nextSections = {
      ...sections,
      [sectionId]: { ...sections[sectionId], title: newTitle }
    };
    setSections(nextSections);
    fetch('/api/sections', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nextSections)
    }).catch(() => {});
    showToast(`Section title updated!`);
  };

  // Dish CRUD
  const addDish = (newDish) => {
    const dishWithId = { ...newDish, id: `dish-${Date.now()}` };
    const nextDishes = [dishWithId, ...dishes];
    setDishes(nextDishes);
    fetch('/api/dishes', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nextDishes)
    }).catch(() => {});
    showToast(`Dish "${newDish.name}" added successfully!`);
  };

  const updateDish = (updatedDish) => {
    const nextDishes = dishes.map((d) => (d.id === updatedDish.id ? updatedDish : d));
    setDishes(nextDishes);
    fetch('/api/dishes', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nextDishes)
    }).catch(() => {});
    showToast(`Dish "${updatedDish.name}" updated!`);
  };

  const deleteDish = (dishId) => {
    const nextDishes = dishes.filter((d) => d.id !== dishId);
    setDishes(nextDishes);
    fetch('/api/dishes', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nextDishes)
    }).catch(() => {});
    showToast(`Dish deleted from menu.`);
  };

  // Profile update
  const updateProfile = (updatedProfile) => {
    setChefProfile(updatedProfile);
    fetch('/api/profile', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedProfile)
    }).catch(() => {});
    showToast(`Chef Profile updated!`);
  };

  // Experience set & update
  const updateExperience = (nextExp) => {
    setExperience(nextExp);
    fetch('/api/experience', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nextExp)
    }).catch(() => {});
  };

  // Gallery set & update
  const updateGallery = (nextGal) => {
    setGallery(nextGal);
    fetch('/api/gallery', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nextGal)
    }).catch(() => {});
  };

  // Reviews set & update
  const updateReviews = (nextRev) => {
    setReviews(nextRev);
    fetch('/api/reviews', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nextRev)
    }).catch(() => {});
  };

  // Reservations CRUD
  const addReservation = (booking) => {
    const newBooking = {
      ...booking,
      id: `res-${Date.now()}`,
      status: 'Pending',
      createdAt: new Date().toISOString().split('T')[0]
    };
    const nextRes = [newBooking, ...reservations];
    setReservations(nextRes);
    fetch('/api/reservations', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nextRes)
    }).catch(() => {});
    showToast(`Reservation request submitted! We will contact you soon.`);
  };

  const updateReservationStatus = (id, newStatus) => {
    const nextRes = reservations.map((r) => (r.id === id ? { ...r, status: newStatus } : r));
    setReservations(nextRes);
    fetch('/api/reservations', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nextRes)
    }).catch(() => {});
    showToast(`Reservation status updated to ${newStatus}`);
  };

  const deleteReservation = (id) => {
    const nextRes = reservations.filter((r) => r.id !== id);
    setReservations(nextRes);
    fetch('/api/reservations', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nextRes)
    }).catch(() => {});
    showToast(`Reservation removed.`);
  };

  // Reset Data
  const resetData = () => {
    localStorage.clear();
    setChefProfile(initialChefProfile);
    setSections(initialSections);
    setDishes(initialDishes);
    setExperience(initialExperience);
    setGallery(initialGallery);
    setReviews(initialReviews);
    setReservations(initialReservations);

    fetch('/api/reset', { method: 'POST' })
      .then(res => res.json())
      .then(resData => {
        if (resData.data) {
          setChefProfile(resData.data.profile);
          setSections(resData.data.sections);
          setDishes(resData.data.dishes);
          setExperience(resData.data.experience);
          setGallery(resData.data.gallery);
          setReviews(resData.data.reviews);
          setReservations(resData.data.reservations);
        }
      })
      .catch(() => {});

    showToast(`All data reset to initial master dataset!`);
  };

  return (
    <PortfolioContext.Provider
      value={{
        chefProfile,
        updateProfile,
        sections,
        toggleSectionVisibility,
        updateSectionTitle,
        dishes,
        addDish,
        updateDish,
        deleteDish,
        experience,
        setExperience: updateExperience,
        gallery,
        setGallery: updateGallery,
        reviews,
        setReviews: updateReviews,
        reservations,
        addReservation,
        updateReservationStatus,
        deleteReservation,
        selectedDishModal,
        setSelectedDishModal,
        toastMessage,
        showToast,
        resetData,
        darkMode,
        toggleDarkMode
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
