import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import Link from "next/link"

export default function Page() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="flex items-center justify-between p-6">
        <div className="flex items-center gap-2">
          <div className="h-12 w-12 rounded-full border border-white/20" />
          <span className="text-lg font-medium">OLENX PLATFORMS</span>
        </div>
        <div className="flex items-center gap-8">
          <Link href="#" className="hover:text-gray-300">
            Accueil
          </Link>
          <Link href="#" className="hover:text-gray-300">
            Services
          </Link>
          <Button className="rounded-full bg-white text-black hover:bg-gray-200">Nous rejoindre</Button>
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
                className="h-12 w-full rounded-full border-gray-800 bg-white/5 pl-12 text-white placeholder:text-gray-400 focus:border-purple-500 focus:ring-purple-500"
              />
            </div>

            {/* Tabs */}
            <div className="flex gap-8 border-b border-gray-800">
              <button className="border-b-2 border-purple-500 pb-4 text-purple-500">Tout</button>
              <button className="pb-4 text-gray-400 hover:text-white">Portfolios</button>
              <button className="pb-4 text-gray-400 hover:text-white">Projets</button>
              <button className="pb-4 text-gray-400 hover:text-white">Idées</button>
            </div>

            {/* No Data Message */}
            <div className="py-12 text-center text-gray-400">Aucune donnée disponible</div>
          </div>

          {/* CTA Section */}
          <div className="mt-24">
            <h2 className="text-4xl font-bold">Vous avez un projet tête ?</h2>
            <Button className="mt-8 rounded-full bg-white px-8 text-black hover:bg-gray-200">
              Parlons-en
              <span className="ml-2">→</span>
            </Button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-24 border-t border-gray-800 px-6 py-12">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 md:grid-cols-3">
            <div>
              <h3 className="mb-4 text-lg font-semibold">EXPLORE</h3>
              <div className="space-y-3">
                <Link href="#" className="block text-gray-400 hover:text-white">
                  Work
                </Link>
                <Link href="#" className="block text-gray-400 hover:text-white">
                  Terms & Privacy
                </Link>
                <Link href="#" className="block text-gray-400 hover:text-white">
                  Contact
                </Link>
              </div>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-semibold">LEGAL</h3>
              <div className="space-y-3">
                <Link href="#" className="block text-gray-400 hover:text-white">
                  Terms & Privacy
                </Link>
              </div>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-semibold">SOCIAL</h3>
              <div className="space-y-3">
                <Link href="#" className="block text-gray-400 hover:text-white">
                  LinkedIn
                </Link>
                <Link href="#" className="block text-gray-400 hover:text-white">
                  Instagram
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

