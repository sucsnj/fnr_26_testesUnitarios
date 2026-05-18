import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Header from "../components/Header";

test("renderiza título da aplicação", () => {
  render(<MemoryRouter><Header /></MemoryRouter>);
  expect(screen.getByText(/Lanchonete FNR/i)).toBeInTheDocument();
});

test("renderiza botões Pedidos e Novo Pedido", () => {
  render(<MemoryRouter><Header /></MemoryRouter>);
  expect(screen.getByText(/Pedidos/i)).toBeInTheDocument();
  expect(screen.getByText(/Novo Pedido/i)).toBeInTheDocument();
});
