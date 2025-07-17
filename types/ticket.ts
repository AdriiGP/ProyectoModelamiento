export interface Ticket {
  id: string
  title: string
  description: string
  status: "Nueva" | "Asignada" | "En Progreso" | "Resuelta" | "Cerrada"
  priority: "Baja" | "Media" | "Alta" | "Crítica"
  category: string
  clientId: string
  clientName: string
  clientEmail: string
  clientPhone: string
  address: string
  technicianId?: string
  technicianName?: string
  createdAt: string
  updatedAt: string
  scheduledDate?: string
  notes: TicketNote[]
  attachments: string[]
}

export interface TicketNote {
  id: string
  content: string
  author: string
  createdAt: string
  type: "client" | "technician" | "operator"
}

export interface Technician {
  id: string
  name: string
  email: string
  phone: string
  specialties: string[]
  status: "Disponible" | "Ocupado" | "No disponible"
  activeTickets: number
}
