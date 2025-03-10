import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { BookOpen, Clock, Award } from "lucide-react"

const recentQuizzes = [
  {
    id: 1,
    title: "Introduction to React",
    type: "Multiple Choice",
    score: 8,
    totalQuestions: 10,
    points: 240,
    date: "2 hours ago",
  },
  {
    id: 2,
    title: "JavaScript Fundamentals",
    type: "Fill in the Blanks",
    score: 7,
    totalQuestions: 10,
    points: 210,
    date: "Yesterday",
  },
  {
    id: 3,
    title: "CSS Layouts",
    type: "Flashcard Match",
    score: 9,
    totalQuestions: 10,
    points: 270,
    date: "3 days ago",
  },
]

export default function RecentQuizzes() {
  return (
    <div className="space-y-4">
      {recentQuizzes.length === 0 ? (
        <div className="text-center py-8">
          <BookOpen className="h-12 w-12 mx-auto text-muted-foreground" />
          <h3 className="mt-4 text-lg font-medium">No quizzes yet</h3>
          <p className="text-sm text-muted-foreground mt-1">Upload a PDF and start your first quiz</p>
        </div>
      ) : (
        recentQuizzes.map((quiz) => (
          <Card key={quiz.id} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="flex flex-col sm:flex-row">
                <div className="p-4 flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{quiz.title}</h3>
                      <div className="flex items-center mt-1 text-sm text-muted-foreground">
                        <Badge variant="outline" className="mr-2">
                          {quiz.type}
                        </Badge>
                        <Clock className="h-3 w-3 mr-1" />
                        <span>{quiz.date}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">
                        {quiz.score}/{quiz.totalQuestions}
                      </div>
                      <div className="flex items-center text-sm text-amber-500">
                        <Award className="h-3 w-3 mr-1" />
                        <span>{quiz.points} pts</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  )
}

