import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import StatusChip from "../components/StatusChip";

test("alterar status para entregue", () => {
  render(<MemoryRouter><StatusChip status="pronto" /></MemoryRouter>);
  const chip = screen.getByText(/pronto/i);
  fireEvent.click(chip);
  expect(screen.getByText(/entregue/i)).toBeInTheDocument();
});
