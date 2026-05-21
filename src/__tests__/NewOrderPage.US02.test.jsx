import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import NewOrderPage from "../pages/NewOrderPage";

test("adicionar o mesmo item duas vezes acumula quantidade", async () => {
  render(<MemoryRouter><NewOrderPage /></MemoryRouter>);
  
  await userEvent.type(screen.getByTestId("input-cliente"), "Ana");
  await userEvent.selectOptions(screen.getByTestId("select-produto"), "X-Burguer");
  await userEvent.type(screen.getByTestId("input-quantidade"), "1");
  
  await userEvent.click(screen.getByTestId("btn-adicionar-item"));
  await userEvent.click(screen.getByTestId("btn-adicionar-item"));
  
  // aqui você valida se acumulou a quantidade
  expect(screen.getByText(/X-Burguer/i)).toHaveTextContent("2");
});
