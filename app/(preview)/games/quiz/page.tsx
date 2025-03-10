"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, XCircle, Trophy } from "lucide-react"

// Quiz questions
const questions = [
  {
    id: 1,
    question: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    correctAnswer: "Paris",
  },
  {
    id: 2,
    question: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    correctAnswer: "Mars",
  },
  {
    id: 3,
    question: "What is the largest mammal in the world?",
    options: ["Elephant", "Giraffe", "Blue Whale", "Polar Bear"],
    correctAnswer: "Blue Whale",
  },
  {
    id: 4,
    question: "Which element has the chemical symbol 'O'?",
    options: ["Gold", "Oxygen", "Osmium", "Oganesson"],
    correctAnswer: "Oxygen",
  },
  {
    id: 5,
    question: "Who painted the Mona Lisa?",
    options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
    correctAnswer: "Leonardo da Vinci",
  },
]

export default function QuizGame() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false)
  const [score, setScore] = useState(0)
  const [quizCompleted, setQuizCompleted] = useState(false)

  const currentQuestion = questions[currentQuestionIndex]
  const progress = ((currentQuestionIndex + (isAnswerSubmitted ? 1 : 0)) / questions.length) * 100

  const handleAnswerSelect = (answer: string) => {
    if (!isAnswerSubmitted) {
      setSelectedAnswer(answer)
    }
  }

  const handleSubmitAnswer = () => {
    if (!selectedAnswer) return

    setIsAnswerSubmitted(true)

    if (selectedAnswer === currentQuestion.correctAnswer) {
      setScore(score + 1)
    }
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setSelectedAnswer(null)
      setIsAnswerSubmitted(false)
    } else {
      setQuizCompleted(true)
    }
  }

  const restartQuiz = () => {
    setCurrentQuestionIndex(0)
    setSelectedAnswer(null)
    setIsAnswerSubmitted(false)
    setScore(0)
    setQuizCompleted(false)
  }

  if (quizCompleted) {
    return (
      <Card className="w-full">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Quiz Completed!</CardTitle>
          <CardDescription>Your final score</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-6">
          <div className="flex items-center justify-center w-24 h-24 rounded-full bg-primary/10">
            <Trophy className="w-12 h-12 text-primary" />
          </div>
          <div className="text-center">
            <h3 className="text-4xl font-bold mb-2">
              {score} / {questions.length}
            </h3>
            <p className="text-muted-foreground">
              {score === questions.length
                ? "Perfect score! Excellent job!"
                : score >= questions.length / 2
                  ? "Good job! You did well!"
                  : "Nice try! Keep learning!"}
            </p>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={restartQuiz}>
            Play Again
          </Button>
        </CardFooter>
      </Card>
    )
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-center mb-2">
          <CardTitle>
            Question {currentQuestionIndex + 1} of {questions.length}
          </CardTitle>
          <div className="text-sm font-medium">Score: {score}</div>
        </div>
        <Progress value={progress} className="h-2" />
      </CardHeader>
      <CardContent className="space-y-6">
        <h2 className="text-xl font-semibold">{currentQuestion.question}</h2>
        <div className="grid gap-3">
          {currentQuestion.options.map((option) => {
            const isCorrect = option === currentQuestion.correctAnswer
            const isSelected = option === selectedAnswer

            let optionClassName = "flex items-center p-4 border rounded-lg transition-colors"

            if (!isAnswerSubmitted) {
              optionClassName += isSelected ? " border-primary bg-primary/10" : " hover:bg-muted/50 cursor-pointer"
            } else {
              if (isSelected && isCorrect) {
                optionClassName += " border-green-500 bg-green-50 dark:bg-green-950/30"
              } else if (isSelected && !isCorrect) {
                optionClassName += " border-red-500 bg-red-50 dark:bg-red-950/30"
              } else if (isCorrect) {
                optionClassName += " border-green-500 bg-green-50 dark:bg-green-950/30"
              }
            }

            return (
              <div key={option} className={optionClassName} onClick={() => handleAnswerSelect(option)}>
                <div className="flex-1">{option}</div>
                {isAnswerSubmitted && isCorrect && <CheckCircle className="w-5 h-5 text-green-500 ml-2" />}
                {isAnswerSubmitted && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-red-500 ml-2" />}
              </div>
            )
          })}
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        {!isAnswerSubmitted ? (
          <Button onClick={handleSubmitAnswer} disabled={!selectedAnswer}>
            Submit Answer
          </Button>
        ) : (
          <Button onClick={handleNextQuestion}>
            {currentQuestionIndex < questions.length - 1 ? "Next Question" : "See Results"}
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}

