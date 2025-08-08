"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { carSchema, type CarInput } from "@/lib/validations/car";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ImageUpload } from "./image-upload";
import { Loader2, Plus, X } from "lucide-react";

interface CarFormProps {
  carId?: string;
  initialData?: Partial<CarInput>;
}

const brands = [
  "Volkswagen",
  "Chevrolet",
  "Fiat",
  "Toyota",
  "Hyundai",
  "Honda",
  "Ford",
  "Renault",
  "Jeep",
  "Nissan",
  "Peugeot",
  "Citroën",
  "Kia",
  "Mitsubishi",
  "Mercedes-Benz",
  "BMW",
  "Audi",
  "Chery",
  "Land Rover",
  "Volvo",
  "JAC Motors",
  "Lexus",
  "Suzuki",
  "Subaru",
  "Ram",
  "Porsche",
  "Jaguar",
  "Mini",
  "Dodge",
  "Geely",
  "BYD",
  "Tesla",
  "Great Wall",
  "SsangYong",
  "Mazda",
  "Alfa Romeo",
  "Ferrari",
  "Lamborghini",
  "Maserati",
  "Bentley",
  "Rolls-Royce",
  "Aston Martin",
  "Bugatti",
  "Smart",
  "Troller",
  "Agrale",
  "Hafei",
  "Lifan",
  "Effa",
  "Mahindra",
  "Chana",
  "Daihatsu",
  "Foton",
  "Sinotruk",
  "Shineray",
];

const fuelTypes = [
  { value: "GASOLINE", label: "Gasolina" },
  { value: "DIESEL", label: "Diesel" },
  { value: "HYBRID", label: "Híbrido" },
  { value: "ELECTRIC", label: "Elétrico" },
  { value: "FLEX", label: "Flex" },
];

const transmissions = [
  { value: "AUTOMATIC", label: "Automático" },
  { value: "MANUAL", label: "Manual" },
];

const conditions = [
  { value: "NEW", label: "Novo" },
  { value: "USED", label: "Usado" },
  { value: "SEMI_NEW", label: "Semi-novo" },
];

