"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Filter, X } from "lucide-react"

const brands = [
  "Audi",
  "BMW",
  "Chevrolet",
  "Fiat",
  "Ford",
  "Honda",
  "Hyundai",
  "Jeep",
  "Mercedes-Benz",
  "Nissan",
  "Peugeot",
  "Renault",
  "Toyota",
  "Volkswagen",
]

const fuelTypes = [
  { value: "GASOLINE", label: "Gasolina" },
  { value: "DIESEL", label: "Diesel" },
  { value: "HYBRID", label: "Híbrido" },
  { value: "ELECTRIC", label: "Elétrico" },
  { value: "FLEX", label: "Flex" },
]

const transmissions = [
  { value: "AUTOMATIC", label: "Automático" },
  { value: "MANUAL", label: "Manual" },
]

const conditions = [
  { value: "NEW", label: "Novo" },
  { value: "USED", label: "Usado" },
  { value: "SEMI_NEW", label: "Semi-novo" },
]

export function CarFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isOpen, setIsOpen] = useState(false)

  const [filters, setFilters] = useState({
    search: searchParams.get("search") || "",
    brand: searchParams.get("brand") || "all",
    fuelType: searchParams.get("fuelType") || "all",
    transmission: searchParams.get("transmission") || "all",
    condition: searchParams.get("condition") || "all",
    minPrice: searchParams.get("minPrice") || "",
    maxPrice: searchParams.get("maxPrice") || "",
    minYear: searchParams.get("minYear") || "",
    maxYear: searchParams.get("maxYear") || "",
  })

  const applyFilters = () => {
    const params = new URLSearchParams()

    Object.entries(filters).forEach(([key, value]) => {
      if (value !== "all") {
        params.set(key, value)
      }
    })

    router.push(`/cars?${params.toString()}`)
    setIsOpen(false)
  }

  const clearFilters = () => {
    setFilters({
      search: "",
      brand: "all",
      fuelType: "all",
      transmission: "all",
      condition: "all",
      minPrice: "",
      maxPrice: "",
      minYear: "",
      maxYear: "",
    })
    router.push("/cars")
    setIsOpen(false)
  }

  const hasActiveFilters = Object.values(filters).some((value) => value !== "" && value !== "all")

  return (
    <div className="mb-6">
      <Button variant="outline" onClick={() => setIsOpen(!isOpen)} className="mb-4">
        <Filter className="mr-2 h-4 w-4" />
        Filtros
        {hasActiveFilters && (
          <span className="ml-2 bg-blue-600 text-white dark:bg-blue-400 dark:text-neutral-900 rounded-full px-2 py-1 text-xs">
            {Object.values(filters).filter((value) => value !== "" && value !== "all").length}
          </span>
        )}
      </Button>

      {isOpen && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Filtros
              <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="search">Buscar</Label>
                <Input
                  id="search"
                  placeholder="Marca, modelo..."
                  value={filters.search}
                  onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="brand">Marca</Label>
                <Select value={filters.brand} onValueChange={(value) => setFilters({ ...filters, brand: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a marca" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas as marcas</SelectItem>
                    {brands.map((brand) => (
                      <SelectItem key={brand} value={brand}>
                        {brand}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="fuelType">Combustível</Label>
                <Select value={filters.fuelType} onValueChange={(value) => setFilters({ ...filters, fuelType: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Tipo de combustível" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    {fuelTypes.map((fuel) => (
                      <SelectItem key={fuel.value} value={fuel.value}>
                        {fuel.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="transmission">Transmissão</Label>
                <Select
                  value={filters.transmission}
                  onValueChange={(value) => setFilters({ ...filters, transmission: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Transmissão" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas</SelectItem>
                    {transmissions.map((trans) => (
                      <SelectItem key={trans.value} value={trans.value}>
                        {trans.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="condition">Condição</Label>
                <Select
                  value={filters.condition}
                  onValueChange={(value) => setFilters({ ...filters, condition: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Condição" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas</SelectItem>
                    {conditions.map((cond) => (
                      <SelectItem key={cond.value} value={cond.value}>
                        {cond.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label htmlFor="minYear">Ano mín.</Label>
                  <Input
                    id="minYear"
                    type="number"
                    placeholder="2000"
                    value={filters.minYear}
                    onChange={(e) => setFilters({ ...filters, minYear: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="maxYear">Ano máx.</Label>
                  <Input
                    id="maxYear"
                    type="number"
                    placeholder="2024"
                    value={filters.maxYear}
                    onChange={(e) => setFilters({ ...filters, maxYear: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label htmlFor="minPrice">Preço mín.</Label>
                  <Input
                    id="minPrice"
                    type="number"
                    placeholder="10000"
                    value={filters.minPrice}
                    onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="maxPrice">Preço máx.</Label>
                  <Input
                    id="maxPrice"
                    type="number"
                    placeholder="100000"
                    value={filters.maxPrice}
                    onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-2 pt-4">
              <Button onClick={applyFilters} className="flex-1">
                Aplicar Filtros
              </Button>
              <Button variant="outline" onClick={clearFilters}>
                Limpar
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
