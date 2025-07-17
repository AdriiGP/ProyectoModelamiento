"use client"

import { useState } from "react"
import { DataTable } from "@/components/dashboard/data-table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PriorityBadge } from "@/components/tickets/priority-badge"
import { Search, Eye, Star } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const completedTasks = [
  {
    id: "INC-002",
    title: "Instalación de software contable",
    client: "Contadores Asociados",
    priority: "Media",
    status: "Resuelta",
    completedDate: "2025-01-18",
    duration: "2.5 horas",
    rating: 5,
    category: "Software",
    notes: "Instalación exitosa. Cliente satisfecho con el resultado.",
  },
  {
    id: "INC-004",
    title: "Reparación de impresora",
    client: "Oficina Legal",
    priority: "Alta",
    status: "Resuelta",
    completedDate: "2025-01-17",
    duration: "1.5 horas",
    rating: 4,
    category: "Hardware",
    notes: "Reemplazo de cartucho y limpieza general.",
  },
  {
    id: "INC-006",
    title: "Configuración de email corporativo",
    client: "Empresa XYZ",
    priority: "Media",
    status: "Resuelta",
    completedDate: "2025-01-16",
    duration: "3 horas",
    rating: 5,
    category: "Software",
    notes: "Configuración completa para 15 usuarios.",
  },
  {
    id: "INC-008",
    title: "Mantenimiento de servidores",
    client: "DataCenter Corp",
    priority: "Baja",
    status: "Resuelta",
    completedDate: "2025-01-15",
    duration: "4 horas",
    rating: 4,
    category: "Mantenimiento",
    notes: "Mantenimiento preventivo completado sin incidencias.",
  },
]

export default function TechnicianHistoryPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")

  const columns = [
    { key: "id", label: "ID" },
    { key: "title", label: "Tarea" },
    { key: "client", label: "Cliente" },
    {
      key: "priority",
      label: "Prioridad",
      render: (value: string) => <PriorityBadge priority={value} />,
    },
    { key: "category", label: "Categoría" },
    { key: "completedDate", label: "Completado" },
    { key: "duration", label: "Duración" },
    {
      key: "rating",
      label: "Calificación",
      render: (value: number) => (
        <div className="flex items-center gap-1">
          <span className="text-sm font-medium">{value}</span>
          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
        </div>
      ),
    },
  ]

  const actions = (row: any) => (
    <Button variant="ghost" size="sm" asChild>
      <a href={`/dashboard/technician/history/${row.id}`}>
        <Eye className="h-4 w-4" />
      </a>
    </Button>
  )

  const filteredTasks = completedTasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === "all" || task.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  const averageRating = completedTasks.reduce((sum, task) => sum + task.rating, 0) / completedTasks.length
  const totalHours = completedTasks.reduce((sum, task) => sum + Number.parseFloat(task.duration), 0)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Historial de Trabajos</h1>
        <p className="text-gray-600">Revisa tus tareas completadas y calificaciones</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{completedTasks.length}</div>
              <div className="text-sm text-gray-600">Tareas Completadas</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{totalHours.toFixed(1)}h</div>
              <div className="text-sm text-gray-600">Horas Trabajadas</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">{averageRating.toFixed(1)}</div>
              <div className="text-sm text-gray-600">Calificación Promedio</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {Math.round((totalHours / completedTasks.length) * 10) / 10}h
              </div>
              <div className="text-sm text-gray-600">Tiempo Promedio</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Historial de Tareas Completadas</CardTitle>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Search className="h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar en historial..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filtrar por categoría" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las categorías</SelectItem>
                <SelectItem value="Hardware">Hardware</SelectItem>
                <SelectItem value="Software">Software</SelectItem>
                <SelectItem value="Mantenimiento">Mantenimiento</SelectItem>
                <SelectItem value="Red/Conectividad">Red/Conectividad</SelectItem>
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
