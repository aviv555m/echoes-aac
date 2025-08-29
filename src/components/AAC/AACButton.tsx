import { cn } from "@/lib/utils";
import { useState } from "react";

export type AACButtonType = 'word' | 'phrase' | 'category' | 'action';

interface AACButtonProps {
  text: string;
  type: AACButtonType;
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  onSpeak?: () => void;
  className?: string;
  usageCount?: number;
}

const AACButton = ({ 
  text, 
  type, 
  size = 'md', 
  onClick, 
  onSpeak,
  className,
  usageCount = 0
}: AACButtonProps) => {
  const [isPressed, setIsPressed] = useState(false);

  const handleClick = () => {
    setIsPressed(true);
    setTimeout(() => setIsPressed(false), 150);
    
    // Speak the text using Web Speech API
    if (onSpeak) {
      onSpeak();
    } else {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.8;
      utterance.volume = 0.8;
      speechSynthesis.speak(utterance);
    }
    
    onClick?.();
  };

  const getTypeStyles = () => {
    switch (type) {
      case 'word':
        return 'bg-aac-word text-aac-word-foreground hover:bg-aac-word/90';
      case 'phrase':
        return 'bg-aac-phrase text-aac-phrase-foreground hover:bg-aac-phrase/90';
      case 'category':
        return 'bg-aac-category text-aac-category-foreground hover:bg-aac-category/90';
      case 'action':
        return 'bg-aac-action text-aac-action-foreground hover:bg-aac-action/90';
      default:
        return 'bg-primary text-primary-foreground hover:bg-primary-hover';
    }
  };

  const getSizeStyles = () => {
    // Dynamic sizing based on usage count for adaptive behavior
    const adaptiveScale = Math.min(1.2, 1 + (usageCount * 0.05));
    
    switch (size) {
      case 'sm':
        return `min-h-[60px] px-3 text-sm transform scale-[${Math.max(0.8, adaptiveScale * 0.8)}]`;
      case 'lg':  
        return `min-h-[100px] px-6 text-lg transform scale-[${Math.min(1.3, adaptiveScale)}]`;
      default:
        return `min-h-[80px] px-4 text-base transform scale-[${adaptiveScale}]`;
    }
  };

  return (
    <button
      onClick={handleClick}
      className={cn(
        "rounded-xl font-medium transition-all duration-200",
        "flex items-center justify-center text-center",
        "shadow-md hover:shadow-lg active:scale-95",
        "border-2 border-transparent",
        "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        getTypeStyles(),
        getSizeStyles(),
        isPressed && "scale-90 shadow-sm",
        className
      )}
    >
      <span className="leading-tight break-words max-w-full">
        {text}
      </span>
    </button>
  );
};

export default AACButton;