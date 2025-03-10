"use client";

import type React from "react";

import { useState } from "react";
import { Upload, FileText, X, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

export default function PDFUploader() {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [processingStatus, setProcessingStatus] = useState<string | null>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type === "application/pdf") {
      handleFile(droppedFile);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    setFile(file);
    simulateUpload(file);
  };

  const simulateUpload = (file: File) => {
    setIsUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          simulateProcessing();
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  const simulateProcessing = () => {
    const steps = [
      "Extracting text from PDF...",
      "Analyzing content...",
      "Identifying key terms and definitions...",
      "Generating quiz questions...",
      "Processing complete!",
    ];

    let currentStep = 0;
    setProcessingStatus(steps[currentStep]);

    const interval = setInterval(() => {
      currentStep++;
      if (currentStep >= steps.length) {
        clearInterval(interval);
      } else {
        setProcessingStatus(steps[currentStep]);
      }
    }, 1500);
  };

  const resetUpload = () => {
    setFile(null);
    setIsUploading(false);
    setUploadProgress(0);
    setProcessingStatus(null);
  };

  return (
    <div className="w-full">
      {!file ? (
        <div
          className={cn(
            "border-2 border-dashed rounded-lg p-10 text-center cursor-pointer transition-colors",
            isDragging
              ? "border-primary bg-primary/5"
              : "border-muted-foreground/25 hover:border-primary/50"
          )}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => document.getElementById("pdf-upload")?.click()}
        >
          <input
            type="file"
            id="pdf-upload"
            accept="application/pdf"
            className="hidden"
            onChange={handleFileInput}
          />
          <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-medium mb-2">
            Drag & Drop your PDF here
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            or click to browse your files
          </p>
          <Button variant="outline" className="mx-auto">
            <FileText className="mr-2 h-4 w-4" />
            Select PDF
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <FileText className="h-8 w-8 text-primary" />
              <div>
                <p className="font-medium">{file.name}</p>
                <p className="text-sm text-muted-foreground">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={resetUpload}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          {isUploading && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Uploading...</span>
                <span>{uploadProgress}%</span>
              </div>
              <Progress value={uploadProgress} className="h-2" />
            </div>
          )}

          {processingStatus && (
            <div className="p-4 rounded-lg bg-muted">
              <div className="flex items-center space-x-2">
                {processingStatus === "Processing complete!" ? (
                  <Check className="h-5 w-5 text-green-500" />
                ) : (
                  <div className="h-5 w-5 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                )}
                <p className="text-sm font-medium">{processingStatus}</p>
              </div>
            </div>
          )}

          {processingStatus === "Processing complete!" && (
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={resetUpload}>
                Upload Another
              </Button>
              <Button>Start Quiz</Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
