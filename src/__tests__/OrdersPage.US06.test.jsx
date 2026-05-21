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
