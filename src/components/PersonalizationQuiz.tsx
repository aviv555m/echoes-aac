import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface QuizQuestion {
  id: string;
  question: string;
  options: { value: string; label: string }[];
}

interface PersonalizationQuizProps {
  onComplete: (answers: Record<string, string>) => void;
  className?: string;
}

const quizQuestions: QuizQuestion[] = [
  {
    id: "communication_level",
    question: "What best describes your communication needs?",
    options: [
      { value: "beginner", label: "I'm just starting to use communication tools" },
      { value: "intermediate", label: "I use some words and short phrases" },
      { value: "advanced", label: "I can build complex sentences" }
    ]
  },
  {
    id: "primary_needs",
    question: "What do you most often want to communicate about?",
    options: [
      { value: "basic_needs", label: "Basic needs (food, water, bathroom)" },
      { value: "feelings", label: "Feelings and emotions" },
      { value: "social", label: "Social interactions and conversations" },
      { value: "activities", label: "Activities and daily tasks" }
    ]
  },
  {
    id: "button_size",
    question: "What button size works best for you?",
    options: [
      { value: "large", label: "Large buttons (easier to press)" },
      { value: "medium", label: "Medium buttons (balanced)" },
      { value: "small", label: "Small buttons (more options on screen)" }
    ]
  },
  {
    id: "categories_priority",
    question: "Which categories are most important to you?",
    options: [
      { value: "essential", label: "Essential needs and requests" },
      { value: "social", label: "Social phrases and greetings" },
      { value: "descriptive", label: "Describing things and feelings" },
      { value: "activities", label: "Daily activities and actions" }
    ]
  }
];

const PersonalizationQuiz = ({ onComplete, className }: PersonalizationQuizProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [selectedAnswer, setSelectedAnswer] = useState("");

  const handleAnswerSelect = (value: string) => {
    setSelectedAnswer(value);
  };

  const handleNext = () => {
    if (!selectedAnswer) return;

    const updatedAnswers = {
      ...answers,
      [quizQuestions[currentQuestion].id]: selectedAnswer
    };
    setAnswers(updatedAnswers);

    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer("");
    } else {
      // Quiz complete
      onComplete(updatedAnswers);
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
      setSelectedAnswer(answers[quizQuestions[currentQuestion - 1].id] || "");
    }
  };

  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;
  const question = quizQuestions[currentQuestion];

  return (
    <div className={cn("w-full max-w-2xl mx-auto p-6", className)}>
      <Card className="shadow-lg border-primary/20">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-primary mb-2">
            Welcome to Echoes
          </CardTitle>
          <CardDescription className="text-lg">
            Let's personalize your communication board to fit your needs
          </CardDescription>
          <Progress value={progress} className="mt-4" />
          <p className="text-sm text-muted-foreground mt-2">
            Question {currentQuestion + 1} of {quizQuestions.length}
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-foreground">
              {question.question}
            </h3>

            <RadioGroup
              value={selectedAnswer}
              onValueChange={handleAnswerSelect}
              className="space-y-3"
            >
              {question.options.map((option) => (
                <div
                  key={option.value}
                  className={cn(
                    "flex items-start space-x-3 p-4 rounded-lg border-2 transition-all duration-200",
                    "hover:bg-secondary/50 cursor-pointer",
                    selectedAnswer === option.value
                      ? "border-primary bg-primary/5"
                      : "border-border"
                  )}
                  onClick={() => handleAnswerSelect(option.value)}
                >
                  <RadioGroupItem
                    value={option.value}
                    id={option.value}
                    className="mt-1"
                  />
                  <Label
                    htmlFor={option.value}
                    className="text-base leading-relaxed cursor-pointer flex-1"
                  >
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="flex justify-between pt-6">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentQuestion === 0}
            >
              Back
            </Button>

            <Button
              onClick={handleNext}
              disabled={!selectedAnswer}
              className="bg-primary hover:bg-primary-hover"
            >
              {currentQuestion === quizQuestions.length - 1 ? "Complete" : "Next"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PersonalizationQuiz;