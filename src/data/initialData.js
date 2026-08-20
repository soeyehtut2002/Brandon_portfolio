export const initialChefProfile = {
  name: "Antoine Laurent",
  title: "Head Chef & Restaurant Owner",
  michelinStars: 3,
  yearsExperience: 18,
  signatureDishesCount: 42,
  tagline: "Good food made with care, skill, and the best ingredients.",
  subtitle: "French cooking methods combined with Japanese and Nordic flavors.",
  heroImage: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=1920&q=80",
  bioPortrait: "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=1000&q=80",
  philosophy: "Every dish has a story. Cooking is not just about filling a plate — it is about creating a moment that people remember through taste, smell, and feeling.",
  bioTagline: "Good food is made with care, skill, and the best ingredients.",
  bioDesc1: "Chef Antoine trained in France and worked in top kitchens across Tokyo, Osaka, and Copenhagen. He brings a creative and modern style to every dish.",
  bioDesc2: "Every dish uses fresh, seasonal ingredients and is cooked with care and skill. The result is food that is beautiful to look at and wonderful to taste.",
  cookingStyle: "Modern Fine Dining",
  socials: {
    instagram: "@chef_antoine_laurent",
    twitter: "@chef_laurent",
    email: "hello@chefantoinelaurent.com",
    phone: "+33 1 42 68 55 00",
    restaurant: "L'Étoile D'Or, Paris & Tokyo"
  }
};

export const initialSections = {
  hero:       { id: "hero",       name: "Hero Banner",          visible: true,  title: "Welcome" },
  bio:        { id: "bio",        name: "About the Chef",       visible: true,  title: "About Me" },
  dishes:     { id: "dishes",     name: "Menu & Dishes",        visible: true,  title: "Our Menu" },
  experience: { id: "experience", name: "Awards & Experience",  visible: true,  title: "Awards" },
  gallery:    { id: "gallery",    name: "Photos",               visible: true,  title: "Photos" },
  reviews:    { id: "reviews",    name: "Reviews",              visible: true,  title: "Reviews" },
  contact:    { id: "contact",    name: "Book a Table",         visible: true,  title: "Book a Table" }
};