export function CarForm({ carId, initialData }: CarFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState<string[]>(initialData?.images || []);
  const [features, setFeatures] = useState<string[]>(
    initialData?.features || []
  );
  const [newFeature, setNewFeature] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<CarInput>({
    resolver: zodResolver(carSchema),
    defaultValues: initialData,
  });

  const watchedValues = watch();

  useEffect(() => {
    setValue("images", images);
  }, [images, setValue]);

  useEffect(() => {
    setValue("features", features);
  }, [features, setValue]);

  const addFeature = () => {
    if (newFeature.trim() && !features.includes(newFeature.trim())) {
      setFeatures([...features, newFeature.trim()]);
      setNewFeature("");
    }
  };

  const removeFeature = (index: number) => {
    setFeatures(features.filter((_, i) => i !== index));
  };

  const onSubmit = async (data: CarInput) => {
    if (images.length === 0) {
      toast.error("Pelo menos uma imagem é obrigatória");
      return;
    }

    setIsLoading(true);
    try {
      const url = carId ? `/api/cars/${carId}` : "/api/cars";
      const method = carId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          images,
          features,
        }),
      });

      if (!response.ok) {
        throw new Error("Erro ao salvar carro");
      }

      toast.success(
        carId
          ? "Carro atualizado com sucesso!"
          : "Carro adicionado com sucesso!"
      );
      router.push("/dashboard/cars");
    } catch (error: any) {
      let errorMsg = "Erro ao salvar carro";
      if (error instanceof Error && error.message) {
        errorMsg = error.message;
      }

      if (error?.response) {
        try {
          const apiError = await error.response.json();
          if (apiError?.message) errorMsg = apiError.message;
        } catch {}
      }
      toast.error(errorMsg);

      console.error("[CarForm] Falha ao salvar carro:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Informações Básicas</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="brand">Marca *</Label>
              <Select
                value={watchedValues.brand}
                onValueChange={(value) => setValue("brand", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a marca" />
                </SelectTrigger>
                <SelectContent>
                  {brands.map((brand) => (
                    <SelectItem key={brand} value={brand}>
                      {brand}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.brand && (
                <p className="text-sm text-red-500">{errors.brand.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="model">Modelo *</Label>
              <Input id="model" {...register("model")} disabled={isLoading} />
              {errors.model && (
                <p className="text-sm text-red-500">{errors.model.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="year">Ano *</Label>
              <Input
                id="year"
                type="number"
                min="1900"
                max={new Date().getFullYear() + 1}
                {...register("year", { valueAsNumber: true })}
                disabled={isLoading}
              />
              {errors.year && (
                <p className="text-sm text-red-500">{errors.year.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Preço (R$) *</Label>
              <Input
                id="price"
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                min="0"
                placeholder="Ex: 350.000"
                {...register("price", {
                  valueAsNumber: true,
                  setValueAs: (v) =>
                    v ? Number(String(v).replace(/\D/g, "")) : undefined,
                })}
                disabled={isLoading}
              />
              {errors.price && (
                <p className="text-sm text-red-500">{errors.price.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="mileage">Quilometragem</Label>
              <Input
                id="mileage"
                type="number"
                min="0"
                {...register("mileage", { valueAsNumber: true })}
                disabled={isLoading}
              />
              {errors.mileage && (
                <p className="text-sm text-red-500">{errors.mileage.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fuelType">Combustível *</Label>
              <Select
                value={watchedValues.fuelType}
                onValueChange={(value) => setValue("fuelType", value as any)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Tipo de combustível" />
                </SelectTrigger>
                <SelectContent>
                  {fuelTypes.map((fuel) => (
                    <SelectItem key={fuel.value} value={fuel.value}>
                      {fuel.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.fuelType && (
                <p className="text-sm text-red-500">
                  {errors.fuelType.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="transmission">Transmissão *</Label>
              <Select
                value={watchedValues.transmission}
                onValueChange={(value) =>
                  setValue("transmission", value as any)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Transmissão" />
                </SelectTrigger>
                <SelectContent>
                  {transmissions.map((trans) => (
                    <SelectItem key={trans.value} value={trans.value}>
                      {trans.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.transmission && (
                <p className="text-sm text-red-500">
                  {errors.transmission.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="condition">Condição *</Label>
              <Select
                value={watchedValues.condition}
                onValueChange={(value) => setValue("condition", value as any)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Condição" />
                </SelectTrigger>
                <SelectContent>
                  {conditions.map((cond) => (
                    <SelectItem key={cond.value} value={cond.value}>
                      {cond.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.condition && (
                <p className="text-sm text-red-500">
                  {errors.condition.message}
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Descrição</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="description">Descrição do veículo</Label>
            <Textarea
              id="description"
              placeholder="Descreva as características, estado de conservação, histórico..."
              rows={4}
              {...register("description")}
              disabled={isLoading}
            />
            {errors.description && (
              <p className="text-sm text-red-500">
                {errors.description.message}
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Características</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Ex: Ar condicionado, Direção hidráulica..."
              value={newFeature}
              onChange={(e) => setNewFeature(e.target.value)}
              onKeyPress={(e) =>
                e.key === "Enter" && (e.preventDefault(), addFeature())
              }
              disabled={isLoading}
            />
            <Button type="button" onClick={addFeature} disabled={isLoading}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          {features.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-1 bg-blue-100 text-blue-800 px-2 py-1 rounded"
                >
                  <span className="text-sm">{feature}</span>
                  <button
                    type="button"
                    onClick={() => removeFeature(index)}
                    className="text-blue-600 hover:text-blue-800"
                    disabled={isLoading}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Imagens *</CardTitle>
        </CardHeader>
        <CardContent>
          <ImageUpload
            images={images}
            onImagesChange={setImages}
            maxImages={5}
          />
          {errors.images && (
            <p className="text-sm text-red-500">{errors.images.message}</p>
          )}
        </CardContent>
      </Card>

      <div className="flex gap-4">
        <Button type="submit" disabled={isLoading} className="flex-1">
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {carId ? "Atualizar Carro" : "Adicionar Carro"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
          disabled={isLoading}
        >
          Cancelar
        </Button>
      </div>
    </form>
  );
}
