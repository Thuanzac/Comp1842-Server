// Import & declare express framework
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Create new express instance (web server)
const app = express();
app.use(cors());  // Enable CORS for all routes

// MongoDB connection
const db = 'mongodb+srv://001343302:12072004@mycluster.zrjg6.mongodb.net/vocab-builder';
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.error('MongoDB connection error:', err));

// Middleware to parse requests
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Import router and attach it to the app
const router = require('./routes/vocabRoute');
router(app);

// Test server
app.get('/', (req, res) => {
    res.send("<h1>My backend server has started!</h1>");
});

// API Endpoint: Return JSON (Test)
app.get('/json', (req, res) => {
    const mobiles = [
        { "name": "iPhone 16", "brand": "Apple" },
        { "name": "Galaxy S25", "brand": "Samsung" }
    ];
    res.status(200).json(mobiles);
});

// Start server (by listening on port 3000)
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
