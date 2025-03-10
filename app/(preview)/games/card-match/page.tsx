"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Shuffle } from "lucide-react"
import { cn } from "@/lib/utils"

// Sample word-definition pairs
const wordDefinitionPairs = [
  { word: "Ephemeral", definition: "Lasting for a very short time" },
  { word: "Ubiquitous", definition: "Present, appearing, or found everywhere" },
  { word: "Serendipity", definition: "The occurrence of fortunate events by chance" },
  { word: "Eloquent", definition: "Fluent or persuasive in speaking or writing" },
  { word: "Resilient", definition: "Able to withstand or recover quickly from difficulties" },
  { word: "Pragmatic", definition: "Dealing with things sensibly and realistically" },
  { word: "Ambiguous", definition: "Open to more than one interpretation" },
  { word: "Meticulous", definition: "Showing great attention to detail" },
]

type CardType = {
  id: number
  content: string
  type: "word" | "definition"
  isFlipped: boolean
  isMatched: boolean
  pairId: number
}

export default function CardMatchGame() {
  const [cards, setCards] = useState<CardType[]>([])
  const [flippedCards, setFlippedCards] = useState<number[]>([])
  const [matchedPairs, setMatchedPairs] = useState<number>(0)
  const [moves, setMoves] = useState<number>(0)
  const [gameComplete, setGameComplete] = useState<boolean>(false)

  // Initialize game
  useEffect(() => {
    initializeGame()
  }, [])

  const initializeGame = () => {
    const initialCards: CardType[] = []

    // Create cards from word-definition pairs
    wordDefinitionPairs.forEach((pair, index) => {
      initialCards.push({
        id: index * 2,
        content: pair.word,
        type: "word",
        isFlipped: false,
        isMatched: false,
        pairId: index,
      })

      initialCards.push({
        id: index * 2 + 1,
        content: pair.definition,
        type: "definition",
        isFlipped: false,
        isMatched: false,
        pairId: index,
      })
    })

    // Shuffle cards
    const shuffledCards = [...initialCards].sort(() => Math.random() - 0.5)

    setCards(shuffledCards)
    setFlippedCards([])
    setMatchedPairs(0)
    setMoves(0)
    setGameComplete(false)
  }

  const handleCardClick = (id: number) => {
    // Ignore if already two cards flipped or card is already flipped/matched
    if (flippedCards.length >= 2) return

    const clickedCard = cards.find((card) => card.id === id)
    if (!clickedCard || clickedCard.isFlipped || clickedCard.isMatched) return

    // Flip the card
    const updatedCards = cards.map((card) => (card.id === id ? { ...card, isFlipped: true } : card))

    const updatedFlippedCards = [...flippedCards, id]

    setCards(updatedCards)
    setFlippedCards(updatedFlippedCards)

    // Check for match if two cards are flipped
    if (updatedFlippedCards.length === 2) {
      setMoves((prev) => prev + 1)

      const firstCardId = updatedFlippedCards[0]
      const secondCardId = updatedFlippedCards[1]

      const firstCard = updatedCards.find((card) => card.id === firstCardId)
      const secondCard = updatedCards.find((card) => card.id === secondCardId)

      if (firstCard && secondCard && firstCard.pairId === secondCard.pairId) {
        // Match found
        setTimeout(() => {
          const matchedCards = updatedCards.map((card) =>
            card.id === firstCardId || card.id === secondCardId ? { ...card, isMatched: true } : card,
          )

          setCards(matchedCards)
          setFlippedCards([])
          setMatchedPairs((prev) => prev + 1)

          // Check if game is complete
          if (matchedPairs + 1 === wordDefinitionPairs.length) {
            setGameComplete(true)
          }
        }, 500)
      } else {
        // No match
        setTimeout(() => {
          const resetFlippedCards = updatedCards.map((card) =>
            card.id === firstCardId || card.id === secondCardId ? { ...card, isFlipped: false } : card,
          )

          setCards(resetFlippedCards)
          setFlippedCards([])
        }, 1000)
      }
    }
  }

  return (
    <div className="flex flex-col items-center">
      <div className="flex justify-between w-full max-w-3xl mb-6">
        <div className="flex gap-4">
          <div className="bg-muted rounded-lg px-4 py-2">
            <span className="text-sm font-medium">Moves: {moves}</span>
          </div>
          <div className="bg-muted rounded-lg px-4 py-2">
            <span className="text-sm font-medium">
              Matches: {matchedPairs}/{wordDefinitionPairs.length}
            </span>
          </div>
        </div>
        <Button variant="outline" size="icon" onClick={initializeGame} aria-label="Reset game">
          <Shuffle className="h-4 w-4" />
        </Button>
      </div>

      {gameComplete && (
        <div className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 p-4 rounded-lg mb-6 text-center">
          <h3 className="font-bold text-lg">Congratulations!</h3>
          <p>You completed the game in {moves} moves.</p>
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-3xl">
        {cards.map((card) => (
          <div
            key={card.id}
            onClick={() => handleCardClick(card.id)}
            className={cn(
              "perspective-1000 cursor-pointer h-32 md:h-40",
              card.isMatched && "opacity-100", // Changed from opacity-70
            )}
          >
            <div
              className={cn(
                "relative w-full h-full transition-transform duration-500 transform-style-preserve-3d",
                (card.isFlipped || card.isMatched) && "rotate-y-180",
              )}
            >
              {/* Card Back */}
              <Card className="absolute w-full h-full backface-hidden bg-primary hover:bg-primary/90 flex items-center justify-center p-2">
                <span className="text-primary-foreground font-medium text-lg">?</span>
              </Card>

              {/* Card Front */}
              <Card
                className={cn(
                  "absolute w-full h-full backface-hidden rotate-y-180 flex items-center justify-center p-2 text-center",
                  card.isMatched
                    ? "bg-green-200 dark:bg-green-800" // Green background for matched cards
                    : card.type === "word"
                      ? "bg-blue-100 dark:bg-blue-900"
                      : "bg-amber-100 dark:bg-amber-900",
                )}
              >
                <span
                  className={cn(
                    "text-sm md:text-base font-medium",
                    card.isMatched
                      ? "text-green-900 dark:text-green-100" // Green text for matched cards
                      : card.type === "word"
                        ? "text-blue-800 dark:text-blue-100"
                        : "text-amber-800 dark:text-amber-100",
                  )}
                >
                  {card.content}
                </span>
              </Card>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

