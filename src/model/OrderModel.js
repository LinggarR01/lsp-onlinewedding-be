const connection = require("../config/dbConnection");

const Order = {
  getAll: (callback) => {
    const sql = `
      SELECT o.*, c.name, c.price 
      FROM orders o 
      LEFT JOIN catalogue c ON o.id_catalogue = c.id_catalogue
    `;
    
    connection.query(sql, (err, results) => {
      if (err) return callback(err, null);
      return callback(null, results);
    });
  },

  getById: (id, callback) => {
    const sql = `
      SELECT o.*, c.name, c.price 
      FROM orders o 
      LEFT JOIN catalogue c ON o.id_catalogue = c.id_catalogue 
      WHERE o.id_order = ?
    `;
    
    connection.query(sql, [id], (err, results) => {
      if (err) return callback(err, null);
      return callback(null, results[0]);
    });
  },

  create: (data, callback) => {
    const sql = `
      INSERT INTO orders (id_catalogue, cust_name, email, phone_number, wedding_date, STATUS) 
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    
    const { id_catalogue, cust_name, email, phone_number, wedding_date, STATUS } = data;

    connection.query(sql, [id_catalogue, cust_name, email, phone_number, wedding_date, STATUS || 'pending'], (err, results) => {
      if (err) return callback(err, null);
      return callback(null, results);
    });
  },

  update: (id, data, callback) => {
    const sql = `
      UPDATE orders 
      SET id_catalogue = ?, cust_name = ?, email = ?, phone_number = ?, wedding_date = ?, STATUS = ? 
      WHERE id_order = ?
    `;
    
    const { id_catalogue, cust_name, email, phone_number, wedding_date, STATUS } = data;

    connection.query(sql, [id_catalogue, cust_name, email, phone_number, wedding_date, STATUS, id], (err, results) => {
      if (err) return callback(err, null);
      return callback(null, results);
    });
  },

  delete: (id, callback) => {
    const sql = 'DELETE FROM orders WHERE id_order = ?';
    connection.query(sql, [id], (err, results) => {
      if (err) return callback(err, null);
      return callback(null, results);
    });
  }
};

module.exports = Order;