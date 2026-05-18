import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import OrderCard from "../components/OrderCard";

const pedidoMock = {
  id: 1,
  cliente: "Carlos",
  itens: [{ nome: "X-Burguer", quantidade: 2, preco: 18.5 }],
  total: 37.0,
  status: "pendente",
  observacao: "Sem maionese",
  criadoEm: "2026-05-18T14:00:00.000Z",
};

test("renderiza informações básicas do pedido", () => {
  render(<MemoryRouter><OrderCard pedido={pedidoMock} onRefresh={() => {}} /></MemoryRouter>);
  expect(screen.getByText(/Carlos/i)).toBeInTheDocument();
  expect(screen.getByText(/Pedido #1/i)).toBeInTheDocument();
  expect(screen.getByText(/R\$ 37.00/i)).toBeInTheDocument();
});

test("expande e mostra itens detalhados", () => {
  render(<MemoryRouter><OrderCard pedido={pedidoMock} onRefresh={() => {}} /></MemoryRouter>);
  const expandButton = screen.getByRole("button", { name: /Ver itens/i });
  fireEvent.click(expandButton);
  expect(screen.getByText(/2x X-Burguer/i)).toBeInTheDocument();
  expect(screen.getByText(/Obs: Sem maionese/i)).toBeInTheDocument();
});
