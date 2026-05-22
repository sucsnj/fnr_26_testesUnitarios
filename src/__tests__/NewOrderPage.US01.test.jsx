import React from "react";
import { render, screen, fireEvent, waitFor, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import NewOrderPage from "../pages/NewOrderPage";
import * as api from "../api/api";

jest.mock("../api/api");

const cardapioMock = [
  { id: 1, nome: "X-Burguer", preco: 18.0, categoria: "Lanches" },
  { id: 2, nome: "Coca-Cola 350ml", preco: 8.0, categoria: "Bebidas" },
];

const renderNewOrderPage = async () => {
  api.getCardapio.mockResolvedValue({ data: cardapioMock });
  api.criarPedido.mockResolvedValue({ data: {} });

  render(
    <MemoryRouter>
      <NewOrderPage />
    </MemoryRouter>
  );

  await waitFor(() => expect(api.getCardapio).toHaveBeenCalled());
};

const selectProduto = async (produtoTexto) => {
  fireEvent.mouseDown(screen.getByRole("combobox"));
  const listbox = await screen.findByRole("listbox");
  fireEvent.click(
    within(listbox).getByText(new RegExp(produtoTexto, "i"))
  );
};

test("erro ao registrar sem nome do cliente", async () => {
  await renderNewOrderPage();
  fireEvent.click(screen.getByTestId("btn-registrar-pedido"));
  expect(screen.getByTestId("alert-erro")).toHaveTextContent(
    "Informe o nome do cliente."
  );
});

test("erro ao registrar sem itens", async () => {
  await renderNewOrderPage();
  fireEvent.change(screen.getByTestId("input-cliente"), {
    target: { value: "Carlos" },
  });
  fireEvent.click(screen.getByTestId("btn-registrar-pedido"));
  expect(screen.getByTestId("alert-erro")).toHaveTextContent(
    "Adicione pelo menos um item."
  );
});

test("calcula total corretamente", async () => {
  await renderNewOrderPage();
  fireEvent.change(screen.getByTestId("input-cliente"), {
    target: { value: "Ana Lima" },
  });
  await selectProduto("X-Burguer");
  fireEvent.change(screen.getByTestId("input-quantidade"), {
    target: { value: "2" },
  });
  fireEvent.click(screen.getByTestId("btn-adicionar-item"));
  expect(screen.getByTestId("tabela-itens")).toHaveTextContent("36.00");
});

test("mensagem de sucesso ao registrar pedido válido", async () => {
  await renderNewOrderPage();
  fireEvent.change(screen.getByTestId("input-cliente"), {
    target: { value: "Carlos" },
  });
  await selectProduto("Coca-Cola 350ml");
  fireEvent.change(screen.getByTestId("input-quantidade"), {
    target: { value: "1" },
  });
  fireEvent.click(screen.getByTestId("btn-adicionar-item"));
  fireEvent.click(screen.getByTestId("btn-registrar-pedido"));
  expect(await screen.findByTestId("alert-sucesso")).toBeInTheDocument();
});
