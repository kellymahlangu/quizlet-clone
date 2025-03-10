"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription } from "@/components/ui/card"
import { AlertCircle, CheckCircle2 } from "lucide-react"

type Question = {
  id: number
  text: string
  answer: string
  hint: string
}

const questions: Question[] = [
  {
    id: 1,
    text: "The capital of France is ______.",
    answer: "Paris",
    hint: "It's known as the City of Light",
  },
  {
    id: 2,
    text: "Water boils at ______ degrees Celsius at sea level.",
    answer: "100",
    hint: "It's a round number",
  },
  {
    id: 3,
    text: "The largest planet in our solar system is ______.",
    answer: "Jupiter",
    hint: "It's named after the king of Roman gods",
  },
  {
    id: 4,
    text: "The chemical symbol for gold is ______.",
    answer: "Au",
    hint: "It comes from the Latin word 'aurum'",
  },
  {
    id: 5,
    text: "The Great Wall of China is approximately ______ kilometers long.",
    answer: "21196",
    hint: "It's over 20,000 kilometers",
  },
]

export default function FillInTheBlanks() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [userAnswer, setUserAnswer] = useState("")
  const [showResult, setShowResult] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(false)

  const currentQuestion = questions[currentQuestionIndex]

  const checkAnswer = () => {
    const correct = userAnswer.toLowerCase() === currentQuestion.answer.toLowerCase()
    setIsCorrect(correct)
    setShowResult(true)
    if (correct) {
      setScore(score + 1)
    }
  }

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setUserAnswer("")
      setShowResult(false)
      setShowHint(false)
    } else {
      setGameOver(true)
    }
  }

  const resetGame = () => {
    setCurrentQuestionIndex(0)
    setUserAnswer("")
    setShowResult(false)
    setShowHint(false)
    setScore(0)
    setGameOver(false)
  }

  // Split the question text to find where the blank is
  const parts = currentQuestion.text.split("______")

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
          </div>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-center flex-wrap gap-2 text-lg">
                <span>{parts[0]}</span>
                <Input
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  className="w-32 md:w-40 inline-block"
                  placeholder="Answer"
                  disabled={showResult}
                />
                <span>{parts[1]}</span>
              </div>
            </CardContent>
          </Card>

          {showHint && (
            <div className="text-center">
              <p className="text-sm italic">Hint: {currentQuestion.hint}</p>
            </div>
          )}

          {showResult && (
            <Card>
              <div className="flex items-center gap-2">
                {isCorrect ? <CheckCircle2 className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
                <CardDescription>
                  {isCorrect ? "Correct!" : `Incorrect. The correct answer is "${currentQuestion.answer}".`}
                </CardDescription>
              </div>
            </Card>
          )}

          <div className="flex justify-center gap-2">
            {!showResult ? (
              <>
                <Button onClick={checkAnswer} disabled={!userAnswer.trim()}>
                  Check Answer
                </Button>
                <Button variant="outline" onClick={() => setShowHint(true)} disabled={showHint}>
                  Show Hint
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
              ? "Perfect score! Amazing job!"
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

