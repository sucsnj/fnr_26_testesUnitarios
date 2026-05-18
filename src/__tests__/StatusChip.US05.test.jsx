import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import StatusChip from "../components/StatusChip";

test("alterar status de pendente para preparando", () => {
  render(<MemoryRouter><StatusChip status="pendente" /></MemoryRouter>);
  const chip = screen.getByText(/pendente/i);
  fireEvent.click(chip);
  expect(screen.getByText(/preparando/i)).toBeInTheDocument();
});

test("alterar status para pronto", () => {
  render(<MemoryRouter><StatusChip status="preparando" /></MemoryRouter>);
  const chip = screen.getByText(/preparando/i);
  fireEvent.click(chip);
  expect(screen.getByText(/pronto/i)).toBeInTheDocument();
});

test("alterar status para entregue", () => {
  render(<MemoryRouter><StatusChip status="pronto" /></MemoryRouter>);
  const chip = screen.getByText(/pronto/i);
  fireEvent.click(chip);
  expect(screen.getByText(/entregue/i)).toBeInTheDocument();
});

