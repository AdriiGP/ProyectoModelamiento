"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TicketStatusBadge } from "@/components/tickets/ticket-status-badge"
import { PriorityBadge } from "@/components/tickets/priority-badge"
import { Separator } from "@/components/ui/separator"
import { User, MapPin, Calendar, Clock, Star, ArrowLeft, CheckCircle, FileText, Camera } from "lucide-react"

// Datos simulados del trabajo completado
const completedTaskData = {
  id: "INC-002",
  title: "Instalación de software contable",
  description:
    "Instalación y configuración completa del software contable QuickBooks para la empresa. Incluye migración de datos desde el sistema anterior y capacitación básica al personal.",
  category: "Software",
  status: "Resuelta",
  priority: "Media",
  client: {
    name: "Contadores Asociados",
    email: "admin@contadores.com",
    phone: "+593 99 234 5678",
    company: "Contadores Asociados S.A.",
  },
  address: "Av. Amazonas 456, Oficina 302, Quito",
  createdAt: "2025-01-16 08:00 AM",
  completedAt: "2025-01-18 04:30 PM",
  scheduledDate: "2025-01-18 09:00 AM",
  duration: "2.5 horas",
  rating: 5,
  clientFeedback:
    "Excelente trabajo. El técnico fue muy profesional y explicó todo el proceso claramente. El software funciona perfectamente.",
  workSummary:
    "Instalación exitosa del software QuickBooks Pro 2024. Se realizó la migración completa de datos desde Excel, configuración de cuentas contables, y capacitación a 3 usuarios. Sistema funcionando correctamente.",
  notes: [
    {
      id: 1,
      content: "Necesitamos migrar los datos desde Excel y capacitar al personal en el uso básico.",
      author: "Cliente",
      createdAt: "2025-01-16 08:15 AM",
      type: "client",
    },
    {
      id: 2,
      content: "Iniciando instalación del software. Verificando compatibilidad del sistema.",
      author: "Carlos Rodríguez",
      createdAt: "2025-01-18 09:15 AM",
      type: "technician",
    },
    {
      id: 3,
      content: "Software instalado correctamente. Procediendo con la migración de datos.",
      author: "Carlos Rodríguez",
      createdAt: "2025-01-18 11:00 AM",
      type: "technician",
    },
    {
      id: 4,
      content: "Migración completada. Realizando capacitación al personal.",
      author: "Carlos Rodríguez",
      createdAt: "2025-01-18 02:00 PM",
      type: "technician",
    },
    {
      id: 5,
      content: "Trabajo completado. Sistema funcionando correctamente. Personal capacitado.",
      author: "Carlos Rodríguez",
      createdAt: "2025-01-18 04:30 PM",
      type: "technician",
    },
  ],
  attachments: ["Manual_Usuario_QuickBooks.pdf", "Configuracion_Cuentas.xlsx", "Evidencia_Instalacion.jpg"],
  timeBreakdown: [
    { activity: "Instalación del software", time: "45 min" },
    { activity: "Migración de datos", time: "60 min" },
    { activity: "Configuración inicial", time: "30 min" },
    { activity: "Capacitación al personal", time: "35 min" },
  ],
}

