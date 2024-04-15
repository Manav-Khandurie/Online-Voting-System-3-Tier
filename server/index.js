// server.js
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'your_mysql_username',
  password: 'your_mysql_password',
  database: 'your_database_name'
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Connected to MySQL database');
});

// User registration endpoint
app.post('/register', (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  // Hash the password
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      return res.status(500).json({ error: 'Internal server error' });
    }

    // Insert user into the database
    const user = { firstName, lastName, email, password: hashedPassword };
    db.query('INSERT INTO users SET ?', user, (err, result) => {
      if (err) {
        return res.status(400).json({ error: 'User registration failed' });
      }
      return res.status(201).json({ message: 'User registered successfully' });
    });
  });
});

// User login endpoint
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Retrieve user from the database
  db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Internal server error' });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: 'Email or password is incorrect' });
    }

    // Compare password
    const user = results[0];
    bcrypt.compare(password, user.password, (err, match) => {
      if (err) {
        return res.status(500).json({ error: 'Internal server error' });
      }
      if (!match) {
        return res.status(401).json({ error: 'Email or password is incorrect' });
      }

      // Generate JWT token
      const token = jwt.sign({ id: user.id, email: user.email }, 'your_secret_key', { expiresIn: '1h' });
      return res.status(200).json({ token });
    });
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
