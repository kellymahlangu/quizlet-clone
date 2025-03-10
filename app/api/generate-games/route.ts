import { auth } from "@/lib/auth";
import { QuizData, quizSchema, quizesSchema } from "@/lib/schemas";
import { saveQuizToDatabase } from "@/lib/utils";
import { google } from "@ai-sdk/google";
import { streamObject } from "ai";
import { headers } from "next/headers";


export const maxDuration = 60;

export async function POST(req: Request) {
  const { files } = await req.json();
  const firstFile = files[0].data;
  const session = await auth.api.getSession({
    headers: await headers() // you need to pass the headers object.
})

  const result = streamObject({
    model: google("gemini-1.5-pro-latest"),
    messages: [
      {
        role: "system",
        content:
          "You are an AI-powered study assistant. Your job is to analyze a document and generate quizzes and games at five difficulty levels. These include multiple-choice questions, true/false questions, fill-in-the-blanks, word scramble, and flashcard matching.",
      },
      {
        role: "user",
        content: [
          {
            type: "text",
            text: "Analyze this document and generate quizzes and games with five difficulty levels.",
          },
          {
            type: "file",
            data: firstFile,
            mimeType: "application/pdf",
          },
        ],
      },
    ],
    schema: quizSchema,
    output: "array",
    onFinish: async ({ object }) => {
      const res = quizesSchema.safeParse(object);
      if (res.error) {
        throw new Error(res.error.errors.map((e) => e.message).join("\n"));
      }
      const data= res.data
      data.map((item) => saveQuizToDatabase(item, session?.user.id))
    },
  });

  return result.toTextStreamResponse();
}
