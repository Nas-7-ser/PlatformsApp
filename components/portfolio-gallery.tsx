"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"

// Assuming we have a function to fetch portfolios from an API
import { fetchPortfolios } from "@/lib/api"

export default function PortfolioGallery() {
  const [portfolios, setPortfolios] = useState([])

  useEffect(() => {
    const loadPortfolios = async () => {
      const fetchedPortfolios = await fetchPortfolios()
      setPortfolios(fetchedPortfolios)
    }

    loadPortfolios()

    // Set up an interval to periodically check for updates
    const intervalId = setInterval(loadPortfolios, 30000) // Check every 30 seconds

    return () => clearInterval(intervalId)
  }, [])

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {portfolios.map((portfolio) => (
        <Link key={portfolio.id} href={`/portfolio/${portfolio.id}`} className="block">
          <div className="bg-gray-800 rounded-lg overflow-hidden aspect-square relative group">
            <Image
              src={portfolio.thumbnail || "/placeholder.svg"}
              alt={portfolio.title}
              fill
              className="object-cover transition-transform group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-white text-sm font-medium">{portfolio.title}</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}

