"use client"

import { useState, useEffect, useMemo } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { User, Settings, LogOut, Sun, Moon, Monitor } from "lucide-react"
import { authService } from "@/app/services/authService"
import { useRouter } from "next/navigation"
import { useTheme } from "next-themes"
// Importar el componente de notificaciones
import { NotificationBell } from "@/components/notifications/notification-bell"

export function OptimizedHeader() {
  const [userName, setUserName] = useState("")
  const [userRole, setUserRole] = useState("")
  const [mounted, setMounted] = useState(false)
  const router = useRouter()
  const { theme, setTheme } = useTheme()

  // Memoizar el nombre del rol para evitar cálculos repetidos
  const roleDisplayName = useMemo(() => {
    switch (userRole) {
      case "cliente":
        return "Cliente"
      case "tecnico":
        return "Técnico"
      case "operador":
        return "Operador"
      default:
        return ""
    }
  }, [userRole])

  // Memoizar el ícono del tema
  const themeIcon = useMemo(() => {
    if (!mounted) return <Monitor className="h-4 w-4" />

    switch (theme) {
      case "light":
        return <Sun className="h-4 w-4" />
      case "dark":
        return <Moon className="h-4 w-4" />
      default:
        return <Monitor className="h-4 w-4" />
    }
  }, [theme, mounted])

  useEffect(() => {
    setMounted(true)

    // Optimizar la carga de datos del usuario
    const loadUserData = () => {
      try {
        const user = authService.getCurrentUser()
        if (user) {
          setUserName(user.name)
          setUserRole(user.role)
        }
      } catch (error) {
        console.error("Error loading user data:", error)
      }
    }

    // Usar requestAnimationFrame para optimizar el renderizado
    requestAnimationFrame(loadUserData)
  }, [])

  const handleLogout = () => {
    authService.logout()
    router.push("/login")
  }

  return (
    <header className="border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60 px-6 py-4 sticky top-0 z-40">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <SidebarTrigger />
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">SI</span>
            </div>
            <div>
              <span className="font-semibold text-lg bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                Sistema de Incidencias
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {userName && (
            <div className="text-right hidden sm:block">
              <span className="text-sm font-medium text-foreground">¡Hola, {userName}!</span>
              {roleDisplayName && <div className="text-xs text-muted-foreground">{roleDisplayName}</div>}
            </div>
          )}

          {/* Notification Bell */}
          <NotificationBell />

          {/* Theme Toggle */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-9 w-9 p-0">
                {themeIcon}
                <span className="sr-only">Cambiar tema</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>
                <Sun className="mr-2 h-4 w-4" />
                <span>Claro</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                <Moon className="mr-2 h-4 w-4" />
                <span>Oscuro</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                <Monitor className="mr-2 h-4 w-4" />
                <span>Sistema</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="flex items-center gap-2 h-9">
                <div className="h-6 w-6 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
                  <User className="h-3 w-3 text-primary-foreground" />
                </div>
                <span className="sr-only">Menú de usuario</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Mi Perfil</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Configuración</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Cerrar Sesión</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
