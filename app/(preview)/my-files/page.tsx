"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  FileText,
  MoreVertical,
  Play,
  Trash,
  Edit,
  Download,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import PDFUploader from "@/components/forms/pdf-upload";

type FileType = {
  id: number;
  title: string;
  uploadDate: Date;
  size: string;
};
function page() {
  const [files, setFiles] = useState<FileType[]>([
    {
      id: 1,
      title: "File 1",
      uploadDate: new Date(),
      size: "2mb",
    },
  ]);
  return (
    <div className="space-y-4">
      {files.length === 0 ? (
        <div className="text-center py-8">
          <PDFUploader />
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
                    <span className="mr-3">
                      Uploaded {pdf.uploadDate.toDateString()}
                    </span>
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
  );
}

export default page;
