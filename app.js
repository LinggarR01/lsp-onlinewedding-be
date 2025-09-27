const express = require('express');
const path = require('path');
const app = express();
const catalogRoutes = require('./src/routes/CatalogRoutes');
const port = 3000;
const cors = require('cors');

// Serve static files dari folder uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Middleware untuk parse JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use(cors({}));
app.use('/api', catalogRoutes); // Pastikan path sesuai


// Error handling untuk multer
app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: 'File terlalu besar. Maksimal 5MB.' });
    }
  }
  res.status(500).json({ error: error.message });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  // Display routes list
  console.log(`|----------------------------------------------|`);
  console.log(`|                 API Endpoints                |`);
  console.log(`|----------------------------------------------|`);
  console.log(`|                 Routes List:                 |`);
  console.log(`|GET    http://localhost:${port}/api/catalogs     |`);
  console.log(`|GET    http://localhost:${port}/api/catalogs/:id |`);
  console.log(`|POST   http://localhost:${port}/api/catalogs     |`);
  console.log(`|PUT    http://localhost:${port}/api/catalogs     |`);
});

module.exports = app;