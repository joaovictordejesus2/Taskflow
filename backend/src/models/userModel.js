// João Victor de Jesus Augusto PD015
const db = require("../config/db");

// Busca usuário por email
async function findByEmail(email) {
  const result = await db.query("SELECT * FROM users WHERE email = $1", [email]);
  return result.rows[0];
}

// Cria usuário
async function createUser(name, email, passwordHash) {
  const result = await db.query(
    "INSERT INTO users (name, email, password_hash) VALUES ($1, $2, $3) RETURNING id, name, email",
    [name, email, passwordHash]
  );
  return result.rows[0];
}

module.exports = { findByEmail, createUser };
