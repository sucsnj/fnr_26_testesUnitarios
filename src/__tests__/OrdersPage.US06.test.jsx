import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import OrdersPage from "../pages/OrdersPage";
import * as api from "../api/api";

jest.mock("../api/api");

afterEach(() => jest.restoreAllMocks());

const pedidosMock = [
  { id: 1, cliente: "Carlos", status: "pendente", itens: [], total: 10, criadoEm: "2026-05-18T14:00:00.000Z" },
  { id: 2, cliente: "Ana", status: "pronto", itens: [], total: 20, criadoEm: "2026-05-18T15:00:00.000Z" },
];

test("ao clicar em cancelar, sistema solicita confirmação", async () => {
  api.getPedidos.mockResolvedValue({ data: pedidosMock });
  const confirmSpy = jest.spyOn(window, "confirm").mockReturnValue(false);

  render(<MemoryRouter><OrdersPage /></MemoryRouter>);
  await waitFor(() => expect(screen.getByText(/Carlos/i)).toBeInTheDocument());

  const cancelarButton = screen.getAllByRole("button", { name: /cancelar pedido/i })[0];
  fireEvent.click(cancelarButton);

  expect(confirmSpy).toHaveBeenCalledWith("Cancelar o pedido de Carlos?");

  confirmSpy.mockRestore();
});

test("confirmar exclusão remove pedido da listagem", async () => {
  api.getPedidos
    .mockResolvedValueOnce({ data: pedidosMock })
    .mockResolvedValueOnce({ data: [pedidosMock[1]] });
  api.deletarPedido = jest.fn().mockResolvedValue({});
  jest.spyOn(window, "confirm").mockReturnValue(true);

  render(<MemoryRouter><OrdersPage /></MemoryRouter>);
  await waitFor(() => expect(screen.getByText(/Carlos/i)).toBeInTheDocument());

  const cancelarButton = screen.getAllByRole("button", { name: /cancelar pedido/i })[0];
  fireEvent.click(cancelarButton);

  await waitFor(() => expect(api.deletarPedido).toHaveBeenCalledWith(1));
  await waitFor(() => expect(screen.queryByText(/Carlos/i)).not.toBeInTheDocument());
});

test("cancelar confirmação mantém pedido na listagem", async () => {
  api.getPedidos.mockResolvedValue({ data: pedidosMock });
  jest.spyOn(window, "confirm").mockReturnValue(false);

  render(<MemoryRouter><OrdersPage /></MemoryRouter>);
  await waitFor(() => expect(screen.getByText(/Carlos/i)).toBeInTheDocument());

  const cancelarButton = screen.getAllByRole("button", { name: /cancelar pedido/i })[0];
  fireEvent.click(cancelarButton);

  expect(screen.getByText(/Carlos/i)).toBeInTheDocument();
});

