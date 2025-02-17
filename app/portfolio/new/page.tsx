"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Pencil, Camera, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

interface SocialLink {
  id: string
  platform: string
  url: string
}

interface TextBlock {
  id: string
  content: string
}

interface ImageBlock {
  id: string
  src: string
  alt: string
}

export default function NewPortfolio() {
  const router = useRouter()
  const [title, setTitle] = useState("New Portfolio")
  const [tagline, setTagline] = useState("Your tagline here")
  const [description, setDescription] = useState("Describe your portfolio...")
  const [thumbnailSrc, setThumbnailSrc] = useState("/placeholder.svg")
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([])
  const [textBlocks, setTextBlocks] = useState<TextBlock[]>([])
  const [imageBlocks, setImageBlocks] = useState<ImageBlock[]>([])

  const handleSocialLinkChange = (id: string, field: "platform" | "url", value: string) => {
    setSocialLinks((links) => links.map((link) => (link.id === id ? { ...link, [field]: value } : link)))
  }

  const addSocialLink = () => {
    setSocialLinks([...socialLinks, { id: Date.now().toString(), platform: "", url: "" }])
  }

  const removeSocialLink = (id: string) => {
    setSocialLinks((links) => links.filter((link) => link.id !== id))
  }

  const handleTextBlockChange = (id: string, content: string) => {
    setTextBlocks((blocks) => blocks.map((block) => (block.id === id ? { ...block, content } : block)))
  }

  const addTextBlock = () => {
    setTextBlocks([...textBlocks, { id: Date.now().toString(), content: "" }])
  }

  const removeTextBlock = (id: string) => {
    setTextBlocks((blocks) => blocks.filter((block) => block.id !== id))
  }

  const handleImageBlockChange = (id: string, field: "src" | "alt", value: string) => {
    setImageBlocks((blocks) => blocks.map((block) => (block.id === id ? { ...block, [field]: value } : block)))
  }

  const addImageBlock = () => {
    setImageBlocks([...imageBlocks, { id: Date.now().toString(), src: "/placeholder.svg", alt: "" }])
  }

  const removeImageBlock = (id: string) => {
    setImageBlocks((blocks) => blocks.filter((block) => block.id !== id))
  }

  const handleCreatePortfolio = () => {
    // Here you would typically send the data to your backend
    // For now, we'll just generate a random ID and redirect
    const newPortfolioId = Math.random().toString(36).substr(2, 9)
    router.push(`/portfolio/${newPortfolioId}`)
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
                placeholder="Describe your portfolio..."
              />
            </div>

            {/* Text Blocks */}
            <div className="space-y-4 mb-8">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Text Blocks</h3>
              {textBlocks.map((block) => (
                <div key={block.id} className="relative">
                  <Textarea
                    value={block.content}
                    onChange={(e) => handleTextBlockChange(block.id, e.target.value)}
                    className="w-full min-h-[100px] text-gray-700 dark:text-gray-200 bg-transparent border rounded-md p-2 resize-none"
                    placeholder="Add your text here..."
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2"
                    onClick={() => removeTextBlock(block.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button onClick={addTextBlock} variant="outline" className="w-full">
                Add Text Block
              </Button>
            </div>

            {/* Image Blocks */}
            <div className="space-y-4 mb-8">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Image Blocks</h3>
              {imageBlocks.map((block) => (
                <div key={block.id} className="relative">
                  <div className="aspect-video relative mb-2">
                    <Image
                      src={block.src || "/placeholder.svg"}
                      alt={block.alt}
                      fill
                      className="object-cover rounded-md"
                    />
                  </div>
                  <Input
                    value={block.alt}
                    onChange={(e) => handleImageBlockChange(block.id, "alt", e.target.value)}
                    placeholder="Image description"
                    className="mb-2"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2"
                    onClick={() => removeImageBlock(block.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button onClick={addImageBlock} variant="outline" className="w-full">
                Add Image Block
              </Button>
            </div>

            {/* Social links */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Social Links</h3>
              {socialLinks.map((link) => (
                <div key={link.id} className="flex items-center space-x-2">
                  <Input
                    value={link.platform}
                    onChange={(e) => handleSocialLinkChange(link.id, "platform", e.target.value)}
                    placeholder="Platform"
                    className="flex-1"
                  />
                  <Input
                    value={link.url}
                    onChange={(e) => handleSocialLinkChange(link.id, "url", e.target.value)}
                    placeholder="URL"
                    className="flex-1"
                  />
                  <Button variant="ghost" size="icon" onClick={() => removeSocialLink(link.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button onClick={addSocialLink} variant="outline" className="w-full">
                Add Social Link
              </Button>
            </div>
          </div>
        </div>

        {/* Create button */}
        <div className="mt-8 flex justify-end">
          <Button className="px-8" onClick={handleCreatePortfolio}>
            Create Portfolio
          </Button>
        </div>
      </div>
    </div>
  )
}

