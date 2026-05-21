import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import OrdersPage from "../pages/OrdersPage";
import * as api from "../api/api";

jest.mock("../api/api");

const pedidosMock = [
  { id: 1, cliente: "Rogens", status: "pendente", itens: [], total: 10, criadoEm: "2026-05-15T14:00:00.000Z" },
  { id: 2, cliente: "Ana", status: "pronto", itens: [], total: 20, criadoEm: "2026-05-18T15:00:00.000Z" },
];

test("filtra pedidos por status", async () => {
  api.getPedidos.mockResolvedValue({ data: pedidosMock });
  render(<MemoryRouter><OrdersPage /></MemoryRouter>);

  await waitFor(() => expect(screen.getByText(/Rogens/i)).toBeInTheDocument());

  const prontoChip = await screen.findByRole("button", { name: /Pronto \(1\)/i });
  fireEvent.click(prontoChip);

  expect(screen.getByText(/Ana/i)).toBeInTheDocument();
  expect(screen.queryByText(/Rogens/i)).not.toBeInTheDocument();
});
