const Catalog = require('../model/CatalogModel');

const CatalogController = {
  getAll: (req, res) => {
    console.log('Fetching all catalogs...'); // Debug log

    Catalog.getAll((err, results) => {
      // console.log('Callback executed - Error:', err); // Debug error
      // console.log('Callback executed - Results:', results); // Debug results

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

  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, price, description } = req.body;

      // Validasi
      if (!id || isNaN(id)) {
        return res.status(400).json({ error: 'Invalid catalog ID' });
      }

      // Get current data dengan Promise
      const currentCatalog = await new Promise((resolve, reject) => {
        Catalog.getById(id, (err, results) => {
          if (err) reject(err);
          else resolve(results);
        });
      });

      if (!currentCatalog || currentCatalog.length === 0) {
        return res.status(404).json({ error: 'Catalog not found' });
      }

      const currentData = currentCatalog;

      // Prepare update data
      const updateData = {
        name: name !== undefined ? name : currentData.name,
        price: price !== undefined ? parseFloat(price) : currentData.price,
        image: req.file ? req.file.filename : currentData.image,
        description:
          description !== undefined ? description : currentData.description,
        updated_at: new Date(),
      };

      // Execute update dengan Promise
      const results = await new Promise((resolve, reject) => {
        Catalog.update(id, updateData, (err, results) => {
          if (err) reject(err);
          else resolve(results);
        });
      });

      if (results.affectedRows === 0) {
        return res
          .status(404)
          .json({ error: 'No changes made or catalog not found' });
      }

      res.status(200).json({
        message: 'Catalog updated successfully',
        data: updateData,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
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
