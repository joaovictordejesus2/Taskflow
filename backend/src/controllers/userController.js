// João Victor de Jesus Augusto PD015
import pool from "../config/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

// Cadastro de usuário
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Verifica se já existe
    const userExists = await pool.query("SELECT * FROM users WHERE email=$1", [email]);
    if (userExists.rows.length > 0)
      return res.status(400).json({ message: "Usuário já existe" });

    // Senha
    const salt = bcrypt.genSaltSync(10);
    const password_hash = bcrypt.hashSync(password, salt);

    const newUser = await pool.query(
      "INSERT INTO users (name, email, password_hash) VALUES ($1, $2, $3) RETURNING *",
      [name, email, password_hash]
    );

    // Token 
    const token = jwt.sign({ id: newUser.rows[0].id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.status(201).json({ token, user: newUser.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro no servidor" });
  }
};

// Login
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await pool.query("SELECT * FROM users WHERE email=$1", [email]);
    if (user.rows.length === 0)
      return res.status(400).json({ message: "Usuário não encontrado" });

    const valid = bcrypt.compareSync(password, user.rows[0].password_hash);
    if (!valid) return res.status(400).json({ message: "Senha incorreta" });

    const token = jwt.sign({ id: user.rows[0].id }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.json({ token, user: user.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro no servidor" });
  }
};
