"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";

export function SearchInput() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [value, setValue] = useState(searchParams.get("search") || "");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    if (e.target.value) {
      params.set("search", e.target.value);
      params.set("page", "1"); 
    } else {
      params.delete("search");
    }
    router.replace(`/cars?${params.toString()}`);
  };

  return (
  <div className="mb-6 flex w-full max-w-md relative">
    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-neutral-200 pointer-events-none">
      <Search className="h-5 w-5" />
    </span>
    <Input
      type="search"
      placeholder="Buscar por marca, modelo ou descrição..."
      value={value}
      onChange={handleChange}
      className="w-full pl-10"
      aria-label="Buscar carros"
    />
  </div>
);
}
