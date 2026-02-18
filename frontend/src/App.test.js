// João Victor de Jesus Augusto
// Importa a função render (para renderizar o componente)
// e screen (para acessar elementos da tela virtual)
import { render, screen } from '@testing-library/react';

// Importa o componente principal da aplicação
import App from './App';

// Define um teste com a descrição "renders learn react link"
test('renders learn react link', () => {

  // Renderiza o componente <App /> em um ambiente de teste
  render(<App />);

  // Procura na tela um elemento que contenha o texto "learn react"
  // O /learn react/i é uma expressão regular:
  // - ignora maiúsculas/minúsculas (i)
  const linkElement = screen.getByText(/learn react/i);

  // Verifica se o elemento foi encontrado no documento
  // Se não encontrar, o teste falha
  expect(linkElement).toBeInTheDocument();
});
