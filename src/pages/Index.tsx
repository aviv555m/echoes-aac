import PersonalizationQuiz from "@/components/PersonalizationQuiz";
import AACBoard from "@/components/AAC/AACBoard";
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Settings, RotateCcw } from "lucide-react";
import { generatePersonalizedBoard, PersonalizedBoard } from "@/utils/boardPersonalizer";

const Index = () => {
  const [showQuiz, setShowQuiz] = useState(true);
  const [userPreferences, setUserPreferences] = useState<Record<string, string> | null>(null);
  const [personalizedBoard, setPersonalizedBoard] = useState<PersonalizedBoard | null>(null);
  const [isFirstVisit, setIsFirstVisit] = useState(true);

  useEffect(() => {
    // Check if user has completed quiz before
    const savedPreferences = localStorage.getItem('echoes-preferences');
    const savedBoard = localStorage.getItem('echoes-personalized-board');
    
    if (savedPreferences && savedBoard) {
      const preferences = JSON.parse(savedPreferences);
      const board = JSON.parse(savedBoard);
      setUserPreferences(preferences);
      setPersonalizedBoard(board);
      setShowQuiz(false);
      setIsFirstVisit(false);
    }
  }, []);

  const handleQuizComplete = (answers: Record<string, string>) => {
    console.log('Quiz completed with answers:', answers);
    
    // Generate personalized board based on answers
    const board = generatePersonalizedBoard(answers);
    console.log('Generated personalized board:', board);
    
    setUserPreferences(answers);
    setPersonalizedBoard(board);
    setShowQuiz(false);
    
    // Save to localStorage
    localStorage.setItem('echoes-preferences', JSON.stringify(answers));
    localStorage.setItem('echoes-personalized-board', JSON.stringify(board));
  };

  const handleRetakeQuiz = () => {
    setShowQuiz(true);
    setIsFirstVisit(true);
  };

  const handleUsageUpdate = (word: string) => {
    // This will be used for AI adaptation in future iterations
    console.log(`Word used: ${word}`);
  };

  if (showQuiz) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-secondary/30 to-background flex items-center justify-center p-4">
        <PersonalizationQuiz onComplete={handleQuizComplete} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-border/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-primary">Echoes</h1>
            <p className="text-muted-foreground">AI-Powered Communication Board</p>
          </div>
          
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleRetakeQuiz}
              className="flex items-center gap-2"
            >
              <Settings size={16} />
              Personalize
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                localStorage.removeItem('aac-usage-stats');
                localStorage.removeItem('echoes-preferences');
                localStorage.removeItem('echoes-personalized-board');
                window.location.reload();
              }}
              className="flex items-center gap-2"
            >
              <RotateCcw size={16} />
              Reset All
            </Button>
          </div>
        </div>
      </header>

      {/* Welcome Message for First-Time Users */}
      {isFirstVisit && personalizedBoard && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-40 max-w-md">
          <Card className="bg-primary/5 border-primary/20 shadow-lg">
            <CardContent className="p-4">
              <h2 className="text-lg font-semibold text-primary mb-2">
                Welcome! Your board is ready 🎉
              </h2>
              <p className="text-sm text-foreground mb-3">
                Based on your quiz answers, we've created your personalized communication board. 
                Tap buttons to speak and build sentences at the top!
              </p>
              <Button
                size="sm"
                onClick={() => setIsFirstVisit(false)}
                className="w-full"
              >
                Got it!
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Main AAC Board - Full Screen */}
      <main>
        <AACBoard 
          personalizedBoard={personalizedBoard}
          onUsageUpdate={handleUsageUpdate}
        />
      </main>
    </div>
  );
};

export default Index;
