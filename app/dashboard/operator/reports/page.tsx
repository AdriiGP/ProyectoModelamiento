"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DataTable } from "@/components/dashboard/data-table"
import { BarChart3, Download, Calendar, TrendingUp, Users, Clock } from "lucide-react"

const reportData = {
  summary: {
    totalTickets: 156,
    resolvedTickets: 142,
    avgResolutionTime: "2.3 horas",
    customerSatisfaction: "94%",
  },
  byCategory: [
    { category: "Hardware", total: 45, resolved: 42, pending: 3 },
    { category: "Software", total: 38, resolved: 35, pending: 3 },
    { category: "Red/Conectividad", total: 32, resolved: 30, pending: 2 },
    { category: "Mantenimiento", total: 25, resolved: 23, pending: 2 },
    { category: "Instalación", total: 16, resolved: 12, pending: 4 },
  ],
  byTechnician: [
    { name: "Carlos Rodríguez", assigned: 42, completed: 40, avgTime: "2.1h", rating: 4.8 },
    { name: "Ana López", assigned: 38, completed: 36, avgTime: "2.4h", rating: 4.9 },
    { name: "Miguel Torres", assigned: 35, completed: 33, avgTime: "2.2h", rating: 4.7 },
    { name: "Laura Martínez", assigned: 28, completed: 26, avgTime: "2.5h", rating: 4.6 },
  ],
}

export default function ReportsPage() {
  const [reportType, setReportType] = useState("")
  const [dateFrom, setDateFrom] = useState("")
  const [dateTo, setDateTo] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [showResults, setShowResults] = useState(false)

  const handleGenerateReport = async () => {
    setIsGenerating(true)

    // Simular generación de reporte
    setTimeout(() => {
      setIsGenerating(false)
      setShowResults(true)
    }, 300)
  }

  const categoryColumns = [
    { key: "category", label: "Categoría" },
    { key: "total", label: "Total" },
    { key: "resolved", label: "Resueltos" },
    { key: "pending", label: "Pendientes" },
    {
      key: "percentage",
      label: "% Resolución",
      render: (_: any, row: any) => `${Math.round((row.resolved / row.total) * 100)}%`,
    },
  ]

  const technicianColumns = [
    { key: "name", label: "Técnico" },
    { key: "assigned", label: "Asignados" },
    { key: "completed", label: "Completados" },
    { key: "avgTime", label: "Tiempo Promedio" },
    { key: "rating", label: "Calificación" },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Generar Reportes</h1>
        <p className="text-gray-600">Análisis y métricas del sistema de incidencias</p>
      </div>

      {/* Report Generator */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Generador de Reportes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="space-y-2">
              <Label htmlFor="reportType">Tipo de Reporte</Label>
              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">Reporte General</SelectItem>
                  <SelectItem value="technician">Por Técnico</SelectItem>
                  <SelectItem value="category">Por Categoría</SelectItem>
                  <SelectItem value="client">Por Cliente</SelectItem>
                  <SelectItem value="performance">Rendimiento</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="dateFrom">Fecha Desde</Label>
              <Input id="dateFrom" type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dateTo">Fecha Hasta</Label>
              <Input id="dateTo" type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} />
            </div>

            <div className="flex items-end">
              <Button onClick={handleGenerateReport} disabled={isGenerating || !reportType} className="w-full">
                {isGenerating ? "Generando..." : "Generar Reporte"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      {showResults && (
        <>
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Tickets</p>
                    <p className="text-2xl font-bold">{reportData.summary.totalTickets}</p>
                  </div>
                  <BarChart3 className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Resueltos</p>
                    <p className="text-2xl font-bold">{reportData.summary.resolvedTickets}</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Tiempo Promedio</p>
                    <p className="text-2xl font-bold">{reportData.summary.avgResolutionTime}</p>
                  </div>
                  <Clock className="h-8 w-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Satisfacción</p>
                    <p className="text-2xl font-bold">{reportData.summary.customerSatisfaction}</p>
                  </div>
                  <Users className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Reports */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Reporte por Categoría</CardTitle>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Exportar
                </Button>
              </CardHeader>
              <CardContent>
                <DataTable columns={categoryColumns} data={reportData.byCategory} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Rendimiento por Técnico</CardTitle>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Exportar
                </Button>
              </CardHeader>
              <CardContent>
                <DataTable columns={technicianColumns} data={reportData.byTechnician} />
              </CardContent>
            </Card>
          </div>

          {/* Export Options */}
          <Card>
            <CardHeader>
              <CardTitle>Opciones de Exportación</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Exportar a PDF
                </Button>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Exportar a Excel
                </Button>
                <Button variant="outline">
                  <Calendar className="h-4 w-4 mr-2" />
                  Programar Reporte
                </Button>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}
