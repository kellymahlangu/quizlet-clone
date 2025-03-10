import { z } from "zod";

export const quizSchema = z.object({
  level: z.number().min(1).max(5),
  multipleChoice: z.array(
    z.object({
      question: z.string(),
      options: z
        .array(z.string())
        .length(4)
        .describe(
          "Four possible answers to the question. Only one should be correct, and they should be of equal length."
        ),
      answer: z.enum(["A", "B", "C", "D"]),
    })
  ),
  trueFalse: z.array(
    z.object({
      statement: z.string(),
      answer: z.enum(["True", "False"]),
    })
  ),
  fillInTheBlanks: z.array(
    z.object({
      sentence: z.string(),
      answer: z.string(),
    })
  ),
  wordScramble: z.array(
    z.object({
      scrambled: z.string(),
      answer: z.string(),
    })
  ),
  flashcards: z.array(
    z.object({
      term: z.string(),
      definition: z.string(),
    })
  ),
});

export type Quiz = z.infer<typeof quizSchema>;

export const quizesSchema = z.array(quizSchema).length(4);
export type QuizData = {
  level: number;
  multipleChoice: {
    question: string;
    options: [string, string, string, string]; // Always 4 options
    answer: "A" | "B" | "C" | "D"; // Correct answer
  }[];
  trueFalse: {
    statement: string;
    answer: "True" | "False";
  }[];
  fillInTheBlanks: {
    sentence: string;
    answer: string;
  }[];
  wordScramble: {
    scrambled: string;
    answer: string;
  }[];
  flashcards: {
    term: string;
    definition: string;
  }[];
};

