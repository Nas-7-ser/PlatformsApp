import type { EditorProps } from "@tiptap/pm/view"

// Custom editor configuration
export const customEditorProps: Partial<EditorProps> = {
  attributes: {
    class: "prose prose-invert max-w-none px-8 py-6 focus:outline-none",
  },
}

// Custom extensions (excluding Tweet)
export const customExtensions = [
  // Add any custom extensions here if needed
]

