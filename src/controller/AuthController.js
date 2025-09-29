const connection = require('../config/dbConnection');

const AuthController = {
  login: (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
      return res
        .status(400)
        .json({ success: false, error: 'Username and password required' });
    }

    const sql = 'SELECT * FROM users WHERE username = ?';
    connection.query(sql, [username], (err, results) => {
      if (err) {
        return res
          .status(500)
          .json({ success: false, error: 'Database error' });
      }

      if (results.length === 0 || results[0].password !== password) {
        return res
          .status(401)
          .json({ success: false, error: 'Invalid username or password' });
      }

      const user = results[0];
      // langsung kirim user tanpa session
      res.json({
        success: true,
        message: 'Login successful',
        user: { id: user.id, username: user.username, role: user.role },
      });
    });
  },

  logout: (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({
          success: false,
          error: 'Logout failed',
        });
      }

      res.json({
        success: true,
        message: 'Logout successful',
      });
    });
  },
};

module.exports = AuthController;
