const Order = require('../model/OrderModel');

const OrderController = {
  getAll: (req, res) => {
    Order.getAll((err, results) => {
      if (err) {
        console.error('Database error:', err.message);
        return res.status(500).json({
          error: 'Database error',
          details: err.message,
        });
      }
      return res.status(200).json(results);
    });
  },

  getById: (req, res) => {
    Order.getById(req.params.id, (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (!results) {
        return res.status(404).json({ error: 'Order not found' });
      }
      return res.status(200).json(results);
    });
  },

  create: (req, res) => {
    try {
      console.log('Request Body:', req.body); // Debug log
      
      // Check if req.body exists
      if (!req.body) {
        return res.status(400).json({ error: 'Request body is required' });
      }
      const { id_catalogue, name, email, phone_number, wedding_date, STATUS } = req.body;


      // Validate required fields
      if (!id_catalogue || !name || !email || !phone_number || !wedding_date) {
        return res.status(400).json({
          error: 'All fields are required: id_catalogue, name, email, phone_number, wedding_date'
        });
      }

      const OrderData = {
        id_catalogue,
        name,
        email,
        phone_number,
        wedding_date,
        STATUS: STATUS || 'requested',
      };

      Order.create(OrderData, (err, results) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        return res.status(201).json({
          message: 'Order created successfully',
          id: results.insertId,
          data: OrderData,
        });
      });
    } catch (error) {
      console.error('Create error:', error);
      return res.status(500).json({ error: error.message });
    }
  },

  update: async (req, res) => {
    try {
      console.log('Update Request Body:', req.body); // Debug log
      
      if (!req.body) {
        return res.status(400).json({ error: 'Request body is required' });
      }

      const { id } = req.params;
      const { id_catalogue, name, email, phone_number, wedding_date, STATUS } = req.body;

      if (!id || isNaN(id)) {
        return res.status(400).json({ error: 'Invalid Order ID' });
      }

      const currentOrder = await new Promise((resolve, reject) => {
        Order.getById(id, (err, results) => {
          if (err) reject(err);
          else resolve(results);
        });
      });

      if (!currentOrder) {
        return res.status(404).json({ error: 'Order not found' });
      }

      const updateData = {
        id_catalogue: id_catalogue !== undefined ? id_catalogue : currentOrder.id_catalogue,
        name: name !== undefined ? name : currentOrder.name,
        email: email !== undefined ? email : currentOrder.email,
        phone_number: phone_number !== undefined ? phone_number : currentOrder.phone_number,
        wedding_date: wedding_date !== undefined ? wedding_date : currentOrder.wedding_date,
        STATUS: STATUS !== undefined ? STATUS : currentOrder.STATUS,
        updated_at: new Date(),
      };

      const results = await new Promise((resolve, reject) => {
        Order.update(id, updateData, (err, results) => {
          if (err) reject(err);
          else resolve(results);
        });
      });

      if (results.affectedRows === 0) {
        return res.status(404).json({ error: 'No changes made or Order not found' });
      }

      res.status(200).json({
        message: 'Order updated successfully',
        data: updateData,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  delete: (req, res) => {
    Order.delete(req.params.id, (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ error: 'Order not found' });
      }
      return res.status(200).json({ message: 'Order deleted successfully' });
    });
  },
};

module.exports = OrderController;