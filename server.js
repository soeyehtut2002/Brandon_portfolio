import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pg from 'pg';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: '15mb' })); // Support base64 image uploads

/* ──────────────────────────────────────────────────────────
   Database Connection (Neon PostgreSQL)
   ────────────────────────────────────────────────────────── */
const { Pool } = pg;
const isProduction = process.env.NODE_ENV === 'production';

let pool = null;
if (process.env.DATABASE_URL) {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false } // Required for Neon Postgres connection
  });
  console.log('🔗 Connected to Neon Database pool');
} else {
  console.log('⚠️ DATABASE_URL not found. Running with in-memory JSON store.');
}

/* ──────────────────────────────────────────────────────────
   Initial Master Dataset (Fallback & DB Seeding)
   ────────────────────────────────────────────────────────── */
const defaultProfile = {
  name: "Brandon",
  title: "Culinary Graduate & Aspiring Chef",
  yearsExperience: 2,
  signatureDishesCount: 15,
  tagline: "Passionate culinary graduate eager to learn, innovate, and excel in professional kitchens.",
  subtitle: "Trained in classic French techniques, modern plating art, and fresh fusion flavors.",
  heroImage: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=1920&q=80",
  bioPortrait: "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=1000&q=80",
  philosophy: "Great cooking combines discipline, curiosity, and passion. As a junior chef, I focus on mastering core techniques and bringing fresh energy to every service.",
  socials: {
    instagram: "@brandon_culinary",
    twitter: "@brandon_chef",
    email: "brandon.chef@example.com",
    phone: "+1 (555) 234-5678",
    restaurant: "Culinary Arts Academy Alum"
  }
};

const defaultSections = {
  hero:       { id: "hero",       name: "Hero Banner",          visible: true,  title: "Welcome" },
  bio:        { id: "bio",        name: "About the Chef",       visible: true,  title: "About Me" },
  dishes:     { id: "dishes",     name: "Menu & Dishes",        visible: true,  title: "Our Menu" },
  experience: { id: "experience", name: "Awards & Experience",  visible: true,  title: "Awards" },
  gallery:    { id: "gallery",    name: "Photos",               visible: true,  title: "Photos" },
  reviews:    { id: "reviews",    name: "Reviews",              visible: true,  title: "Reviews" },
  contact:    { id: "contact",    name: "Book a Table",         visible: true,  title: "Book a Table" }
};

const defaultDishes = [
  {
    id: "dish-1",
    name: "A5 Wagyu Beef with Black Truffle Sauce",
    category: "Main Course",
    price: "$145",
    prepTime: "25 min",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=80",
    badge: "Chef's Best",
    shortDescription: "Top-grade Japanese Wagyu beef served with baby leeks, bone broth, and a rich black truffle sauce cooked for 48 hours.",
    fullDescription: "This is our most popular dish. The Wagyu beef is grilled over charcoal and served with slow-cooked baby leeks, crispy sunchoke chips, and a deep black truffle sauce.",
    dietary: ["Gluten-Free", "High Protein"],
    ingredients: ["A5 Wagyu Beef", "Black Truffle", "Bone Broth", "Baby Leeks", "Sunchoke", "Sea Salt"],
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
    badge: "Fresh Catch",
    shortDescription: "Wild Mediterranean sea bass with crispy skin, baby fennel, orange butter sauce, and a light saffron foam.",
    fullDescription: "Fresh wild sea bass cooked until skin is gold and crispy. Served with braised baby fennel, orange butter sauce, and light saffron foam.",
    dietary: ["Gluten-Free", "Pescatarian"],
    ingredients: ["Wild Sea Bass", "Spanish Saffron", "Baby Fennel", "Blood Orange", "Butter"],
    pairing: "2020 Meursault White Burgundy",
    chefNote: "The saffron foam brings out the light sweetness of the fresh sea bass.",
    flavorProfile: { umami: 75, richness: 80, acidity: 70, sweetness: 45, texture: 88 }
  }
];

const defaultExperience = [
  { id: "exp-1", year: "2023", role: "3rd Michelin Star Awarded", establishment: "L'Étoile D'Or, Paris", badge: "3 Stars", description: "Earned the top culinary award for our innovative menu combining French and Asian flavors." },
  { id: "exp-2", year: "2019", role: "Opened Tokyo Location", establishment: "L'Étoile D'Or, Ginza Tokyo", badge: "Global Expansion", description: "Brought our signature dining experience to Ginza, Tokyo." }
];

