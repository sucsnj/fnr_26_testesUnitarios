import axios from "axios";
import * as api from "../api/api";

jest.mock("axios");

test("listar pedidos chama GET /pedidos", async () => {
  axios.get.mockResolvedValue({ data: [{ id: 1, cliente: "Rogens" }] });
  const pedidos = await api.getPedidos();
  expect(axios.get).toHaveBeenCalledWith("/pedidos");
  expect(pedidos[0].cliente).toBe("Rogens");
});

test("criar pedido chama POST /pedidos", async () => {
  const novoPedido = { cliente: "Ana" };
  axios.post.mockResolvedValue({ data: novoPedido });
  const pedido = await api.createPedido(novoPedido);
  expect(axios.post).toHaveBeenCalledWith("/pedidos", novoPedido);
  expect(pedido.cliente).toBe("Ana");
});
