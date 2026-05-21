import React from "react";
import { render, screen } from "@testing-library/react";
import StatusChip from "../components/StatusChip";

test("renderiza chip pendente", () => {
  render(<StatusChip status="pendente" />);
  expect(screen.getByText(/Pendente/i)).toBeInTheDocument();
});
