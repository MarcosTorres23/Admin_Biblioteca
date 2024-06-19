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
// endpoint para registrar clientes
app.post('/registerCustomer', async (req, res) => {
  const { name, apel , mail, direc, cel } = req.body;

  try {
      // Inserta el nuevo cliente
      await pool.query('INSERT INTO cliente (nombre, apellido, documento, direccion, mail, celular, estado) VALUES ($1, $2, $3, $4, $5, $6, $7)', [name, apel, '111', direc, mail, cel, 'A']);
      res.json({ success: true, message: 'Registro exitoso' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Database error', error: err.message });
  }
});

// endpoint para registrar libros
app.post('/registerBook', async (req, res) => {
  const { tit, aut , gene, edit, desc } = req.body;

  try {
      // Inserta el nuevo libro
      await pool.query('INSERT INTO libros (titulo, autor, genero, editorial, descripcion) VALUES ($1, $2, $3, $4, $5)', [tit, aut, gene, edit, desc]);
      res.json({ success: true, message: 'Registro exitoso' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Database error', error: err.message });
  }
});
// endpoint para eliminar libros
app.post('/deleteBook', async (req, res) => {
  const { tit, id } = req.body;

  try {
      await pool.query('DELETE FROM libros WHERE titulo = $1 and  id = $2', [tit, id]);
      res.json({ success: true, message: 'Registro eliminado' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Database error', error: err.message });
  }
});

// endpoint para eliminar clientes
app.post('/deleteCustomer', async (req, res) => {
  const { nam, id } = req.body;

  try {
      await pool.query('DELETE FROM cliente WHERE nombre = $1 and  id = $2', [nam, id]);
      res.json({ success: true, message: 'Registro eliminado' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Database error', error: err.message });
  }
});

app.get('/getBooks', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM libros');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ success: false, message: 'Database error', error: err.message });
  }
});

app.get('/getCustomers', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM cliente');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ success: false, message: 'Database error', error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});