import React from "react";
import { render, screen } from "@testing-library/react";
import StatusChip from "../components/StatusChip";

test("StatusChip mostra label correta para pendente", () => {
  render(<StatusChip status="pendente" />);
  expect(screen.getByText(/pendente/i)).toBeInTheDocument();
});

test("StatusChip mostra label correta para preparando", () => {
  render(<StatusChip status="preparando" />);
  expect(screen.getByText(/preparando/i)).toBeInTheDocument();
});

test("StatusChip mostra label correta para pronto/entregue", () => {
  render(<StatusChip status="pronto" />);
  expect(screen.getByText(/pronto/i)).toBeInTheDocument();
  render(<StatusChip status="entregue" />);
  expect(screen.getByText(/entregue/i)).toBeInTheDocument();
});

