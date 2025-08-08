"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/stores/auth-store";
import { Car, Menu, LogOut, Sun, Moon } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { AuthModals } from "@/components/auth/auth-modals";

export function Header() {
  const { data: session } = useSession();
  const { openLogin, openRegister } = useAuthStore();
  const { theme, setTheme } = useTheme();

  const navigation = [
    { name: "Carros", href: "/cars" },
    { name: "Como Funciona", href: "/#como-funciona" },
    { name: "Contato", href: "/#contato" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 backdrop-blur-lg bg-background/80" role="banner">
      <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4">
        <Link
          href="/"
          className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
        >
          <span className="font-bold text-xl text-neutral-900 dark:text-white">
            AutoWay
          </span>
        </Link>

        
        <nav className="hidden md:flex items-center space-x-1" role="navigation" aria-label="Navegação principal">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-medium rounded-md px-4 py-2 text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-white/10 transition-all duration-200"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        
        <div className="hidden md:flex items-center space-x-3">
          
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="neon-glow-hover transition-shadow rounded-full text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-900/60"
          >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>

          {session ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="neon-glow-hover transition-shadow relative h-9 w-9 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800/50"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={session?.user?.image || undefined}
                      alt={session?.user?.name || "Avatar"}
                    />
                    <AvatarFallback className="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white text-xs">
                      {session?.user?.name
                        ? session.user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .toUpperCase()
                            .slice(0, 2)
                        : "AU"}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-1 leading-none">
                    <p className="font-medium">{session.user?.name ?? ""}</p>
                    <p className="w-[200px] truncate text-sm text-muted-foreground">
                      {session.user?.email ?? ""}
                    </p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/dashboard">Dashboard</Link>
                </DropdownMenuItem>
                {session.user?.slug && (
                  <DropdownMenuItem asChild>
                    <Link href={`/user/${session.user?.slug}`}>Minha Página</Link>
                  </DropdownMenuItem>
                )}
                {session.user?.role === "ADMIN" && (
                  <DropdownMenuItem asChild>
                    <Link href="/admin">Admin</Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="cursor-pointer"
                  onSelect={() => signOut({ callbackUrl: "/" })}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Sair
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                onClick={openLogin}
                className="neon-glow-hover transition-shadow text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800/50"
              >
                Entrar
              </Button>
              <Button
                onClick={openRegister}
                className="neon-glow-hover transition-shadow bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100 border-0"
              >
                Cadastrar
              </Button>
            </div>
          )}
        </div>

        
        <div className="flex md:hidden items-center space-x-2">
          
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="neon-glow-hover transition-shadow rounded-full text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-900/60"
          >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>

          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="neon-glow-hover transition-shadow text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800/50"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <SheetHeader>
                <SheetTitle className="flex items-center space-x-2 text-start">
                  <span className="text-gray-900 dark:text-white">AutoWay</span>
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-4 mt-8">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block px-4 py-3 text-lg rounded-lg text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-all duration-200"
                  >
                    {item.name}
                  </Link>
                ))}
                {session ? (
                  <div className="flex flex-col gap-2 pt-6 border-t border-gray-200 dark:border-gray-800">
                    <Link
                      href="/dashboard"
                      className="block px-4 py-3 text-lg rounded-lg text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-all duration-200"
                    >
                      Dashboard
                    </Link>
                    {session.user?.slug && (
                      <Link
                        href={`/user/${session.user.slug}`}
                        className="block px-4 py-3 text-lg rounded-lg text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-all duration-200"
                      >
                        Meu Perfil
                      </Link>
                    )}
                    {session.user?.role === "ADMIN" && (
                      <Link
                        href="/admin"
                        className="block px-4 py-3 text-lg rounded-lg text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-all duration-200"
                      >
                        Admin
                      </Link>
                    )}
                    <Button
                      variant="ghost"
                      onClick={() => signOut({ callbackUrl: "/" })}
                      className="neon-glow-hover transition-shadow justify-start px-4 py-3 text-lg h-auto text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800/50"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Sair
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-3 pt-6 border-t border-gray-200 dark:border-gray-800">
                    <Button
                      variant="ghost"
                      onClick={openLogin}
                      className="neon-glow-hover transition-shadow justify-start px-4 py-3 text-lg h-auto text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800/50"
                    >
                      Entrar
                    </Button>
                    <Button
                      onClick={openRegister}
                      className="neon-glow-hover transition-shadow justify-start px-4 py-3 text-lg h-auto bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100 border-0"
                    >
                      Cadastrar
                    </Button>
                  </div>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      <AuthModals />
    </header>
  );
}
