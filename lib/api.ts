import type { Portfolio } from "@/types"

let portfolios: Portfolio[] = []

export async function fetchPortfolios(): Promise<Portfolio[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))
  return portfolios
}

export async function fetchPortfolio(id: string): Promise<Portfolio | null> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))
  return portfolios.find((p) => p.id === id) || null
}

export async function savePortfolio(portfolio: Portfolio): Promise<Portfolio> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  const index = portfolios.findIndex((p) => p.id === portfolio.id)
  if (index !== -1) {
    // Update existing portfolio
    portfolios[index] = portfolio
  } else {
    // Add new portfolio
    portfolios.push(portfolio)
  }

  return portfolio
}

export async function deletePortfolio(id: string): Promise<void> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  portfolios = portfolios.filter((p) => p.id !== id)
}

export async function saveVote(
  portfolioId: string,
  userId: string,
  voteType: "upvote" | "downvote",
): Promise<Portfolio> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  const portfolio = portfolios.find((p) => p.id === portfolioId)
  if (!portfolio) {
    console.error(`Portfolio not found: ${portfolioId}`)
    console.error(`Available portfolios: ${JSON.stringify(portfolios)}`)
    throw new Error(`Portfolio not found: ${portfolioId}`)
  }

  // Remove any existing vote by this user
  portfolio.votes = portfolio.votes.filter((vote) => vote.userId !== userId)

  // Add the new vote
  portfolio.votes.push({ userId, voteType })

  console.log(`Vote saved for portfolio ${portfolioId}: ${voteType} by user ${userId}`)
  return portfolio
}

