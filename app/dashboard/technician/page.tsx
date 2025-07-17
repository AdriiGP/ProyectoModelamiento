import { StatsCard } from "@/components/dashboard/stats-card"
import { DataTable } from "@/components/dashboard/data-table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TicketStatusBadge } from "@/components/tickets/ticket-status-badge"
import { PriorityBadge } from "@/components/tickets/priority-badge"
import { Wrench, Clock, CheckCircle, AlertTriangle, Calendar } from "lucide-react"

const assignedTasks = [
  {
    id: "INC-001",
    title: "Problema con conexión a internet",
    client: "María García",
    priority: "Alta",
    status: "En Progreso",
    scheduledDate: "2024-01-20",
    address: "Av. Principal 123, Oficina 4B",
  },
  {
    id: "INC-005",
    title: "Instalación de nuevo servidor",
    client: "Tech Solutions Corp",
    priority: "Media",
    status: "Asignada",
    scheduledDate: "2024-01-21",
    address: "Calle Comercio 456, Piso 2",
  },
  {
    id: "INC-007",
    title: "Mantenimiento preventivo",
    client: "Juan Pérez",
    priority: "Baja",
    status: "Asignada",
    scheduledDate: "2024-01-22",
    address: "Residencial Los Pinos, Casa 15",
  },
]

const todaySchedule = [
  {
    time: "09:00 AM",
    client: "María García",
    task: "Revisión conexión internet",
    address: "Av. Principal 123",
    status: "En progreso",
  },
  {
    time: "02:00 PM",
    client: "Carlos López",
    task: "Instalación software",
    address: "Centro Empresarial, Of. 301",
    status: "Pendiente",
  },
]

export default function TechnicianDashboard() {
  const taskColumns = [
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
  ]

  const scheduleColumns = [
    { key: "time", label: "Hora" },
    { key: "client", label: "Cliente" },
    { key: "task", label: "Tarea" },
    { key: "address", label: "Dirección" },
  ]

  const taskActions = (row: any) => (
    <Button variant="ghost" size="sm" asChild>
      <a href={`/dashboard/technician/tasks/${row.id}`}>Ver Detalle</a>
    </Button>
  )

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Técnico</h1>
        <p className="text-gray-600">Gestiona tus tareas asignadas y horarios</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Tareas Asignadas"
          value="8"
          description="Pendientes y en progreso"
          icon={Wrench}
          trend={{ value: 2, isPositive: true }}
        />
        <StatsCard
          title="En Progreso"
          value="3"
          description="Trabajos activos"
          icon={Clock}
          trend={{ value: 1, isPositive: true }}
        />
        <StatsCard
          title="Completadas Hoy"
          value="5"
          description="Tareas finalizadas"
          icon={CheckCircle}
          trend={{ value: 25, isPositive: true }}
        />
        <StatsCard
          title="Urgentes"
          value="2"
          description="Prioridad alta"
          icon={AlertTriangle}
          trend={{ value: -1, isPositive: false }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Assigned Tasks */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Wrench className="h-5 w-5" />
              Mis Tareas Asignadas
            </CardTitle>
            <Button variant="outline" size="sm" asChild>
              <a href="/dashboard/technician/tasks">Ver todas</a>
            </Button>
          </CardHeader>
          <CardContent>
            <DataTable columns={taskColumns} data={assignedTasks} actions={taskActions} />
          </CardContent>
        </Card>

        {/* Today's Schedule */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Agenda de Hoy
            </CardTitle>
            <Button variant="outline" size="sm" asChild>
              <a href="/dashboard/technician/schedule">Ver calendario</a>
            </Button>
          </CardHeader>
          <CardContent>
            <DataTable columns={scheduleColumns} data={todaySchedule} />
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
            <Button className="h-20 flex flex-col gap-2" asChild>
              <a href="/dashboard/technician/tasks">
                <Wrench className="h-6 w-6" />
                Ver Tareas
              </a>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2 bg-transparent" asChild>
              <a href="/dashboard/technician/schedule">
                <Calendar className="h-6 w-6" />
                Mi Calendario
              </a>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2 bg-transparent" asChild>
              <a href="/dashboard/technician/history">
                <CheckCircle className="h-6 w-6" />
                Historial
              </a>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2 bg-transparent" asChild>
              <a href="/dashboard/technician/reports">
                <AlertTriangle className="h-6 w-6" />
                Reportar Problema
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
