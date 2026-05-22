import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import OrderCard from "../components/OrderCard";

const pedidoMock = {
  id: 1,
  cliente: "Carlos",
  itens: [
    { nome: "X-Burguer", quantidade: 2, preco: 18.5 },
    { nome: "Coca-Cola 350ml", quantidade: 1, preco: 8.0 },
  ],
  total: 45.0,
  status: "pendente",
  observacao: "Sem maionese",
  criadoEm: "2026-05-18T14:00:00.000Z",
};

test("expandir pedido mostra itens detalhados", () => {
  render(<OrderCard pedido={pedidoMock} onRefresh={() => {}} />);
  const expandButton = screen.getByRole("button", { name: /ver itens/i });
  fireEvent.click(expandButton);
  expect(screen.getByText(/X-Burguer/i)).toBeInTheDocument();
  expect(screen.getByText(/Coca-Cola 350ml/i)).toBeInTheDocument();
});

test("expansão mostra total geral e observações", () => {
  render(<OrderCard pedido={pedidoMock} onRefresh={() => {}} />);
  const expandButton = screen.getByRole("button", { name: /ver itens/i });
  fireEvent.click(expandButton);
  expect(screen.getByText(/Total/i)).toBeInTheDocument();
  expect(screen.getByText(/Sem maionese/i)).toBeInTheDocument();
});

test("recolher pedido esconde detalhes", async () => {
  render(<OrderCard pedido={pedidoMock} onRefresh={() => {}} />);
  const expandButton = screen.getByRole("button", { name: /ver itens/i });
  fireEvent.click(expandButton);
  fireEvent.click(expandButton); // clicar novamente para recolher
  await waitFor(() => expect(screen.getByText(/X-Burguer/i)).not.toBeVisible());
});

