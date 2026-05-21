import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import NewOrderPage from "../pages/NewOrderPage";
import * as api from "../api/api";

jest.mock("../api/api");

test("não permite registrar pedido sem nome do cliente", async () => {
  api.getCardapio.mockResolvedValueOnce({
    data: [{ nome: "X-Burguer", preco: 18.00, categoria: "Lanche" }]
  });

  render(<MemoryRouter><NewOrderPage /></MemoryRouter>);
  fireEvent.click(screen.getByTestId("btn-registrar-pedido"));
  expect(screen.getByTestId("alert-erro")).toHaveTextContent("Informe o nome do cliente.");
});

test("não permite registrar pedido sem itens", async () => {
  api.getCardapio.mockResolvedValueOnce({
    data: [{ nome: "X-Burguer", preco: 18.00, categoria: "Lanche" }]
  });

  render(<MemoryRouter><NewOrderPage /></MemoryRouter>);
  await userEvent.click(screen.getByTestId("btn-registrar-pedido"));
  expect(screen.getByTestId("alert-erro")).toBeInTheDocument();
});
