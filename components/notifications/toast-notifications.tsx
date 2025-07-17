"use client"

import { useEffect, useRef } from "react"
import { useNotifications } from "./notification-provider"
import { toast } from "sonner"

export function ToastNotifications() {
  const { notifications, isLoading } = useNotifications()
  const lastNotificationId = useRef<string | null>(null)

  useEffect(() => {
    if (isLoading || !notifications || notifications.length === 0) return

    const latestNotification = notifications[0]

    // Solo mostrar toast si es una notificación nueva y no leída
    if (latestNotification && !latestNotification.read && latestNotification.id !== lastNotificationId.current) {
      lastNotificationId.current = latestNotification.id

      const toastFunction =
        {
          success: toast.success,
          error: toast.error,
          warning: toast.warning,
          info: toast.info,
        }[latestNotification.type] || toast.info

      toastFunction(latestNotification.title, {
        description: latestNotification.message,
        duration: 5000,
      })
    }
  }, [notifications, isLoading])

  return null
}
