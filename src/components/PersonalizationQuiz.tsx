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
  // Basic Communication
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
    id: "primary_communication_goal",
    question: "What is your main goal when communicating?",
    options: [
      { value: "express_needs", label: "Express my basic needs" },
      { value: "have_conversations", label: "Have conversations with others" },
      { value: "share_thoughts", label: "Share my thoughts and ideas" },
      { value: "ask_questions", label: "Ask questions and get information" }
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
    id: "speech_speed",
    question: "How fast should the speech be?",
    options: [
      { value: "slow", label: "Slow and clear" },
      { value: "normal", label: "Normal speed" },
      { value: "fast", label: "Fast" }
    ]
  },

  // Basic Needs
  {
    id: "food_importance",
    question: "How often do you need to communicate about food?",
    options: [
      { value: "very_often", label: "Very often - it's essential for me" },
      { value: "sometimes", label: "Sometimes during meals" },
      { value: "rarely", label: "Rarely - not a priority" }
    ]
  },
  {
    id: "bathroom_importance", 
    question: "How important is it to communicate about bathroom needs?",
    options: [
      { value: "critical", label: "Critical - I need this available" },
      { value: "important", label: "Important but not urgent" },
      { value: "not_needed", label: "Not needed" }
    ]
  },
  {
    id: "pain_discomfort",
    question: "Do you need to communicate about pain or discomfort?",
    options: [
      { value: "yes_often", label: "Yes, I often need to express pain" },
      { value: "sometimes", label: "Sometimes" },
      { value: "rarely", label: "Rarely or never" }
    ]
  },
  {
    id: "medical_needs",
    question: "Do you need medical or health-related words?",
    options: [
      { value: "yes_essential", label: "Yes, very important" },
      { value: "sometimes", label: "Sometimes useful" },
      { value: "not_needed", label: "Not needed" }
    ]
  },

  // Social Communication
  {
    id: "social_greetings",
    question: "How important are social greetings to you?",
    options: [
      { value: "very_important", label: "Very important - I love greeting people" },
      { value: "moderately", label: "Moderately important" },
      { value: "not_priority", label: "Not a priority for me" }
    ]
  },
  {
    id: "family_communication",
    question: "Do you often communicate with family members?",
    options: [
      { value: "daily", label: "Daily - family is very important" },
      { value: "weekly", label: "Weekly or regularly" },
      { value: "occasionally", label: "Occasionally" }
    ]
  },
  {
    id: "friend_communication",
    question: "How much do you communicate with friends?",
    options: [
      { value: "very_social", label: "I'm very social with friends" },
      { value: "somewhat", label: "Somewhat social" },
      { value: "prefer_family", label: "I prefer family communication" }
    ]
  },
  {
    id: "public_speaking",
    question: "Do you communicate with strangers or in public?",
    options: [
      { value: "often", label: "Often - I'm comfortable in public" },
      { value: "sometimes", label: "Sometimes when needed" },
      { value: "rarely", label: "Rarely - I prefer familiar people" }
    ]
  },

  // Emotions and Feelings
  {
    id: "express_feelings",
    question: "How important is expressing feelings for you?",
    options: [
      { value: "very_important", label: "Very important - I need to share emotions" },
      { value: "somewhat", label: "Somewhat important" },
      { value: "not_priority", label: "Not a priority" }
    ]
  },
  {
    id: "positive_emotions",
    question: "Do you often express positive emotions like happy or excited?",
    options: [
      { value: "yes_often", label: "Yes, I often express positive feelings" },
      { value: "sometimes", label: "Sometimes" },
      { value: "rarely", label: "Rarely" }
    ]
  },
  {
    id: "negative_emotions",
    question: "Do you need to express when you're upset or frustrated?",
    options: [
      { value: "yes_important", label: "Yes, it's important for me" },
      { value: "sometimes", label: "Sometimes" },
      { value: "prefer_not", label: "I prefer not to" }
    ]
  },

  // Activities and Interests
  {
    id: "daily_activities",
    question: "Do you like to talk about your daily activities?",
    options: [
      { value: "love_sharing", label: "I love sharing what I do" },
      { value: "sometimes", label: "Sometimes" },
      { value: "prefer_other_topics", label: "I prefer other topics" }
    ]
  },
  {
    id: "hobbies_interests",
    question: "Do you have hobbies or special interests you like to discuss?",
    options: [
      { value: "yes_passionate", label: "Yes, I'm passionate about my interests" },
      { value: "few_interests", label: "I have a few interests" },
      { value: "not_much", label: "Not really" }
    ]
  },
  {
    id: "sports_games",
    question: "Are you interested in sports or games?",
    options: [
      { value: "very_interested", label: "Very interested" },
      { value: "somewhat", label: "Somewhat interested" },
      { value: "not_interested", label: "Not interested" }
    ]
  },
  {
    id: "entertainment",
    question: "Do you like talking about movies, TV, or music?",
    options: [
      { value: "love_entertainment", label: "I love entertainment topics" },
      { value: "sometimes", label: "Sometimes" },
      { value: "not_really", label: "Not really my thing" }
    ]
  },

  // Learning and Questions
  {
    id: "ask_questions",
    question: "Do you often ask questions to learn things?",
    options: [
      { value: "very_curious", label: "I'm very curious and ask lots of questions" },
      { value: "sometimes", label: "Sometimes I ask questions" },
      { value: "rarely", label: "I rarely ask questions" }
    ]
  },
  {
    id: "learning_topics",
    question: "What do you most like to learn about?",
    options: [
      { value: "people_relationships", label: "People and relationships" },
      { value: "how_things_work", label: "How things work" },
      { value: "current_events", label: "What's happening in the world" },
      { value: "not_much", label: "I don't ask many questions" }
    ]
  },

  // Physical Comfort
  {
    id: "temperature_comfort",
    question: "Do you need to communicate about temperature (hot/cold)?",
    options: [
      { value: "very_important", label: "Very important - I'm sensitive to temperature" },
      { value: "sometimes", label: "Sometimes important" },
      { value: "not_much", label: "Not much of a concern" }
    ]
  },
  {
    id: "physical_comfort",
    question: "Do you need to express physical comfort (tired, comfortable, etc.)?",
    options: [
      { value: "yes_often", label: "Yes, I often need to express this" },
      { value: "sometimes", label: "Sometimes" },
      { value: "rarely", label: "Rarely" }
    ]
  },

  // Time and Planning
  {
    id: "time_concepts",
    question: "Do you often talk about time (now, later, yesterday)?",
    options: [
      { value: "very_important", label: "Very important - I think about time a lot" },
      { value: "sometimes", label: "Sometimes useful" },
      { value: "not_priority", label: "Not a priority" }
    ]
  },
  {
    id: "future_planning",
    question: "Do you like to talk about future plans?",
    options: [
      { value: "love_planning", label: "I love talking about future plans" },
      { value: "sometimes", label: "Sometimes" },
      { value: "prefer_present", label: "I prefer talking about now" }
    ]
  },

  // Preferences
  {
    id: "yes_no_frequency",
    question: "How often do you use yes/no responses?",
    options: [
      { value: "very_often", label: "Very often - they're essential" },
      { value: "regularly", label: "Regularly" },
      { value: "prefer_detailed", label: "I prefer more detailed responses" }
    ]
  },
  {
    id: "describing_things",
    question: "Do you like describing things (colors, sizes, etc.)?",
    options: [
      { value: "love_describing", label: "I love describing things in detail" },
      { value: "sometimes", label: "Sometimes" },
      { value: "keep_simple", label: "I prefer to keep things simple" }
    ]
  },

  // Technology and Communication Style
  {
    id: "communication_style",
    question: "What communication style fits you best?",
    options: [
      { value: "direct_simple", label: "Direct and simple" },
      { value: "detailed_expressive", label: "Detailed and expressive" },
      { value: "polite_formal", label: "Polite and formal" },
      { value: "casual_friendly", label: "Casual and friendly" }
    ]
  },
  {
    id: "vocabulary_level",
    question: "What vocabulary level do you prefer?",
    options: [
      { value: "simple_words", label: "Simple, everyday words" },
      { value: "mixed_vocabulary", label: "Mix of simple and advanced words" },
      { value: "advanced_vocabulary", label: "More advanced vocabulary" }
    ]
  },

  // Final Preferences
  {
    id: "most_important_category",
    question: "Which category is MOST important for your daily communication?",
    options: [
      { value: "basic_needs", label: "Basic needs (food, bathroom, comfort)" },
      { value: "social_connection", label: "Social connection and relationships" },
      { value: "expressing_self", label: "Expressing my thoughts and feelings" },
      { value: "activities_interests", label: "Activities and interests" }
    ]
  },
  {
    id: "board_organization",
    question: "How would you prefer your communication board organized?",
    options: [
      { value: "by_frequency", label: "Most used words first" },
      { value: "by_category", label: "Organized by clear categories" },
      { value: "mixed_approach", label: "Mix of both approaches" }
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