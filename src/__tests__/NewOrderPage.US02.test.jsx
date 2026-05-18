import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import NewOrderPage from "../pages/NewOrderPage";

test("não permite quantidade menor que 1", () => {
  render(<MemoryRouter><NewOrderPage /></MemoryRouter>);
  fireEvent.change(screen.getByTestId("input-cliente"), { target: { value: "Carlos" } });
  fireEvent.change(screen.getByTestId("select-produto"), { target: { value: "Coca-Cola 350ml" } });
  fireEvent.change(screen.getByTestId("input-quantidade"), { target: { value: "0" } });
  fireEvent.click(screen.getByTestId("btn-adicionar-item"));
  expect(screen.getByTestId("alert-erro")).toBeInTheDocument();
});

test("adicionar o mesmo item duas vezes acumula quantidade", () => {
  render(<MemoryRouter><NewOrderPage /></MemoryRouter>);
  fireEvent.change(screen.getByTestId("input-cliente"), { target: { value: "Ana" } });
  fireEvent.change(screen.getByTestId("select-produto"), { target: { value: "X-Burguer" } });
  fireEvent.change(screen.getByTestId("input-quantidade"), { target: { value: "1" } });
  fireEvent.click(screen.getByTestId("btn-adicionar-item"));
  fireEvent.click(screen.getByTestId("btn-adicionar-item"));
  expect(screen.getByTestId("tabela-itens")).toHaveTextContent("2");
});

test("remover item antes de confirmar pedido", () => {
  render(<MemoryRouter><NewOrderPage /></MemoryRouter>);
  fireEvent.change(screen.getByTestId("input-cliente"), { target: { value: "Carlos" } });
  fireEvent.change(screen.getByTestId("select-produto"), { target: { value: "Coca-Cola 350ml" } });
  fireEvent.change(screen.getByTestId("input-quantidade"), { target: { value: "1" } });
  fireEvent.click(screen.getByTestId("btn-adicionar-item"));
  fireEvent.click(screen.getByTestId("btn-remover-0")); // supondo que o id seja 0
  expect(screen.getByTestId("tabela-itens")).not.toHaveTextContent("Coca-Cola 350ml");
});

test("subtotal e total atualizados em tempo real", () => {
  render(<MemoryRouter><NewOrderPage /></MemoryRouter>);
  fireEvent.change(screen.getByTestId("input-cliente"), { target: { value: "Ana Lima" } });
  fireEvent.change(screen.getByTestId("select-produto"), { target: { value: "X-Burguer" } });
  fireEvent.change(screen.getByTestId("input-quantidade"), { target: { value: "2" } });
  fireEvent.click(screen.getByTestId("btn-adicionar-item"));
  expect(screen.getByTestId("tabela-itens")).toHaveTextContent("36.00"); // subtotal
});
