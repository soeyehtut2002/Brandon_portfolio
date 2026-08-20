export const initialChefProfile = {
  name: "Antoine Laurent",
  title: "Master Executive Chef & Gastronomy Innovator",
  michelinStars: 3,
  yearsExperience: 18,
  signatureDishesCount: 42,
  tagline: "Elevating Culinary Traditions into Modern Avant-Garde Masterpieces",
  subtitle: "Blending classic French techniques with Nordic seasonality and Asian precision.",
  heroImage: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=1920&q=80",
  bioPortrait: "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=1000&q=80",
  philosophy: "Every dish tells a story of terroir, heritage, and emotion. Cooking is not merely feeding the body; it is inspiring the soul through texture, aroma, and harmony.",
  socials: {
    instagram: "@chef_antoine_laurent",
    twitter: "@chef_laurent",
    email: "concierge@chefantoinelaurent.com",
    phone: "+33 1 42 68 55 00",
    restaurant: "L'Étoile D'Or, Paris & Tokyo"
  }
};

export const initialSections = {
  hero: { id: "hero", name: "Hero Banner", visible: true, title: "Welcome" },
  bio: { id: "bio", name: "Chef Story & Philosophy", visible: true, title: "The Mastermind" },
  dishes: { id: "dishes", name: "Signature Dishes & Menu", visible: true, title: "Culinary Gallery" },
  experience: { id: "experience", name: "Experience & Accolades", visible: true, title: "Recognitions" },
  gallery: { id: "gallery", name: "Atmosphere & Visuals", visible: true, title: "Visual Journey" },
  reviews: { id: "reviews", name: "Press & Critic Reviews", visible: true, title: "Critical Acclaim" },
  contact: { id: "contact", name: "Private Dining & Bookings", visible: true, title: "Private Dining" }
};

