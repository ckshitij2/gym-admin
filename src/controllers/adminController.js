// src/controllers/adminController.js

const bcrypt = require("bcryptjs");
const client = require("../db/db"); // PostgreSQL client

// Login validation
const loginAdmin = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Query to find admin by username
    const result = await client.query(
      "SELECT * FROM admin WHERE username = $1",
      [username]
    );

    if (result.rows.length > 0) {
      const admin = result.rows[0];

      // Compare password
      const isMatch = await bcrypt.compare(password, admin.password);

      if (isMatch) {
        // Send success response
        return res.json({ success: true });
      } else {
        // Invalid password
        return res.json({ success: false });
      }
    } else {
      // No admin found
      return res.json({ success: false });
    }
  } catch (err) {
    console.error("Error during login:", err);
    return res.json({ success: false });
  }
};

module.exports = {
  loginAdmin,
};
