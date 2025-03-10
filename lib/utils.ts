import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { prisma } from "./prisma";
import { QuizData } from "./schemas";
import { QuestionType, QuizType } from "@prisma/client";


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function saveQuizToDatabase(quizData: QuizData, userId: string) {
  try {
    const quiz = await prisma.quiz.create({
      data: {
        userId : userId,
        level: quizData.level,
        type: quizData.fillInTheBlanks as QuizType, // Adjust based on game type
        questions: {
          create: [
            ...quizData.multipleChoice.map((q) => ({
              question: q.question,
              options: q.options,
              answer: q.answer,
              type: "MULTIPLE_CHOICE" as QuestionType,
            })),
            ...quizData.trueFalse.map((q) => ({
              question: q.statement,
              options: ["True", "False"],
              answer: q.answer,
              type: "TRUE_FALSE" as QuestionType,
            })),
            ...quizData.fillInTheBlanks.map((q) => ({
              question: q.sentence,
              options: [],
              answer: q.answer,
              type: "FILL_IN_THE_BLANK" as QuestionType,
            })),
            ...quizData.wordScramble.map((q) => ({
              question: `Unscramble: ${q.scrambled}`,
              options: [],
              answer: q.answer,
              type: "WORD_SCRAMBLE" as QuestionType,
            })),
          ],
        },
        flashcards: {
          create: quizData.flashcards.map((fc) => ({
            term: fc.term,
            definition: fc.definition,
          })),
        },
      },
    });
    return {success: true}
  } catch (error) {
    return {success: false}
  }
}

