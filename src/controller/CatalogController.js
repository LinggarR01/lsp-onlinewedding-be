const Catalog = require('../model/CatalogModel');
const path = require('path');

const CatalogController = {
  getAll: (req, res) => {
    console.log('Fetching all catalogs...'); // Debug log

    Catalog.getAll((err, results) => {
      console.log('Callback executed - Error:', err); // Debug error
      console.log('Callback executed - Results:', results); // Debug results

      if (err) {
        console.error('Database error:', err.message); // Detailed error log
        return res.status(500).json({
          error: 'Database error',
          details: err.message,
        });
      }

      return res.status(200).json(results);
    });
  },

  getById: (req, res) => {
    Catalog.getById(req.params.id, (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (!results || results.length === 0) {
        return res.status(404).json({ error: 'Catalog not found' });
      }
      return res.status(200).json(results[0]);
    });
  },

  create: (req, res) => {
    try {
      // Check if file was uploaded
      if (!req.file) {
        return res.status(400).json({ error: 'Image file is required' });
      }

      const { name, price, description } = req.body;

      // Validate required fields
      if (!name || !price || !description) {
        return res.status(400).json({
          error: 'All fields are required: name, price, description',
        });
      }

      // Get file yang diupload
      const image = req.file.filename;

      // Simpan data katalog
      const catalogData = {
        name,
        price: parseFloat(price),
        image,
        description,
      };

      // Simpan data katalog ke database
      Catalog.create(catalogData, (err, results) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        return res.status(201).json({
          message: 'Catalog created successfully',
          id: results.insertId,
          image: image, // Return image filename for reference
        });
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  update: (req, res) => {
    try {
      const { id } = req.params;
      const { name, price, description } = req.body;

      // First, get current catalog data to preserve existing image if no new file
      Catalog.getById(id, (err, currentCatalog) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }

        if (!currentCatalog || currentCatalog.length === 0) {
          return res.status(404).json({ error: 'Catalog not found' });
        }

        let image;
        if (req.file) {
          // Use new uploaded image
          image = req.file.filename;
        } else {
          // Keep existing image
          image = currentCatalog[0].image;
        }

        const catalogData = {
          name: name || currentCatalog[0].name,
          price: price ? parseFloat(price) : currentCatalog[0].price,
          image: image,
          description: description || currentCatalog[0].description,
        };

        Catalog.update(id, catalogData, (err, results) => {
          if (err) {
            return res.status(500).json({ error: err.message });
          }
          return res.status(200).json({
            message: 'Catalog updated successfully',
            image: image,
          });
        });
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  delete: (req, res) => {
    Catalog.delete(req.params.id, (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ error: 'Catalog not found' });
      }
      return res.status(200).json({ message: 'Catalog deleted successfully' });
    });
  },
};

module.exports = CatalogController;
