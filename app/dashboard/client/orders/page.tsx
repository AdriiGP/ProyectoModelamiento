"use client"

import { useState } from "react"
import { DataTable } from "@/components/dashboard/data-table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, Eye, Download, Package } from "lucide-react"

const orders = [
  {
    id: "ORD-001",
    product: "Laptop Gaming MSI",
    date: "2024-01-15",
    status: "Entregado",
    amount: "$1,299",
    tracking: "TRK123456789",
  },
  {
    id: "ORD-002",
    product: "iPhone 15 Pro",
    date: "2024-01-12",
    status: "En tránsito",
    amount: "$899",
    tracking: "TRK987654321",
  },
  {
    id: "ORD-003",
    product: "AirPods Pro",
    date: "2024-01-10",
    status: "Procesando",
    amount: "$199",
    tracking: "-",
  },
  {
    id: "ORD-004",
    product: "MacBook Air M2",
    date: "2024-01-08",
    status: "Entregado",
    amount: "$1,199",
    tracking: "TRK456789123",
  },
  {
    id: "ORD-005",
    product: "Samsung Galaxy Watch",
    date: "2024-01-05",
    status: "Cancelado",
    amount: "$299",
    tracking: "-",
  },
]

export default function OrdersPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const columns = [
    { key: "id", label: "Pedido" },
    { key: "product", label: "Producto" },
    { key: "date", label: "Fecha" },
    {
      key: "status",
      label: "Estado",
      render: (value: string) => {
        const getVariant = (status: string) => {
          switch (status) {
            case "Entregado":
              return "default"
            case "En tránsito":
              return "secondary"
            case "Procesando":
              return "outline"
            case "Cancelado":
              return "destructive"
            default:
              return "outline"
          }
        }
        return <Badge variant={getVariant(value)}>{value}</Badge>
      },
    },
    { key: "amount", label: "Monto" },
    { key: "tracking", label: "Seguimiento" },
  ]

  const actions = (row: any) => (
    <div className="flex gap-2">
      <Button variant="ghost" size="sm">
        <Eye className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="sm">
        <Download className="h-4 w-4" />
      </Button>
    </div>
  )

  const filteredOrders = orders.filter(
    (order) =>
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.product.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Mis Pedidos</h1>
          <p className="text-gray-600">Historial completo de tus compras</p>
        </div>
        <Button>
          <Package className="mr-2 h-4 w-4" />
          Nuevo Pedido
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Historial de Pedidos</CardTitle>
          <div className="flex items-center space-x-2">
            <Search className="h-4 w-4 text-gray-400" />
            <Input
              placeholder="Buscar pedidos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={filteredOrders} actions={actions} />
        </CardContent>
      </Card>
    </div>
  )
}
