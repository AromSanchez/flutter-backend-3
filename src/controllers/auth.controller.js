const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario.model');

const SECRET = process.env.JWT_SECRET || 'secreto_super_seguro';

// REGISTER
const register = async (req, res) => {
  try {
    const { nombre, email, password } = req.body;

    const userExist = await Usuario.findOne({ where: { email } });
    if (userExist) {
      return res.status(400).json({ message: 'Usuario ya existe' });
    }

    const hash = await bcrypt.hash(password, 10);

    const user = await Usuario.create({
      nombre,
      email,
      password: hash
    });

    res.status(201).json(user);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// LOGIN
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Usuario.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: 'Usuario no encontrado' });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(400).json({ message: 'Password incorrecta' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      SECRET,
      { expiresIn: '1h' }
    );

    res.json({ token });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { register, login };