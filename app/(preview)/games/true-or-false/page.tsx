"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription } from "@/components/ui/card"
import { AlertCircle, CheckCircle2 } from "lucide-react"
import { Progress } from "@/components/ui/progress"

type Question = {
  id: number
  statement: string
  isTrue: boolean
  explanation: string
}

const questions: Question[] = [
  {
    id: 1,
    statement: "The Great Wall of China is visible from space with the naked eye.",
    isTrue: false,
    explanation:
      "Contrary to popular belief, the Great Wall of China cannot be seen from space with the naked eye. It requires visual aids like binoculars or cameras with zoom lenses.",
  },
  {
    id: 2,
    statement: "A day on Venus is longer than a year on Venus.",
    isTrue: true,
    explanation:
      "Venus rotates very slowly on its axis, taking about 243 Earth days to complete one rotation. However, it orbits the Sun in just 225 Earth days, making a day longer than a year on Venus.",
  },
  {
    id: 3,
    statement: "The Eiffel Tower can be 15 cm taller during the summer.",
    isTrue: true,
    explanation:
      "Due to thermal expansion, the iron structure of the Eiffel Tower can expand in hot weather, making it up to 15 cm taller in summer than in winter.",
  },
  {
    id: 4,
    statement: "Humans have five senses.",
    isTrue: false,
    explanation:
      "Humans have more than five senses. In addition to sight, hearing, touch, taste, and smell, we have senses like balance, temperature, pain, and proprioception (awareness of body position).",
  },
  {
    id: 5,
    statement: "Mount Everest is the tallest mountain on Earth.",
    isTrue: false,
    explanation:
      "While Mount Everest is the highest mountain above sea level, Mauna Kea in Hawaii is technically taller if measured from its base beneath the ocean to its peak.",
  },
]

export default function TrueOrFalse() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<boolean | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(false)

  const currentQuestion = questions[currentQuestionIndex]

  const handleAnswer = (answer: boolean) => {
    setSelectedAnswer(answer)
    setShowResult(true)
    if (answer === currentQuestion.isTrue) {
      setScore(score + 1)
    }
  }

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setSelectedAnswer(null)
      setShowResult(false)
    } else {
      setGameOver(true)
    }
  }

  const resetGame = () => {
    setCurrentQuestionIndex(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setScore(0)
    setGameOver(false)
  }

  const progress = ((currentQuestionIndex + 1) / questions.length) * 100

  return (
    <div className="space-y-6">
      {!gameOver ? (
        <>
          <div className="text-center mb-4">
            <p className="text-sm font-medium text-muted-foreground">
              Question {currentQuestionIndex + 1} of {questions.length}
            </p>
            <p className="text-sm font-medium">
              Score: {score}/{questions.length}
            </p>
            <Progress value={progress} className="mt-2" />
          </div>

          <Card>
            <CardContent className="pt-6">
              <p className="text-lg text-center font-medium">{currentQuestion.statement}</p>
            </CardContent>
          </Card>

          {showResult && (
            <Card>
              <div className="flex items-start gap-2">
                {selectedAnswer === currentQuestion.isTrue ? (
                  <CheckCircle2 className="h-4 w-4 mt-1" />
                ) : (
                  <AlertCircle className="h-4 w-4 mt-1" />
                )}
                <div>
                  <CardDescription className="font-medium">
                    {selectedAnswer === currentQuestion.isTrue
                      ? "Correct!"
                      : `Incorrect. The statement is ${currentQuestion.isTrue ? "true" : "false"}.`}
                  </CardDescription>
                  <p className="text-sm mt-1">{currentQuestion.explanation}</p>
                </div>
              </div>
            </Card>
          )}

          <div className="flex justify-center gap-4">
            {!showResult ? (
              <>
                <Button onClick={() => handleAnswer(true)} className="w-24 bg-green-600 hover:bg-green-700">
                  True
                </Button>
                <Button onClick={() => handleAnswer(false)} className="w-24 bg-red-600 hover:bg-red-700">
                  False
                </Button>
              </>
            ) : (
              <Button onClick={nextQuestion}>
                {currentQuestionIndex < questions.length - 1 ? "Next Question" : "See Results"}
              </Button>
            )}
          </div>
        </>
      ) : (
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold">Game Over!</h2>
          <p className="text-xl">
            Your final score: {score}/{questions.length}
          </p>
          <p className="text-muted-foreground">
            {score === questions.length
              ? "Perfect score! You're a true knowledge master!"
              : score >= questions.length / 2
                ? "Good job! Try again to get a perfect score."
                : "Keep practicing to improve your score."}
          </p>
          <Button onClick={resetGame}>Play Again</Button>
        </div>
      )}
    </div>
  )
}

