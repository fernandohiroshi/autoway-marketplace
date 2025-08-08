"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";

const profileSchema = z.object({
  avatar: z.string().optional(),
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  slug: z.string()
    .min(3, "Slug deve ter pelo menos 3 caracteres")
    .max(32, "Slug deve ter no máximo 32 caracteres")
    .regex(/^[a-z0-9-]+$/, "Use apenas letras minúsculas, números e hífen em espaços"),
  phone: z.string()
    .min(8, "Telefone deve ter pelo menos 8 dígitos")
    .max(15, "Telefone deve ter no máximo 15 dígitos")
    .regex(/^\d+$/, "Digite apenas números")
    .optional()
    .or(z.literal("")),
  bio: z.string().optional(),
  address: z.string().optional(),
  website: z.string().url("URL inválida").optional().or(z.literal("")),
});

type ProfileInput = z.infer<typeof profileSchema>;

import { ImageUpload } from "@/components/dashboard/image-upload";

export function ProfileForm() {
  const { data: session, update } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [profile, setProfile] = useState<any>(null);
  const [avatar, setAvatar] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProfileInput>({
    resolver: zodResolver(profileSchema),
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch("/api/profile");
        if (response.ok) {
          const data = await response.json();
          setProfile(data);
          reset({
            avatar: data.profile?.avatar || data.avatar || "",
            name: data.name || "",
            phone: data.phone || "",
            bio: data.profile?.bio || "",
            address: data.profile?.address || "",
            website: data.profile?.website || "",
          });
          setAvatar(data.profile?.avatar || data.avatar || "");
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    if (session) {
      fetchProfile();
    }
  }, [session, reset]);

  const onSubmit = async (data: ProfileInput) => {
    data.avatar = avatar;
    setIsLoading(true);
    try {
      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Erro ao atualizar perfil");
      }

      const updatedProfile = await response.json();
      setProfile(updatedProfile);

      
      if (
        (data.name && data.name !== session?.user.name) ||
        (data.slug && data.slug !== session?.user.slug)
      ) {
        await update({ name: data.name, slug: data.slug });
        window.location.reload(); 
        return;
      }

      toast.success("Perfil atualizado com sucesso!");

      
      if (data.slug && data.slug !== session?.user.slug) {
        window.location.href = `/user/${data.slug}`;
      } else {
        window.location.reload(); 
      }
    } catch (error) {
      toast.error("Erro ao atualizar perfil");
    } finally {
      setIsLoading(false);
    }
  };

  if (!profile) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Informações Pessoais</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-6">
              <Skeleton className="h-20 w-20 rounded-full" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-6 w-1/2" />
                <Skeleton className="h-4 w-1/3" />
              </div>
            </div>
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <div className="flex justify-end">
              <Skeleton className="h-10 w-32" />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Informações Pessoais</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label>Avatar</Label>
            <ImageUpload
              images={avatar ? [avatar] : []}
              onImagesChange={(imgs) => setAvatar(imgs[0] || "")}
              maxImages={1}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome *</Label>
              <Input id="name" {...register("name")} disabled={isLoading} />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="slug">Slug (URL personalizada)</Label>
              <Input
                id="slug"
                maxLength={32}
                placeholder="ex: minha-empresa"
                {...register("slug")}
                disabled={isLoading}
              />
              <p className="text-xs text-gray-500 dark:text-gray-200">Sua página ficará: <span className="font-mono">/user/nome-da-sua-empresa</span></p>
              {errors.slug && (
                <p className="text-sm text-red-500">{errors.slug.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Telefone</Label>
              <Input
                id="phone"
                type="tel"
                maxLength={15}
                pattern="[0-9 ]*"
                inputMode="numeric"
                placeholder="45 9xxxx-xxxx"
                {...register("phone")}
                disabled={isLoading}
                onInput={e => {
                  const input = e.target as HTMLInputElement;
                  input.value = input.value.replace(/[^0-9 ]/g, "");
                }}
              />
              {errors.phone && (
                <p className="text-sm text-red-500">{errors.phone.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Biografia</Label>
            <Textarea
              id="bio"
              placeholder="Conte um pouco sobre você..."
              rows={3}
              {...register("bio")}
              disabled={isLoading}
            />
            {errors.bio && (
              <p className="text-sm text-red-500">{errors.bio.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Endereço</Label>
            <Input
              id="address"
              placeholder="Cidade, Estado"
              {...register("address")}
              disabled={isLoading}
            />
            {errors.address && (
              <p className="text-sm text-red-500">{errors.address.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="website">Website</Label>
            <Input
              id="website"
              type="url"
              placeholder="https://seusite.com"
              {...register("website")}
              disabled={isLoading}
            />
            {errors.website && (
              <p className="text-sm text-red-500">{errors.website.message}</p>
            )}
          </div>

          <Button type="submit" disabled={isLoading} className="w-full" aria-label="Salvar perfil">
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Salvar Alterações
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
