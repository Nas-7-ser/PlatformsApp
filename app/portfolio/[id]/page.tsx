"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Pencil, Camera, Trash2, ArrowUp, ArrowDown, Download, ThumbsUp, ThumbsDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { QRCodeComponent } from "@/components/qr-code"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import { fetchPortfolio, savePortfolio, deletePortfolio, saveVote } from "@/lib/api"
import type { Portfolio } from "@/types"
import { useAuth } from "@/lib/auth-context"

interface SocialLink {
  id: string
  platform: string
  url: string
}

interface Block {
  id: string
  type: "text" | "image" | "link"
  content: string
}

const initialPortfolio: Portfolio = {
  id: "",
  userId: "",
  title: "New Portfolio",
  tagline: "Your Tagline Here",
  description: "Describe your portfolio...",
  thumbnail: "/placeholder.svg",
  socialLinks: [],
  blocks: [],
  votes: [],
}

export default function PortfolioEditor({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [portfolio, setPortfolio] = useState<Portfolio>(initialPortfolio)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { user } = useAuth()

  useEffect(() => {
    const loadPortfolio = async () => {
      setIsLoading(true)
      setError(null)
      try {
        if (params.id === "new") {
          // Create a new portfolio
          const newPortfolio: Portfolio = {
            ...initialPortfolio,
            id: Date.now().toString(),
            userId: Math.random().toString(36).substr(2, 9),
          }
          setPortfolio(newPortfolio)
        } else {
          // Fetch existing portfolio
          const fetchedPortfolio = await fetchPortfolio(params.id)
          if (fetchedPortfolio) {
            setPortfolio(fetchedPortfolio)
          } else {
            setError("Portfolio not found")
          }
        }
      } catch (err) {
        setError("Error loading portfolio")
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    loadPortfolio()
  }, [params.id])

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>
  }

  if (!portfolio) {
    return <div className="flex justify-center items-center h-screen">No portfolio data available</div>
  }

  const handleChange = (field: keyof Portfolio, value: string) => {
    setPortfolio({ ...portfolio, [field]: value })
  }

  const handleSocialLinkChange = (id: string, field: "platform" | "url", value: string) => {
    setPortfolio({
      ...portfolio,
      socialLinks: portfolio.socialLinks.map((link) => (link.id === id ? { ...link, [field]: value } : link)),
    })
  }

  const addSocialLink = () => {
    setPortfolio({
      ...portfolio,
      socialLinks: [...portfolio.socialLinks, { id: Date.now().toString(), platform: "", url: "" }],
    })
  }

  const removeSocialLink = (id: string) => {
    setPortfolio({
      ...portfolio,
      socialLinks: portfolio.socialLinks.filter((link) => link.id !== id),
    })
  }

  const handleBlockChange = (id: string, content: string) => {
    setPortfolio({
      ...portfolio,
      blocks: portfolio.blocks.map((block) => (block.id === id ? { ...block, content } : block)),
    })
  }

  const addBlock = (type: "text" | "image" | "link") => {
    setPortfolio({
      ...portfolio,
      blocks: [
        ...portfolio.blocks,
        { id: Date.now().toString(), type, content: type === "image" ? "/placeholder.svg" : "" },
      ],
    })
  }

  const removeBlock = (id: string) => {
    setPortfolio({
      ...portfolio,
      blocks: portfolio.blocks.filter((block) => block.id !== id),
    })
  }

  const moveBlock = (id: string, direction: "up" | "down") => {
    const index = portfolio.blocks.findIndex((block) => block.id === id)
    if ((direction === "up" && index === 0) || (direction === "down" && index === portfolio.blocks.length - 1)) {
      return
    }
    const newBlocks = [...portfolio.blocks]
    const [removed] = newBlocks.splice(index, 1)
    newBlocks.splice(direction === "up" ? index - 1 : index + 1, 0, removed)
    setPortfolio({ ...portfolio, blocks: newBlocks })
  }

  const onDragEnd = (result: any) => {
    if (!result.destination) {
      return
    }
    const items = Array.from(portfolio.blocks)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)
    setPortfolio({ ...portfolio, blocks: items })
  }

  const handleSave = async () => {
    try {
      await savePortfolio(portfolio)
      router.push("/")
    } catch (error) {
      console.error("Error saving portfolio:", error)
      // Handle error (e.g., show error message to user)
    }
  }

  const handleDelete = async () => {
    try {
      await deletePortfolio(portfolio.id)
      router.push("/")
    } catch (error) {
      console.error("Error deleting portfolio:", error)
      // Handle error (e.g., show error message to user)
    }
  }

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>, blockId?: string) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        if (blockId) {
          handleBlockChange(blockId, reader.result as string)
        } else {
          setPortfolio({ ...portfolio, thumbnail: reader.result as string })
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleThumbnailUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPortfolio({ ...portfolio, thumbnail: reader.result as string })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleVote = async (voteType: "upvote" | "downvote") => {
    if (!user) {
      alert("You must be logged in to vote.")
      return
    }

    try {
      console.log(`Attempting to vote: ${voteType} for portfolio ${portfolio.id} by user ${user.id}`)
      const updatedPortfolio = await saveVote(portfolio.id, user.id, voteType)
      setPortfolio(updatedPortfolio)
      console.log("Vote successful, portfolio updated")
    } catch (error) {
      console.error("Error voting:", error)
      alert(`An error occurred while voting: ${error instanceof Error ? error.message : "Unknown error"}`)
    }
  }

  const getVoteCounts = () => {
    const upvotes = portfolio.votes.filter((vote) => vote.voteType === "upvote").length
    const downvotes = portfolio.votes.filter((vote) => vote.voteType === "downvote").length
    return { upvotes, downvotes }
  }

  const getUserVote = () => {
    if (!user) return null
    return portfolio.votes.find((vote) => vote.userId === user.id)?.voteType || null
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          {/* Header with thumbnail */}
          <div className="relative h-64 sm:h-80">
            <Image
              src={portfolio.thumbnail || "/placeholder.svg"}
              alt="Portfolio thumbnail"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
              <label htmlFor="thumbnail-upload" className="cursor-pointer">
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full bg-white/10 hover:bg-white/20"
                  onClick={() => document.getElementById("thumbnail-upload")?.click()}
                >
                  <Camera className="h-6 w-6 text-white" />
                  <span className="sr-only">Change thumbnail</span>
                </Button>
              </label>
              <input
                id="thumbnail-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleThumbnailUpload}
              />
            </div>
          </div>

          {/* Main content */}
          <div className="p-8">
            {/* Title and tagline */}
            <div className="space-y-2 mb-6">
              <div className="relative">
                <Input
                  value={portfolio.title}
                  onChange={(e) => handleChange("title", e.target.value)}
                  className="text-3xl font-bold w-full bg-transparent border-none focus:ring-0 p-0"
                />
                <Pencil className="h-5 w-5 absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
              <div className="relative">
                <Input
                  value={portfolio.tagline}
                  onChange={(e) => handleChange("tagline", e.target.value)}
                  className="text-xl text-gray-600 w-full bg-transparent border-none focus:ring-0 p-0"
                />
                <Pencil className="h-4 w-4 absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <Textarea
                value={portfolio.description}
                onChange={(e) => handleChange("description", e.target.value)}
                className="w-full min-h-[100px] text-gray-700 bg-transparent border-none focus:ring-0 p-0 resize-none"
                placeholder="Describe your portfolio..."
              />
            </div>

            {/* Blocks */}
            <div className="space-y-4 mb-8">
              <h3 className="text-lg font-semibold text-gray-900">Portfolio Blocks</h3>
              <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="blocks">
                  {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                      {portfolio.blocks.map((block, index) => (
                        <Draggable key={block.id} draggableId={block.id} index={index}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="mb-4"
                            >
                              {block.type === "text" && (
                                <Textarea
                                  value={block.content}
                                  onChange={(e) => handleBlockChange(block.id, e.target.value)}
                                  className="w-full min-h-[100px] text-gray-700 bg-transparent border rounded-md p-2 resize-none"
                                  placeholder="Add your text here..."
                                />
                              )}
                              {block.type === "image" && (
                                <div className="relative aspect-video">
                                  <Image
                                    src={block.content || "/placeholder.svg"}
                                    alt="Portfolio image"
                                    fill
                                    className="object-cover rounded-lg"
                                  />
                                  <label
                                    htmlFor={`image-upload-${block.id}`}
                                    className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
                                  >
                                    <Camera className="h-8 w-8 text-white" />
                                  </label>
                                  <input
                                    id={`image-upload-${block.id}`}
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(e) => handleImageUpload(e, block.id)}
                                  />
                                </div>
                              )}
                              {block.type === "link" && (
                                <Input
                                  value={block.content}
                                  onChange={(e) => handleBlockChange(block.id, e.target.value)}
                                  placeholder="Enter link URL"
                                  className="w-full"
                                />
                              )}
                              <div className="flex justify-end mt-2">
                                <Button variant="ghost" size="icon" onClick={() => moveBlock(block.id, "up")}>
                                  <ArrowUp className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon" onClick={() => moveBlock(block.id, "down")}>
                                  <ArrowDown className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon" onClick={() => removeBlock(block.id)}>
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
              <Select onValueChange={(value) => addBlock(value as "text" | "image" | "link")}>
                <SelectTrigger>
                  <SelectValue placeholder="Add new block" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="text">Text</SelectItem>
                  <SelectItem value="image">Image</SelectItem>
                  <SelectItem value="link">Link</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Social links */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Social Links</h3>
              {portfolio.socialLinks.map((link) => (
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

            {/* QR Code */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Portfolio QR Code</h3>
              <div className="flex flex-col items-center">
                <QRCodeComponent
                  url={`https://yourwebsite.com/portfolio/${portfolio.id}/${portfolio.userId}`}
                  size={200}
                />
                <Button
                  onClick={() => {
                    const canvas = document.querySelector("canvas")
                    if (canvas) {
                      const link = document.createElement("a")
                      link.download = `portfolio-${portfolio.id}-qr.png`
                      link.href = canvas.toDataURL()
                      link.click()
                    }
                  }}
                  className="mt-4"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download QR Code
                </Button>
              </div>
            </div>

            {/* Voting Section */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Vote for this Portfolio</h3>
              <div className="flex items-center space-x-4">
                <Button
                  variant={getUserVote() === "upvote" ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleVote("upvote")}
                  disabled={!user}
                >
                  <ThumbsUp className="mr-2 h-4 w-4" />
                  Upvote ({getVoteCounts().upvotes})
                </Button>
                <Button
                  variant={getUserVote() === "downvote" ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleVote("downvote")}
                  disabled={!user}
                >
                  <ThumbsDown className="mr-2 h-4 w-4" />
                  Downvote ({getVoteCounts().downvotes})
                </Button>
              </div>
              {!user && <p className="mt-2 text-sm text-gray-600">You must be signed in to vote.</p>}
            </div>
          </div>
        </div>

        {/* Save and Delete buttons */}
        <div className="mt-8 flex justify-end space-x-4">
          <Button variant="destructive" onClick={handleDelete}>
            Delete Portfolio
          </Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </div>
      </div>
    </div>
  )
}

