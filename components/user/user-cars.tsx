"use client"

import { useState } from "react"
import { CarCard } from "@/components/cars/car-card"
import { Card, CardContent } from "@/components/ui/card"

import { Button } from "@/components/ui/button"

interface UserCarsProps {
  cars: Array<{
    id: string
    slug: string
    brand: string
    model: string
    year: number
    price: number
    transmission: string
    fuelType: string
    condition: string
    mileage?: number
    images: string[]
    user: {
      name: string
      slug: string
      isVIP: boolean
    }
  }>
  userName: string
}

export function UserCars({ cars, userName }: UserCarsProps) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const carsPerPage = 6;

  const filteredCars = cars.filter(car => {
    const termo = search.toLowerCase();
    return (
      car.brand.toLowerCase().includes(termo) ||
      car.model.toLowerCase().includes(termo) ||
      String(car.year).includes(termo)
    );
  });

  const totalPages = Math.ceil(filteredCars.length / carsPerPage);
  const paginatedCars = filteredCars.slice((page - 1) * carsPerPage, page * carsPerPage);

  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  if (cars.length === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <p className="text-gray-600">{userName} ainda não tem carros anunciados.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Carros de {userName}</h2>
        <p className="text-gray-600">{cars.length} carro(s) anunciado(s)</p>
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Busque por marca, modelo ou ano..."
          value={search}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSearch(e.target.value)}
          className="max-w-md w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-zinc-900 text-gray-800 dark:text-gray-100"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {paginatedCars.length > 0 ? (
          paginatedCars.map((car) => (
            <div className="max-w-full" key={car.id}>
              <CarCard car={car} />
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-8 text-gray-500">
            Nenhum carro encontrado.
          </div>
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-6">
          <Button size="sm" variant="outline" onClick={() => setPage(page - 1)} disabled={page === 1}>Anterior</Button>
          <span className="text-sm text-gray-600 dark:text-gray-200">
            Página {page} de {totalPages}
          </span>
          <Button size="sm" variant="outline" onClick={() => setPage(page + 1)} disabled={page === totalPages}>Próxima</Button>
        </div>
      )}
    </div>
  )
}
