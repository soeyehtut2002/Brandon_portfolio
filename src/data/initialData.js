export const initialChefProfile = {
  name: "Brandon Lee",
  title: "Culinary Graduate & Aspiring Chef",
  yearsExperience: 2,
  signatureDishesCount: 15,
  tagline: "Passionate culinary graduate eager to learn, innovate, and excel in professional kitchens.",
  subtitle: "Trained in classic French techniques, modern plating art, and fresh fusion flavors.",
  heroImage: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=1920&q=80",
  bioPortrait: "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=1000&q=80",
  philosophy: "Great cooking combines discipline, curiosity, and passion. As a junior chef, I focus on mastering core techniques and bringing fresh energy to every service.",
  bioTagline: "Driven by curiosity, disciplined by technique, inspired by flavor.",
  bioDesc1: "Brandon is a recent culinary arts graduate who completed intensive training in classic kitchen techniques, knife skills, and modern gastronomy. He has gained hands-on experience through kitchen stagings and culinary workshops.",
  bioDesc2: "Currently seeking a culinary internship or entry-level commis chef position in an innovative, high-caliber kitchen team.",
  cookingStyle: "Modern & French Classic",
  socials: {
    instagram: "@brandon_culinary",
    twitter: "@brandon_chef",
    email: "brandon.chef@example.com",
    phone: "+1 (555) 234-5678",
    restaurant: "Culinary Arts Academy Alum"
  },
  cvUrl: ''
};

export const initialSections = {
  hero:       { id: "hero",       name: "Hero Banner",          visible: true,  title: "Welcome" },
  bio:        { id: "bio",        name: "About Me",             visible: true,  title: "About Me" },
  dishes:     { id: "dishes",     name: "Signature Creations",  visible: true,  title: "Signature Dishes" },
  experience: { id: "experience", name: "Education & Staging",   visible: true,  title: "Education & Experience" },
  gallery:    { id: "gallery",    name: "Portfolio Photos",     visible: true,  title: "Gallery" },
  reviews:    { id: "reviews",    name: "Recommendations",      visible: true,  title: "Endorsements" },
  contact:    { id: "contact",    name: "Get in Touch",         visible: true,  title: "Contact Me" }
};

export const initialDishes = [
  {
    id: "dish-1",
    name: "Pan-Seared Sea Bass with Saffron Emulsion",
    category: "Main Course",
    prepTime: "25 min",
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=1000&q=80",
    badge: "Student Project",
    shortDescription: "Crispy skin Mediterranean sea bass served over braised fennel with a light saffron emulsion and microgreens.",
    fullDescription: "Developed as a culinary academy capstone project. The fish skin is seared crisply over medium-high heat while keeping the flesh delicate. Served alongside slow-braised baby fennel, citrus butter sauce, and delicate saffron foam.",
    dietary: ["Gluten-Free", "Pescatarian"],
    ingredients: [
      "Wild Sea Bass",
      "Spanish Saffron",
      "Baby Fennel",
      "Blood Orange",
      "Butter & Microgreens"
    ],
    pairing: "2020 Sauvignon Blanc",
    chefNote: "Focused on achieving perfect crispy skin control and balancing delicate saffron aroma."
  },
  {
    id: "dish-2",
    name: "Sous-Vide Beef Tenderloin with Truffle Jus",
    category: "Main Course",
    prepTime: "30 min",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=80",
    badge: "Featured Creation",
    shortDescription: "Beef tenderloin cooked sous-vide at 54°C, finished with a quick pan sear and rich truffle veal jus.",
    fullDescription: "Demonstrating precision temperature control using sous-vide techniques. Served with caramelized shallot puree, roasted baby carrots, and a pan sauce reduction infused with black truffle.",
    dietary: ["Gluten-Free", "High Protein"],
    ingredients: [
      "Beef Tenderloin",
      "Black Truffle",
      "Veal Bone Stock",
      "Shallots",
      "Baby Carrots"
    ],
    pairing: "2018 Cabernet Sauvignon",
    chefNote: "Maintained exact internal temperature before flash searing for maximum tenderness."
  },
  {
    id: "dish-3",
    name: "Deconstructed Lemon Tart with Basil Oil",
    category: "Desserts",
    prepTime: "20 min",
    image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=1000&q=80",
    badge: "Pastry Creation",
    shortDescription: "Creamy lemon curd, sable crumble, torched Swiss meringue, and herb-infused basil oil drops.",
    fullDescription: "A modern dessert concept balancing intense citrus acidity with sweet meringue and savory basil oil notes. Plated with crisp sable biscuit crumbs.",
    dietary: ["Vegetarian"],
    ingredients: [
      "Fresh Lemons",
      "Swiss Meringue",
      "Sable Biscuit Crumble",
      "Sweet Basil Oil"
    ],
    chefNote: "Explored savory-sweet balance by combining fresh basil infusion with citrus curd."
  }
];

export const initialExperience = [
  {
    id: "exp-1",
    year: "2023 - 2024",
    role: "Diploma in Culinary Arts",
    establishment: "Global Culinary Academy",
    description: "Graduated with High Honors. Completed intensive practical coursework in French classical gastronomy, knife techniques, HACCP hygiene, and menu design.",
    badge: "Graduated with Honors"
  },
  {
    id: "exp-2",
    year: "2023 (6 Months)",
    role: "Kitchen Stagiaire / Intern",
    establishment: "L'Étoile Fine Dining",
    description: "Assisted commis chefs with mise en place, vegetable prep, sauce reductions, and station organization during high-volume dinner services.",
    badge: "Kitchen Internship"
  }
];

export const initialGallery = [
  { id: "gal-1", title: "Precision Plating Practice", category: "Plated Art", image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80" },
  { id: "gal-2", title: "Academy Kitchen Practice", category: "Kitchen", image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=800&q=80" }
];

export const initialReviews = [
  { id: "rev-1", critic: "Chef Instructor Jean Pierre", publication: "Global Culinary Academy", quote: "Brandon shows exceptional dedication, clean workstation habits, and strong passion for culinary craftsmanship.", rating: 5, avatar: "https://i.pravatar.cc/150?img=11" }
];

export const initialReservations = [];
