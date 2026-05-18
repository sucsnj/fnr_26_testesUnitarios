import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import OrderCard from "../components/OrderCard";

test("expandir pedido mostra itens detalhados", () => {
  render(<MemoryRouter><OrderCard /></MemoryRouter>);
  const expandButton = screen.getByRole("button", { name: /expandir/i });
  fireEvent.click(expandButton);
  expect(screen.getByText(/X-Burguer/i)).toBeInTheDocument();
  expect(screen.getByText(/Coca-Cola 350ml/i)).toBeInTheDocument();
});

test("expansão mostra total geral e observações", () => {
  render(<MemoryRouter><OrderCard /></MemoryRouter>);
  const expandButton = screen.getByRole("button", { name: /expandir/i });
  fireEvent.click(expandButton);
  expect(screen.getByText(/Total/i)).toBeInTheDocument();
  expect(screen.getByText(/Sem maionese/i)).toBeInTheDocument();
});

test("recolher pedido esconde detalhes", () => {
  render(<MemoryRouter><OrderCard /></MemoryRouter>);
  const expandButton = screen.getByRole("button", { name: /expandir/i });
  fireEvent.click(expandButton);
  fireEvent.click(expandButton); // clicar novamente para recolher
  expect(screen.queryByText(/X-Burguer/i)).not.toBeInTheDocument();
});

