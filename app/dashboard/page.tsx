"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { authService } from "@/app/services/authService"

export default function DashboardPage() {
  const router = useRouter()

  useEffect(() => {
    const user = authService.getCurrentUser()

    if (!user) {
      router.push("/login")
      return
    }

    // Redirigir según el rol del usuario
    switch (user.role) {
      case "cliente":
        router.push("/dashboard/client")
        break
      case "tecnico":
        router.push("/dashboard/technician")
        break
      case "operador":
        router.push("/dashboard/operator")
        break
      default:
        router.push("/login")
    }
  }, [router])

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Redirigiendo...</h1>
        <p className="text-gray-600">Te estamos llevando a tu dashboard</p>
      </div>
    </div>
  )
}