const defaultGallery = [
  { id: "gal-1", title: "A5 Wagyu Plating", category: "Plated Art", image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80" },
  { id: "gal-2", title: "Kitchen in Action", category: "Kitchen", image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=800&q=80" }
];

const defaultReviews = [
  { id: "rev-1", critic: "François Dupont", publication: "Senior Culinary Instructor", quote: "Chef Brandon creates dishes that stay in your memory long after the meal is over.", rating: 5, avatar: "https://i.pravatar.cc/150?img=11" }
];

const defaultReservations = [];

// In-Memory fallback store
let memoryStore = {
  profile: defaultProfile,
  sections: defaultSections,
  dishes: defaultDishes,
  experience: defaultExperience,
  gallery: defaultGallery,
  reviews: defaultReviews,
  reservations: defaultReservations
};

/* ──────────────────────────────────────────────────────────
   DB Schema Auto-Initialization for Neon Postgres
   ────────────────────────────────────────────────────────── */
async function initDb() {
  if (!pool) return;
  try {
    const client = await pool.connect();
    await client.query(`
      CREATE TABLE IF NOT EXISTS portfolio_store (
        key VARCHAR(50) PRIMARY KEY,
        data JSONB NOT NULL,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Check if empty, populate default data
    const res = await client.query('SELECT COUNT(*) FROM portfolio_store');
    if (parseInt(res.rows[0].count, 10) === 0) {
      console.log('🌱 Seeding default portfolio data into Neon DB...');
      await client.query('INSERT INTO portfolio_store (key, data) VALUES ($1, $2)', ['profile', JSON.stringify(defaultProfile)]);
      await client.query('INSERT INTO portfolio_store (key, data) VALUES ($1, $2)', ['sections', JSON.stringify(defaultSections)]);
      await client.query('INSERT INTO portfolio_store (key, data) VALUES ($1, $2)', ['dishes', JSON.stringify(defaultDishes)]);
      await client.query('INSERT INTO portfolio_store (key, data) VALUES ($1, $2)', ['experience', JSON.stringify(defaultExperience)]);
      await client.query('INSERT INTO portfolio_store (key, data) VALUES ($1, $2)', ['gallery', JSON.stringify(defaultGallery)]);
      await client.query('INSERT INTO portfolio_store (key, data) VALUES ($1, $2)', ['reviews', JSON.stringify(defaultReviews)]);
      await client.query('INSERT INTO portfolio_store (key, data) VALUES ($1, $2)', ['reservations', JSON.stringify(defaultReservations)]);
      console.log('✅ DB Seeding completed!');
    }
    client.release();
  } catch (err) {
    console.error('❌ DB Init Error:', err);
  }
}

initDb();

/* ──────────────────────────────────────────────────────────
   Helper Functions for DB / Memory Store
   ────────────────────────────────────────────────────────── */
async function getData(key) {
  if (pool) {
    try {
      const res = await pool.query('SELECT data FROM portfolio_store WHERE key = $1', [key]);
      if (res.rows.length > 0) return res.rows[0].data;
    } catch (err) {
      console.error(`DB Get Error [${key}]:`, err);
    }
  }
  return memoryStore[key];
}

async function setData(key, value) {
  memoryStore[key] = value;
  if (pool) {
    try {
      await pool.query(
        `INSERT INTO portfolio_store (key, data, updated_at)
         VALUES ($1, $2, NOW())
         ON CONFLICT (key) DO UPDATE SET data = $2, updated_at = NOW()`,
        [key, JSON.stringify(value)]
      );
    } catch (err) {
      console.error(`DB Set Error [${key}]:`, err);
    }
  }
}

/* ──────────────────────────────────────────────────────────
   REST API Endpoints
   ────────────────────────────────────────────────────────── */
// Get full portfolio data
app.get('/api/data', async (req, res) => {
  try {
    const profile = await getData('profile');
    const sections = await getData('sections');
    const dishes = await getData('dishes');
    const experience = await getData('experience');
    const gallery = await getData('gallery');
    const reviews = await getData('reviews');
    const reservations = await getData('reservations');

    res.json({
      profile,
      sections,
      dishes,
      experience,
      gallery,
      reviews,
      reservations
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

// Update Profile
app.put('/api/profile', async (req, res) => {
  await setData('profile', req.body);
  res.json({ success: true, profile: req.body });
});

// Update Sections
app.put('/api/sections', async (req, res) => {
  await setData('sections', req.body);
  res.json({ success: true, sections: req.body });
});

// Save Dishes
app.put('/api/dishes', async (req, res) => {
  await setData('dishes', req.body);
  res.json({ success: true, dishes: req.body });
});

// Save Experience
app.put('/api/experience', async (req, res) => {
  await setData('experience', req.body);
  res.json({ success: true, experience: req.body });
});

// Save Gallery
app.put('/api/gallery', async (req, res) => {
  await setData('gallery', req.body);
  res.json({ success: true, gallery: req.body });
});

// Save Reviews
app.put('/api/reviews', async (req, res) => {
  await setData('reviews', req.body);
  res.json({ success: true, reviews: req.body });
});

// Save Reservations
app.put('/api/reservations', async (req, res) => {
  await setData('reservations', req.body);
  res.json({ success: true, reservations: req.body });
});

// Reset Data to Defaults
app.post('/api/reset', async (req, res) => {
  await setData('profile', defaultProfile);
  await setData('sections', defaultSections);
  await setData('dishes', defaultDishes);
  await setData('experience', defaultExperience);
  await setData('gallery', defaultGallery);
  await setData('reviews', defaultReviews);
  await setData('reservations', defaultReservations);

  res.json({
    success: true,
    data: {
      profile: defaultProfile,
      sections: defaultSections,
      dishes: defaultDishes,
      experience: defaultExperience,
      gallery: defaultGallery,
      reviews: defaultReviews,
      reservations: defaultReservations
    }
  });
});

/* ──────────────────────────────────────────────────────────
   Serve Built React App in Production (Render Deployment)
   ────────────────────────────────────────────────────────── */
app.use(express.static(path.join(__dirname, 'dist')));

app.get('/{*splat}', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 Chef Portfolio Server running on port ${PORT}`);
});
