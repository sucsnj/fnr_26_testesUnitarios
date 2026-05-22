import axios from "axios";
import * as api from "../api/api";

jest.mock("axios");

test("listar pedidos chama GET /pedidos com ordenação", async () => {
  axios.create.mockReturnValue(axios);
  axios.get.mockResolvedValue({ data: [{ id: 1, cliente: "Carlos" }] });
  const response = await api.getPedidos();
  expect(axios.get).toHaveBeenCalledWith("/pedidos?_sort=criadoEm&_order=desc");
  expect(response.data[0].cliente).toBe("Carlos");
});

test("criar pedido chama POST /pedidos", async () => {
  axios.create.mockReturnValue(axios);
  const novoPedido = { cliente: "Ana" };
  axios.post.mockResolvedValue({ data: novoPedido });
  const response = await api.criarPedido(novoPedido);
  expect(axios.post).toHaveBeenCalledWith("/pedidos", novoPedido);
  expect(response.data.cliente).toBe("Ana");
});
