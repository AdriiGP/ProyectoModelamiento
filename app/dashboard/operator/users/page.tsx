"use client"

import { useState } from "react"
import { DataTable } from "@/components/dashboard/data-table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Search, Edit, Trash2, MoreHorizontal, UserCheck, UserX } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const users = [
  {
    id: 1,
    name: "Katherine Mendez",
    email: "cliente@test.com",
    role: "cliente",
    status: "Activo",
    lastLogin: "2025-02-20",
    ticketsCreated: 5,
    joinDate: "2025-01-01",
  },
  {
    id: 2,
    name: "Carlos Solórzano",
    email: "tecnico@test.com",
    role: "tecnico",
    status: "Activo",
    lastLogin: "2025-02-20",
    ticketsAssigned: 12,
    joinDate: "2024-12-15",
  },
  {
    id: 3,
    name: "Adrián Gavilanes",
    email: "operador@test.com",
    role: "operador",
    status: "Activo",
    lastLogin: "2025-02-20",
    ticketsManaged: 45,
    joinDate: "2024-11-01",
  },
  {
    id: 4,
    name: "María González",
    email: "maria@cliente.com",
    role: "cliente",
    status: "Inactivo",
    lastLogin: "2025-01-15",
    ticketsCreated: 2,
    joinDate: "2025-01-10",
  },
  {
    id: 5,
    name: "Pedro Ramírez",
    email: "pedro@tecnico.com",
    role: "tecnico",
    status: "Suspendido",
    lastLogin: "2025-01-18",
    ticketsAssigned: 8,
    joinDate: "2024-12-01",
  },
]

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const columns = [
    { key: "name", label: "Nombre" },
    { key: "email", label: "Email" },
    {
      key: "role",
      label: "Rol",
      render: (value: string) => {
        const getRoleColor = (role: string) => {
          switch (role) {
            case "cliente":
              return "bg-blue-100 text-blue-800"
            case "tecnico":
              return "bg-green-100 text-green-800"
            case "operador":
              return "bg-purple-100 text-purple-800"
            default:
              return "bg-gray-100 text-gray-800"
          }
        }
        const getRoleLabel = (role: string) => {
          switch (role) {
            case "cliente":
              return "Cliente"
            case "tecnico":
              return "Técnico"
            case "operador":
              return "Operador"
            default:
              return role
          }
        }
        return (
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(value)}`}>
            {getRoleLabel(value)}
          </span>
        )
      },
    },
    {
      key: "status",
      label: "Estado",
      render: (value: string) => {
        const getStatusColor = (status: string) => {
          switch (status) {
            case "Activo":
              return "default"
            case "Inactivo":
              return "secondary"
            case "Suspendido":
              return "destructive"
            default:
              return "outline"
          }
        }
        return <Badge variant={getStatusColor(value)}>{value}</Badge>
      },
    },
    { key: "lastLogin", label: "Último Acceso" },
    { key: "joinDate", label: "Fecha Registro" },
    {
      key: "activity",
      label: "Actividad",
      render: (_: any, row: any) => {
        if (row.role === "cliente") {
          return `${row.ticketsCreated} tickets creados`
        } else if (row.role === "tecnico") {
          return `${row.ticketsAssigned} tickets asignados`
        } else if (row.role === "operador") {
          return `${row.ticketsManaged} tickets gestionados`
        }
        return "-"
      },
    },
  ]

  const actions = (row: any) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>
          <Edit className="mr-2 h-4 w-4" />
          Editar Usuario
        </DropdownMenuItem>
        {row.status === "Activo" ? (
          <DropdownMenuItem>
            <UserX className="mr-2 h-4 w-4" />
            Suspender
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem>
            <UserCheck className="mr-2 h-4 w-4" />
            Activar
          </DropdownMenuItem>
        )}
        <DropdownMenuItem className="text-red-600">
          <Trash2 className="mr-2 h-4 w-4" />
          Eliminar
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestión de Usuarios</h1>
          <p className="text-gray-600">Administra usuarios del sistema</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Nuevo Usuario
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{users.filter((u) => u.role === "cliente").length}</div>
              <div className="text-sm text-gray-600">Clientes</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {users.filter((u) => u.role === "tecnico").length}
              </div>
              <div className="text-sm text-gray-600">Técnicos</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {users.filter((u) => u.role === "operador").length}
              </div>
              <div className="text-sm text-gray-600">Operadores</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">
                {users.filter((u) => u.status === "Activo").length}
              </div>
              <div className="text-sm text-gray-600">Usuarios Activos</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Usuarios</CardTitle>
          <div className="flex items-center space-x-2">
            <Search className="h-4 w-4 text-gray-400" />
            <Input
              placeholder="Buscar usuarios..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={filteredUsers} actions={actions} />
        </CardContent>
      </Card>
    </div>
  )
}
