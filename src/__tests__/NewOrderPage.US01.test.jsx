import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import NewOrderPage from "../pages/NewOrderPage";
import * as api from "../api/api"; // importa o wrapper

jest.mock("../api/api");

test("erro ao registrar sem nome do cliente", async () => {
  // mocka o cardápio para evitar erro de rede
  api.getCardapio.mockResolvedValueOnce({
    data: [{ nome: "X-Burguer", preco: 18.00 }]
  });

  render(<MemoryRouter><NewOrderPage /></MemoryRouter>);

  fireEvent.click(screen.getByTestId("btn-registrar-pedido"));

  expect(await screen.findByTestId("alert-erro"))
    .toHaveTextContent("Informe o nome do cliente.");
});
