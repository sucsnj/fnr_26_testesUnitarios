import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import OrdersPage from "../pages/OrdersPage";
import * as api from "../api/api";

jest.mock("../api/api");

const pedidosMock = [
  { id: 1, cliente: "Carlos", status: "pendente", itens: [], total: 10, criadoEm: "2026-05-18T14:00:00.000Z" },
  { id: 2, cliente: "Ana", status: "pronto", itens: [], total: 20, criadoEm: "2026-05-18T15:00:00.000Z" },
];

test("renderiza carregando inicialmente", async () => {
  api.getPedidos.mockResolvedValue({ data: pedidosMock });
  render(<MemoryRouter><OrdersPage /></MemoryRouter>);
  expect(screen.getByRole("progressbar")).toBeInTheDocument();
  await waitFor(() => expect(screen.getByText(/Carlos/i)).toBeInTheDocument());
});

test("exibe erro quando API falha", async () => {
  api.getPedidos.mockRejectedValue(new Error("API error"));
  render(<MemoryRouter><OrdersPage /></MemoryRouter>);
  await waitFor(() => expect(screen.getByText(/Não foi possível carregar/i)).toBeInTheDocument());
});

test("filtra pedidos por status", async () => {
  api.getPedidos.mockResolvedValue({ data: pedidosMock });
  render(<MemoryRouter><OrdersPage /></MemoryRouter>);
  await waitFor(() => expect(screen.getByText(/Carlos/i)).toBeInTheDocument());
  fireEvent.click(screen.getByText(/Pronto/i));
  expect(screen.getByText(/Ana/i)).toBeInTheDocument();
  expect(screen.queryByText(/Carlos/i)).not.toBeInTheDocument();
});

test("mostra mensagem quando não há pedidos", async () => {
  api.getPedidos.mockResolvedValue({ data: [] });
  render(<MemoryRouter><OrdersPage /></MemoryRouter>);
  await waitFor(() => expect(screen.getByText(/Nenhum pedido encontrado/i)).toBeInTheDocument());
});
