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

// endpoint para login
app.post('/login', async (req, res) => {
  const { user, pass } = req.body;
  
  try {
    const result = await pool.query('SELECT * FROM users WHERE username = $1 AND password = $2', [user, pass]);
    
    if (result.rows.length > 0) {
      res.json({ success: true, message: 'Login successful' });
    } else {
      res.status(401).json({ success: false, message: 'Credenciales inválidas' });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: 'Database error', error: err.message });
  }
});

// endpoint para registrar usuarios
app.post('/register', async (req, res) => {
  const { user, nombre , correo, pass } = req.body;

  try {
    // Verifica si el usuario ya existe
    const checkUser = await pool.query('SELECT * FROM users WHERE username = $1 OR email = $2', [user, correo]);

    if (checkUser.rows.length > 0) {
      res.status(409).json({ success: false, message: 'El nombre de usuario o correo ya está en uso' });
    } else {
      // si queremos  Hashear la contraseña antes de guardar
      //const hashedPassword = await bcrypt.hash(pass, 10);

      // Inserta el nuevo usuario
      await pool.query('INSERT INTO users (username, password, email, name) VALUES ($1, $2, $3, $4)', [user, pass, correo, nombre]);
      res.json({ success: true, message: 'Registro exitoso' });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: 'Database error', error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
'`¡0p'