export default function CompletedTaskDetailPage() {
  const [showFullFeedback, setShowFullFeedback] = useState(false)

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300 dark:text-gray-600"}`}
      />
    ))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" asChild>
            <a href="/dashboard/technician/history">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver al Historial
            </a>
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">{completedTaskData.title}</h1>
            <p className="text-muted-foreground">Trabajo ID: {completedTaskData.id}</p>
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <CheckCircle className="h-5 w-5 text-green-600" />
          <PriorityBadge priority={completedTaskData.priority} />
          <TicketStatusBadge status={completedTaskData.status} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Task Summary */}
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <CheckCircle className="h-5 w-5 text-green-600" />
                Resumen del Trabajo Completado
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-foreground mb-2">Descripción Original:</h4>
                <p className="text-foreground">{completedTaskData.description}</p>
              </div>

              <Separator />

              <div>
                <h4 className="font-semibold text-foreground mb-2">Trabajo Realizado:</h4>
                <p className="text-foreground">{completedTaskData.workSummary}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium text-foreground">Fecha de Inicio:</p>
                    <p className="text-muted-foreground">{completedTaskData.createdAt}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium text-foreground">Completado:</p>
                    <p className="text-muted-foreground">{completedTaskData.completedAt}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Time Breakdown */}
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="text-foreground">Desglose de Tiempo</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {completedTaskData.timeBreakdown.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                  >
                    <span className="text-foreground">{item.activity}</span>
                    <Badge variant="outline">{item.time}</Badge>
                  </div>
                ))}
                <Separator />
                <div className="flex justify-between items-center font-semibold">
                  <span className="text-foreground">Tiempo Total:</span>
                  <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                    {completedTaskData.duration}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Client Feedback */}
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <Star className="h-5 w-5 text-yellow-500" />
                Calificación del Cliente
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">{renderStars(completedTaskData.rating)}</div>
                <span className="text-2xl font-bold text-foreground">{completedTaskData.rating}/5</span>
              </div>

              <div>
                <h4 className="font-semibold text-foreground mb-2">Comentarios del Cliente:</h4>
                <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-400 p-4 rounded">
                  <p className="text-foreground italic">
                    {showFullFeedback
                      ? completedTaskData.clientFeedback
                      : `${completedTaskData.clientFeedback.substring(0, 150)}...`}
                  </p>
                  {completedTaskData.clientFeedback.length > 150 && (
                    <Button
                      variant="link"
                      size="sm"
                      onClick={() => setShowFullFeedback(!showFullFeedback)}
                      className="p-0 h-auto mt-2"
                    >
                      {showFullFeedback ? "Ver menos" : "Ver más"}
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Work History */}
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="text-foreground">Historial del Trabajo</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {completedTaskData.notes.map((note, index) => (
                  <div key={note.id} className="relative">
                    {index !== completedTaskData.notes.length - 1 && (
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
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Task Status */}
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="text-foreground">Estado del Trabajo</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-foreground">Estado</p>
                  <TicketStatusBadge status={completedTaskData.status} />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Prioridad</p>
                  <PriorityBadge priority={completedTaskData.priority} />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Categoría</p>
                  <Badge variant="outline">{completedTaskData.category}</Badge>
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Duración</p>
                  <Badge variant="secondary">{completedTaskData.duration}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

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
                <p className="font-semibold text-foreground">{completedTaskData.client.name}</p>
                <p className="text-sm text-muted-foreground">{completedTaskData.client.company}</p>
              </div>
              <Separator />
              <div className="space-y-2 text-sm">
                <p className="text-foreground">
                  <span className="font-medium">Email:</span> {completedTaskData.client.email}
                </p>
                <p className="text-foreground">
                  <span className="font-medium">Teléfono:</span> {completedTaskData.client.phone}
                </p>
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
              <p className="text-sm text-foreground">{completedTaskData.address}</p>
            </CardContent>
          </Card>

          {/* Attachments */}
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <FileText className="h-5 w-5" />
                Archivos Adjuntos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {completedTaskData.attachments.map((file, index) => (
                  <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-700 rounded">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-foreground flex-1">{file}</span>
                    <Button variant="ghost" size="sm">
                      Descargar
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="text-foreground">Acciones</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" size="sm" className="w-full bg-transparent">
                <FileText className="h-4 w-4 mr-2" />
                Generar Reporte
              </Button>
              <Button variant="outline" size="sm" className="w-full bg-transparent">
                <Camera className="h-4 w-4 mr-2" />
                Ver Evidencias
              </Button>
              <Button variant="outline" size="sm" className="w-full bg-transparent">
                Compartir Trabajo
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
