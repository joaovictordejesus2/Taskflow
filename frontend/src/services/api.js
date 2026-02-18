// João Victor de Jesus Augusto PD015
// Importa o axios para fazer requisições HTTP
import axios from "axios";

// Cria uma instância do axios com a URL base do backend
const api = axios.create({
  baseURL: "http://localhost:3333",
});

// Interceptor: antes de cada requisição, adiciona o token no header
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  // Se existir token salvo, envia no Authorization
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
