"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
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
} from "@/components/ui/alert-dialog";
import { Trash2, Plus, Search, Crown, Building } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { EditCompanyModal } from "@/components/admin/edit-company-modal";

interface Company {
  id: string;
  name: string;
  email: string;
  phone?: string;
  slug: string;
  isVIP: boolean;
  createdAt: string;
  profile?: {
    bio?: string;
    avatar?: string;
    address?: string;
  };
  _count: {
    cars: number;
  };
}

export function CompanyList() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchCompanies = async () => {
    try {
      const response = await fetch("/api/admin/companies");
      if (response.ok) {
        const data = await response.json();
        setCompanies(data);
      }
    } catch (error) {
      console.error("Error fetching companies:", error);
      toast.error("Erro ao carregar empresas");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  const handleVIPToggle = async (id: string, isVIP: boolean) => {
    try {
      const response = await fetch(`/api/admin/companies/${id}/vip`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isVIP }),
      });

      if (response.ok) {
        setCompanies(
          companies.map((company) =>
            company.id === id ? { ...company, isVIP } : company
          )
        );
        toast.success(`Empresa ${isVIP ? "promovida a" : "removida do"} VIP`);
      } else {
        toast.error("Erro ao atualizar status VIP");
      }
    } catch (error) {
      toast.error("Erro ao atualizar status VIP");
    }
  };

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      const response = await fetch(`/api/admin/companies/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setCompanies(companies.filter((company) => company.id !== id));
        toast.success("Empresa excluída com sucesso!");
      } else {
        toast.error("Erro ao excluir empresa");
      }
    } catch (error) {
      toast.error("Erro ao excluir empresa");
    } finally {
      setDeletingId(null);
    }
  };

  const formatDate = (date: string) => {
    return new Intl.DateTimeFormat("pt-BR").format(new Date(date));
  };

  const filteredCompanies = companies.filter(
    (company) =>
      company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Card key={i}>
            <CardContent className="p-4">
              <div className="flex gap-4">
                <Skeleton className="w-16 h-16 rounded" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-6 w-1/3" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-4 w-1/4" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Buscar empresas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button asChild>
          <Link href="/admin/companies/create">
            <Plus className="mr-2 h-4 w-4" />
            Nova Empresa
          </Link>
        </Button>
      </div>

      <div className="text-sm text-gray-600">
        {filteredCompanies.length} empresa(s) encontrada(s)
      </div>

      {filteredCompanies.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <Building className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-4">
              {searchTerm
                ? "Nenhuma empresa encontrada com esse termo."
                : "Nenhuma empresa cadastrada."}
            </p>
            <Button asChild>
              <Link href="/admin/companies/create">
                <Plus className="mr-2 h-4 w-4" />
                Criar Primeira Empresa
              </Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredCompanies.map((company) => (
            <Card key={company.id}>
              <CardContent className="p-4">
                <div className="flex gap-4">
                  <div className="relative w-16 h-16 rounded overflow-hidden">
                    <Image
                      src={
                        company.profile?.avatar ||
                        "/placeholder.svg?height=64&width=64"
                      }
                      alt={company.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-lg">
                            {company.name}
                          </h3>
                          {company.isVIP && (
                            <Badge className="bg-yellow-500 text-black">
                              <Crown className="h-3 w-3 mr-1" />
                              VIP
                            </Badge>
                          )}
                        </div>
                        <p className="text-gray-600 mb-1">{company.email}</p>
                        {company.phone && (
                          <p className="text-gray-600 mb-1">{company.phone}</p>
                        )}
                        {company.profile?.address && (
                          <p className="text-gray-600 mb-1">
                            {company.profile.address}
                          </p>
                        )}
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span>{company._count.cars} carro(s)</span>
                          <span>Criada em {formatDate(company.createdAt)}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-2">
                          <span className="text-sm">VIP</span>
                          <Switch
                            checked={company.isVIP}
                            onCheckedChange={(checked) =>
                              handleVIPToggle(company.id, checked)
                            }
                          />
                        </div>
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/user/${company.slug}`}>Ver Perfil</Link>
                        </Button>
                        <EditCompanyModal
                          company={company}
                          onUpdated={(updated: Company) => {
                            setCompanies((prev) =>
                              prev.map((c) =>
                                c.id === updated.id
                                  ? {
                                      ...c,
                                      ...updated,
                                      profile: {
                                        ...c.profile,
                                        ...updated.profile,
                                      },
                                    }
                                  : c
                              )
                            );
                          }}
                        />
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              disabled={deletingId === company.id}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Excluir Empresa
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                Tem certeza que deseja excluir esta empresa?
                                Todos os carros associados também serão
                                excluídos. Esta ação não pode ser desfeita.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancelar</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDelete(company.id)}
                              >
                                Excluir
                              </AlertDialogAction>
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
      )}
    </div>
  );
}
