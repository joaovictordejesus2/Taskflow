// João Victor de Jesus Augusto PD015
import { useEffect, useState } from "react";
import api from "./api"; // Conexão com backend
import { useNavigate } from "react-router-dom";

function Dashboard() {
  // Estado que guarda a lista de tarefas
  const [tasks, setTasks] = useState([]);

  // Estados para o formulário de nova tarefa
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();

  // Função para carregar tarefas do backend
  async function loadTasks() {
    const response = await api.get("/tasks");
    setTasks(response.data); // Salva as tarefas no estado
  }

  // useEffect roda quando a página carrega
  useEffect(() => {
    loadTasks();
  }, []);

  // Função para adicionar nova tarefa
  async function handleAdd(e) {
    e.preventDefault();

    // Envia nova tarefa para o backend
    await api.post("/tasks", { title, description });

    // Limpa os campos do formulário
    setTitle("");
    setDescription("");

    // Recarrega a lista de tarefas
    loadTasks();
  }

  // Alterna o status da tarefa (pendente/concluído)
  async function handleToggle(task) {
    await api.put(`/tasks/${task.id}`, {
      title: task.title,
      description: task.description,
      status: !task.status, // Inverte o status
    });

    loadTasks();
  }

  // Remove uma tarefa
  async function handleDelete(id) {
    await api.delete(`/tasks/${id}`);
    loadTasks();
  }

  // Logout do sistema
  function logout() {
    localStorage.removeItem("token"); // Remove token
    navigate("/login"); // Volta para login
  }

  return (
    <div>
      <h2>Minhas Tarefas</h2>

      <button onClick={logout}>Sair</button>

      {/* Formulário para adicionar tarefa */}
      <form onSubmit={handleAdd}>
        <input
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />

        <input
          placeholder="Descrição"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <br />

        <button type="submit">Adicionar</button>
      </form>

      {/* Lista de tarefas */}
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <strong>{task.title}</strong> - {task.description} -{" "}
            {task.status ? "Concluído" : "Pendente"}

            {/* Botão para alternar status */}
            <button onClick={() => handleToggle(task)}>Alternar</button>

            {/* Botão para deletar */}
            <button onClick={() => handleDelete(task.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
