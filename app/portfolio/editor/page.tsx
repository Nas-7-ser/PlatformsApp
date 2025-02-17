"use client"

import { useState } from "react"
import { DndContext, closestCenter, type DragEndEvent } from "@dnd-kit/core"
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { arrayMove } from "@dnd-kit/sortable"
import { EditorBlock } from "@/components/editor-block"
import { AddBlockButton } from "@/components/add-block-button"
import type { Block, BlockType } from "@/types"

export default function PortfolioEditor() {
  const [blocks, setBlocks] = useState<Block[]>([
    {
      id: "1",
      type: "heading1",
      content: "My Portfolio",
      width: "full",
      align: "center",
    },
    {
      id: "2",
      type: "text",
      content: "Click to edit this text and start building your portfolio...",
      width: "full",
      align: "left",
    },
  ])

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (over && active.id !== over.id) {
      setBlocks((blocks) => {
        const oldIndex = blocks.findIndex((block) => block.id === active.id)
        const newIndex = blocks.findIndex((block) => block.id === over.id)
        return arrayMove(blocks, oldIndex, newIndex)
      })
    }
  }

  const addBlock = (type: BlockType) => {
    const newBlock: Block = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      content: type === "image" ? "/placeholder.svg" : "New block",
      width: "full",
      align: "left",
    }
    setBlocks([...blocks, newBlock])
  }

  const updateBlock = (id: string, content: string) => {
    setBlocks(blocks.map((block) => (block.id === id ? { ...block, content } : block)))
  }

  const deleteBlock = (id: string) => {
    setBlocks(blocks.filter((block) => block.id !== id))
  }

  const updateBlockWidth = (id: string, width: Block["width"]) => {
    setBlocks(blocks.map((block) => (block.id === id ? { ...block, width } : block)))
  }

  const updateBlockAlign = (id: string, align: Block["align"]) => {
    setBlocks(blocks.map((block) => (block.id === id ? { ...block, align } : block)))
  }

  return (
    <div className="max-w-5xl mx-auto py-12 px-4">
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={blocks.map((block) => block.id)} strategy={verticalListSortingStrategy}>
          <div className="space-y-8">
            {blocks.map((block) => (
              <EditorBlock
                key={block.id}
                block={block}
                onUpdate={updateBlock}
                onDelete={deleteBlock}
                onWidthChange={updateBlockWidth}
                onAlignChange={updateBlockAlign}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      <div className="flex justify-center mt-8">
        <AddBlockButton onAdd={addBlock} />
      </div>
    </div>
  )
}

