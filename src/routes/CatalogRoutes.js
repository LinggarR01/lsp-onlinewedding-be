const express = require('express');
const router = express.Router();
const CatalogController = require('../controller/CatalogController');
const upload = require('../middleware/upload'); // IMPORT UPLOAD MIDDLEWARE

router.get('/catalog', CatalogController.getAll);
router.get('/catalog/:id', CatalogController.getById);

// TAMBAHKAN upload.single('image') untuk POST
router.post('/catalog', upload.single('image'), CatalogController.create);

// TAMBAHKAN upload.single('image') untuk PUT
router.put('/catalog/:id', upload.single('image'), CatalogController.update);

router.delete('/catalog/:id', CatalogController.delete);

module.exports = router;