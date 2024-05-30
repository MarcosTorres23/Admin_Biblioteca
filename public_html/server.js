const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = 3000;

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'libreria',
  password: '1234',
  port: 5432,
});

app.use(bodyParser.json());
app.use(cors());

app.post('/login', async (req, res) => {
  const { user, pass } = req.body;
  
  try {
    debugger
    const result = await pool.query('SELECT * FROM users WHERE username = $1 AND password = $2', [user, pass]);
    
    if (result.rows.length > 0) {
      res.json({ success: true, message: 'Login successful' });
    } else {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: 'Database error', error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
'`¡0p'