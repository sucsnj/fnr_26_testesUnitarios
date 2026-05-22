import axios from 'axios'

const _client = (axios && typeof axios.create === 'function') ? axios.create({ baseURL: '/api' }) : null
const api = _client && typeof _client.get === 'function' ? _client : axios

export const getPedidos = () => api.get('/pedidos?_sort=criadoEm&_order=desc')
export const getPedidoById = (id) => api.get(`/pedidos/${id}`)
export const criarPedido = (pedido) => api.post('/pedidos', pedido)
export const atualizarPedido = (id, pedido) => api.put(`/pedidos/${id}`, pedido)
export const deletarPedido = (id) => api.delete(`/pedidos/${id}`)
export const getCardapio = () => api.get('/cardapio')
