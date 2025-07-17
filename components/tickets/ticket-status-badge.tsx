import { Badge } from "@/components/ui/badge"

interface TicketStatusBadgeProps {
  status: string
}

export function TicketStatusBadge({ status }: TicketStatusBadgeProps) {
  const getVariant = (status: string) => {
    switch (status) {
      case "Nueva":
        return "secondary"
      case "Asignada":
        return "outline"
      case "En Progreso":
        return "default"
      case "Resuelta":
        return "default"
      case "Cerrada":
        return "secondary"
      default:
        return "outline"
    }
  }

  const getColor = (status: string) => {
    switch (status) {
      case "Nueva":
        return "bg-blue-100 text-blue-800"
      case "Asignada":
        return "bg-yellow-100 text-yellow-800"
      case "En Progreso":
        return "bg-orange-100 text-orange-800"
      case "Resuelta":
        return "bg-green-100 text-green-800"
      case "Cerrada":
        return "bg-gray-100 text-gray-800"
      default:
        return ""
    }
  }

  return (
    <Badge variant={getVariant(status)} className={getColor(status)}>
      {status}
    </Badge>
  )
}
