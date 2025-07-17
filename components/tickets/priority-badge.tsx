import { Badge } from "@/components/ui/badge"

interface PriorityBadgeProps {
  priority: string
}

export function PriorityBadge({ priority }: PriorityBadgeProps) {
  const getVariant = (priority: string) => {
    switch (priority) {
      case "Crítica":
        return "destructive"
      case "Alta":
        return "destructive"
      case "Media":
        return "default"
      case "Baja":
        return "secondary"
      default:
        return "outline"
    }
  }

  return <Badge variant={getVariant(priority)}>{priority}</Badge>
}
