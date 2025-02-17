import Link from "next/link"
import Image from "next/image"

const portfolios = [
  {
    id: "1",
    title: "FREEZING BIRTHDAY",
    category: "CREATIVE",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-15%20at%2018.12.43-EjRlxvC0Nyo7CGblcOTa5lEQnPGix8.png",
    backgroundColor: "bg-[#FFD700]",
  },
  {
    id: "2",
    title: "STREAM SHOP",
    category: "DESIGN",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-15%20at%2018.12.43-EjRlxvC0Nyo7CGblcOTa5lEQnPGix8.png",
    backgroundColor: "bg-[#90EE90]",
  },
  {
    id: "3",
    title: "RANDOM RISK",
    category: "PHOTO",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-15%20at%2018.12.43-EjRlxvC0Nyo7CGblcOTa5lEQnPGix8.png",
    backgroundColor: "bg-[#DDA0DD]",
  },
  {
    id: "4",
    title: "SWEET MOMENTS",
    category: "CREATIVE",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-15%20at%2018.12.43-EjRlxvC0Nyo7CGblcOTa5lEQnPGix8.png",
    backgroundColor: "bg-[#FF69B4]",
  },
  {
    id: "5",
    title: "COFFEE TIME",
    category: "DESIGN",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-15%20at%2018.12.43-EjRlxvC0Nyo7CGblcOTa5lEQnPGix8.png",
    backgroundColor: "bg-[#6495ED]",
  },
  {
    id: "6",
    title: "SOUND WAVES",
    category: "AUDIO",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-15%20at%2018.12.43-EjRlxvC0Nyo7CGblcOTa5lEQnPGix8.png",
    backgroundColor: "bg-[#9ACD32]",
  },
]

export default function PortfolioGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {portfolios.map((portfolio) => (
        <Link key={portfolio.id} href={`/portfolio/${portfolio.id}`} className="group block">
          <div className={`rounded-[32px] overflow-hidden ${portfolio.backgroundColor} aspect-[4/3]`}>
            <div className="relative w-full h-full transition-transform duration-300 group-hover:scale-105">
              <Image src={portfolio.image || "/placeholder.svg"} alt={portfolio.title} fill className="object-cover" />
            </div>
          </div>
          <div className="mt-6 space-y-1">
            <h2 className="text-2xl font-medium">{portfolio.title}</h2>
            <p className="text-sm text-white/60">{portfolio.category}</p>
          </div>
        </Link>
      ))}
    </div>
  )
}

