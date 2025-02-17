"use client"

import { useState } from "react"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { GripVertical, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Block } from "../types"
import Image from "next/image"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface EditorBlockProps {
  block: Block
  onUpdate: (id: string, content: string) => void
  onDelete: (id: string) => void
  onWidthChange: (id: string, width: Block["width"]) => void
  onAlignChange: (id: string, align: Block["align"]) => void
}

export function EditorBlock({ block, onUpdate, onDelete, onWidthChange, onAlignChange }: EditorBlockProps) {
  const [isHovered, setIsHovered] = useState(false)

  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: block.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  const widthClasses = {
    full: "w-full",
    medium: "w-2/3",
    small: "w-1/2",
  }

  const alignClasses = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`group relative ${widthClasses[block.width || "full"]} mx-auto`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`flex items-start gap-2 ${isHovered ? "opacity-100" : "opacity-0"} transition-opacity absolute -left-10 top-0`}
      >
        <button {...attributes} {...listeners} className="p-1.5 hover:bg-gray-100 rounded cursor-grab">
          <GripVertical className="w-4 h-4 text-gray-400" />
        </button>
      </div>

      {isHovered && (
        <div className="absolute right-0 top-0 flex items-center gap-2">
          <Select
            value={block.width || "full"}
            onValueChange={(value) => onWidthChange(block.id, value as Block["width"])}
          >
            <SelectTrigger className="w-[100px]">
              <SelectValue placeholder="Width" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="full">Full</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="small">Small</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={block.align || "left"}
            onValueChange={(value) => onAlignChange(block.id, value as Block["align"])}
          >
            <SelectTrigger className="w-[100px]">
              <SelectValue placeholder="Align" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="left">Left</SelectItem>
              <SelectItem value="center">Center</SelectItem>
              <SelectItem value="right">Right</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="ghost" size="icon" onClick={() => onDelete(block.id)}>
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      )}

      <div className={`mt-1 ${alignClasses[block.align || "left"]}`}>
        {block.type === "text" && (
          <div
            contentEditable
            className="outline-none focus:ring-2 ring-offset-2 ring-gray-200 rounded-sm min-h-[1.5em] whitespace-pre-wrap"
            onBlur={(e) => onUpdate(block.id, e.currentTarget.textContent || "")}
            dangerouslySetInnerHTML={{ __html: block.content }}
          />
        )}
        {block.type === "heading1" && (
          <div
            contentEditable
            className="outline-none focus:ring-2 ring-offset-2 ring-gray-200 rounded-sm text-4xl font-bold min-h-[1.5em] whitespace-pre-wrap"
            onBlur={(e) => onUpdate(block.id, e.currentTarget.textContent || "")}
            dangerouslySetInnerHTML={{ __html: block.content }}
          />
        )}
        {block.type === "heading2" && (
          <div
            contentEditable
            className="outline-none focus:ring-2 ring-offset-2 ring-gray-200 rounded-sm text-2xl font-semibold min-h-[1.5em] whitespace-pre-wrap"
            onBlur={(e) => onUpdate(block.id, e.currentTarget.textContent || "")}
            dangerouslySetInnerHTML={{ __html: block.content }}
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
          </div>
        )}
      </div>
    </div>
  )
}

