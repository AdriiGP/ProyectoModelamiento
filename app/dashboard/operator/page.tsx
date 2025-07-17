import { StatsCard } from "@/components/dashboard/stats-card"
import { DataTable } from "@/components/dashboard/data-table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TicketStatusBadge } from "@/components/tickets/ticket-status-badge"
import { PriorityBadge } from "@/components/tickets/priority-badge"
import { AlertCircle, Users, CheckCircle, Clock, TrendingUp, Activity } from "lucide-react"

// Actualizar fechas
const recentTickets = [
  {
    id: "INC-008",
    title: "Falla crítica en servidor principal",
    client: "TechCorp Solutions",
    priority: "Crítica",
    status: "Nueva",
    createdAt: "2025-02-20 08:30 AM",
    technician: "Sin asignar",
  },
  {
    id: "INC-009",
    title: "Instalación de software contable",
    client: "Contadores Asociados",
    priority: "Media",
    status: "Asignada",
    createdAt: "2025-02-20 07:15 AM",
    technician: "Ana López",
  },
  {
    id: "INC-010",
    title: "Mantenimiento preventivo",
    client: "Oficinas Centrales",
    priority: "Baja",
    status: "En Progreso",
    createdAt: "2025-02-19 16:45 PM",
    technician: "Miguel Torres",
  },
]

const availableTechnicians = [
  {
    id: 1,
    name: "Carlos Rodríguez",
    specialties: "Redes, Hardware",
    status: "Disponible",
    activeTickets: 2,
    location: "Zona Norte",
  },
  {
    id: 2,
    name: "Ana López",
    specialties: "Software, Instalaciones",
    status: "Ocupado",
    activeTickets: 4,
    location: "Centro",
  },
  {
    id: 3,
    name: "Miguel Torres",
    specialties: "Mantenimiento, Hardware",
    status: "Disponible",
    activeTickets: 1,
    location: "Zona Sur",
  },
]

const dailyMetrics = [
  { metric: "Solicitudes Nuevas", value: 12, change: "+3" },
  { metric: "Resueltas Hoy", value: 18, change: "+5" },
  { metric: "Tiempo Promedio", value: "2.5h", change: "-0.3h" },
  { metric: "Satisfacción", value: "94%", change: "+2%" },
]

export default function OperatorDashboard() {
  const ticketColumns = [
    { key: "id", label: "ID" },
    { key: "title", label: "Problema" },
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
    { key: "technician", label: "Técnico" },
    { key: "createdAt", label: "Creado" },
  ]

  const technicianColumns = [
    { key: "name", label: "Técnico" },
    { key: "specialties", label: "Especialidades" },
    {
      key: "status",
      label: "Estado",
      render: (value: string) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            value === "Disponible"
              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
              : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
          }`}
        >
          {value}
        </span>
      ),
    },
    { key: "activeTickets", label: "Tickets Activos" },
    { key: "location", label: "Ubicación" },
  ]

  const metricsColumns = [
    { key: "metric", label: "Métrica" },
    { key: "value", label: "Valor" },
    { key: "change", label: "Cambio" },
  ]

  const ticketActions = (row: any) => (
    <div className="flex gap-2">
      <Button variant="ghost" size="sm" asChild>
        <a href={`/dashboard/operator/tickets/${row.id}`}>Ver</a>
      </Button>
      {row.status === "Nueva" && (
        <Button variant="outline" size="sm">
          Asignar
        </Button>
      )}
    </div>
  )

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard Operador</h1>
        <p className="text-muted-foreground">Panel de control y métricas del sistema</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Solicitudes Nuevas"
          value="15"
          description="Sin asignar"
          icon={AlertCircle}
          trend={{ value: 8, isPositive: true }}
        />
        <StatsCard
          title="Técnicos Disponibles"
          value="6"
          description="De 12 total"
          icon={Users}
          trend={{ value: 2, isPositive: true }}
        />
        <StatsCard
          title="Resueltas Hoy"
          value="28"
          description="Completadas"
          icon={CheckCircle}
          trend={{ value: 15, isPositive: true }}
        />
        <StatsCard
          title="Tiempo Promedio"
          value="2.3h"
          description="Resolución"
          icon={Clock}
          trend={{ value: -12, isPositive: false }}
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
              <a href="/dashboard/operator/tickets">Ver todas</a>
            </Button>
          </CardHeader>
          <CardContent>
            <DataTable columns={ticketColumns} data={recentTickets} actions={ticketActions} />
          </CardContent>
        </Card>

        {/* Available Technicians */}
        <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Users className="h-5 w-5" />
              Estado de Técnicos
            </CardTitle>
            <Button variant="outline" size="sm" asChild>
              <a href="/dashboard/operator/technicians">Gestionar</a>
            </Button>
          </CardHeader>
          <CardContent>
            <DataTable columns={technicianColumns} data={availableTechnicians} />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Metrics */}
        <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <TrendingUp className="h-5 w-5" />
              Métricas del Día
            </CardTitle>
          </CardHeader>
          <CardContent>
            <DataTable columns={metricsColumns} data={dailyMetrics} />
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="text-foreground">Acciones Rápidas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <Button className="h-20 flex flex-col gap-2" asChild>
                <a href="/dashboard/operator/tickets">
                  <AlertCircle className="h-6 w-6" />
                  Gestionar Solicitudes
                </a>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col gap-2 bg-transparent" asChild>
                <a href="/dashboard/operator/technicians">
                  <Users className="h-6 w-6" />
                  Gestionar Técnicos
                </a>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col gap-2 bg-transparent" asChild>
                <a href="/dashboard/operator/reports">
                  <TrendingUp className="h-6 w-6" />
                  Generar Reportes
                </a>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col gap-2 bg-transparent" asChild>
                <a href="/dashboard/operator/users">
                  <Activity className="h-6 w-6" />
                  Gestionar Usuarios
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
