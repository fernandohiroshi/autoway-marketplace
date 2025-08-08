"use client";
import { useState, useRef } from "react";
import { slugify } from "@/utils/slugify";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export function EditCompanyModal({
  company,
  onUpdated,
}: {
  company: any;
  onUpdated: (c: any) => void;
}) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    name: company.name || "",
    email: company.email || "",
    phone: company.phone || "",
    address: company.profile?.address || "",
    bio: company.profile?.bio || "",
    slug: company.slug || "",
  });
  const prevSlug = useRef(company.slug || "");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    if (name === "name") {
      const newSlug = slugify(value);
      setForm((f) => ({ ...f, name: value, slug: newSlug }));
    } else {
      setForm((f) => ({ ...f, [name]: value }));
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/companies/${company.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        const updated = await res.json();
        onUpdated(updated);
        if (prevSlug.current !== form.slug) {
          toast.success(`Empresa atualizada! Novo link: /empresa/${form.slug}`);
          prevSlug.current = form.slug;
        } else {
          toast.success("Empresa atualizada com sucesso!");
        }
        setOpen(false);
        window.location.reload(); 
      } else {
        toast.error("Erro ao atualizar empresa");
      }
    } catch {
      toast.error("Erro ao atualizar empresa");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button variant="outline" size="sm" onClick={() => setOpen(true)}>
        Editar
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Empresa</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Nome</Label>
              <Input
                name="name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                type="email"
              />
            </div>
            <div>
              <Label htmlFor="phone">Telefone</Label>
              <Input name="phone" value={form.phone} onChange={handleChange} />
            </div>
            <div>
              <Label htmlFor="address">Endereço</Label>
              <Input
                name="address"
                value={form.address}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label htmlFor="bio">Bio</Label>
              <Input name="bio" value={form.bio} onChange={handleChange} />
            </div>
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? "Salvando..." : "Salvar"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
