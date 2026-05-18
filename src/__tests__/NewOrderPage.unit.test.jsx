import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import NewOrderPage from "../pages/NewOrderPage";
import * as api from "../api/api";

jest.mock("../api/api");

test("não permite registrar pedido sem nome do cliente", async () => {
  render(<MemoryRouter><NewOrderPage /></MemoryRouter>);
  fireEvent.click(screen.getByTestId("btn-registrar-pedido"));
  expect(screen.getByTestId("alert-erro")).toHaveTextContent("Informe o nome do cliente.");
});

test("não permite registrar pedido sem itens", async () => {
  render(<MemoryRouter><NewOrderPage /></MemoryRouter>);
  fireEvent.change(screen.getByTestId("input-cliente"), { target: { value: "Carlos" } });
  fireEvent.click(screen.getByTestId("btn-registrar-pedido"));
  expect(screen.getByTestId("alert-erro")).toHaveTextContent("Adicione pelo menos um item.");
});

test("calcula total corretamente ao adicionar item", () => {
  render(<MemoryRouter><NewOrderPage /></MemoryRouter>);
  // simular cardápio mockado
  // aqui você pode mockar api.getCardapio para retornar itens
});
