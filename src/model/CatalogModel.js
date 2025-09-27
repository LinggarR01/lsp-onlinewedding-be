const connection = require('../config/dbConnection');

const Catalog = {
  getAll: (callback) => {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM catalogue';

      console.log('Executing SQL:', sql); // Debug SQL

      connection.query(sql, (err, results) => {
        if (err) {
          console.error('SQL Error:', err);
          if (callback) callback(err, null);
          reject(err);
          return;
        }

        console.log('Query results:', results); // Debug results
        if (callback) callback(null, results);
        resolve(results);
      });
    });
  },

  getById: (id, callback) => {
    const sql = 'SELECT * FROM catalogue WHERE id_catalogue = ?';
    connection.query(sql, [id], (err, results) => {
      if (err) return callback(err, null);
      return callback(null, results[0]); // Return single object, bukan array
    });
  },

  create: (data, callback) => {
    const sql =
      'INSERT INTO catalogue (name, price, image, description) VALUES (?, ?, ?, ?)';
    const { name, price, image, description } = data;

    connection.query(sql, [name, price, image, description], (err, results) => {
      if (err) {
        return callback(err, null);
      }

      return callback(null, results);
    });
  },
  update: (id, data, callback) => {
    const sql =
      'UPDATE catalogue SET name = ?, price = ?, image = ?, description = ? WHERE id_catalogue = ?';
    const { name, price, image, description } = data;

    connection.query(
      sql,
      [name, price, image, description, id],
      (err, results) => {
        if (err) {
          return callback(err, null);
        }

        return callback(null, results);
      }
    );
  },
  delete: (id, callback) => {
    const sql = 'DELETE FROM catalogue WHERE id_catalogue = ?';

    connection.query(sql, [id], (err, results) => {
      if (err) {
        return callback(err, null);
      }

      return callback(null, results);
    });
  },
};

module.exports = Catalog;
