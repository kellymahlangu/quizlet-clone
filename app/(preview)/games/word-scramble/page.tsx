"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription } from "@/components/ui/card"
import { AlertCircle, CheckCircle2, Lightbulb } from "lucide-react"
// import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"

type Word = {
  id: number
  original: string
  category: string
  hint: string
}

const words: Word[] = [
  {
    id: 1,
    original: "elephant",
    category: "Animals",
    hint: "The largest land mammal with a trunk",
  },
  {
    id: 2,
    original: "computer",
    category: "Technology",
    hint: "An electronic device for processing data",
  },
  {
    id: 3,
    original: "basketball",
    category: "Sports",
    hint: "A team sport played with a round ball and hoop",
  },
  {
    id: 4,
    original: "chocolate",
    category: "Food",
    hint: "A sweet treat made from cocoa beans",
  },
  {
    id: 5,
    original: "universe",
    category: "Science",
    hint: "All of space, time, matter, and energy",
  },
]

// Function to scramble a word
const scrambleWord = (word: string): string => {
  const characters = word.split("")

  // Fisher-Yates shuffle algorithm
  for (let i = characters.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[characters[i], characters[j]] = [characters[j], characters[i]]
  }

  const scrambled = characters.join("")

  // If by chance the scrambled word is the same as the original, scramble again
  return scrambled === word ? scrambleWord(word) : scrambled
}

export default function WordScramble() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [scrambledWord, setScrambledWord] = useState("")
  const [userGuess, setUserGuess] = useState("")
  const [showResult, setShowResult] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [timeLeft, setTimeLeft] = useState(30)
  const [timerActive, setTimerActive] = useState(true)

  const currentWord = words[currentWordIndex]

  // Initialize scrambled word
  useEffect(() => {
    setScrambledWord(scrambleWord(currentWord.original))
    setTimeLeft(30)
    setTimerActive(true)
  }, [currentWordIndex, currentWord.original])

  // Timer countdown
  useEffect(() => {
    if (!timerActive || showResult) return

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          setTimerActive(false)
          checkAnswer()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [timerActive, showResult])

  const checkAnswer = () => {
    const correct = userGuess.toLowerCase() === currentWord.original.toLowerCase()
    setIsCorrect(correct)
    setShowResult(true)
    setTimerActive(false)
    if (correct) {
      setScore(score + 1)
    }
  }

  const nextWord = () => {
    if (currentWordIndex < words.length - 1) {
      setCurrentWordIndex(currentWordIndex + 1)
      setUserGuess("")
      setShowResult(false)
      setShowHint(false)
    } else {
      setGameOver(true)
    }
  }

  const resetGame = () => {
    setCurrentWordIndex(0)
    setUserGuess("")
    setShowResult(false)
    setShowHint(false)
    setScore(0)
    setGameOver(false)
  }

  return (
    <div className="space-y-6">
      {!gameOver ? (
        <>
          <div className="text-center mb-4">
            <div className="flex justify-between items-center mb-2">
              <Badge variant="outline">{currentWord.category}</Badge>
              <p className="text-sm font-medium">
                Word {currentWordIndex + 1} of {words.length}
              </p>
              <Badge variant={timeLeft < 10 ? "destructive" : "outline"}>{timeLeft}s</Badge>
            </div>
            <p className="text-sm font-medium">
              Score: {score}/{words.length}
            </p>
          </div>

          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-sm text-muted-foreground mb-2">Unscramble this word:</p>
              <p className="text-3xl font-bold tracking-wider mb-4 uppercase">{scrambledWord}</p>
              <div className="flex gap-2">
                <Input
                  value={userGuess}
                  onChange={(e) => setUserGuess(e.target.value)}
                  className="text-center"
                  placeholder="Your answer"
                  disabled={showResult}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && userGuess.trim() && !showResult) {
                      checkAnswer()
                    }
                  }}
                />
              </div>
            </CardContent>
          </Card>

          {showHint && (
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 text-sm italic">
                <Lightbulb className="h-4 w-4" />
                <p>{currentWord.hint}</p>
              </div>
            </div>
          )}

          {showResult && (
            <Card>
              <div className="flex items-center gap-2">
                {isCorrect ? <CheckCircle2 className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
                <CardDescription>
                  {isCorrect ? "Correct!" : `Time's up! The correct word was "${currentWord.original}".`}
                </CardDescription>
              </div>
            </Card>
          )}

          <div className="flex justify-center gap-2">
            {!showResult ? (
              <>
                <Button onClick={checkAnswer} disabled={!userGuess.trim()}>
                  Submit
                </Button>
                <Button variant="outline" onClick={() => setShowHint(true)} disabled={showHint}>
                  Hint
                </Button>
              </>
            ) : (
              <Button onClick={nextWord}>{currentWordIndex < words.length - 1 ? "Next Word" : "See Results"}</Button>
            )}
          </div>
        </>
      ) : (
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold">Game Over!</h2>
          <p className="text-xl">
            Your final score: {score}/{words.length}
          </p>
          <p className="text-muted-foreground">
            {score === words.length
              ? "Perfect score! You're a word master!"
              : score >= words.length / 2
                ? "Good job! Try again to get a perfect score."
                : "Keep practicing to improve your word skills."}
          </p>
          <Button onClick={resetGame}>Play Again</Button>
        </div>
      )}
    </div>
  )
}

