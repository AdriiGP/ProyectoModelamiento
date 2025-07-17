"use client"

import { useState, useEffect } from "react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar"
import {
  Home,
  Users,
  BarChart3,
  FileText,
  Calendar,
  AlertCircle,
  Wrench,
  ChevronDown,
  Building2,
  UserCog,
} from "lucide-react"
import { authService } from "@/app/services/authService"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Badge } from "@/components/ui/badge"

const userRoles = {
  cliente: {
    title: "Panel Cliente",
    groups: [
      {
        label: "Principal",
        items: [{ title: "Dashboard", url: "/dashboard/client", icon: Home }],
      },
      {
        label: "Incidencias",
        items: [
          { title: "Reportar Incidencia", url: "/dashboard/client/new-ticket", icon: AlertCircle },
          { title: "Mis Solicitudes", url: "/dashboard/client/tickets", icon: FileText },
        ],
      },
      {
        label: "Servicios",
        items: [{ title: "Agendar Cita", url: "/dashboard/client/appointments", icon: Calendar }],
      },
    ],
  },
  tecnico: {
    title: "Panel Técnico",
    groups: [
      {
        label: "Principal",
        items: [{ title: "Dashboard", url: "/dashboard/technician", icon: Home }],
      },
      {
        label: "Trabajo",
        items: [
          { title: "Mis Tareas", url: "/dashboard/technician/tasks", icon: Wrench },
          { title: "Mi Calendario", url: "/dashboard/technician/schedule", icon: Calendar },
        ],
      },
      {
        label: "Historial",
        items: [{ title: "Trabajos Completados", url: "/dashboard/technician/history", icon: FileText }],
      },
    ],
  },
  operador: {
    title: "Panel Operador",
    groups: [
      {
        label: "Principal",
        items: [{ title: "Dashboard", url: "/dashboard/operator", icon: Home }],
      },
      {
        label: "Gestión",
        items: [
          { title: "Solicitudes", url: "/dashboard/operator/tickets", icon: AlertCircle },
          { title: "Técnicos", url: "/dashboard/operator/technicians", icon: Users },
          { title: "Usuarios", url: "/dashboard/operator/users", icon: UserCog },
        ],
      },
      {
        label: "Reportes",
        items: [{ title: "Generar Reportes", url: "/dashboard/operator/reports", icon: BarChart3 }],
      },
    ],
  },
}

export function AppSidebar() {
  const [userRole, setUserRole] = useState<keyof typeof userRoles | null>(null)
  const [userName, setUserName] = useState("")
  const [openGroups, setOpenGroups] = useState<string[]>(["Principal"])

  useEffect(() => {
    const user = authService.getCurrentUser()
    if (user && user.role in userRoles) {
      setUserRole(user.role as keyof typeof userRoles)
      setUserName(user.name)
    }
  }, [])

  const toggleGroup = (groupLabel: string) => {
    setOpenGroups((prev) => (prev.includes(groupLabel) ? prev.filter((g) => g !== groupLabel) : [...prev, groupLabel]))
  }

  if (!userRole) {
    return (
      <Sidebar>
        <SidebarContent>
          <div className="flex items-center justify-center h-full">
            <div className="animate-pulse">
              <div className="h-4 bg-muted rounded w-32 mb-2"></div>
              <div className="h-4 bg-muted rounded w-24"></div>
            </div>
          </div>
        </SidebarContent>
      </Sidebar>
    )
  }

  const roleConfig = userRoles[userRole]

  return (
    <Sidebar>
      <SidebarHeader className="border-b border-sidebar-border">
        <div className="flex items-center gap-3 px-2 py-3">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
            <Building2 className="h-4 w-4 text-primary-foreground" />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="font-semibold text-sm truncate">{roleConfig.title}</h2>
            <p className="text-xs text-muted-foreground truncate">{userName}</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        {roleConfig.groups.map((group) => (
          <Collapsible
            key={group.label}
            open={openGroups.includes(group.label)}
            onOpenChange={() => toggleGroup(group.label)}
          >
            <SidebarGroup>
              <CollapsibleTrigger asChild>
                <SidebarGroupLabel className="group/label cursor-pointer hover:bg-sidebar-accent hover:text-sidebar-accent-foreground rounded-md transition-colors">
                  <span className="flex-1">{group.label}</span>
                  <ChevronDown className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/label:rotate-180" />
                  {group.label === "Incidencias" && userRole === "cliente" && (
                    <Badge variant="secondary" className="ml-2 h-5 text-xs">
                      3
                    </Badge>
                  )}
                  {group.label === "Trabajo" && userRole === "tecnico" && (
                    <Badge variant="secondary" className="ml-2 h-5 text-xs">
                      5
                    </Badge>
                  )}
                  {group.label === "Gestión" && userRole === "operador" && (
                    <Badge variant="secondary" className="ml-2 h-5 text-xs">
                      12
                    </Badge>
                  )}
                </SidebarGroupLabel>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {group.items.map((item) => (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton asChild className="group/item">
                          <a href={item.url} className="flex items-center gap-3">
                            <item.icon className="h-4 w-4 group-hover/item:scale-110 transition-transform" />
                            <span className="flex-1">{item.title}</span>
                          </a>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>
        ))}
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border">
        <div className="px-2 py-3">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <div className="h-2 w-2 rounded-full bg-green-500"></div>
            <span>Sistema Activo</span>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
