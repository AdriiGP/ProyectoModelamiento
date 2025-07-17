"use client"

import { useState } from "react"
import { DataTable } from "@/components/dashboard/data-table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Search, Edit, CheckCircle } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const tasks = [
  {
    id: 1,
    task: "Revisar pedido #ORD-001",
    client: "María García",
    priority: "Alta",
    deadline: "2024-01-20",
    status: "Pendiente",
    category: "Ventas",
  },
  {
    id: 2,
    task: "Llamar a cliente Juan Pérez",
    client: "Juan Pérez",
    priority: "Media",
    deadline: "2024-01-21",
    status: "En progreso",
    category: "Soporte",
  },
  {
    id: 3,
    task: "Actualizar inventario productos",
    client: "-",
    priority: "Baja",
    deadline: "2024-01-22",
    status: "Completada",
    category: "Inventario",
  },
  {
    id: 4,
    task: "Preparar presentación Q1",
    client: "-",
    priority: "Alta",
    deadline: "2024-01-19",
    status: "En progreso",
    category: "Reportes",
  },
]

export default function TasksPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const columns = [
    { key: "task", label: "Tarea" },
    { key: "client", label: "Cliente" },
    {
      key: "priority",
      label: "Prioridad",
      render: (value: string) => {
        const variant = value === "Alta" ? "destructive" : value === "Media" ? "default" : "secondary"
        return <Badge variant={variant}>{value}</Badge>
      },
    },
    { key: "deadline", label: "Fecha límite" },
    {
      key: "status",
      label: "Estado",
      render: (value: string) => {
        const variant = value === "Completada" ? "default" : value === "En progreso" ? "secondary" : "outline"
        return <Badge variant={variant}>{value}</Badge>
      },
    },
    { key: "category", label: "Categoría" },
  ]

  const actions = (row: any) => (
    <div className="flex gap-2">
      <Button variant="ghost" size="sm">
        <Edit className="h-4 w-4" />
      </Button>
      {row.status !== "Completada" && (
        <Button variant="ghost" size="sm">
          <CheckCircle className="h-4 w-4" />
        </Button>
      )}
    </div>
  )

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.task.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.client.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || task.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Mis Tareas</h1>
          <p className="text-gray-600">Gestiona tus tareas y actividades</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Nueva Tarea
        </Button>
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
                <SelectItem value="Pendiente">Pendiente</SelectItem>
                <SelectItem value="En progreso">En progreso</SelectItem>
                <SelectItem value="Completada">Completada</SelectItem>
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
