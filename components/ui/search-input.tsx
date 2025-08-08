"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SearchInputProps {
  placeholder?: string;
  className?: string;
}

export function SearchInput({
  placeholder = "Buscar carros...",
  className,
}: SearchInputProps) {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/cars?search=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className={className} autoComplete="off">
      <div
        className={`flex items-center w-full bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm rounded-lg shadow-lg border transition-all duration-200 px-1 h-12 sm:h-14 ${
          isFocused
            ? "border-gray-400 dark:border-gray-600 shadow-xl"
            : "border-gray-200 dark:border-gray-700"
        }`}
      >
        <span className="pl-4 pr-2 text-gray-500 dark:text-gray-400 flex items-center">
          <Search className="h-5 w-5" />
        </span>
        <input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          aria-label="Buscar carros"
          className="flex-1 bg-transparent outline-none border-none text-base sm:text-lg h-full px-2 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
        />
        <Button
          type="submit"
          size="sm"
          className="h-8 sm:h-10 px-4 sm:px-6 rounded-md ml-2 mr-1 bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100 border-0 font-medium"
        >
          <Search className="h-4 w-4 sm:mr-2" />
          <span className="hidden sm:inline">Buscar</span>
        </Button>
      </div>
    </form>
  );
}
