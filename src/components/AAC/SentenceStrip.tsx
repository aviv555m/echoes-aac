import { X, Volume2, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface SentenceStripProps {
  words: string[];
  onRemoveWord: (index: number) => void;
  onClear: () => void;
  onSpeak: () => void;
  className?: string;
}

const SentenceStrip = ({ 
  words, 
  onRemoveWord, 
  onClear, 
  onSpeak, 
  className 
}: SentenceStripProps) => {
  const handleSpeak = () => {
    if (words.length === 0) return;
    
    const sentence = words.join(' ');
    const utterance = new SpeechSynthesisUtterance(sentence);
    utterance.rate = 0.7;
    utterance.volume = 0.9;
    speechSynthesis.speak(utterance);
    
    onSpeak();
  };

  return (
    <div className={cn(
      "w-full p-4 rounded-2xl shadow-lg border-2 border-sentence-strip/20",
      "bg-gradient-to-r from-sentence-strip to-sentence-strip/90",
      "min-h-[100px] flex items-center gap-3",
      className
    )}>
      {/* Words container */}
      <div className="flex-1 flex flex-wrap gap-2 min-h-[60px] items-center">
        {words.length === 0 ? (
          <span className="text-sentence-strip-foreground/60 font-medium text-lg italic">
            Tap words to build a sentence...
          </span>
        ) : (
          words.map((word, index) => (
            <div
              key={`${word}-${index}`}
              className="bg-white/90 text-sentence-strip-foreground px-4 py-2 rounded-lg 
                         shadow-sm border border-sentence-strip-foreground/20
                         flex items-center gap-2 group hover:bg-white transition-colors"
            >
              <span className="font-medium text-base">{word}</span>
              <button
                onClick={() => onRemoveWord(index)}
                className="opacity-0 group-hover:opacity-100 transition-opacity
                           text-sentence-strip-foreground/60 hover:text-destructive
                           p-1 rounded-full hover:bg-destructive/10"
              >
                <X size={14} />
              </button>
            </div>
          ))
        )}
      </div>

      {/* Action buttons */}
      <div className="flex gap-2 flex-shrink-0">
        <button
          onClick={handleSpeak}
          disabled={words.length === 0}
          className={cn(
            "p-3 rounded-xl transition-all duration-200",
            "bg-primary text-primary-foreground shadow-md",
            "hover:bg-primary-hover hover:shadow-lg active:scale-95",
            "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-primary",
            "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          )}
        >
          <Volume2 size={20} />
        </button>
        
        <button
          onClick={onClear}
          disabled={words.length === 0}
          className={cn(
            "p-3 rounded-xl transition-all duration-200",
            "bg-destructive text-destructive-foreground shadow-md",
            "hover:bg-destructive/90 hover:shadow-lg active:scale-95",
            "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-destructive",
            "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          )}
        >
          <Trash2 size={20} />
        </button>
      </div>
    </div>
  );
};

export default SentenceStrip;