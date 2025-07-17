import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/providers/theme-provider"
import { NotificationProvider } from "@/components/notifications/notification-provider"
import { ToastNotifications } from "@/components/notifications/toast-notifications"
import { Toaster } from "sonner"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Sistema de Incidencias",
  description: "Sistema de gestión de incidencias técnicas",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <NotificationProvider>
            {children}
            <ToastNotifications />
            <Toaster position="top-right" richColors />
          </NotificationProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
