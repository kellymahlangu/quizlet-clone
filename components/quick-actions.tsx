"use client"
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Brain, BarChart2 } from "lucide-react";
import Link from "next/link";

export default function QuickActions() {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/quiz/select" className="w-full">
            <Button
              variant="outline"
              className="w-full h-full py-6 flex flex-col items-center justify-center gap-2"
            >
              <BookOpen className="h-6 w-6" />
              <span>Start New Quiz</span>
            </Button>
          </Link>

          <Link href="/quiz/results" className="w-full">
            <Button
              variant="outline"
              className="w-full h-full py-6 flex flex-col items-center justify-center gap-2"
            >
              <BarChart2 className="h-6 w-6" />
              <span>Review Previous Quizzes</span>
            </Button>
          </Link>

          <Link href="/quiz/generate" className="w-full">
            <Button
              variant="outline"
              className="w-full h-full py-6 flex flex-col items-center justify-center gap-2"
            >
              <Brain className="h-6 w-6" />
              <span>Generate New Questions</span>
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
