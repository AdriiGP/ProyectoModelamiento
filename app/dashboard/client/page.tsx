import { StatsCard } from "@/components/dashboard/stats-card"
import { DataTable } from "@/components/dashboard/data-table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TicketStatusBadge } from "@/components/tickets/ticket-status-badge"
import { AlertCircle, Clock, CheckCircle, Calendar, Plus } from "lucide-react"

const recentTickets = [
  {
    id: "INC-001",
    title: "Problema con conexión a internet",
    status: "En Progreso",
    priority: "Alta",
    createdAt: "2025-01-15",
    technician: "Carlos Rodríguez",
  },
  {
    id: "INC-002",
    title: "Instalación de software",
    status: "Resuelta",
    priority: "Media",
    createdAt: "2025-01-12",
    technician: "Ana López",
  },
  {
    id: "INC-003",
    title: "Mantenimiento preventivo",
    status: "Asignada",
    priority: "Baja",
    createdAt: "2025-01-10",
    technician: "Miguel Torres",
  },
]

const upcomingAppointments = [
  {
    id: 1,
    service: "Revisión técnica",
    date: "2025-02-20",
    time: "10:00 AM",
    technician: "Carlos Rodríguez",
    status: "Confirmada",
  },
  {
    id: 2,
    service: "Instalación equipos",
    date: "2025-02-22",
    time: "2:00 PM",
    technician: "Ana López",
    status: "Pendiente",
  },
]

export default function ClientDashboard() {
  const ticketColumns = [
    { key: "id", label: "ID" },
    { key: "title", label: "Problema" },
    {
      key: "status",
      label: "Estado",
      render: (value: string) => <TicketStatusBadge status={value} />,
    },
    { key: "technician", label: "Técnico" },
    { key: "createdAt", label: "Fecha" },
  ]

  const appointmentColumns = [
    { key: "service", label: "Servicio" },
    { key: "date", label: "Fecha" },
    { key: "time", label: "Hora" },
    { key: "technician", label: "Técnico" },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard Cliente</h1>
        <p className="text-muted-foreground">Bienvenido, aquí tienes un resumen de tus solicitudes</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Solicitudes Activas"
          value="3"
          description="En proceso"
          icon={AlertCircle}
          trend={{ value: 0, isPositive: true }}
        />
        <StatsCard
          title="Pendientes"
          value="1"
          description="Por asignar"
          icon={Clock}
          trend={{ value: -1, isPositive: false }}
        />
        <StatsCard
          title="Resueltas"
          value="12"
          description="Este mes"
          icon={CheckCircle}
          trend={{ value: 20, isPositive: true }}
        />
        <StatsCard
          title="Próximas Citas"
          value="2"
          description="Esta semana"
          icon={Calendar}
          trend={{ value: 1, isPositive: true }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Tickets */}
        <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-foreground">
              <AlertCircle className="h-5 w-5" />
              Solicitudes Recientes
            </CardTitle>
            <Button variant="outline" size="sm" asChild>
              <a href="/dashboard/client/tickets">Ver todas</a>
            </Button>
          </CardHeader>
          <CardContent>
            <DataTable columns={ticketColumns} data={recentTickets} />
          </CardContent>
        </Card>

        {/* Upcoming Appointments */}
        <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Calendar className="h-5 w-5" />
              Próximas Citas
            </CardTitle>
            <Button variant="outline" size="sm" asChild>
              <a href="/dashboard/client/appointments">Gestionar</a>
            </Button>
          </CardHeader>
          <CardContent>
            <DataTable columns={appointmentColumns} data={upcomingAppointments} />
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-foreground">Acciones Rápidas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button className="h-20 flex flex-col gap-2" asChild>
              <a href="/dashboard/client/new-ticket">
                <Plus className="h-6 w-6" />
                Reportar Incidencia
              </a>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2 bg-transparent" asChild>
              <a href="/dashboard/client/appointments">
                <Calendar className="h-6 w-6" />
                Agendar Cita
              </a>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2 bg-transparent" asChild>
              <a href="/dashboard/client/tickets">
                <AlertCircle className="h-6 w-6" />
                Mis Solicitudes
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
