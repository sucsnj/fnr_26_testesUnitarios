import * as api from "../api/api";

jest.mock("../api/api", () => ({
  getPedidos: jest.fn(),
  createPedido: jest.fn(),
}));

test("listar pedidos chama GET /pedidos", async () => {
  api.getPedidos.mockResolvedValue({ data: [{ id: 1, cliente: "Rogens" }] });

  const pedidos = await api.getPedidos();
  expect(api.getPedidos).toHaveBeenCalled(); // valida que foi chamado
  expect(pedidos.data[0].cliente).toBe("Rogens");
});

test("criar pedido chama POST /pedidos", async () => {
  const novoPedido = { cliente: "Ana" };
  api.createPedido.mockResolvedValue({ data: novoPedido });

  const pedido = await api.createPedido(novoPedido);
  expect(api.createPedido).toHaveBeenCalledWith(novoPedido);
  expect(pedido.data.cliente).toBe("Ana");
});