export const initialDishes = [
  {
    id: "dish-1",
    name: "A5 Wagyu Beef with Black Truffle Sauce",
    category: "Main Course",
    price: "$145",
    prepTime: "25 min",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=80",
    badge: "Chef's Best",
    shortDescription: "Top-grade Japanese Wagyu beef served with baby leeks, bone broth, and a rich black truffle sauce cooked for 48 hours.",
    fullDescription: "This is our most popular dish. The Wagyu beef is grilled over charcoal and served with slow-cooked baby leeks, crispy sunchoke chips, and a deep black truffle sauce. The beef is very tender and full of flavor.",
    dietary: ["Gluten-Free", "High Protein"],
    ingredients: [
      "A5 Wagyu Beef",
      "Black Truffle",
      "Bone Broth",
      "Baby Leeks",
      "Sunchoke",
      "Sea Salt"
    ],
    pairing: "2015 Château Margaux Red Wine",
    chefNote: "We cook the beef at very high heat for a short time to get a nice crust on the outside while keeping it soft inside.",
    flavorProfile: { umami: 98, richness: 95, acidity: 40, sweetness: 25, texture: 92 }
  },
  {
    id: "dish-2",
    name: "Crispy Sea Bass with Saffron Foam",
    category: "Main Course",
    price: "$110",
    prepTime: "20 min",
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=1000&q=80",
    badge: "Chef's Favorite",
    shortDescription: "Fresh sea bass with crispy skin, cooked fennel, sea herbs, and a light saffron foam.",
    fullDescription: "Fresh wild sea bass cooked skin-side down until the skin is perfectly crispy. Served with cooked sweet fennel, sea herbs, and a light golden saffron foam with a touch of lime.",
    dietary: ["Gluten-Free", "Pescatarian"],
    ingredients: [
      "Wild Sea Bass",
      "Saffron",
      "Fennel",
      "Sea Herbs",
      "White Wine Reduction",
      "Lime Zest"
    ],
    pairing: "2018 White Burgundy",
    chefNote: "Saffron needs to be cooked at the right temperature to release its full flavor and color without turning bitter.",
    flavorProfile: { umami: 75, richness: 65, acidity: 70, sweetness: 30, texture: 85 }
  },
  {
    id: "dish-3",
    name: "Smoked Burrata with Caviar",
    category: "Starters",
    price: "$78",
    prepTime: "15 min",
    image: "https://images.unsplash.com/photo-1592417817098-8f3d6928e1d2?auto=format&fit=crop&w=1000&q=80",
    badge: "Seasonal",
    shortDescription: "Fresh burrata cheese lightly smoked over wood, topped with caviar and fresh basil leaves.",
    fullDescription: "Soft, fresh burrata cheese gently cold-smoked over applewood. Served with aged balsamic, ripe tomatoes, and a generous serving of Osetra caviar on top.",
    dietary: ["Vegetarian Option", "Gluten-Free"],
    ingredients: [
      "Fresh Burrata",
      "Osetra Caviar",
      "Aged Balsamic",
      "Ripe Tomato",
      "Olive Oil",
      "Fresh Basil"
    ],
    pairing: "Champagne",
    chefNote: "The light smoke adds a warm, gentle flavor that works well with the rich, creamy burrata.",
    flavorProfile: { umami: 82, richness: 90, acidity: 65, sweetness: 45, texture: 88 }
  },
  {
    id: "dish-4",
    name: "Gold Chocolate Sphere with Raspberry Sauce",
    category: "Desserts",
    price: "$55",
    prepTime: "18 min",
    image: "https://images.unsplash.com/photo-1579372786545-d24232daf58c?auto=format&fit=crop&w=1000&q=80",
    badge: "Table Side Show",
    shortDescription: "Dark chocolate sphere covered in gold leaf, filled with hazelnut cream. Opened at your table with hot raspberry sauce.",
    fullDescription: "A fun and beautiful dessert. A dark chocolate ball covered in edible gold is brought to your table. Hot raspberry sauce is poured over it, melting the shell to reveal hazelnut cream and passion fruit inside.",
    dietary: ["Vegetarian"],
    ingredients: [
      "Dark Chocolate",
      "Edible Gold",
      "Hazelnut Cream",
      "Raspberry Sauce",
      "Passion Fruit",
      "Vanilla"
    ],
    pairing: "Sauternes Sweet Wine",
    chefNote: "The contrast between the warm chocolate outside and the cold passion fruit inside is what makes this dessert special.",
    flavorProfile: { umami: 20, richness: 88, acidity: 80, sweetness: 85, texture: 95 }
  },
  {
    id: "dish-5",
    name: "Raw Scallop with Yuzu Ice",
    category: "Starters",
    price: "$68",
    prepTime: "12 min",
    image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=1000&q=80",
    badge: "Raw Bar Special",
    shortDescription: "Fresh raw Hokkaido scallop slices with frozen yuzu and mint ice and small citrus pearls.",
    fullDescription: "Very fresh scallops from Hokkaido, Japan, sliced thin and dressed with shiso herb oil, sea salt, frozen yuzu-mint ice, and small citrus pearls that burst in your mouth.",
    dietary: ["Gluten-Free", "Raw", "Dairy-Free"],
    ingredients: [
      "Hokkaido Scallop",
      "Yuzu Juice",
      "Shiso Herb",
      "Finger Lime",
      "Sea Salt",
      "Edible Flowers"
    ],
    pairing: "Sancerre White Wine",
    chefNote: "The scallops must be very fresh. We shave the frozen yuzu ice right before serving so it stays cold on the plate.",
    flavorProfile: { umami: 65, richness: 35, acidity: 92, sweetness: 30, texture: 80 }
  },
  {
    id: "dish-6",
    name: "Hibiscus & Mezcal Smoked Drink",
    category: "Signature Drinks",
    price: "$42",
    prepTime: "10 min",
    image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=1000&q=80",
    badge: "House Special",
    shortDescription: "Hibiscus, mezcal, and elderflower drink served under a glass dome filled with rosemary smoke.",
    fullDescription: "A special cocktail made with hibiscus tea, mezcal, elderflower, and a touch of gold shimmer. It comes to your table under a glass dome filled with rosemary smoke, which is lifted just before you drink.",
    dietary: ["Vegan", "Gluten-Free"],
    ingredients: [
      "Hibiscus Tea",
      "Mezcal",
      "Elderflower Liqueur",
      "Fresh Rosemary Smoke",
      "Edible Gold",
      "Lime Juice"
    ],
    pairing: "Goes well with Smoked Burrata or Raw Scallop",
    chefNote: "Lifting the smoke dome at the table is part of the experience — the rosemary smell prepares your senses before the first sip.",
    flavorProfile: { umami: 30, richness: 40, acidity: 85, sweetness: 60, texture: 70 }
  }
];

