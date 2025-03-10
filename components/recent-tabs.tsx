"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import UploadedFiles from "./uploaded-files"
import RecentQuizzes from "./recent-games"

const RecentTabs = () => {
    return (
      <Card>
      <CardHeader>
        <CardTitle>Recent Quizzes</CardTitle>
        <CardDescription>Your recently completed quizzes and scores</CardDescription>
      </CardHeader>
      <CardContent>
        <RecentQuizzes />
      </CardContent>
    </Card>
    );
}

export default RecentTabs;