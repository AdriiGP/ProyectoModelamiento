"use client"

import { useState } from "react"
import { DataTable } from "@/components/dashboard/data-table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TicketStatusBadge } from "@/components/tickets/ticket-status-badge"
import { PriorityBadge } from "@/components/tickets/priority-badge"
import { Search, Eye, UserPlus, Filter } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

// Actualizar fechas
const tickets = [
  {
    id: "INC-001",
    title: "Problema con conexión a internet",
    client: "María García",
    category: "Red/Conectividad",
    status: "En Progreso",
    priority: "Alta",
    technician: "Carlos Rodríguez",
    createdAt: "2025-01-15",
    updatedAt: "2025-01-16",
  },
  {
    id: "INC-008",
    title: "Falla crítica en servidor principal",
    client: "TechCorp Solutions",
    category: "Hardware",
    status: "Nueva",
    priority: "Crítica",
    technician: "Sin asignar",
    createdAt: "2025-02-20",
    updatedAt: "2025-02-20",
  },
  {
    id: "INC-009",
    title: "Instalación de software contable",
    client: "Contadores Asociados",
    category: "Software",
    status: "Asignada",
    priority: "Media",
    technician: "Ana López",
    createdAt: "2025-02-19",
    updatedAt: "2025-02-19",
  },
]

const availableTechnicians = [
  { id: 1, name: "Carlos Rodríguez", specialties: "Redes, Hardware", activeTickets: 2 },
  { id: 2, name: "Ana López", specialties: "Software, Instalaciones", activeTickets: 4 },
  { id: 3, name: "Miguel Torres", specialties: "Mantenimiento, Hardware", activeTickets: 1 },
]

export default function OperatorTicketsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [selectedTicket, setSelectedTicket] = useState<any>(null)

  const columns = [
    { key: "id", label: "ID" },
    { key: "title", label: "Problema" },
    { key: "client", label: "Cliente" },
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
    <div className="flex gap-2">
      <Button variant="ghost" size="sm" asChild>
        <a href={`/dashboard/operator/tickets/${row.id}`}>
          <Eye className="h-4 w-4" />
        </a>
      </Button>
      {row.status === "Nueva" && (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" onClick={() => setSelectedTicket(row)}>
              <UserPlus className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Asignar Técnico - {row.id}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Problema: {row.title}</h4>
                <p className="text-sm text-gray-600">Cliente: {row.client}</p>
                <div className="flex gap-2 mt-2">
                  <PriorityBadge priority={row.priority} />
                  <Badge variant="outline">{row.category}</Badge>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">Técnicos Disponibles:</h4>
                {availableTechnicians.map((tech) => (
                  <div key={tech.id} className="flex justify-between items-center p-3 border rounded">
                    <div>
                      <p className="font-medium">{tech.name}</p>
                      <p className="text-sm text-gray-600">{tech.specialties}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm">Tickets activos: {tech.activeTickets}</p>
                      <Button size="sm" className="mt-1">
                        Asignar
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )

  const filteredTickets = tickets.filter((ticket) => {
    const matchesSearch =
      ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.client.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || ticket.status === statusFilter
    const matchesPriority = priorityFilter === "all" || ticket.priority === priorityFilter
    return matchesSearch && matchesStatus && matchesPriority
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Gestión de Solicitudes</h1>
        <p className="text-gray-600">Administra todas las incidencias del sistema</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filtros y Búsqueda
          </CardTitle>
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center space-x-2">
              <Search className="h-4 w-4 text-gray-400" />
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
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filtrar por prioridad" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las prioridades</SelectItem>
                <SelectItem value="Crítica">Crítica</SelectItem>
                <SelectItem value="Alta">Alta</SelectItem>
                <SelectItem value="Media">Media</SelectItem>
                <SelectItem value="Baja">Baja</SelectItem>
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
