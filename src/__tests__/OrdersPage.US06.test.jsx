import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import OrdersPage from "../pages/OrdersPage";

test("ao clicar em cancelar, sistema solicita confirmação", () => {
  render(<MemoryRouter><OrdersPage /></MemoryRouter>);
  const cancelarButton = screen.getByRole("button", { name: /cancelar/i });
  fireEvent.click(cancelarButton);
  expect(screen.getByText(/Deseja realmente excluir/i)).toBeInTheDocument();
});

test("confirmar exclusão remove pedido da listagem", () => {
  render(<MemoryRouter><OrdersPage /></MemoryRouter>);
  const cancelarButton = screen.getByRole("button", { name: /cancelar/i });
  fireEvent.click(cancelarButton);
  const confirmar = screen.getByRole("button", { name: /confirmar/i });
  fireEvent.click(confirmar);
  expect(screen.queryByText(/Cliente/i)).not.toBeInTheDocument();
});

test("cancelar confirmação mantém pedido na listagem", () => {
  render(<MemoryRouter><OrdersPage /></MemoryRouter>);
  const cancelarButton = screen.getByRole("button", { name: /cancelar/i });
  fireEvent.click(cancelarButton);
  const naoConfirmar = screen.getByRole("button", { name: /não/i });
  fireEvent.click(naoConfirmar);
  expect(screen.getByText(/Cliente/i)).toBeInTheDocument();
});

