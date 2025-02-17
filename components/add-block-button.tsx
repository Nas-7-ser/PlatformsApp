import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import type { BlockType } from "../types"

interface AddBlockButtonProps {
  onAdd: (type: BlockType) => void
}

export function AddBlockButton({ onAdd }: AddBlockButtonProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Plus className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center">
        <DropdownMenuItem onClick={() => onAdd("text")}>Text</DropdownMenuItem>
        <DropdownMenuItem onClick={() => onAdd("heading1")}>Heading 1</DropdownMenuItem>
        <DropdownMenuItem onClick={() => onAdd("heading2")}>Heading 2</DropdownMenuItem>
        <DropdownMenuItem onClick={() => onAdd("image")}>Image</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

