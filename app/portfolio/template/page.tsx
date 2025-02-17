"use client"

import { useState } from "react"
import Image from "next/image"
import { Pencil, Camera, LinkIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

interface SocialLink {
  platform: string
  url: string
}

export default function PortfolioTemplate() {
  const [title, setTitle] = useState("Your Portfolio Title")
  const [tagline, setTagline] = useState("Web Developer & Designer")
  const [description, setDescription] = useState(
    "I'm a passionate web developer and designer with 5 years of experience. I specialize in creating beautiful, functional, and user-friendly websites and applications.",
  )
  const [thumbnailSrc, setThumbnailSrc] = useState("/placeholder.svg")
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([
    { platform: "GitHub", url: "https://github.com" },
    { platform: "LinkedIn", url: "https://linkedin.com" },
    { platform: "Twitter", url: "https://twitter.com" },
  ])

  const handleSocialLinkChange = (index: number, field: "platform" | "url", value: string) => {
    const updatedLinks = [...socialLinks]
    updatedLinks[index][field] = value
    setSocialLinks(updatedLinks)
  }

  const addSocialLink = () => {
    setSocialLinks([...socialLinks, { platform: "", url: "" }])
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg overflow-hidden">
          {/* Header with thumbnail */}
          <div className="relative h-64 sm:h-80">
            <Image src={thumbnailSrc || "/placeholder.svg"} alt="Portfolio thumbnail" fill className="object-cover" />
            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
              <Button variant="outline" size="icon" className="rounded-full bg-white/10 hover:bg-white/20">
                <Camera className="h-6 w-6" />
                <span className="sr-only">Change thumbnail</span>
              </Button>
            </div>
          </div>

          {/* Main content */}
          <div className="p-8">
            {/* Title and tagline */}
            <div className="space-y-2 mb-6">
              <div className="relative">
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="text-3xl font-bold w-full bg-transparent border-none focus:ring-0 p-0"
                />
                <Pencil className="h-5 w-5 absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
              <div className="relative">
                <Input
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  className="text-xl text-gray-600 dark:text-gray-300 w-full bg-transparent border-none focus:ring-0 p-0"
                />
                <Pencil className="h-4 w-4 absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full min-h-[100px] text-gray-700 dark:text-gray-200 bg-transparent border-none focus:ring-0 p-0 resize-none"
                placeholder="Describe yourself and your work..."
              />
            </div>

            {/* Social links */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Social Links</h3>
              {socialLinks.map((link, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Input
                    value={link.platform}
                    onChange={(e) => handleSocialLinkChange(index, "platform", e.target.value)}
                    placeholder="Platform"
                    className="flex-1"
                  />
                  <Input
                    value={link.url}
                    onChange={(e) => handleSocialLinkChange(index, "url", e.target.value)}
                    placeholder="URL"
                    className="flex-1"
                  />
                  <LinkIcon className="h-5 w-5 text-gray-400" />
                </div>
              ))}
              <Button onClick={addSocialLink} variant="outline" className="w-full">
                Add Social Link
              </Button>
            </div>
          </div>
        </div>

        {/* Save button */}
        <div className="mt-8 flex justify-end">
          <Button className="px-8">Save Portfolio</Button>
        </div>
      </div>
    </div>
  )
}

