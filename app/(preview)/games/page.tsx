import Link from "next/link";
import {
  FaQuestionCircle,
  FaExchangeAlt,
  FaPenFancy,
  FaCheckCircle,
  FaFont,
} from "react-icons/fa";

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function GameSelectionPage() {
  const games = [
    {
      id: "quiz",
      title: "Multiple-Choice Quiz",
      description:
        "Answer questions with four possible choices and test your knowledge.",
      icon: <FaQuestionCircle />,
      category: "Quiz",
      players: "Single Player",
      color: "bg-blue-500",
    },
    {
      id: "card-match",
      title: "Card Match",
      description:
        "Match terms with their correct definitions in a fun flashcard game.",
      icon: <FaExchangeAlt />,
      category: "Memory",
      players: "Single Player",
      color: "bg-green-500",
    },
    {
      id: "fill-in-blanks",
      title: "Fill in the Blanks",
      description: "Complete the sentences by filling in the missing words.",
      icon: <FaPenFancy />,
      category: "Quiz",
      players: "Single Player",
      color: "bg-yellow-500",
    },
    {
      id: "true-or-false",
      title: "True or False",
      description: "Determine if a given statement is true or false.",
      icon: <FaCheckCircle />,
      category: "Quiz",
      players: "Single Player",
      color: "bg-red-500",
    },
    {
      id: "word-scramble",
      title: "Word Scramble",
      description: "Unscramble the letters to form the correct word.",
      icon: <FaFont />,
      category: "Puzzle",
      players: "Single Player",
      color: "bg-purple-500",
    },
  ];

  return (
    <div className="container mx-auto py-8 px-4">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-2">Game Center</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Select a game from our collection and start playing right away.
          Challenge yourself or play with friends!
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {games.map((game) => (
          <Link
            href={`/games/${game.id}`}
            key={game.id}
            className="transition-transform hover:scale-[1.02]"
          >
            <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow">
              <div
                className={`flex justify-center items-center p-6 ${game.color}`}
              >
                <div className="p-4 rounded-full bg-background/90 text-foreground">
                  {game.icon}
                </div>
              </div>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl">{game.title}</CardTitle>
                  <Badge variant="outline" className="flex items-center gap-1">
                    {game.category}
                  </Badge>
                </div>
                <CardDescription>{game.description}</CardDescription>
              </CardHeader>
              <CardFooter className="flex justify-between">
                <span className="text-sm text-muted-foreground">
                  {game.players}
                </span>
                <span className="text-sm font-medium">Play Now →</span>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>

      <footer className="mt-12 text-center text-sm text-muted-foreground">
        <p>Looking for more games? Check back soon for new additions!</p>
      </footer>
    </div>
  );
}
