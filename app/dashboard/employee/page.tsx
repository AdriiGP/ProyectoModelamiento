import { StatsCard } from "@/components/dashboard/stats-card"
import { DataTable } from "@/components/dashboard/data-table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckSquare, Clock, Users, BarChart3, Calendar } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const todayTasks = [
  { id: 1, task: "Revisar pedido #ORD-001", priority: "Alta", deadline: "10:00 AM", status: "Pendiente" },
  { id: 2, task: "Llamar a cliente Juan Pérez", priority: "Media", deadline: "2:00 PM", status: "En progreso" },
  { id: 3, task: "Actualizar inventario", priority: "Baja", deadline: "5:00 PM", status: "Completada" },
]

const assignedClients = [
  { id: 1, name: "María García", company: "Tech Solutions", lastContact: "2024-01-15", status: "Activo" },
  { id: 2, name: "Carlos López", company: "Digital Corp", lastContact: "2024-01-14", status: "Seguimiento" },
  { id: 3, name: "Ana Martínez", company: "Innovation Ltd", lastContact: "2024-01-12", status: "Activo" },
]

export default function EmployeeDashboard() {
  const taskColumns = [
    { key: "task", label: "Tarea" },
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
  ]

  const clientColumns = [
    { key: "name", label: "Cliente" },
    { key: "company", label: "Empresa" },
    { key: "lastContact", label: "Último contacto" },
    {
      key: "status",
      label: "Estado",
      render: (value: string) => <Badge variant={value === "Activo" ? "default" : "secondary"}>{value}</Badge>,
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Empleado</h1>
        <p className="text-gray-600">Gestiona tus tareas y clientes asignados</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard title="Tareas Pendientes" value="8" description="Para hoy" icon={CheckSquare} />
        <StatsCard title="En Progreso" value="3" description="Tareas activas" icon={Clock} />
        <StatsCard title="Clientes Asignados" value="15" description="Clientes activos" icon={Users} />
        <StatsCard title="Completadas" value="24" description="Esta semana" icon={BarChart3} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Tasks */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <CheckSquare className="h-5 w-5" />
              Tareas de Hoy
            </CardTitle>
            <Button variant="outline" size="sm">
              Ver todas
            </Button>
          </CardHeader>
          <CardContent>
            <DataTable columns={taskColumns} data={todayTasks} />
          </CardContent>
        </Card>

        {/* Assigned Clients */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Clientes Asignados
            </CardTitle>
            <Button variant="outline" size="sm">
              Ver todos
            </Button>
          </CardHeader>
          <CardContent>
            <DataTable columns={clientColumns} data={assignedClients} />
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Acciones Rápidas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Button className="h-20 flex flex-col gap-2">
              <CheckSquare className="h-6 w-6" />
              Nueva Tarea
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2 bg-transparent">
              <Calendar className="h-6 w-6" />
              Mi Calendario
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2 bg-transparent">
              <Users className="h-6 w-6" />
              Contactar Cliente
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2 bg-transparent">
              <BarChart3 className="h-6 w-6" />
              Generar Reporte
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
