"use client";
import PDFUploader from "@/components/forms/pdf-upload";
import QuickActions from "@/components/quick-actions";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import RecentTabs from "@/components/recent-tabs";
export default function Page() {
  return (
    <>
      <h1 className="text-3xl font-bold">Home</h1>
      {/* PDF Upload Section */}
      <Card>
        <CardHeader>
          <CardTitle>Upload PDF</CardTitle>
          <CardDescription>
            Upload a PDF to extract information and generate quizzes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <PDFUploader />
        </CardContent>
      </Card>
    </>
  );
}
