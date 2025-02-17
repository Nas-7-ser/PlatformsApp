export interface SocialLink {
  id: string
  platform: string
  url: string
}

export interface Block {
  id: string
  type: "text" | "image" | "link"
  content: string
}

export interface Vote {
  userId: string
  voteType: "upvote" | "downvote"
}

export interface Portfolio {
  id: string
  userId: string
  title: string
  tagline: string
  description: string
  thumbnail: string
  socialLinks: SocialLink[]
  blocks: Block[]
  votes: Vote[]
}

