"use client"

import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import Image from "next/image"
import { Plus } from "lucide-react"

interface Course {
  id: string
  code: string
  title: string
  image: string
  year: string
  semester: string
}

interface CourseCardProps {
  course: Course
}

export function CourseCard({ course }: CourseCardProps) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: course.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="group relative aspect-[4/3] cursor-grab rounded-xl bg-zinc-900 hover:bg-zinc-800"
    >
      <div className="absolute inset-0 overflow-hidden rounded-xl">
        <Image src={course.image || "/placeholder.svg"} alt={course.title} fill className="object-cover" />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-4">
        <div className="mb-2">
          <h3 className="text-lg font-medium">{course.code}</h3>
          <p className="text-sm text-gray-300">{course.title}</p>
        </div>
        <div className="flex gap-2">
          <span className="rounded bg-zinc-800 px-2 py-1 text-xs">{course.year}</span>
          <span className="rounded bg-amber-900/50 px-2 py-1 text-xs">{course.semester}</span>
        </div>
      </div>

      <button className="absolute right-4 top-4 rounded-full bg-white/10 p-2 opacity-0 transition-opacity hover:bg-white/20 group-hover:opacity-100">
        <Plus className="h-4 w-4" />
      </button>
    </div>
  )
}

