"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { TicketStatusBadge } from "@/components/tickets/ticket-status-badge"
import { PriorityBadge } from "@/components/tickets/priority-badge"
import { Separator } from "@/components/ui/separator"
import { User, MapPin, Calendar, Clock, MessageSquare, ArrowLeft, Phone, Mail } from "lucide-react"

// Importar useNotifications
import { useNotifications } from "@/components/notifications/notification-provider"

// Actualizar el técnico asignado a Amy Baque:
const ticketData = {
  id: "INC-001",
  title: "Problema con conexión a internet",
  description:
    "Tengo problemas constantes con la conexión a internet en mi oficina. La velocidad es muy lenta y se desconecta frecuentemente, especialmente durante las horas pico. Esto está afectando significativamente el trabajo diario de todo el equipo.",
  category: "Red/Conectividad",
  status: "En Progreso",
  priority: "Alta",
  technician: {
    name: "Amy Baque",
    email: "amy@empresa.com",
    phone: "+593 99 123 4567",
    specialties: ["Redes", "Hardware", "Conectividad"],
  },
  address: "Av. Principal 123, Oficina 4B, Quito",
  createdAt: "2025-01-15 09:30 AM",
  updatedAt: "2025-02-20 10:15 AM",
  scheduledDate: "2025-02-20 10:00 AM",
  estimatedResolution: "2025-02-21 12:00 PM",
  notes: [
    {
      id: 1,
      content: "He notado que el problema es más frecuente durante las mañanas y después del almuerzo.",
      author: "Cliente",
      createdAt: "2025-01-15 09:35 AM",
      type: "client",
    },
    {
      id: 2,
      content:
        "Revisé la configuración inicial del router. Detecté problemas en la configuración DNS. Procederé a realizar ajustes.",
      author: "Amy Baque",
      createdAt: "2025-02-20 10:15 AM",
      type: "technician",
    },
    {
      id: 3,
      content:
        "Configuré nuevos servidores DNS y optimicé la configuración del router. El problema debería estar resuelto.",
      author: "Amy Baque",
      createdAt: "2025-02-20 11:30 AM",
      type: "technician",
    },
  ],
}

export default function ClientTicketDetailPage() {
  const [newMessage, setNewMessage] = useState("")
  const [isSending, setIsSending] = useState(false)

  // En el componente, agregar:
  const { addNotification } = useNotifications()

  // Actualizar la función handleSendMessage:
  const handleSendMessage = async () => {
    if (!newMessage.trim()) return

    setIsSending(true)
    // Simular envío de mensaje
    setTimeout(() => {
      setIsSending(false)

      // Agregar notificación para el técnico
      addNotification({
        title: "Nuevo mensaje del cliente",
        message: `Tienes un nuevo mensaje en el ticket ${ticketData.id}`,
        type: "info",
        ticketId: ticketData.id,
        actionUrl: `/dashboard/technician/tasks/${ticketData.id}`,
      })

      setNewMessage("")
      alert("Mensaje enviado correctamente")
    }, 100)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" asChild>
            <a href="/dashboard/client/tickets">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver a Mis Solicitudes
            </a>
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">{ticketData.title}</h1>
            <p className="text-muted-foreground">Solicitud ID: {ticketData.id}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <PriorityBadge priority={ticketData.priority} />
          <TicketStatusBadge status={ticketData.status} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Ticket Description */}
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="text-foreground">Descripción del Problema</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground leading-relaxed">{ticketData.description}</p>
              <div className="mt-4 flex flex-wrap gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  Creado: {ticketData.createdAt}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  Última actualización: {ticketData.updatedAt}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Progress Timeline */}
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <MessageSquare className="h-5 w-5" />
                Historial de Comunicación
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {ticketData.notes.map((note, index) => (
                  <div key={note.id} className="relative">
                    {index !== ticketData.notes.length - 1 && (
                      <div className="absolute left-4 top-8 w-0.5 h-full bg-gray-200 dark:bg-gray-600"></div>
                    )}
                    <div className="flex gap-4">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
                          note.type === "client"
                            ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                            : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                        }`}
                      >
                        {note.type === "client" ? "C" : "T"}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <p className="font-medium text-sm text-foreground">{note.author}</p>
                          <p className="text-xs text-muted-foreground">{note.createdAt}</p>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                          <p className="text-foreground text-sm">{note.content}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Send Message */}
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="text-foreground">Enviar Mensaje</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="message" className="text-foreground">
                  Mensaje para el técnico
                </Label>
                <Textarea
                  id="message"
                  placeholder="Escribe tu mensaje, pregunta o comentario adicional..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  rows={4}
                />
              </div>
              <Button onClick={handleSendMessage} disabled={isSending || !newMessage.trim()}>
                <MessageSquare className="h-4 w-4 mr-2" />
                {isSending ? "Enviando..." : "Enviar Mensaje"}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Ticket Status */}
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="text-foreground">Estado de la Solicitud</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-foreground">Estado Actual</p>
                  <TicketStatusBadge status={ticketData.status} />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Prioridad</p>
                  <PriorityBadge priority={ticketData.priority} />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Categoría</p>
                  <Badge variant="outline">{ticketData.category}</Badge>
                </div>
              </div>
              <Separator />
              <div className="space-y-2 text-sm">
                <div>
                  <p className="font-medium text-foreground">Fecha programada:</p>
                  <p className="text-muted-foreground">{ticketData.scheduledDate}</p>
                </div>
                <div>
                  <p className="font-medium text-foreground">Resolución estimada:</p>
                  <p className="text-muted-foreground">{ticketData.estimatedResolution}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Technician Info */}
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <User className="h-5 w-5" />
                Técnico Asignado
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="font-semibold text-foreground">{ticketData.technician.name}</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {ticketData.technician.specialties.map((specialty, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {specialty}
                    </Badge>
                  ))}
                </div>
              </div>
              <Separator />
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-foreground">{ticketData.technician.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-foreground">{ticketData.technician.phone}</span>
                </div>
              </div>
              <div className="pt-2">
                <Button variant="outline" size="sm" className="w-full bg-transparent">
                  <Phone className="h-4 w-4 mr-2" />
                  Contactar Técnico
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Location */}
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <MapPin className="h-5 w-5" />
                Ubicación del Servicio
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-foreground mb-3">{ticketData.address}</p>
              <Button variant="outline" size="sm" className="w-full bg-transparent">
                <MapPin className="h-4 w-4 mr-2" />
                Ver en Mapa
              </Button>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="text-foreground">Acciones</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" size="sm" className="w-full bg-transparent">
                Descargar Reporte
              </Button>
              <Button variant="outline" size="sm" className="w-full bg-transparent">
                Reagendar Cita
              </Button>
              {ticketData.status === "Resuelta" && (
                <Button size="sm" className="w-full">
                  Calificar Servicio
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
