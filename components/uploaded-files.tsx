"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { FileText, MoreVertical, Play, Trash, Edit, Download } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

type FileType = {
    id: number,
    title: string,
    uploadDate: Date,
    size: string,
}
const uploadedFiles = [
  {
    id: 1,
    title: "Introduction to React.pdf",
    uploadDate: "2 days ago",
    size: "2.4 MB",
    quizzes: 3,
  },
  {
    id: 2,
    title: "JavaScript Fundamentals.pdf",
    uploadDate: "1 week ago",
    size: "3.1 MB",
    quizzes: 2,
  },
  {
    id: 3,
    title: "CSS Layouts.pdf",
    uploadDate: "2 weeks ago",
    size: "1.8 MB",
    quizzes: 1,
  },
]

export default function UploadedFiles() {
    const [files, setFiles] = useState<FileType[]>([])
  return (
    <div className="space-y-4">
      {files.length === 0 ? (
        <div className="text-center py-8">
          <FileText className="h-12 w-12 mx-auto text-muted-foreground" />
          <h3 className="mt-4 text-lg font-medium">No PDFs uploaded</h3>
          <p className="text-sm text-muted-foreground mt-1">Upload your first PDF to get started</p>
        </div>
      ) : (
        files.map((pdf) => (
          <Card key={pdf.id} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="flex items-center p-4">
                <FileText className="h-8 w-8 text-primary mr-3" />
                <div className="flex-1">
                  <h3 className="font-medium">{pdf.title}</h3>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <span className="mr-3">Uploaded {pdf.uploadDate.toDateString()}</span>
                    <span className="mr-3">{pdf.size}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Link href="/quiz/select">
                    <Button variant="outline" size="icon">
                      <Play className="h-4 w-4" />
                    </Button>
                  </Link>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Edit className="h-4 w-4 mr-2" />
                        Rename
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        <Trash className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  )
}

