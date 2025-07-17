"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DataTable } from "@/components/dashboard/data-table"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Plus, Edit, Trash2 } from "lucide-react"

const existingAppointments = [
  {
    id: 1,
    service: "Revisión técnica",
    date: "2024-01-25",
    time: "10:00 AM",
    technician: "Carlos Rodríguez",
    status: "Confirmada",
    address: "Av. Principal 123, Oficina 4B",
  },
  {
    id: 2,
    service: "Instalación equipos",
    date: "2024-01-28",
    time: "2:00 PM",
    technician: "Ana López",
    status: "Pendiente",
    address: "Centro Empresarial, Of. 301",
  },
]

export default function AppointmentsPage() {
  const [showNewForm, setShowNewForm] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simular envío
    setTimeout(() => {
      setIsSubmitting(false)
      setShowNewForm(false)
      alert("Cita agendada correctamente")
    }, 150)
  }

  const columns = [
    { key: "service", label: "Servicio" },
    { key: "date", label: "Fecha" },
    { key: "time", label: "Hora" },
    { key: "technician", label: "Técnico" },
    {
      key: "status",
      label: "Estado",
      render: (value: string) => <Badge variant={value === "Confirmada" ? "default" : "outline"}>{value}</Badge>,
    },
    { key: "address", label: "Dirección" },
  ]

  const actions = (row: any) => (
    <div className="flex gap-2">
      <Button variant="ghost" size="sm">
        <Edit className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="sm">
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  )

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Agendar Cita</h1>
          <p className="text-gray-600">Programa visitas técnicas y servicios</p>
        </div>
        <Button onClick={() => setShowNewForm(!showNewForm)}>
          <Plus className="mr-2 h-4 w-4" />
          {showNewForm ? "Cancelar" : "Nueva Cita"}
        </Button>
      </div>

      {showNewForm && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Agendar Nueva Cita
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="service">Tipo de Servicio</Label>
                  <Select required>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona el servicio" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="revision">Revisión Técnica</SelectItem>
                      <SelectItem value="installation">Instalación</SelectItem>
                      <SelectItem value="maintenance">Mantenimiento</SelectItem>
                      <SelectItem value="repair">Reparación</SelectItem>
                      <SelectItem value="consultation">Consultoría</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="priority">Prioridad</Label>
                  <Select required>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona la prioridad" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Baja</SelectItem>
                      <SelectItem value="medium">Media</SelectItem>
                      <SelectItem value="high">Alta</SelectItem>
                      <SelectItem value="urgent">Urgente</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Fecha Preferida</Label>
                  <Input id="date" type="date" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="time">Hora Preferida</Label>
                  <Select required>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona la hora" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="08:00">08:00 AM</SelectItem>
                      <SelectItem value="09:00">09:00 AM</SelectItem>
                      <SelectItem value="10:00">10:00 AM</SelectItem>
                      <SelectItem value="11:00">11:00 AM</SelectItem>
                      <SelectItem value="14:00">02:00 PM</SelectItem>
                      <SelectItem value="15:00">03:00 PM</SelectItem>
                      <SelectItem value="16:00">04:00 PM</SelectItem>
                      <SelectItem value="17:00">05:00 PM</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Dirección del Servicio</Label>
                <Textarea
                  id="address"
                  placeholder="Dirección completa donde se realizará el servicio"
                  rows={3}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Descripción del Servicio</Label>
                <Textarea id="description" placeholder="Describe qué necesitas que se realice..." rows={4} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="technician">Técnico Preferido (Opcional)</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona un técnico" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="carlos">Carlos Rodríguez - Redes/Hardware</SelectItem>
                    <SelectItem value="ana">Ana López - Software/Instalaciones</SelectItem>
                    <SelectItem value="miguel">Miguel Torres - Mantenimiento</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-4">
                <Button type="submit" disabled={isSubmitting} className="flex-1">
                  {isSubmitting ? "Agendando..." : "Agendar Cita"}
                </Button>
                <Button type="button" variant="outline" onClick={() => setShowNewForm(false)}>
                  Cancelar
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Mis Citas Programadas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={existingAppointments} actions={actions} />
        </CardContent>
      </Card>
    </div>
  )
}
