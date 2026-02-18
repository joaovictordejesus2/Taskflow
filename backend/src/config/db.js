// João Victor de Jesus Augusto PD015
import pkg from "pg";
const { Pool } = pkg;
import dotenv from "dotenv";

dotenv.config();

// Conexão com PostgreSQL
const pool = new Pool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "sua_senha",
  database: process.env.DB_NAME || "taskflow",
  port: process.env.DB_PORT || 5432
});

export default pool;
