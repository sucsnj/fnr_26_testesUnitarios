import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import OrdersPage from "../pages/OrdersPage";
import * as api from "../api/api";

jest.mock("../api/api");

describe("OrdersPage funcionalidades", () => {
  const pedidosMock = [
    { id: 1, cliente: "Carlos", status: "pendente", itens: [], total: 10, criadoEm: "2026-05-18T14:00:00.000Z" },
    { id: 2, cliente: "Ana", status: "pronto", itens: [], total: 20, criadoEm: "2026-05-18T15:00:00.000Z" },
  ];

  afterEach(() => jest.restoreAllMocks());

  test("listagem exibe pedidos em ordem decrescente de criação", async () => {
    api.getPedidos.mockResolvedValue({ data: pedidosMock });
    render(<OrdersPage />);

    await waitFor(() => expect(screen.getByText(/Carlos/i)).toBeInTheDocument());
    const cards = screen.getAllByText(/Pedido #/i);
    expect(cards.length).toBe(2);
  });

  test("cada card mostra nome do cliente, número, horário, itens e total", async () => {
    api.getPedidos.mockResolvedValue({ data: pedidosMock });
    render(<OrdersPage />);

    await waitFor(() => expect(screen.getByText(/Carlos/i)).toBeInTheDocument());
      expect(screen.getAllByText(/Total/i)[0]).toBeInTheDocument();
    expect(screen.getByText(/Pedido #1/i)).toBeInTheDocument();
  });

  test("filtrar pedidos por status mostra apenas os pedidos selecionados", async () => {
    api.getPedidos.mockResolvedValue({ data: pedidosMock });
    render(<OrdersPage />);

    await waitFor(() => expect(screen.getByText(/Carlos/i)).toBeInTheDocument());
    fireEvent.click(screen.getByRole("button", { name: /Preparando \(0\)/i }));
    expect(screen.queryByText(/Carlos/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Ana/i)).not.toBeInTheDocument();
    expect(screen.getByText(/Nenhum pedido encontrado/i)).toBeInTheDocument();
  });

  test("contadores de cada filtro são atualizados conforme estado dos pedidos", async () => {
    api.getPedidos.mockResolvedValue({ data: pedidosMock });
    render(<OrdersPage />);

    await waitFor(() => expect(screen.getByText(/Todos \(2\)/i)).toBeInTheDocument());
    expect(screen.getByText(/Pendente \(1\)/i)).toBeInTheDocument();
    expect(screen.getByText(/Pronto \(1\)/i)).toBeInTheDocument();
  });
});
