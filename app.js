const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
const cors = require('cors');
const multer = require('multer');
const session = require('express-session');
const listEndpoints = require('express-list-endpoints');

// Import routes - PASTIKAN PATH BENAR
const catalogRoutes = require('./src/routes/CatalogRoutes');
const orderRoutes = require('./src/routes/OrderRoutes');
const authRoutes = require('./src/routes/AuthRoutes');

app.use(
  cors({
    origin: 'http://localhost:5173', 
    credentials: true,
  })
);

// Session middleware
app.use(
  session({
    secret: 'wedding-secret-key', // Ganti dengan secret key yang kuat
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // Set true jika pakai HTTPS
      maxAge: 24 * 60 * 60 * 1000, // 24 jam
    },
  })
);

// Serve static files dari folder uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Auth routes
app.use('/api', authRoutes);

// Routes
app.use('/api', catalogRoutes);
app.use('/api', orderRoutes);

// Error handling untuk multer
app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res
        .status(400)
        .json({ error: 'File terlalu besar. Maksimal 5MB.' });
    }
  }
  res.status(500).json({ error: error.message });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

module.exports = app;