export const initialExperience = [
  {
    id: "exp-1",
    year: "2021 - Present",
    role: "Head Chef & Owner",
    establishment: "L'Étoile D'Or — Paris",
    description: "Opened and runs his own restaurant in Paris. Recognized globally for his creative 12-course tasting menus.",
    badge: "Top Dining Award"
  },
  {
    id: "exp-2",
    year: "2016 - 2020",
    role: "Executive Head Chef",
    establishment: "Le Grand Restaurant — Tokyo",
    description: "Led the kitchen team and menu in Tokyo, combining French cooking with fresh Japanese ingredients.",
    badge: "World's 50 Best #8"
  },
  {
    id: "exp-3",
    year: "2011 - 2015",
    role: "Senior Chef",
    establishment: "Restaurant Guy Savoy — Paris",
    description: "Trained in classic French fine dining under one of the most respected chefs in the world.",
    badge: "Master Chef"
  }
];

export const initialGallery = [
  {
    id: "gal-1",
    title: "Table Presentation",
    category: "Plated Art",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: "gal-2",
    title: "Kitchen in Action",
    category: "Kitchen",
    image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: "gal-3",
    title: "Our Dining Room",
    category: "Restaurant",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: "gal-4",
    title: "Careful Plating",
    category: "Plated Art",
    image: "https://images.unsplash.com/photo-1578474846511-04ba529f0b88?auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: "gal-5",
    title: "Wine Collection",
    category: "Restaurant",
    image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: "gal-6",
    title: "Food Preparation",
    category: "Kitchen",
    image: "https://images.unsplash.com/photo-1507048331197-7d4ac70811cf?auto=format&fit=crop&w=1000&q=80"
  }
];

export const initialReviews = [
  {
    id: "rev-1",
    critic: "Michelin Guide Inspectors",
    publication: "Michelin Guide 2024",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    quote: "Chef Antoine Laurent is close to perfect. Every dish is balanced, creative, and beautifully made. One of the best dining experiences in Europe.",
    rating: 5
  },
  {
    id: "rev-2",
    critic: "Pete Wells",
    publication: "The New York Times",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    quote: "The Wagyu Beef with truffle sauce is simply the best dish I have eaten in ten years of writing about food. Rich, deep, and unforgettable.",
    rating: 5
  },
  {
    id: "rev-3",
    critic: "Gault & Millau",
    publication: "International Food Review",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
    quote: "Chef Laurent takes great ingredients and treats them with real care. The result is food that is both beautiful to look at and wonderful to eat.",
    rating: 5
  }
];

export const initialReservations = [
  {
    id: "res-101",
    name: "Jonathan Vance",
    email: "j.vance@luxuryholding.com",
    phone: "+44 20 7946 0912",
    date: "2026-09-15",
    guests: 6,
    eventType: "Private Dinner",
    specialRequests: "Red Burgundy wine only. Two guests cannot eat shellfish.",
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
    eventType: "Anniversary Dinner",
    specialRequests: "Would love a signed menu from Chef Antoine.",
    status: "Pending",
    createdAt: "2026-08-20"
  }
];
