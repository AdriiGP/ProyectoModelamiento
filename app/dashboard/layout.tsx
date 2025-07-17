import type React from "react"
import { SidebarProvider } from "@/components/ui/sidebar"
import { OptimizedSidebar } from "@/components/layout/optimized-sidebar"
import { OptimizedHeader } from "@/components/layout/optimized-header"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full bg-background">
        <OptimizedSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <OptimizedHeader />
          <main className="flex-1 p-6 bg-gray-50 dark:bg-gray-900/50 overflow-auto">
            <div className="max-w-7xl mx-auto">{children}</div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}
