import { useState, useEffect } from "react";
import AACButton, { AACButtonType } from "./AACButton";
import SentenceStrip from "./SentenceStrip";
import { cn } from "@/lib/utils";

interface AACWord {
  text: string;
  type: AACButtonType;
  category: string;
  usageCount?: number;
}

interface AACBoardProps {
  personalizedWords?: AACWord[];
  onUsageUpdate?: (word: string) => void;
  className?: string;
}

const defaultWords: AACWord[] = [
  // Essential words
  { text: "I", type: "word", category: "pronouns" },
  { text: "want", type: "word", category: "verbs" },
  { text: "need", type: "word", category: "verbs" },
  { text: "help", type: "word", category: "verbs" },
  { text: "please", type: "word", category: "social" },
  { text: "thank you", type: "phrase", category: "social" },
  
  // Common requests
  { text: "water", type: "word", category: "needs" },
  { text: "food", type: "word", category: "needs" },
  { text: "bathroom", type: "word", category: "needs" },
  { text: "tired", type: "word", category: "feelings" },
  { text: "happy", type: "word", category: "feelings" },
  { text: "sad", type: "word", category: "feelings" },
  
  // Actions
  { text: "go", type: "action", category: "actions" },
  { text: "stop", type: "action", category: "actions" },
  { text: "more", type: "action", category: "actions" },
  { text: "finished", type: "action", category: "actions" },
  
  // Common phrases
  { text: "I love you", type: "phrase", category: "social" },
  { text: "good morning", type: "phrase", category: "social" },
  { text: "good night", type: "phrase", category: "social" },
  { text: "see you later", type: "phrase", category: "social" }
];

const AACBoard = ({ personalizedWords, onUsageUpdate, className }: AACBoardProps) => {
  const [words] = useState<AACWord[]>(personalizedWords || defaultWords);
  const [sentenceWords, setSentenceWords] = useState<string[]>([]);
  const [usageStats, setUsageStats] = useState<Record<string, number>>({});

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

  // Group words by category
  const categorizedWords = sortedWords.reduce((acc, word) => {
    if (!acc[word.category]) {
      acc[word.category] = [];
    }
    acc[word.category].push(word);
    return acc;
  }, {} as Record<string, AACWord[]>);

  return (
    <div className={cn("w-full max-w-6xl mx-auto p-6 space-y-6", className)}>
      {/* Sentence Strip */}
      <SentenceStrip
        words={sentenceWords}
        onRemoveWord={removeWord}
        onClear={clearSentence}
        onSpeak={speakSentence}
      />

      {/* AAC Board */}
      <div className="space-y-8">
        {Object.entries(categorizedWords).map(([category, categoryWords]) => (
          <div key={category} className="space-y-4">
            <h3 className="text-xl font-semibold text-foreground capitalize">
              {category}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {categoryWords.map((word, index) => (
                <AACButton
                  key={`${word.text}-${index}`}
                  text={word.text}
                  type={word.type}
                  onClick={() => handleWordClick(word.text)}
                  usageCount={usageStats[word.text] || 0}
                  className="transition-all duration-300"
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AACBoard;