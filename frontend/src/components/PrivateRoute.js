// João Victor de Jesus Augusto PD015
import { Navigate } from "react-router-dom";

// Este componente protege rotas privadas
// Se NÃO existir token, o usuário é redirecionado para /login
// Se existir token, a página protegida é exibida normalmente
function PrivateRoute({ children }) {
  // Verifica se existe token salvo no navegador
  const token = localStorage.getItem("token");

  // Se não tiver token, manda para a página de login
  if (!token) {
    return <Navigate to="/login" />;
  }

  // Se tiver token, mostra o conteúdo da rota protegida
  return children;
}

export default PrivateRoute;
