const express = require('express');
const path = require('path');
const app = express();
const catalogRoutes = require('./src/routes/CatalogRoutes');
const orderRoutes = require('./src/routes/OrderRoutes');
const port = 3000;
const cors = require('cors');
const multer = require('multer');

// Serve static files dari folder uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Middleware untuk parse JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use(cors({}));
app.use('/api', catalogRoutes); 
app.use('/api', orderRoutes); 


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
});

module.exports = app;