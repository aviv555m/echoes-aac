import PersonalizationQuiz from "@/components/PersonalizationQuiz";
import AACBoard from "@/components/AAC/AACBoard";
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Settings, RotateCcw } from "lucide-react";

interface UserPreferences {
  communication_level: string;
  primary_needs: string;
  button_size: string;
  categories_priority: string;
}

const Index = () => {
  const [showQuiz, setShowQuiz] = useState(true);
  const [userPreferences, setUserPreferences] = useState<UserPreferences | null>(null);
  const [isFirstVisit, setIsFirstVisit] = useState(true);

  useEffect(() => {
    // Check if user has completed quiz before
    const savedPreferences = localStorage.getItem('echoes-preferences');
    if (savedPreferences) {
      setUserPreferences(JSON.parse(savedPreferences));
      setShowQuiz(false);
      setIsFirstVisit(false);
    }
  }, []);

  const handleQuizComplete = (answers: Record<string, string>) => {
    // Ensure all required properties exist
    const preferences: UserPreferences = {
      communication_level: answers.communication_level || 'intermediate',
      primary_needs: answers.primary_needs || 'basic_needs',
      button_size: answers.button_size || 'medium',
      categories_priority: answers.categories_priority || 'essential'
    };
    
    setUserPreferences(preferences);
    setShowQuiz(false);
    
    // Save preferences to localStorage
    localStorage.setItem('echoes-preferences', JSON.stringify(preferences));
  };

  const handleRetakeQuiz = () => {
    setShowQuiz(true);
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
                window.location.reload();
              }}
              className="flex items-center gap-2"
            >
              <RotateCcw size={16} />
              Reset
            </Button>
          </div>
        </div>
      </header>

      {/* Welcome Message for First-Time Users */}
      {isFirstVisit && userPreferences && (
        <div className="max-w-7xl mx-auto px-4 py-6">
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold text-primary mb-2">
                Welcome! Your board is ready 🎉
              </h2>
              <p className="text-foreground">
                Based on your preferences, we've personalized your communication board. 
                Tap any button to hear it spoken aloud, and build sentences using the strip at the top. 
                The board will adapt to your usage patterns over time.
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Main AAC Board */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        <AACBoard 
          onUsageUpdate={handleUsageUpdate}
        />
      </main>

      {/* Footer */}
      <footer className="bg-white/50 border-t border-border/30 mt-12">
        <div className="max-w-7xl mx-auto px-4 py-6 text-center">
          <p className="text-muted-foreground">
            Echoes MVP - Empowering communication through AI
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
