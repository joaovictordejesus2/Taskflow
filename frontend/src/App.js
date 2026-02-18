// João Victor de Jesus Augusto
// Importa hooks e componentes de rotas
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Importa as páginas
import Login from "./pages/Login";
import Register from "./pages/Register";
import Tasks from "./pages/Tasks";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rota de login */}
        <Route path="/" element={<Login />} />

        {/* Rota de cadastro */}
        <Route path="/register" element={<Register />} />

        {/* Rota de tarefas */}
        <Route path="/tasks" element={<Tasks />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
