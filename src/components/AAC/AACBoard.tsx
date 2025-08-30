import { useState, useEffect } from "react";
import AACButton from "./AACButton";
import SentenceStrip from "./SentenceStrip";
import PersonalizationChat from "./PersonalizationChat";
import { cn } from "@/lib/utils";
import { PersonalizedBoard } from "@/utils/boardPersonalizer";
import { AACWord } from "@/data/aacVocabulary";
import { Button } from "@/components/ui/button";
import { MessageSquare, Settings } from "lucide-react";

interface AACBoardProps {
  personalizedBoard?: PersonalizedBoard;
  onUsageUpdate?: (word: string) => void;
  className?: string;
}

// Fallback words if no personalized board is provided
const defaultWords: AACWord[] = [
  { text: "I", type: "word", category: "pronouns", priority: "high", tags: ["basic"], icon: "user" },
  { text: "want", type: "word", category: "verbs", priority: "high", tags: ["basic"], icon: "heart" },
  { text: "need", type: "word", category: "verbs", priority: "high", tags: ["basic"], icon: "alert-circle" },
  { text: "help", type: "word", category: "verbs", priority: "high", tags: ["basic"], icon: "helping-hand" },
  { text: "yes", type: "word", category: "responses", priority: "high", tags: ["basic"], icon: "check" },
  { text: "no", type: "word", category: "responses", priority: "high", tags: ["basic"], icon: "x" }
];

const AACBoard = ({ personalizedBoard, onUsageUpdate, className }: AACBoardProps) => {
  // Create flat words array from personalized board or use defaults
  const [words] = useState<AACWord[]>(() => {
    if (personalizedBoard?.categories) {
      const flatWords: AACWord[] = [];
      Object.values(personalizedBoard.categories).forEach(categoryWords => {
        flatWords.push(...categoryWords);
      });
      return flatWords;
    }
    return defaultWords;
  });
  
  const [sentenceWords, setSentenceWords] = useState<string[]>([]);
  const [usageStats, setUsageStats] = useState<Record<string, number>>({});
  const [speechRate, setSpeechRate] = useState<number>(personalizedBoard?.speechSpeed || 1.0);
  const [buttonSize, setButtonSize] = useState<'sm' | 'md' | 'lg'>(() => {
    const size = personalizedBoard?.buttonSize || 'medium';
    return size === 'small' ? 'sm' : size === 'large' ? 'lg' : 'md';
  });
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [dynamicCategories, setDynamicCategories] = useState<Record<string, AACWord[]>>({});

  // Load usage stats from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('aac-usage-stats');
    if (saved) {
      setUsageStats(JSON.parse(saved));
    }
  }, []);

  // Save usage stats to localStorage
  useEffect(() => {
    localStorage.setItem('aac-usage-stats', JSON.stringify(usageStats));
  }, [usageStats]);

  const handleWordClick = (word: string) => {
    setSentenceWords(prev => [...prev, word]);
    
    // Update usage statistics
    setUsageStats(prev => ({
      ...prev,
      [word]: (prev[word] || 0) + 1
    }));
    
    onUsageUpdate?.(word);
  };

  const removeWord = (index: number) => {
    setSentenceWords(prev => prev.filter((_, i) => i !== index));
  };

  const clearSentence = () => {
    setSentenceWords([]);
  };

  const speakSentence = () => {
    // This will be handled by the SentenceStrip component
  };

  // Sort words by usage count for adaptive behavior
  const sortedWords = [...words].sort((a, b) => {
    const aUsage = usageStats[a.text] || 0;
    const bUsage = usageStats[b.text] || 0;
    return bUsage - aUsage;
  });

  // Handle board updates from chat
  const handleBoardUpdate = (suggestion: any) => {
    if (suggestion.type === 'add_word') {
      const newWord: AACWord = suggestion.data.word;
      setDynamicCategories(prev => ({
        ...prev,
        [newWord.category]: [...(prev[newWord.category] || []), newWord]
      }));
    } else if (suggestion.type === 'add_category') {
      const categoryName = suggestion.data.category;
      setDynamicCategories(prev => ({
        ...prev,
        [categoryName]: []
      }));
    } else if (suggestion.type === 'modify_layout') {
      if (suggestion.data.buttonSize) {
        setButtonSize(suggestion.data.buttonSize);
      }
    }
  };

  // Merge personalized board with dynamic categories
  const baseCategorizedWords = personalizedBoard?.categories || sortedWords.reduce((acc, word) => {
    if (!acc[word.category]) {
      acc[word.category] = [];
    }
    acc[word.category].push(word);
    return acc;
  }, {} as Record<string, AACWord[]>);

  // Combine base categories with dynamic ones
  const categorizedWords = { ...baseCategorizedWords };
  Object.keys(dynamicCategories).forEach(category => {
    if (categorizedWords[category]) {
      categorizedWords[category] = [...categorizedWords[category], ...dynamicCategories[category]];
    } else {
      categorizedWords[category] = dynamicCategories[category];
    }
  });

  // Category name formatting
  const formatCategoryName = (category: string) => {
    return category.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  return (
    <div className={cn("min-h-screen bg-gradient-to-br from-background via-secondary/10 to-background", className)}>
      {/* Sentence Strip - Fixed at top */}
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1">
              <SentenceStrip
                words={sentenceWords}
                onRemoveWord={removeWord}
                onClear={clearSentence}
                onSpeak={speakSentence}
                speechRate={speechRate}
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsChatOpen(true)}
                className="gap-2"
              >
                <MessageSquare className="h-4 w-4" />
                Personalize
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* AAC Board - Full screen scrollable */}
      <div className="max-w-7xl mx-auto px-4 py-6 space-y-8">
        {Object.entries(categorizedWords).map(([category, categoryWords]) => (
          <section key={category} className="space-y-4">
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-3">
              <h2 className="text-2xl font-bold text-primary capitalize">
                {formatCategoryName(category)}
              </h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-3 lg:gap-4">
              {categoryWords.map((word, index) => (
                <AACButton
                  key={`${word.text}-${index}`}
                  text={word.text}
                  type={word.type}
                  size={buttonSize}
                  onClick={() => handleWordClick(word.text)}
                  usageCount={usageStats[word.text] || 0}
                  className="transition-all duration-300 hover:shadow-lg active:scale-95"
                  speechRate={speechRate}
                  icon={word.icon}
                />
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Personalization Chat */}
      <PersonalizationChat
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        onBoardUpdate={handleBoardUpdate}
        currentBoard={categorizedWords}
      />
    </div>
  );
};

export default AACBoard;