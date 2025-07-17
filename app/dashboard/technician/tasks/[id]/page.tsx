"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TicketStatusBadge } from "@/components/tickets/ticket-status-badge"
import { PriorityBadge } from "@/components/tickets/priority-badge"
import { Separator } from "@/components/ui/separator"
import { User, MapPin, Calendar, Clock, Camera, Save, ArrowLeft } from "lucide-react"

// Importar useNotifications
import { useNotifications } from "@/components/notifications/notification-provider"

// Actualizar las notas para mostrar Amy Baque:
const ticketData = {
  id: "INC-001",
  title: "Problema con conexión a internet",
  description:
    "El cliente reporta intermitencias constantes en la conexión a internet. La velocidad es muy lenta y se desconecta frecuentemente. Afecta el trabajo diario de la oficina.",
  category: "Red/Conectividad",
  status: "En Progreso",
  priority: "Alta",
  client: {
    name: "María García",
    email: "maria.garcia@empresa.com",
    phone: "+593 99 123 4567",
    company: "Empresa ABC",
  },
  address: "Av. Principal 123, Oficina 4B, Quito",
  createdAt: "2025-01-15 09:30 AM",
  scheduledDate: "2025-02-20 10:00 AM",
  notes: [
    {
      id: 1,
      content: "Cliente reporta que el problema comenzó hace 3 días",
      author: "María García",
      createdAt: "2025-01-15 09:35 AM",
      type: "client",
    },
    {
      id: 2,
      content: "Revisé configuración inicial del router. Detecté problemas en la configuración DNS.",
      author: "Amy Baque",
      createdAt: "2025-02-20 10:15 AM",
      type: "technician",
    },
  ],
}

export default function TaskDetailPage() {
  const [status, setStatus] = useState(ticketData.status)
  const [newNote, setNewNote] = useState("")
  const [isSaving, setIsSaving] = useState(false)

  // En el componente, agregar:
  const { addNotification } = useNotifications()

  // Actualizar la función handleAddNote:
  const handleAddNote = async () => {
    if (!newNote.trim()) return

    setIsSaving(true)
    // Simular agregar nota
    setTimeout(() => {
      setIsSaving(false)

      // Agregar notificación
      addNotification({
        title: "Nota agregada",
        message: `Amy Baque agregó una nueva nota al ticket ${ticketData.id}`,
        type: "success",
        ticketId: ticketData.id,
        actionUrl: `/dashboard/client/tickets/${ticketData.id}`,
      })

      setNewNote("")
      alert("Nota agregada correctamente")
    }, 100)
  }

  // Actualizar la función handleStatusUpdate:
  const handleStatusUpdate = async () => {
    setIsSaving(true)
    // Simular actualización
    setTimeout(() => {
      setIsSaving(false)

      // Agregar notificación
      addNotification({
        title: "Estado actualizado",
        message: `Amy Baque cambió el estado del ticket ${ticketData.id} a "${status}"`,
        type: "info",
        ticketId: ticketData.id,
        actionUrl: `/dashboard/client/tickets/${ticketData.id}`,
      })

      alert("Estado actualizado correctamente")
    }, 100)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" asChild>
            <a href="/dashboard/technician/tasks">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver
            </a>
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">{ticketData.title}</h1>
            <p className="text-muted-foreground">ID: {ticketData.id}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <PriorityBadge priority={ticketData.priority} />
          <TicketStatusBadge status={status} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Task Description */}
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="text-foreground">Descripción del Problema</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground">{ticketData.description}</p>
              <div className="mt-4 flex gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  Creado: {ticketData.createdAt}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  Programado: {ticketData.scheduledDate}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Status Update */}
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="text-foreground">Actualizar Estado</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="status" className="text-foreground">
                  Estado de la Tarea
                </Label>
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Asignada">Asignada</SelectItem>
                    <SelectItem value="En Progreso">En Progreso</SelectItem>
                    <SelectItem value="Resuelta">Resuelta</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleStatusUpdate} disabled={isSaving}>
                <Save className="h-4 w-4 mr-2" />
                {isSaving ? "Guardando..." : "Actualizar Estado"}
              </Button>
            </CardContent>
          </Card>

          {/* Add Note */}
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="text-foreground">Agregar Nota de Trabajo</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="note" className="text-foreground">
                  Descripción del trabajo realizado
                </Label>
                <Textarea
                  id="note"
                  placeholder="Describe el trabajo realizado, hallazgos, soluciones aplicadas..."
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  rows={4}
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={handleAddNote} disabled={isSaving || !newNote.trim()}>
                  <Save className="h-4 w-4 mr-2" />
                  {isSaving ? "Guardando..." : "Agregar Nota"}
                </Button>
                <Button variant="outline">
                  <Camera className="h-4 w-4 mr-2" />
                  Adjuntar Evidencia
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Client Info */}
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <User className="h-5 w-5" />
                Información del Cliente
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="font-semibold text-foreground">{ticketData.client.name}</p>
                <p className="text-sm text-muted-foreground">{ticketData.client.company}</p>
              </div>
              <Separator />
              <div className="space-y-2 text-sm">
                <p className="text-foreground">
                  <span className="font-medium">Email:</span> {ticketData.client.email}
                </p>
                <p className="text-foreground">
                  <span className="font-medium">Teléfono:</span> {ticketData.client.phone}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Location */}
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <MapPin className="h-5 w-5" />
                Ubicación
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-foreground">{ticketData.address}</p>
              <Button variant="outline" size="sm" className="mt-2 w-full bg-transparent">
                Ver en Mapa
              </Button>
            </CardContent>
          </Card>

          {/* Task Details */}
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="text-foreground">Detalles de la Tarea</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm font-medium text-foreground">Categoría</p>
                <Badge variant="outline">{ticketData.category}</Badge>
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Prioridad</p>
                <PriorityBadge priority={ticketData.priority} />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Estado Actual</p>
                <TicketStatusBadge status={status} />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Notes History */}
      <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-foreground">Historial de Notas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {ticketData.notes.map((note) => (
              <div key={note.id} className="border-l-4 border-blue-200 dark:border-blue-600 pl-4 py-2">
                <div className="flex justify-between items-start mb-2">
                  <p className="font-medium text-sm text-foreground">{note.author}</p>
                  <p className="text-xs text-muted-foreground">{note.createdAt}</p>
                </div>
                <p className="text-foreground">{note.content}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
