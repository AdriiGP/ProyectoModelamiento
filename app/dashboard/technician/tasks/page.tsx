"use client"

import { useState } from "react"
import { DataTable } from "@/components/dashboard/data-table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TicketStatusBadge } from "@/components/tickets/ticket-status-badge"
import { PriorityBadge } from "@/components/tickets/priority-badge"
import { Search, Eye, MapPin } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const tasks = [
  {
    id: "INC-001",
    title: "Problema con conexión a internet",
    client: "María García",
    clientPhone: "+593 99 123 4567",
    priority: "Alta",
    status: "En Progreso",
    scheduledDate: "2025-02-20",
    scheduledTime: "10:00 AM",
    address: "Av. Principal 123, Oficina 4B",
    category: "Red/Conectividad",
    estimatedDuration: "2 horas",
  },
  {
    id: "INC-005",
    title: "Instalación de nuevo servidor",
    client: "Tech Solutions Corp",
    clientPhone: "+593 99 234 5678",
    priority: "Media",
    status: "Asignada",
    scheduledDate: "2025-02-21",
    scheduledTime: "09:00 AM",
    address: "Calle Comercio 456, Piso 2",
    category: "Hardware",
    estimatedDuration: "4 horas",
  },
  {
    id: "INC-007",
    title: "Mantenimiento preventivo equipos",
    client: "Juan Pérez",
    clientPhone: "+593 99 345 6789",
    priority: "Baja",
    status: "Asignada",
    scheduledDate: "2025-02-22",
    scheduledTime: "02:00 PM",
    address: "Residencial Los Pinos, Casa 15",
    category: "Mantenimiento",
    estimatedDuration: "3 horas",
  },
  {
    id: "INC-012",
    title: "Configuración de red empresarial",
    client: "Oficinas Centrales",
    clientPhone: "+593 99 456 7890",
    priority: "Alta",
    status: "Asignada",
    scheduledDate: "2025-02-23",
    scheduledTime: "08:00 AM",
    address: "Torre Empresarial, Piso 15",
    category: "Red/Conectividad",
    estimatedDuration: "6 horas",
  },
]

export default function TechnicianTasksPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const columns = [
    { key: "id", label: "ID" },
    { key: "title", label: "Tarea" },
    { key: "client", label: "Cliente" },
    {
      key: "priority",
      label: "Prioridad",
      render: (value: string) => <PriorityBadge priority={value} />,
    },
    {
      key: "status",
      label: "Estado",
      render: (value: string) => <TicketStatusBadge status={value} />,
    },
    { key: "scheduledDate", label: "Fecha" },
    { key: "scheduledTime", label: "Hora" },
    { key: "estimatedDuration", label: "Duración Est." },
  ]

  const actions = (row: any) => (
    <div className="flex gap-2">
      <Button variant="ghost" size="sm" asChild>
        <a href={`/dashboard/technician/tasks/${row.id}`}>
          <Eye className="h-4 w-4" />
        </a>
      </Button>
      <Button variant="ghost" size="sm" title="Ver ubicación">
        <MapPin className="h-4 w-4" />
      </Button>
    </div>
  )

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || task.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Mis Tareas Asignadas</h1>
        <p className="text-gray-600">Gestiona tus asignaciones y horarios de trabajo</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Tareas</CardTitle>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Search className="h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar tareas..."
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
                <SelectItem value="Asignada">Asignada</SelectItem>
                <SelectItem value="En Progreso">En Progreso</SelectItem>
                <SelectItem value="Resuelta">Resuelta</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={filteredTasks} actions={actions} />
        </CardContent>
      </Card>
    </div>
  )
}
