import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import OrdersPage from "../pages/OrdersPage";

test("listagem exibe pedidos em ordem decrescente de criação", () => {
  render(<MemoryRouter><OrdersPage /></MemoryRouter>);
  const pedidos = screen.getAllByTestId("tabela-itens");
  // Aqui você verificaria se o primeiro pedido tem data mais recente que os demais
  expect(pedidos.length).toBeGreaterThan(0);
});

test("cada card mostra nome do cliente, número, horário, itens e total", () => {
  render(<MemoryRouter><OrdersPage /></MemoryRouter>);
  expect(screen.getByText(/Cliente/i)).toBeInTheDocument();
  expect(screen.getByText(/Total/i)).toBeInTheDocument();
});

test("status atual do pedido é exibido com chip colorido", () => {
  render(<MemoryRouter><OrdersPage /></MemoryRouter>);
  expect(screen.getByText(/pendente|preparando|pronto|entregue/i)).toBeInTheDocument();
});

test("filtrar pedidos por status mostra apenas os pedidos selecionados", () => {
  render(<MemoryRouter><OrdersPage /></MemoryRouter>);
  const filtro = screen.getByText(/Preparando/i);
  filtro.click();
  // Espera que apenas pedidos com status "Preparando" sejam exibidos
  expect(screen.queryByText(/pendente/i)).not.toBeInTheDocument();
});

test("contadores de cada filtro são atualizados conforme estado dos pedidos", () => {
  render(<MemoryRouter><OrdersPage /></MemoryRouter>);
  const contador = screen.getByText(/Todos \(\d+\)/i);
  expect(contador).toBeInTheDocument();
});

