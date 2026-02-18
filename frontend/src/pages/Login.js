// João Victor de Jesus Augusto PD015
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Login() {
  // Estados do formulário
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  // Função de login
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Envia email e senha para o backend
      const response = await api.post("/auth/login", {
        email,
        password,
      });

      // Salva o token
      localStorage.setItem("token", response.data.token);

      // Vai para a página de tarefas
      navigate("/tasks");
    } catch (err) {
      alert("E-mail ou senha inválidos");
    }
  };

  return (
    <div className="container">
      <h1>Login</h1>

      <form onSubmit={handleSubmit}>
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

        <button type="submit">Entrar</button>
      </form>

      <p style={{ textAlign: "center", marginTop: 10 }}>
        Não tem conta? <a href="/register">Cadastrar</a>
      </p>
    </div>
  );
}

export default Login;
