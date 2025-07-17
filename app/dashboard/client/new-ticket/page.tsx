"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, AlertCircle } from "lucide-react"

export default function NewTicketPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [files, setFiles] = useState<File[]>([])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simular envío
    setTimeout(() => {
      setIsSubmitting(false)
      // Redirigir a la lista de tickets
      window.location.href = "/dashboard/client/tickets"
    }, 200)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files))
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Reportar Nueva Incidencia</h1>
        <p className="text-gray-600">Describe tu problema para que podamos ayudarte</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5" />
            Información de la Incidencia
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Categoría</Label>
                <Select required>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona una categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hardware">Hardware</SelectItem>
                    <SelectItem value="software">Software</SelectItem>
                    <SelectItem value="network">Red/Conectividad</SelectItem>
                    <SelectItem value="installation">Instalación</SelectItem>
                    <SelectItem value="maintenance">Mantenimiento</SelectItem>
                    <SelectItem value="other">Otro</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="priority">Prioridad</Label>
                <Select required>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona la prioridad" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Baja</SelectItem>
                    <SelectItem value="medium">Media</SelectItem>
                    <SelectItem value="high">Alta</SelectItem>
                    <SelectItem value="critical">Crítica</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="title">Título del Problema</Label>
              <Input id="title" placeholder="Describe brevemente el problema" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descripción Detallada</Label>
              <Textarea
                id="description"
                placeholder="Proporciona todos los detalles posibles sobre el problema..."
                rows={6}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Dirección para Visita Técnica</Label>
              <Textarea id="address" placeholder="Dirección completa donde se requiere el servicio" rows={3} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="preferredDate">Fecha Preferida (Opcional)</Label>
              <Input id="preferredDate" type="date" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="files">Adjuntar Archivos (Opcional)</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                <p className="text-sm text-gray-600 mb-2">Arrastra archivos aquí o haz clic para seleccionar</p>
                <Input id="files" type="file" multiple accept="image/*,.pdf,.doc,.docx" onChange={handleFileChange} />
              </div>
              {files.length > 0 && (
                <div className="mt-2">
                  <p className="text-sm font-medium">Archivos seleccionados:</p>
                  <ul className="text-sm text-gray-600">
                    {files.map((file, index) => (
                      <li key={index}>• {file.name}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="flex gap-4">
              <Button type="submit" disabled={isSubmitting} className="flex-1">
                {isSubmitting ? "Enviando..." : "Crear Solicitud"}
              </Button>
              <Button type="button" variant="outline" asChild>
                <a href="/dashboard/client">Cancelar</a>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
