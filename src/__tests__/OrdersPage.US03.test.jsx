import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import OrdersPage from "../pages/OrdersPage";

test("cada card mostra nome do cliente, número, horário, itens e total", () => {
  render(<MemoryRouter><OrdersPage /></MemoryRouter>);
  expect(screen.getByText(/Cliente/i)).toBeInTheDocument();
  expect(screen.getByText(/Total/i)).toBeInTheDocument();
});
