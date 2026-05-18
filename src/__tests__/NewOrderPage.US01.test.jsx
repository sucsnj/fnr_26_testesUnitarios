import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import NewOrderPage from "../pages/NewOrderPage";

test("erro ao registrar sem nome do cliente", () => {
  render(<MemoryRouter><NewOrderPage /></MemoryRouter>);
  fireEvent.click(screen.getByTestId("btn-registrar-pedido"));
  expect(screen.getByTestId("alert-erro")).toBeInTheDocument();
});

test("erro ao registrar sem itens", () => {
  render(<MemoryRouter><NewOrderPage /></MemoryRouter>);
  fireEvent.change(screen.getByTestId("input-cliente"), { target: { value: "Carlos" } });
  fireEvent.click(screen.getByTestId("btn-registrar-pedido"));
  expect(screen.getByTestId("alert-erro")).toBeInTheDocument();
});

test("calcula total corretamente", () => {
  render(<MemoryRouter><NewOrderPage /></MemoryRouter>);
  fireEvent.change(screen.getByTestId("input-cliente"), { target: { value: "Ana Lima" } });
  fireEvent.change(screen.getByTestId("select-produto"), { target: { value: "X-Burguer" } });
  fireEvent.change(screen.getByTestId("input-quantidade"), { target: { value: "2" } });
  fireEvent.click(screen.getByTestId("btn-adicionar-item"));
  expect(screen.getByTestId("tabela-itens")).toHaveTextContent("36.00");
});

test("mensagem de sucesso ao registrar pedido válido", () => {
  render(<MemoryRouter><NewOrderPage /></MemoryRouter>);
  fireEvent.change(screen.getByTestId("input-cliente"), { target: { value: "Carlos" } });
  fireEvent.change(screen.getByTestId("select-produto"), { target: { value: "Coca-Cola 350ml" } });
  fireEvent.change(screen.getByTestId("input-quantidade"), { target: { value: "1" } });
  fireEvent.click(screen.getByTestId("btn-adicionar-item"));
  fireEvent.click(screen.getByTestId("btn-registrar-pedido"));
  expect(screen.getByTestId("alert-sucesso")).toBeInTheDocument();
});
