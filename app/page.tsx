"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Plus } from "lucide-react"
import Link from "next/link"
import PortfolioGallery from "@/components/portfolio-gallery"
import { useAuth } from "@/lib/auth-context"

export default function Page() {
  const [searchTerm, setSearchTerm] = useState("")
  const { user } = useAuth()
  const router = useRouter()

  const handleCreatePortfolio = () => {
    if (user) {
      router.push("/portfolio/new")
    } else {
      router.push("/sign-in")
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="flex items-center justify-between p-6">
        <div className="flex items-center gap-2">
          <div className="h-12 w-12 rounded-full border border-white/20" />
          <span className="text-lg font-medium">OLENX PLATFORMS</span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="#" className="hover:text-gray-300">
            Accueil
          </Link>
          <Link href="#" className="hover:text-gray-300">
            Services
          </Link>
          <Button variant="outline" size="sm" className="rounded-full" onClick={handleCreatePortfolio}>
            <Plus className="mr-2 h-4 w-4 text-black" />
            <span className="text-black">Create Portfolio</span>
          </Button>
          {!user && (
            <Link href="/sign-up" passHref>
              <Button className="rounded-full bg-white text-black hover:bg-gray-200">Sign Up</Button>
            </Link>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <main className="px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 md:grid-cols-2">
            <div>
              <h1 className="text-5xl font-bold leading-tight tracking-tight md:text-6xl">
                COLLABOREZ, CRÉEZ, INNOVEZ
              </h1>
            </div>
            <div className="flex items-center">
              <p className="text-xl text-gray-400">
                Connectez freelances et entreprises : découvrez des portfolios inspirants, proposez des projets
                ambitieux, et collaborez en toute simplicité sur une plateforme dédiée.
              </p>
            </div>
          </div>

          {/* Search Section */}
          <div className="mt-16 space-y-8">
            <div className="relative">
              <Search className="absolute left-4 top-3 h-6 w-6 text-gray-400" />
              <Input
                type="search"
                placeholder="Rechercher..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-12 w-full rounded-full border-gray-800 bg-white/5 pl-12 text-white placeholder:text-gray-400 focus:border-purple-500 focus:ring-purple-500"
              />
            </div>

            {/* Portfolio Gallery */}
            <PortfolioGallery />
          </div>

          {/* CTA Section */}
          <div className="mt-24">
            <h2 className="text-4xl font-bold">Vous avez un projet tête ?</h2>
            <Button
              className="mt-8 rounded-full bg-white px-8 text-black hover:bg-gray-200"
              onClick={() => (window.location.href = "https://olenx.com")}
            >
              Parlons-en
              <span className="ml-2">→</span>
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}

