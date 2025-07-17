"use client"

import { useState } from "react"
import { DataTable } from "@/components/dashboard/data-table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Search, Edit, Eye, MapPin } from "lucide-react"

const technicians = [
  {
    id: 1,
    name: "Carlos Rodríguez",
    email: "carlos@empresa.com",
    phone: "+593 99 123 4567",
    specialties: ["Redes", "Hardware", "Conectividad"],
    status: "Disponible",
    activeTickets: 2,
    completedToday: 3,
    location: "Zona Norte",
    rating: 4.8,
  },
  {
    id: 2,
    name: "Ana López",
    email: "ana@empresa.com",
    phone: "+593 99 234 5678",
    specialties: ["Software", "Instalaciones", "Sistemas"],
    status: "Ocupado",
    activeTickets: 4,
    completedToday: 2,
    location: "Centro",
    rating: 4.9,
  },
  {
    id: 3,
    name: "Miguel Torres",
    email: "miguel@empresa.com",
    phone: "+593 99 345 6789",
    specialties: ["Mantenimiento", "Hardware", "Reparaciones"],
    status: "Disponible",
    activeTickets: 1,
    completedToday: 4,
    location: "Zona Sur",
    rating: 4.7,
  },
  {
    id: 4,
    name: "Laura Martínez",
    email: "laura@empresa.com",
    phone: "+593 99 456 7890",
    specialties: ["Software", "Consultoría", "Capacitación"],
    status: "No disponible",
    activeTickets: 0,
    completedToday: 0,
    location: "Zona Este",
    rating: 4.6,
  },
]

export default function TechniciansPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const columns = [
    { key: "name", label: "Técnico" },
    { key: "email", label: "Email" },
    { key: "phone", label: "Teléfono" },
    {
      key: "specialties",
      label: "Especialidades",
      render: (value: string[]) => (
        <div className="flex flex-wrap gap-1">
          {value.slice(0, 2).map((specialty, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {specialty}
            </Badge>
          ))}
          {value.length > 2 && (
            <Badge variant="outline" className="text-xs">
              +{value.length - 2}
            </Badge>
          )}
        </div>
      ),
    },
    {
      key: "status",
      label: "Estado",
      render: (value: string) => {
        const getStatusColor = (status: string) => {
          switch (status) {
            case "Disponible":
              return "bg-green-100 text-green-800"
            case "Ocupado":
              return "bg-yellow-100 text-yellow-800"
            case "No disponible":
              return "bg-red-100 text-red-800"
            default:
              return "bg-gray-100 text-gray-800"
          }
        }
        return <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(value)}`}>{value}</span>
      },
    },
    { key: "activeTickets", label: "Tickets Activos" },
    { key: "completedToday", label: "Completados Hoy" },
    {
      key: "location",
      label: "Ubicación",
      render: (value: string) => (
        <div className="flex items-center gap-1">
          <MapPin className="h-3 w-3" />
          <span className="text-sm">{value}</span>
        </div>
      ),
    },
    {
      key: "rating",
      label: "Calificación",
      render: (value: number) => (
        <div className="flex items-center gap-1">
          <span className="text-sm font-medium">{value}</span>
          <span className="text-yellow-500">★</span>
        </div>
      ),
    },
  ]

  const actions = (row: any) => (
    <div className="flex gap-2">
      <Button variant="ghost" size="sm">
        <Eye className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="sm">
        <Edit className="h-4 w-4" />
      </Button>
    </div>
  )

  const filteredTechnicians = technicians.filter(
    (tech) =>
      tech.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tech.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tech.specialties.some((specialty) => specialty.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestión de Técnicos</h1>
          <p className="text-gray-600">Administra el equipo técnico y sus asignaciones</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Nuevo Técnico
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">3</div>
              <div className="text-sm text-gray-600">Disponibles</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">1</div>
              <div className="text-sm text-gray-600">Ocupados</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">7</div>
              <div className="text-sm text-gray-600">Tickets Activos</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">4.8</div>
              <div className="text-sm text-gray-600">Calificación Promedio</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Técnicos</CardTitle>
          <div className="flex items-center space-x-2">
            <Search className="h-4 w-4 text-gray-400" />
            <Input
              placeholder="Buscar técnicos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={filteredTechnicians} actions={actions} />
        </CardContent>
      </Card>
    </div>
  )
}