export const initialDishes = [
  {
    id: "dish-1",
    name: "A5 Wagyu Beef Tenderloin in Smoked Truffle Jus",
    category: "Main Course",
    price: "$145",
    prepTime: "25 min",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=80",
    badge: "3-Star Michelin Signature",
    shortDescription: "Miyazaki A5 Wagyu paired with charred baby leeks, bone marrow emulsion, and a 48-hour black truffle reduction.",
    fullDescription: "Seared over Japanese Binchotan charcoal, this signature creation features Miyazaki A5 Wagyu known for its immaculate marbling. Served alongside slow-braised baby leeks, crispy sunchoke chips, and drizzled with a velvety black truffle and bone marrow reduction perfected over 48 hours.",
    dietary: ["Gluten-Free", "High Protein"],
    ingredients: [
      "Miyazaki A5 Wagyu Tenderloin",
      "Perigord Black Truffle",
      "Bone Marrow Broth",
      "Organic Baby Leeks",
      "Sunchoke Purée",
      "Fleur de Sel de Guérande"
    ],
    pairing: "2015 Château Margaux, Premier Grand Cru Classé",
    chefNote: "We sear the wagyu at precisely 320°C for 45 seconds per side to caramelize the outer crust while keeping the interior silky and succulent.",
    flavorProfile: {
      umami: 98,
      richness: 95,
      acidity: 40,
      sweetness: 25,
      texture: 92
    }
  },
  {
    id: "dish-2",
    name: "Pan-Seared Brittany Sea Bass & Saffron Foam",
    category: "Main Course",
    price: "$110",
    prepTime: "20 min",
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=1000&q=80",
    badge: "Chef's Favorite",
    shortDescription: "Crispy skin sea bass resting on wild samphire, fennel confit, and golden Kashmiri saffron velvet foam.",
    fullDescription: "Wild-caught Brittany sea bass cooked skin-side down until shatteringly crisp. Accompanied by butter-poached sweet fennel, sea asparagus, and an airy saffron reduction infused with kaffir lime zest.",
    dietary: ["Gluten-Free", "Pescatarian"],
    ingredients: [
      "Wild Brittany Sea Bass",
      "Kashmiri Saffron Strand",
      "Fennel Bulb Confit",
      "Fresh Samphire",
      "White Port Reduction",
      "Kaffir Lime Zest"
    ],
    pairing: "2018 Meursault Premier Cru, Domaine Coche-Dury",
    chefNote: "Saffron requires extreme temperature care. We bloom the threads at 65°C to extract vibrant gold hues and deep earthy aromatics without bitterness.",
    flavorProfile: {
      umami: 75,
      richness: 65,
      acidity: 70,
      sweetness: 30,
      texture: 85
    }
  },
  {
    id: "dish-3",
    name: "Smoked Burrata with Heirloom Caviar Pearls",
    category: "Appetizers",
    price: "$78",
    prepTime: "15 min",
    image: "https://images.unsplash.com/photo-1592417817098-8f3d6928e1d2?auto=format&fit=crop&w=1000&q=80",
    badge: "Seasonal Starter",
    shortDescription: "Handcrafted Puglia burrata lightly cold-smoked over Applewood, topped with Osetra caviar and micro basil.",
    fullDescription: "Fresh artisanal cream-filled burrata, cold-smoked over sweet applewood chips. Served with aged balsamic reduction from Modena (25-year), compressed heirloom tomatoes, and topped generously with Royal Osetra Caviar.",
    dietary: ["Vegetarian Option", "Gluten-Free"],
    ingredients: [
      "Pugliese Cream Burrata",
      "Royal Osetra Caviar",
      "25-Year Modena Balsamic",
      "Compressed Heirloom Tomato",
      "Extra Virgin Olive Oil",
      "Micro Purple Basil"
    ],
    pairing: "Krug Grande Cuvée 170th Edition Champagne",
    chefNote: "The cold smoke adds a subtle hint of fireplace warmth that perfectly cuts through the rich cream of the burrata.",
    flavorProfile: {
      umami: 82,
      richness: 90,
      acidity: 65,
      sweetness: 45,
      texture: 88
    }
  },
  {
    id: "dish-4",
    name: "Golden Chocolate Sphere with Raspberry Coulis",
    category: "Fine Desserts",
    price: "$55",
    prepTime: "18 min",
    image: "https://images.unsplash.com/photo-1579372786545-d24232daf58c?auto=format&fit=crop&w=1000&q=80",
    badge: "Showstopper Dessert",
    shortDescription: "24K edible gold leaf dark Valrhona sphere melted open with hot wild raspberry coulis at tableside.",
    fullDescription: "An interactive dessert experience. A hand-blown 70% Valrhona dark chocolate shell dusted with 24-karat gold leaf, encapsulating hazelnut praline mousse and passionfruit gel. Melted live at your table with boiling wild raspberry and cardamom elixir.",
    dietary: ["Vegetarian"],
    ingredients: [
      "70% Valrhona Guanaja Chocolate",
      "24K Edible Gold Leaf",
      "Piedmont Hazelnut Praline",
      "Wild Raspberry Coulis",
      "Passionfruit Gel",
      "Tahitian Vanilla Bean"
    ],
    pairing: "2010 Chateau d'Yquem Sauternes",
    chefNote: "Balance is key in dessert. The intense dark chocolate and warm raspberry heat contrast magnificently with the frozen passionfruit center.",
    flavorProfile: {
      umami: 20,
      richness: 88,
      acidity: 80,
      sweetness: 85,
      texture: 95
    }
  },
  {
    id: "dish-5",
    name: "Hokkaido Scallop Crudo with Yuzu Granita",
    category: "Appetizers",
    price: "$68",
    prepTime: "12 min",
    image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=1000&q=80",
    badge: "Raw Bar Specialty",
    shortDescription: "Thinly sliced wild Hokkaido sea scallops with frozen yuzu mint granita and finger lime pearls.",
    fullDescription: "Sourced directly from cold Hokkaido waters, raw scallops are sliced paper-thin and dressed with Japanese shiso oil, pink sea salt flakes, flash-frozen yuzu mint granita, and burst-in-the-mouth finger lime pearls.",
    dietary: ["Gluten-Free", "Raw", "Dairy-Free"],
    ingredients: [
      "Hokkaido Sea Scallop",
      "Yuzu Juice",
      "Shiso Leaf Oil",
      "Australian Finger Lime",
      "Pink Himalayan Salt",
      "Micro Edible Flowers"
    ],
    pairing: "2021 Sancerre 'La Grande Côte', Pascal Cotat",
    chefNote: "Raw scallops demand absolute freshness. We shave the granita right before serving to create a temperature shock on the palate.",
    flavorProfile: {
      umami: 65,
      richness: 35,
      acidity: 92,
      sweetness: 30,
      texture: 80
    }
  },
  {
    id: "dish-6",
    name: "Smoked Hibiscus Botanical Elixir",
    category: "Signature Pairings",
    price: "$42",
    prepTime: "10 min",
    image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=1000&q=80",
    badge: "Avant-Garde Mixology",
    shortDescription: "Wild hibiscus, smoked mezcal, elderflower liqueur, and gold dust served under a rosemary smoke cloche.",
    fullDescription: "A sensory cocktail pairing crafted to accompany smoked seafood and savory starters. Features organic Mexican hibiscus infusion, artisanal reposado mezcal, St-Germain elderflower, and vaporized flamed rosemary smoke.",
    dietary: ["Vegan", "Gluten-Free"],
    ingredients: [
      "Wild Mexican Hibiscus",
      "Artisanal Reposado Mezcal",
      "St-Germain Elderflower Liqueur",
      "Fresh Rosemary Smoke",
      "Edible Gold Shimmer",
      "Clarified Lime"
    ],
    pairing: "Pairs with Smoked Burrata or Hokkaido Scallop",
    chefNote: "The cloche is lifted at your table to release aromatic rosemary notes into your immediate environment before your first sip.",
    flavorProfile: {
      umami: 30,
      richness: 40,
      acidity: 85,
      sweetness: 60,
      texture: 70
    }
  }
];

