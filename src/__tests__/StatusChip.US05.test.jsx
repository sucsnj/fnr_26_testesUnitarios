import React from "react";
import { render, screen, rerender } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import StatusChip from "../components/StatusChip";

test("alterar status para entregue", () => {
  const { rerender } = render(
    <MemoryRouter><StatusChip status="pronto" /></MemoryRouter>
  );

  rerender(<MemoryRouter><StatusChip status="entregue" /></MemoryRouter>);

  expect(screen.getByText(/entregue/i)).toBeInTheDocument();
});
