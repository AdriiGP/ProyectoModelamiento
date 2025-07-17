"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin, Phone, User } from "lucide-react"

// Actualizar fechas y números de teléfono
const scheduleData = [
  {
    date: "2025-02-20",
    appointments: [
      {
        id: "INC-001",
        time: "10:00 AM",
        duration: "2 horas",
        client: "María García",
        phone: "+593 99 123 4567",
        title: "Problema con conexión a internet",
        address: "Av. Principal 123, Oficina 4B",
        priority: "Alta",
        status: "En Progreso",
      },
      {
        id: "INC-013",
        time: "02:00 PM",
        duration: "1.5 horas",
        client: "Carlos López",
        phone: "+593 99 234 5678",
        title: "Instalación de antivirus",
        address: "Centro Empresarial, Of. 301",
        priority: "Media",
        status: "Asignada",
      },
    ],
  },
  {
    date: "2025-02-21",
    appointments: [
      {
        id: "INC-005",
        time: "09:00 AM",
        duration: "4 horas",
        client: "Tech Solutions Corp",
        phone: "+593 99 345 6789",
        title: "Instalación de nuevo servidor",
        address: "Calle Comercio 456, Piso 2",
        priority: "Media",
        status: "Asignada",
      },
    ],
  },
  {
    date: "2025-02-22",
    appointments: [
      {
        id: "INC-007",
        time: "02:00 PM",
        duration: "3 horas",
        client: "Juan Pérez",
        phone: "+593 99 456 7890",
        title: "Mantenimiento preventivo equipos",
        address: "Residencial Los Pinos, Casa 15",
        priority: "Baja",
        status: "Asignada",
      },
    ],
  },
]

export default function TechnicianSchedulePage() {
  const [selectedDate, setSelectedDate] = useState("2025-02-20")

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("es-ES", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Alta":
        return "destructive"
      case "Media":
        return "default"
      case "Baja":
        return "secondary"
      default:
        return "outline"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "En Progreso":
        return "bg-orange-100 text-orange-800"
      case "Asignada":
        return "bg-blue-100 text-blue-800"
      case "Completada":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Mi Calendario</h1>
        <p className="text-gray-600">Agenda de citas y tareas programadas</p>
      </div>

      {/* Date Navigation */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Seleccionar Fecha
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 flex-wrap">
            {scheduleData.map((day) => (
              <Button
                key={day.date}
                variant={selectedDate === day.date ? "default" : "outline"}
                onClick={() => setSelectedDate(day.date)}
                className="flex flex-col h-auto p-3"
              >
                <span className="text-sm font-medium">
                  {new Date(day.date).toLocaleDateString("es-ES", { weekday: "short" })}
                </span>
                <span className="text-xs">
                  {new Date(day.date).toLocaleDateString("es-ES", { day: "numeric", month: "short" })}
                </span>
                <Badge variant="secondary" className="mt-1 text-xs">
                  {day.appointments.length} citas
                </Badge>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Schedule for Selected Date */}
      {scheduleData
        .filter((day) => day.date === selectedDate)
        .map((day) => (
          <div key={day.date} className="space-y-4">
            <h2 className="text-xl font-semibold capitalize">{formatDate(day.date)}</h2>

            {day.appointments.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <Calendar className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No hay citas programadas</h3>
                  <p className="text-gray-600">Disfruta de tu día libre</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {day.appointments.map((appointment) => (
                  <Card key={appointment.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-2 text-lg font-semibold">
                            <Clock className="h-5 w-5 text-blue-600" />
                            {appointment.time}
                          </div>
                          <Badge variant="outline">{appointment.duration}</Badge>
                          <Badge variant={getPriorityColor(appointment.priority)}>{appointment.priority}</Badge>
                        </div>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}
                        >
                          {appointment.status}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-3">
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-1">{appointment.title}</h4>
                            <p className="text-sm text-gray-600">ID: {appointment.id}</p>
                          </div>

                          <div className="flex items-center gap-2 text-sm">
                            <User className="h-4 w-4 text-gray-500" />
                            <span>{appointment.client}</span>
                          </div>

                          <div className="flex items-center gap-2 text-sm">
                            <Phone className="h-4 w-4 text-gray-500" />
                            <span>{appointment.phone}</span>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div className="flex items-start gap-2 text-sm">
                            <MapPin className="h-4 w-4 text-gray-500 mt-0.5" />
                            <span>{appointment.address}</span>
                          </div>

                          <div className="flex gap-2">
                            <Button size="sm" asChild>
                              <a href={`/dashboard/technician/tasks/${appointment.id}`}>Ver Detalles</a>
                            </Button>
                            <Button variant="outline" size="sm">
                              Ver en Mapa
                            </Button>
                            <Button variant="outline" size="sm">
                              Llamar Cliente
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        ))}
    </div>
  )
}