export const initialExperience = [
  {
    id: "exp-1",
    year: "2021 - Present",
    role: "Chef Patron & Owner",
    establishment: "L'Étoile D'Or — Paris",
    description: "Awarded 3 Michelin Stars within 3 years of opening. Renowned for innovative 12-course tasting journeys.",
    badge: "3 Michelin Stars"
  },
  {
    id: "exp-2",
    year: "2016 - 2020",
    role: "Executive Head Chef",
    establishment: "Le Grand Restaurant — Tokyo",
    description: "Helmed the culinary direction blending French classical sauces with rare Japanese seasonal fish.",
    badge: "World's 50 Best #8"
  },
  {
    id: "exp-3",
    year: "2011 - 2015",
    role: "Chef de Cuisine",
    establishment: "Restaurant Guy Savoy — Paris",
    description: "Mastered high-end French haute cuisine under legendary mentors.",
    badge: "Master Artisan"
  }
];

export const initialGallery = [
  {
    id: "gal-1",
    title: "Table Side Presentation",
    category: "Plated Art",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: "gal-2",
    title: "Main Kitchen Fire Station",
    category: "Kitchen Action",
    image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: "gal-3",
    title: "Intimate Dining Room",
    category: "Atmosphere",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: "gal-4",
    title: "Precision Plating",
    category: "Plated Art",
    image: "https://images.unsplash.com/photo-1578474846511-04ba529f0b88?auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: "gal-5",
    title: "Wine Cellar Reserve",
    category: "Atmosphere",
    image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: "gal-6",
    title: "Sous Vide Preparation",
    category: "Kitchen Action",
    image: "https://images.unsplash.com/photo-1507048331197-7d4ac70811cf?auto=format&fit=crop&w=1000&q=80"
  }
];

export const initialReviews = [
  {
    id: "rev-1",
    critic: "Michelin Guide Inspectors",
    publication: "Michelin Guide 2024",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    quote: "Chef Antoine Laurent achieves pure perfection. Every dish is a symphony where texture, temperature, and taste dance in total harmony.",
    rating: 5
  },
  {
    id: "rev-2",
    critic: "Pete Wells",
    publication: "The New York Times",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    quote: "The A5 Wagyu Tenderloin with 48-hour black truffle jus is quite simply the single greatest dish I have tasted in a decade of food reporting.",
    rating: 5
  },
  {
    id: "rev-3",
    critic: "Gault & Millau",
    publication: "International Gastronomy Review",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
    quote: "Avant-garde precision meets timeless emotion. Laurent's commitment to ingredient purity elevates dining into unforgettable living art.",
    rating: 5
  }
];

export const initialReservations = [
  {
    id: "res-101",
    name: "Lord Jonathan Vance",
    email: "j.vance@luxuryholding.com",
    phone: "+44 20 7946 0912",
    date: "2026-09-15",
    guests: 6,
    eventType: "Private VIP Tasting Dinner",
    specialRequests: "Pairings must include Burgundy Pinot Noir. No shellfish for 2 guests.",
    status: "Confirmed",
    createdAt: "2026-08-19"
  },
  {
    id: "res-102",
    name: "Sophia Chen",
    email: "sophia.chen@techalpha.io",
    phone: "+1 415 555 0199",
    date: "2026-09-22",
    guests: 2,
    eventType: "Anniversary Masterclass & Meal",
    specialRequests: "Would love a signed menu from Chef Antoine.",
    status: "Pending",
    createdAt: "2026-08-20"
  }
];
