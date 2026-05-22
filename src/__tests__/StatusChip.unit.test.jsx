import React from "react";
import { render, screen } from "@testing-library/react";
import StatusChip from "../components/StatusChip";

test("renderiza chip pendente", () => {
  render(<StatusChip status="pendente" />);
  expect(screen.getByText(/Pendente/i)).toBeInTheDocument();
});

test("renderiza chip preparando", () => {
  render(<StatusChip status="preparando" />);
  expect(screen.getByText(/Preparando/i)).toBeInTheDocument();
});

test("renderiza chip pronto", () => {
  render(<StatusChip status="pronto" />);
  expect(screen.getByText(/Pronto/i)).toBeInTheDocument();
});

test("renderiza chip entregue", () => {
  render(<StatusChip status="entregue" />);
  expect(screen.getByText(/Entregue/i)).toBeInTheDocument();
});
