import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { X, Send, MessageSquare, Bot, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { AACWord } from "@/data/aacVocabulary";

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  suggestions?: BoardSuggestion[];
}

interface BoardSuggestion {
  type: 'add_word' | 'add_category' | 'remove_word' | 'modify_layout';
  description: string;
  data: any;
}

interface PersonalizationChatProps {
  isOpen: boolean;
  onClose: () => void;
  onBoardUpdate: (suggestion: BoardSuggestion) => void;
  currentBoard: { [key: string]: AACWord[] };
  className?: string;
}

const PersonalizationChat = ({ 
  isOpen, 
  onClose, 
  onBoardUpdate, 
  currentBoard, 
  className 
}: PersonalizationChatProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hi! I'm your AAC board assistant. I can help you add new words, create custom categories, or reorganize your board. What would you like to do?",
      sender: 'ai',
      timestamp: new Date(),
      suggestions: [
        {
          type: 'add_word',
          description: 'Add a new word to your board',
          data: { word: 'example', category: 'custom' }
        },
        {
          type: 'add_category',
          description: 'Create a new category',
          data: { category: 'my_words' }
        }
      ]
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const simulateAIResponse = (userMessage: string): Message => {
    const suggestions: BoardSuggestion[] = [];
    let aiResponse = "";

    // Simple AI simulation based on keywords
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('add') && (lowerMessage.includes('word') || lowerMessage.includes('button'))) {
      // Extract potential word from message
      const words = userMessage.split(' ');
      const wordCandidates = words.filter(word => 
        word.length > 2 && 
        !['add', 'the', 'word', 'button', 'can', 'you', 'please', 'want', 'need'].includes(word.toLowerCase())
      );
      
      if (wordCandidates.length > 0) {
        const newWord = wordCandidates[0].replace(/[^a-zA-Z]/g, '');
        suggestions.push({
          type: 'add_word',
          description: `Add "${newWord}" to your board`,
          data: { 
            word: { 
              text: newWord, 
              type: 'word', 
              category: 'custom', 
              priority: 'medium', 
              tags: ['custom'],
              icon: 'plus'
            } 
          }
        });
        aiResponse = `I can add "${newWord}" to your board! Which category would you like it in?`;
      } else {
        aiResponse = "I'd be happy to add a new word! What word would you like to add?";
      }
    } else if (lowerMessage.includes('category') && lowerMessage.includes('add')) {
      suggestions.push({
        type: 'add_category',
        description: 'Create a new category',
        data: { category: 'new_category' }
      });
      aiResponse = "I can create a new category for you! What would you like to name it?";
    } else if (lowerMessage.includes('remove') || lowerMessage.includes('delete')) {
      aiResponse = "I can help you remove words or categories. Which specific item would you like to remove?";
    } else if (lowerMessage.includes('bigger') || lowerMessage.includes('larger')) {
      suggestions.push({
        type: 'modify_layout',
        description: 'Make buttons larger',
        data: { buttonSize: 'large' }
      });
      aiResponse = "I can make your buttons larger for easier use. Would you like me to apply this change?";
    } else if (lowerMessage.includes('smaller')) {
      suggestions.push({
        type: 'modify_layout',
        description: 'Make buttons smaller',
        data: { buttonSize: 'small' }
      });
      aiResponse = "I can make your buttons smaller to fit more on screen. Would you like me to apply this change?";
    } else {
      aiResponse = "I can help you customize your AAC board in several ways:\n\n• Add new words or phrases\n• Create custom categories\n• Remove unused items\n• Adjust button sizes\n• Reorganize your layout\n\nWhat would you like to do?";
    }

    return {
      id: Date.now().toString(),
      content: aiResponse,
      sender: 'ai',
      timestamp: new Date(),
      suggestions
    };
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const aiResponse = simulateAIResponse(inputValue);
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1000);
  };

  const handleSuggestionClick = (suggestion: BoardSuggestion) => {
    onBoardUpdate(suggestion);
    
    // Add confirmation message
    const confirmationMessage: Message = {
      id: Date.now().toString(),
      content: `Great! I've applied that change to your board. You should see the update immediately.`,
      sender: 'ai',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, confirmationMessage]);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <Card className={cn("w-full max-w-2xl h-[600px] flex flex-col", className)}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 border-b">
          <div className="flex items-center space-x-2">
            <MessageSquare className="h-6 w-6 text-primary" />
            <CardTitle className="text-xl">AAC Board Assistant</CardTitle>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col p-0">
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex gap-3",
                    message.sender === 'user' ? 'justify-end' : 'justify-start'
                  )}
                >
                  {message.sender === 'ai' && (
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <Bot className="h-4 w-4 text-primary" />
                    </div>
                  )}
                  
                  <div className={cn(
                    "max-w-[80%] space-y-2",
                    message.sender === 'user' ? 'items-end' : 'items-start'
                  )}>
                    <div className={cn(
                      "px-4 py-2 rounded-lg whitespace-pre-wrap",
                      message.sender === 'user' 
                        ? 'bg-primary text-primary-foreground ml-auto' 
                        : 'bg-muted'
                    )}>
                      {message.content}
                    </div>
                    
                    {message.suggestions && message.suggestions.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {message.suggestions.map((suggestion, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                            onClick={() => handleSuggestionClick(suggestion)}
                          >
                            {suggestion.description}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>

                  {message.sender === 'user' && (
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                      <User className="h-4 w-4" />
                    </div>
                  )}
                </div>
              ))}
              
              {isTyping && (
                <div className="flex gap-3 justify-start">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Bot className="h-4 w-4 text-primary" />
                  </div>
                  <div className="bg-muted px-4 py-2 rounded-lg">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>    
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div ref={messagesEndRef} />
          </ScrollArea>

          <div className="border-t p-4">
            <div className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me to add words, change categories, or modify your board..."
                className="flex-1"
              />
              <Button onClick={handleSendMessage} disabled={!inputValue.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PersonalizationChat;