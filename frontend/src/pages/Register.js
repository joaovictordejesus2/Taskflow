// João Victor de Jesus Augusto PD015
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Register() {
  // Estados para os campos do formulário
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  // Função chamada ao enviar o formulário
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Envia os dados para o backend
      const response = await api.post("/auth/register", {
        name,
        email,
        password,
      });

      // Salva o token no localStorage
      localStorage.setItem("token", response.data.token);

      // Redireciona para a página de tarefas
      navigate("/tasks");
    } catch (err) {
      alert("Erro ao cadastrar usuário");
    }
  };

  return (
    <div className="container">
      <h1>Cadastro</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Cadastrar</button>
      </form>

      <p style={{ textAlign: "center", marginTop: 10 }}>
        Já tem conta? <a href="/">Entrar</a>
      </p>
    </div>
  );
}

export default Register;
