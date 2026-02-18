// João Victor de Jesus Augusto PD015
import pool from "../config/db.js";

// Cria tarefa
export const createTask = async (req, res) => {
  const { title, description } = req.body;
  const user_id = req.userId;

  try {
    const newTask = await pool.query(
      "INSERT INTO tasks (title, description, user_id) VALUES ($1,$2,$3) RETURNING *",
      [title, description, user_id]
    );
    res.status(201).json(newTask.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro ao criar tarefa" });
  }
};

// Lista tarefas do usuário
export const listTasks = async (req, res) => {
  const user_id = req.userId;

  try {
    const tasks = await pool.query("SELECT * FROM tasks WHERE user_id=$1", [user_id]);
    res.json(tasks.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro ao listar tarefas" });
  }
};

// Atualiza tarefa
export const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, status } = req.body;
  const user_id = req.userId;

  try {
    const updated = await pool.query(
      "UPDATE tasks SET title=$1, description=$2, status=$3 WHERE id=$4 AND user_id=$5 RETURNING *",
      [title, description, status, id, user_id]
    );
    if (updated.rows.length === 0)
      return res.status(404).json({ message: "Tarefa não encontrada" });

    res.json(updated.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro ao atualizar tarefa" });
  }
};

// Deleta tarefa
export const deleteTask = async (req, res) => {
  const { id } = req.params;
  const user_id = req.userId;

  try {
    const deleted = await pool.query("DELETE FROM tasks WHERE id=$1 AND user_id=$2 RETURNING *", [id, user_id]);
    if (deleted.rows.length === 0)
      return res.status(404).json({ message: "Tarefa não encontrada" });

    res.json({ message: "Tarefa deletada" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro ao deletar tarefa" });
  }
};
