"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import Link from "next/link"
import Image from "next/image"
import { toast } from "sonner"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Edit, Trash2, Plus, Eye } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

interface Car {
  id: string
  slug: string
  brand: string
  model: string
  year: number
  price: number
  condition: string
  images: string[]
  createdAt: string
}

const conditionLabels = {
  NEW: "Novo",
  USED: "Usado",
  SEMI_NEW: "Semi-novo",
}

export function UserCarsList() {
  
  

  const { data: session } = useSession()
  const [cars, setCars] = useState<Car[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const fetchCars = async () => {
    try {
      const response = await fetch("/api/user/cars")
      if (response.ok) {
        const data = await response.json()
        setCars(data)
      }
    } catch (error) {
      console.error("Error fetching cars:", error)
      toast.error("Erro ao carregar carros")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (session) {
      fetchCars()
    }
  }, [session])

  const handleDelete = async (id: string) => {
    setDeletingId(id)
    try {
      const response = await fetch(`/api/cars/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        setCars(cars.filter((car) => car.id !== id))
        toast.success("Carro excluído com sucesso!")
      } else {
        toast.error("Erro ao excluir carro")
      }
    } catch (error) {
      toast.error("Erro ao excluir carro")
    } finally {
      setDeletingId(null)
    }
  }

  const formatPrice = (price: number) => {
    return `R$ ${new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 0 }).format(price)}`
  }

  const formatDate = (date: string) => {
    return new Intl.DateTimeFormat("pt-BR").format(new Date(date))
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <Card key={i}>
            <CardContent className="p-4">
              <div className="flex gap-4">
                <Skeleton className="w-24 h-24 rounded" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-6 w-1/3" />
                  <Skeleton className="h-4 w-1/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (cars.length === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <p className="text-gray-600 mb-4">Você ainda não tem carros anunciados.</p>
          <Button className="neon-glow-hover transition-shadow" asChild>
            <Link href="/dashboard/cars/add">
              <Plus className="mr-2 h-4 w-4" />
              Adicionar Primeiro Carro
            </Link>
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4" tabIndex={-1} id="user-cars-heading">
        Seus carros anunciados
      </h2>
      <div className="flex justify-between items-center">
        <p className="text-gray-600">{cars.length} carro(s) encontrado(s)</p>
        <Button className="neon-glow-hover transition-shadow" asChild>
          <Link href="/dashboard/cars/add">
            <Plus className="mr-2 h-4 w-4" />
            Adicionar Carro
          </Link>
        </Button>
      </div>

      {cars.map((car) => (
        <Card key={car.id}>
          <CardContent className="p-4">
            <div className="flex gap-4">
              <div className="relative w-24 h-24 rounded overflow-hidden">
                <Image
                  src={car.images[0] || "/placeholder.svg?height=96&width=96"}
                  alt={`${car.brand} ${car.model}`}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-lg">
                      {car.brand} {car.model}
                    </h3>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-gray-600">{car.year}</span>
                      <Badge className="badge-theme-light dark:badge-theme-dark neon-glow-hover transition-colors">
                        {conditionLabels[car.condition as keyof typeof conditionLabels]}
                      </Badge>
                    </div>
                    <p className="text-2xl font-bold text-foreground transition-colors">{formatPrice(car.price)}</p>
                    <p className="text-sm text-gray-500">Publicado em {formatDate(car.createdAt)}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button className="neon-glow-hover transition-shadow" variant="outline" size="sm" asChild>
                      <Link href={`/detail/${car.id}`}>
                        <Eye className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button className="neon-glow-hover transition-shadow" variant="outline" size="sm" asChild>
                      <Link href={`/dashboard/cars/edit/${car.id}`}>
                        <Edit className="h-4 w-4" />
                      </Link>
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button className="neon-glow-hover transition-shadow" variant="outline" size="sm" disabled={deletingId === car.id}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Excluir Carro</AlertDialogTitle>
                          <AlertDialogDescription>
                            Tem certeza que deseja excluir este carro? Esta ação não pode ser desfeita.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancelar</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDelete(car.id)}>Excluir</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
