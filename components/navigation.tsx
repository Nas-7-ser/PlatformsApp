"use client"

import Link from "next/link"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function Navigation() {
  const { user, signOut } = useAuth()

  return (
    <nav className="flex items-center justify-between p-6">
      <div className="flex items-center gap-2">
        <div className="h-12 w-12 rounded-full border border-white/20" />
        <span className="text-lg font-medium">OLENX PLATFORMS</span>
      </div>
      <div className="flex items-center gap-4">
        <Link href="/" className="hover:text-gray-300">
          Accueil
        </Link>
        <Link href="#" className="hover:text-gray-300">
          Services
        </Link>
        {user ? (
          <>
            <Link href="/portfolio/new" passHref>
              <Button variant="outline" size="sm" className="rounded-full">
                New Portfolio
              </Button>
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage src="/placeholder-user.jpg" alt={user.name} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem onClick={signOut}>Sign out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        ) : (
          <>
            <Link href="/sign-in" passHref>
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link href="/sign-up" passHref>
              <Button>Sign Up</Button>
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}

