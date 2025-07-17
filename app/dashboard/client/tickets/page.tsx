"use client"

import { useState } from "react"
import { DataTable } from "@/components/dashboard/data-table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TicketStatusBadge } from "@/components/tickets/ticket-status-badge"
import { PriorityBadge } from "@/components/tickets/priority-badge"
import { Plus, Search, Eye } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const tickets = [
  {
    id: "INC-001",
    title: "Problema con conexión a internet",
    category: "Red/Conectividad",
    status: "En Progreso",
    priority: "Alta",
    technician: "Carlos Rodríguez",
    createdAt: "2025-01-15",
    updatedAt: "2025-01-16",
  },
  {
    id: "INC-002",
    title: "Instalación de software contable",
    category: "Software",
    status: "Resuelta",
    priority: "Media",
    technician: "Ana López",
    createdAt: "2025-01-12",
    updatedAt: "2025-01-14",
  },
  {
    id: "INC-003",
    title: "Mantenimiento preventivo equipos",
    category: "Mantenimiento",
    status: "Asignada",
    priority: "Baja",
    technician: "Miguel Torres",
    createdAt: "2025-01-10",
    updatedAt: "2025-01-11",
  },
  {
    id: "INC-004",
    title: "Falla en impresora principal",
    category: "Hardware",
    status: "Nueva",
    priority: "Alta",
    technician: "-",
    createdAt: "2025-01-08",
    updatedAt: "2025-01-08",
  },
]

export default function ClientTicketsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const columns = [
    { key: "id", label: "ID" },
    { key: "title", label: "Problema" },
    { key: "category", label: "Categoría" },
    {
      key: "status",
      label: "Estado",
      render: (value: string) => <TicketStatusBadge status={value} />,
    },
    {
      key: "priority",
      label: "Prioridad",
      render: (value: string) => <PriorityBadge priority={value} />,
    },
    { key: "technician", label: "Técnico" },
    { key: "createdAt", label: "Creado" },
  ]

  const actions = (row: any) => (
    <Button variant="ghost" size="sm" asChild>
      <a href={`/dashboard/client/tickets/${row.id}`}>
        <Eye className="h-4 w-4" />
      </a>
    </Button>
  )

  const filteredTickets = tickets.filter((ticket) => {
    const matchesSearch =
      ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || ticket.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Mis Solicitudes</h1>
          <p className="text-muted-foreground">Historial completo de tus incidencias</p>
        </div>
        <Button asChild>
          <a href="/dashboard/client/new-ticket">
            <Plus className="mr-2 h-4 w-4" />
            Nueva Solicitud
          </a>
        </Button>
      </div>

      <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-foreground">Lista de Solicitudes</CardTitle>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar solicitudes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filtrar por estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los estados</SelectItem>
                <SelectItem value="Nueva">Nueva</SelectItem>
                <SelectItem value="Asignada">Asignada</SelectItem>
                <SelectItem value="En Progreso">En Progreso</SelectItem>
                <SelectItem value="Resuelta">Resuelta</SelectItem>
                <SelectItem value="Cerrada">Cerrada</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={filteredTickets} actions={actions} />
        </CardContent>
      </Card>
    </div>
  )
}
