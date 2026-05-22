import React, { useState } from 'react'
import {
  Card, CardContent, CardActions, Typography, Box,
  IconButton, Divider, Collapse, MenuItem, Select,
  FormControl, Tooltip, Stack,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import StatusChip from './StatusChip'
import { atualizarPedido, deletarPedido } from '../api/api'

const STATUS_OPTIONS = ['pendente', 'preparando', 'pronto', 'entregue']

export default function OrderCard({ pedido, onRefresh }) {
  const [expanded, setExpanded] = useState(false)
  const [status, setStatus] = useState(pedido.status)
  const [loading, setLoading] = useState(false)

  const handleStatusChange = async (e) => {
    const novoStatus = e.target.value
    setLoading(true)
    try {
      await atualizarPedido(pedido.id, { ...pedido, status: novoStatus })
      setStatus(novoStatus)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!window.confirm(`Cancelar o pedido de ${pedido.cliente}?`)) return
    await deletarPedido(pedido.id)
    onRefresh()
  }

  const hora = new Date(pedido.criadoEm).toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  })

  return (
    <Card variant="outlined" sx={{ mb: 2 }}>
      <CardContent sx={{ pb: 0 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
          <Box>
            <Typography variant="h6" component="div">
              {pedido.cliente}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Pedido #{pedido.id} — {hora}
            </Typography>
          </Box>
          <StatusChip status={status} />
        </Stack>

        <Box sx={{ mt: 1.5 }}>
          <Typography variant="body2" color="text.secondary">
            {pedido.itens.length} {pedido.itens.length === 1 ? 'item' : 'itens'} —{' '}
            <strong>R$ {pedido.total.toFixed(2)}</strong>
          </Typography>
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: 'space-between', px: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <FormControl size="small" variant="outlined" disabled={loading}>
            <Select value={status} onChange={handleStatusChange} sx={{ fontSize: 13 }}>
              {STATUS_OPTIONS.map((s) => (
                <MenuItem key={s} value={s} sx={{ textTransform: 'capitalize' }}>
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Box>
          <Tooltip title="Ver itens">
            <IconButton size="small" onClick={() => setExpanded((p) => !p)}>
              {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </IconButton>
          </Tooltip>
          <Tooltip title="Cancelar pedido">
            <IconButton
              size="small"
              color="error"
              onClick={handleDelete}
              aria-label="Cancelar pedido"
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </CardActions>

      <Collapse in={expanded}>
        <Divider />
        <CardContent>
          {pedido.itens.map((item, i) => (
            <Box key={i} sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
              <Typography variant="body2">
                {item.quantidade}x {item.nome}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                R$ {(item.quantidade * item.preco).toFixed(2)}
              </Typography>
            </Box>
          ))}
          <Divider sx={{ my: 1 }} />
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2" fontWeight={600}>
              Total
            </Typography>
            <Typography variant="body2" fontWeight={600}>
              R$ {pedido.total.toFixed(2)}
            </Typography>
          </Box>
          {pedido.observacao && (
            <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
              Obs: {pedido.observacao}
            </Typography>
          )}
        </CardContent>
      </Collapse>
    </Card>
  )
}
