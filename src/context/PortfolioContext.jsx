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
  // Load from localStorage or default
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

  // UI Modal States
  const [selectedDishModal, setSelectedDishModal] = useState(null);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
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

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('chef_portfolio_profile', JSON.stringify(chefProfile));
  }, [chefProfile]);

  useEffect(() => {
    localStorage.setItem('chef_portfolio_sections', JSON.stringify(sections));
  }, [sections]);

  useEffect(() => {
    localStorage.setItem('chef_portfolio_dishes', JSON.stringify(dishes));
  }, [dishes]);

  useEffect(() => {
    localStorage.setItem('chef_portfolio_experience', JSON.stringify(experience));
  }, [experience]);

  useEffect(() => {
    localStorage.setItem('chef_portfolio_gallery', JSON.stringify(gallery));
  }, [gallery]);

  useEffect(() => {
    localStorage.setItem('chef_portfolio_reviews', JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem('chef_portfolio_reservations', JSON.stringify(reservations));
  }, [reservations]);

  // Notification Toast Helper
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Section toggle & edit
  const toggleSectionVisibility = (sectionId) => {
    setSections((prev) => ({
      ...prev,
      [sectionId]: {
        ...prev[sectionId],
        visible: !prev[sectionId].visible
      }
    }));
    showToast(`Section visibility updated!`);
  };

  const updateSectionTitle = (sectionId, newTitle) => {
    setSections((prev) => ({
      ...prev,
      [sectionId]: {
        ...prev[sectionId],
        title: newTitle
      }
    }));
    showToast(`Section title updated!`);
  };

  // Dish CRUD
  const addDish = (newDish) => {
    const dishWithId = {
      ...newDish,
      id: `dish-${Date.now()}`
    };
    setDishes((prev) => [dishWithId, ...prev]);
    showToast(`Dish "${newDish.name}" added successfully!`);
  };

  const updateDish = (updatedDish) => {
    setDishes((prev) => prev.map((d) => (d.id === updatedDish.id ? updatedDish : d)));
    showToast(`Dish "${updatedDish.name}" updated!`);
  };

  const deleteDish = (dishId) => {
    setDishes((prev) => prev.filter((d) => d.id !== dishId));
    showToast(`Dish deleted from menu.`);
  };

  // Profile update
  const updateProfile = (updatedProfile) => {
    setChefProfile(updatedProfile);
    showToast(`Chef Profile updated!`);
  };

  // Reservations CRUD
  const addReservation = (booking) => {
    const newBooking = {
      ...booking,
      id: `res-${Date.now()}`,
      status: 'Pending',
      createdAt: new Date().toISOString().split('T')[0]
    };
    setReservations((prev) => [newBooking, ...prev]);
    showToast(`Reservation request submitted! We will contact you soon.`);
  };

  const updateReservationStatus = (id, newStatus) => {
    setReservations((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r))
    );
    showToast(`Reservation status updated to ${newStatus}`);
  };

  const deleteReservation = (id) => {
    setReservations((prev) => prev.filter((r) => r.id !== id));
    showToast(`Reservation removed.`);
  };

  // Reset Data to Defaults
  const resetData = () => {
    localStorage.clear();
    setChefProfile(initialChefProfile);
    setSections(initialSections);
    setDishes(initialDishes);
    setExperience(initialExperience);
    setGallery(initialGallery);
    setReviews(initialReviews);
    setReservations(initialReservations);
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
        setExperience,
        gallery,
        setGallery,
        reviews,
        setReviews,
        reservations,
        addReservation,
        updateReservationStatus,
        deleteReservation,
        selectedDishModal,
        setSelectedDishModal,
        isAdminOpen,
        setIsAdminOpen,
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
