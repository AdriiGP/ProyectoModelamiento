"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect, useCallback } from "react"
import { authService } from "@/app/services/authService"

export interface Notification {
  id: string
  title: string
  message: string
  type: "info" | "success" | "warning" | "error"
  timestamp: string
  read: boolean
  userId: string
  ticketId?: string
  actionUrl?: string
}

interface NotificationContextType {
  notifications: Notification[]
  unreadCount: number
  addNotification: (notification: Omit<Notification, "id" | "timestamp" | "read" | "userId">) => void
  markAsRead: (id: string) => void
  markAllAsRead: () => void
  removeNotification: (id: string) => void
  isLoading: boolean
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export function useNotifications() {
  const context = useContext(NotificationContext)
  if (!context) {
    // En lugar de lanzar error, devolver un contexto por defecto
    return {
      notifications: [],
      unreadCount: 0,
      addNotification: () => {},
      markAsRead: () => {},
      markAllAsRead: () => {},
      removeNotification: () => {},
      isLoading: true,
    }
  }
  return context
}

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentUser, setCurrentUser] = useState<any>(null)

  // Función para obtener notificaciones según el rol del usuario
  const getNotificationsForUser = useCallback((user: any): Notification[] => {
    const baseNotifications: Notification[] = []

    if (user.role === "cliente") {
      baseNotifications.push(
        {
          id: "client-1",
          title: "Técnico asignado",
          message: `${user.name === "Katherine Mendez" ? "Amy Baque" : "Carlos Rodríguez"} fue asignado a tu ticket INC-001`,
          type: "info",
          timestamp: new Date().toISOString(),
          read: false,
          userId: user.id.toString(),
          ticketId: "INC-001",
          actionUrl: "/dashboard/client/tickets/INC-001",
        },
        {
          id: "client-2",
          title: "Ticket actualizado",
          message: "El estado de tu ticket INC-005 cambió a 'En Progreso'",
          type: "success",
          timestamp: new Date(Date.now() - 300000).toISOString(),
          read: false,
          userId: user.id.toString(),
          ticketId: "INC-005",
          actionUrl: "/dashboard/client/tickets/INC-005",
        },
      )
    } else if (user.role === "tecnico") {
      baseNotifications.push(
        {
          id: "tech-1",
          title: "Nueva tarea asignada",
          message: `Se te asignó el ticket INC-001 - Problema con conexión a internet`,
          type: "info",
          timestamp: new Date().toISOString(),
          read: false,
          userId: user.id.toString(),
          ticketId: "INC-001",
          actionUrl: "/dashboard/technician/tasks/INC-001",
        },
        {
          id: "tech-2",
          title: "Cliente agregó comentario",
          message: "María García agregó un comentario al ticket INC-001",
          type: "info",
          timestamp: new Date(Date.now() - 600000).toISOString(),
          read: false,
          userId: user.id.toString(),
          ticketId: "INC-001",
          actionUrl: "/dashboard/technician/tasks/INC-001",
        },
      )
    } else if (user.role === "operador") {
      baseNotifications.push(
        {
          id: "op-1",
          title: "Nuevo ticket creado",
          message: "Se creó un nuevo ticket INC-008 con prioridad crítica",
          type: "warning",
          timestamp: new Date().toISOString(),
          read: false,
          userId: user.id.toString(),
          ticketId: "INC-008",
          actionUrl: "/dashboard/operator/tickets/INC-008",
        },
        {
          id: "op-2",
          title: "Técnico disponible",
          message: "Carlos Rodríguez está disponible para nuevas asignaciones",
          type: "success",
          timestamp: new Date(Date.now() - 900000).toISOString(),
          read: false,
          userId: user.id.toString(),
          actionUrl: "/dashboard/operator/technicians",
        },
      )
    }

    return baseNotifications
  }, [])

  // Inicializar notificaciones
  useEffect(() => {
    let mounted = true

    const initializeNotifications = async () => {
      try {
        // Esperar un poco para asegurar que el auth esté listo
        await new Promise((resolve) => setTimeout(resolve, 200))

        if (!mounted) return

        const user = authService.getCurrentUser()

        if (user) {
          setCurrentUser(user)
          const userNotifications = getNotificationsForUser(user)
          setNotifications(userNotifications)
        }
      } catch (error) {
        console.error("Error initializing notifications:", error)
      } finally {
        if (mounted) {
          setIsLoading(false)
        }
      }
    }

    initializeNotifications()

    return () => {
      mounted = false
    }
  }, [getNotificationsForUser])

  const addNotification = useCallback(
    (notification: Omit<Notification, "id" | "timestamp" | "read" | "userId">) => {
      const user = currentUser || authService.getCurrentUser()
      if (!user) return

      const newNotification: Notification = {
        ...notification,
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        timestamp: new Date().toISOString(),
        read: false,
        userId: user.id.toString(),
      }

      setNotifications((prev) => [newNotification, ...prev])

      // Auto-remove after 10 seconds for non-critical notifications
      if (notification.type === "info" || notification.type === "success") {
        setTimeout(() => {
          removeNotification(newNotification.id)
        }, 10000)
      }
    },
    [currentUser],
  )

  const markAsRead = useCallback((id: string) => {
    setNotifications((prev) =>
      prev.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }, [])

  const markAllAsRead = useCallback(() => {
    setNotifications((prev) => prev.map((notification) => ({ ...notification, read: true })))
  }, [])

  const removeNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id))
  }, [])

  const unreadCount = notifications.filter((n) => !n.read).length

  const contextValue = {
    notifications,
    unreadCount,
    addNotification,
    markAsRead,
    markAllAsRead,
    removeNotification,
    isLoading,
  }

  return <NotificationContext.Provider value={contextValue}>{children}</NotificationContext.Provider>
}
