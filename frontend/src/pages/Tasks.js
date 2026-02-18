// João Victor de Jesus Augusto PD015
import React, { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

function Tasks() {
  // Estado para lista de tarefas
  const [tasks, setTasks] = useState([]);

  // Estados para nova tarefa
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();

  // Função para buscar tarefas do backend
  const loadTasks = async () => {
    try {
      const response = await api.get("/tasks");
      setTasks(response.data);
    } catch (err) {
      // Se der erro de autenticação, volta para login
      navigate("/");
    }
  };

  // Carrega tarefas quando a página abre
  useEffect(() => {
    loadTasks();
  }, []);

  // Criar nova tarefa
  const handleCreate = async (e) => {
    e.preventDefault();

    try {
      await api.post("/tasks", { title, description });
      setTitle("");
      setDescription("");
      loadTasks(); // Recarrega lista
    } catch (err) {
      alert("Erro ao criar tarefa");
    }
  };

  // Alternar status da tarefa (concluída / não concluída)
  const toggleTask = async (task) => {
    try {
      await api.put(`/tasks/${task.id}`, {
        title: task.title,
        description: task.description,
        status: !task.status,
      });
      loadTasks();
    } catch (err) {
      alert("Erro ao atualizar tarefa");
    }
  };

  // Deletar tarefa
  const deleteTask = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      loadTasks();
    } catch (err) {
      alert("Erro ao deletar tarefa");
    }
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="container">
      <h1>Minhas Tarefas</h1>

      <button onClick={logout} style={{ marginBottom: 10, background: "#ff4d4d" }}>
        Sair
      </button>

      {/* Formulário para criar tarefa */}
      <form onSubmit={handleCreate}>
        <input
          type="text"
          placeholder="Título da tarefa"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          placeholder="Descrição"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button type="submit">Adicionar Tarefa</button>
      </form>

      <hr style={{ margin: "20px 0" }} />

      {/* Lista de tarefas */}
      {tasks.map((task) => (
        <div key={task.id} className={`task ${task.status ? "done" : ""}`}>
          <strong>{task.title}</strong>
          <p>{task.description}</p>

          <button onClick={() => toggleTask(task)}>
            {task.status ? "Marcar como pendente" : "Concluir"}
          </button>

          <button
            onClick={() => deleteTask(task.id)}
            style={{ background: "#ff4d4d" }}
          >
            Excluir
          </button>
        </div>
      ))}
    </div>
  );
}

export default Tasks;
