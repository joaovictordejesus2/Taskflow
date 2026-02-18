// João Victor de Jesus Augusto PD015
const db = require("../config/db");

// Cria tarefa
async function createTask(title, description, userId) {
  const result = await db.query(
    "INSERT INTO tasks (title, description, user_id) VALUES ($1, $2, $3) RETURNING *",
    [title, description, userId]
  );
  return result.rows[0];
}

// Lista tarefas do usuário
async function getTasksByUser(userId) {
  const result = await db.query("SELECT * FROM tasks WHERE user_id = $1", [userId]);
  return result.rows;
}

// Atualiza tarefa
async function updateTask(id, title, description, status, userId) {
  const result = await db.query(
    "UPDATE tasks SET title=$1, description=$2, status=$3 WHERE id=$4 AND user_id=$5 RETURNING *",
    [title, description, status, id, userId]
  );
  return result.rows[0];
}

// Deleta tarefa
async function deleteTask(id, userId) {
  await db.query("DELETE FROM tasks WHERE id=$1 AND user_id=$2", [id, userId]);
}

module.exports = { createTask, getTasksByUser, updateTask, deleteTask };
