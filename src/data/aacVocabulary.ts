export interface AACWord {
  text: string;
  type: 'word' | 'phrase' | 'action';
  category: string;
  priority: 'high' | 'medium' | 'low';
  tags: string[];
  icon?: string; // Lucide icon name
}

export const aacVocabulary: AACWord[] = [
  // Essential Communication
  { text: "I", type: "word", category: "pronouns", priority: "high", tags: ["basic", "essential"], icon: "user" },
  { text: "you", type: "word", category: "pronouns", priority: "high", tags: ["basic", "essential"], icon: "user-check" },
  { text: "me", type: "word", category: "pronouns", priority: "high", tags: ["basic", "essential"], icon: "user" },
  { text: "we", type: "word", category: "pronouns", priority: "medium", tags: ["basic", "social"], icon: "users" },
  { text: "they", type: "word", category: "pronouns", priority: "medium", tags: ["basic", "social"], icon: "users" },
  
  // Basic Verbs
  { text: "want", type: "word", category: "verbs", priority: "high", tags: ["basic", "essential", "needs"], icon: "heart" },
  { text: "need", type: "word", category: "verbs", priority: "high", tags: ["basic", "essential", "needs"], icon: "alert-circle" },
  { text: "like", type: "word", category: "verbs", priority: "high", tags: ["basic", "feelings", "preferences"], icon: "thumbs-up" },
  { text: "love", type: "word", category: "verbs", priority: "high", tags: ["feelings", "social"], icon: "heart" },
  { text: "have", type: "word", category: "verbs", priority: "high", tags: ["basic", "essential"], icon: "package" },
  { text: "get", type: "word", category: "verbs", priority: "high", tags: ["basic", "actions"], icon: "arrow-down" },
  { text: "give", type: "word", category: "verbs", priority: "medium", tags: ["basic", "actions", "social"], icon: "hand" },
  { text: "go", type: "word", category: "verbs", priority: "high", tags: ["basic", "actions", "movement"], icon: "arrow-right" },
  { text: "come", type: "word", category: "verbs", priority: "high", tags: ["basic", "actions", "movement"], icon: "arrow-left" },
  { text: "stop", type: "word", category: "verbs", priority: "high", tags: ["basic", "actions", "safety"], icon: "octagon" },
  { text: "help", type: "word", category: "verbs", priority: "high", tags: ["basic", "essential", "safety"], icon: "helping-hand" },
  { text: "see", type: "word", category: "verbs", priority: "medium", tags: ["basic", "senses"], icon: "eye" },
  { text: "hear", type: "word", category: "verbs", priority: "medium", tags: ["basic", "senses"], icon: "ear" },
  { text: "feel", type: "word", category: "verbs", priority: "medium", tags: ["basic", "feelings", "senses"], icon: "touch" },
  { text: "think", type: "word", category: "verbs", priority: "medium", tags: ["thoughts", "advanced"], icon: "brain" },
  { text: "know", type: "word", category: "verbs", priority: "medium", tags: ["thoughts", "basic"], icon: "lightbulb" },
  { text: "understand", type: "word", category: "verbs", priority: "medium", tags: ["thoughts", "communication"], icon: "check-circle" },
  { text: "remember", type: "word", category: "verbs", priority: "low", tags: ["thoughts", "time"], icon: "clock" },
  { text: "forget", type: "word", category: "verbs", priority: "low", tags: ["thoughts", "time"], icon: "x-circle" },
  
  // Basic Needs
  { text: "water", type: "word", category: "food_drink", priority: "high", tags: ["basic", "essential", "needs"], icon: "droplets" },
  { text: "food", type: "word", category: "food_drink", priority: "high", tags: ["basic", "essential", "needs"], icon: "utensils" },
  { text: "eat", type: "word", category: "food_drink", priority: "high", tags: ["basic", "essential", "actions"], icon: "utensils" },
  { text: "drink", type: "word", category: "food_drink", priority: "high", tags: ["basic", "essential", "actions"], icon: "cup" },
  { text: "hungry", type: "word", category: "food_drink", priority: "high", tags: ["basic", "needs", "feelings"], icon: "utensils" },
  { text: "thirsty", type: "word", category: "food_drink", priority: "high", tags: ["basic", "needs", "feelings"], icon: "droplets" },
  { text: "breakfast", type: "word", category: "food_drink", priority: "medium", tags: ["meals", "time"], icon: "sunrise" },
  { text: "lunch", type: "word", category: "food_drink", priority: "medium", tags: ["meals", "time"], icon: "sun" },
  { text: "dinner", type: "word", category: "food_drink", priority: "medium", tags: ["meals", "time"], icon: "moon" },
  { text: "snack", type: "word", category: "food_drink", priority: "medium", tags: ["meals"], icon: "cookie" },
  { text: "milk", type: "word", category: "food_drink", priority: "medium", tags: ["drinks"], icon: "milk" },
  { text: "juice", type: "word", category: "food_drink", priority: "medium", tags: ["drinks"], icon: "glass" },
  { text: "coffee", type: "word", category: "food_drink", priority: "low", tags: ["drinks", "adult"], icon: "coffee" },
  { text: "tea", type: "word", category: "food_drink", priority: "low", tags: ["drinks"], icon: "cup" },
  
  // Bathroom and Body
  { text: "bathroom", type: "word", category: "bathroom_body", priority: "high", tags: ["basic", "essential", "needs"], icon: "bath" },
  { text: "toilet", type: "word", category: "bathroom_body", priority: "high", tags: ["basic", "essential", "needs"], icon: "toilet" },
  { text: "wash", type: "word", category: "bathroom_body", priority: "medium", tags: ["hygiene", "actions"], icon: "hand" },
  { text: "shower", type: "word", category: "bathroom_body", priority: "medium", tags: ["hygiene"], icon: "shower-head" },
  { text: "bath", type: "word", category: "bathroom_body", priority: "medium", tags: ["hygiene"], icon: "bath" },
  { text: "brush teeth", type: "phrase", category: "bathroom_body", priority: "medium", tags: ["hygiene", "routine"], icon: "brush" },
  { text: "hands", type: "word", category: "bathroom_body", priority: "medium", tags: ["body_parts"], icon: "hand" },
  { text: "face", type: "word", category: "bathroom_body", priority: "medium", tags: ["body_parts"], icon: "smile" },
  { text: "hair", type: "word", category: "bathroom_body", priority: "low", tags: ["body_parts"], icon: "brush" },
  
  // Feelings and Emotions
  { text: "happy", type: "word", category: "feelings", priority: "high", tags: ["emotions", "positive"], icon: "smile" },
  { text: "sad", type: "word", category: "feelings", priority: "high", tags: ["emotions", "negative"], icon: "frown" },
  { text: "angry", type: "word", category: "feelings", priority: "high", tags: ["emotions", "negative"], icon: "angry" },
  { text: "mad", type: "word", category: "feelings", priority: "high", tags: ["emotions", "negative"], icon: "frown" },
  { text: "excited", type: "word", category: "feelings", priority: "medium", tags: ["emotions", "positive"], icon: "zap" },
  { text: "scared", type: "word", category: "feelings", priority: "medium", tags: ["emotions", "negative"], icon: "fearful" },
  { text: "worried", type: "word", category: "feelings", priority: "medium", tags: ["emotions", "negative"], icon: "worried" },
  { text: "calm", type: "word", category: "feelings", priority: "medium", tags: ["emotions", "positive"], icon: "heart" },
  { text: "tired", type: "word", category: "feelings", priority: "high", tags: ["physical", "state"], icon: "bed" },
  { text: "awake", type: "word", category: "feelings", priority: "medium", tags: ["physical", "state"], icon: "eye" },
  { text: "sleepy", type: "word", category: "feelings", priority: "medium", tags: ["physical", "state"], icon: "moon" },
  { text: "comfortable", type: "word", category: "feelings", priority: "medium", tags: ["physical", "positive"], icon: "heart" },
  { text: "uncomfortable", type: "word", category: "feelings", priority: "medium", tags: ["physical", "negative"], icon: "frown" },
  { text: "hurt", type: "word", category: "feelings", priority: "high", tags: ["physical", "negative", "medical"], icon: "bandage" },
  { text: "pain", type: "word", category: "feelings", priority: "high", tags: ["physical", "negative", "medical"], icon: "zap" },
  { text: "sick", type: "word", category: "feelings", priority: "high", tags: ["physical", "negative", "medical"], icon: "thermometer" },
  { text: "better", type: "word", category: "feelings", priority: "medium", tags: ["physical", "positive", "medical"], icon: "heart" },
  
  // Social Greetings
  { text: "hello", type: "word", category: "greetings", priority: "high", tags: ["social", "basic", "polite"], icon: "wave" },
  { text: "hi", type: "word", category: "greetings", priority: "high", tags: ["social", "basic", "casual"], icon: "wave" },
  { text: "goodbye", type: "word", category: "greetings", priority: "high", tags: ["social", "basic", "polite"], icon: "hand" },
  { text: "bye", type: "word", category: "greetings", priority: "high", tags: ["social", "basic", "casual"], icon: "hand" },
  { text: "good morning", type: "phrase", category: "greetings", priority: "medium", tags: ["social", "polite", "time"], icon: "sunrise" },
  { text: "good night", type: "phrase", category: "greetings", priority: "medium", tags: ["social", "polite", "time"], icon: "moon" },
  { text: "see you later", type: "phrase", category: "greetings", priority: "medium", tags: ["social", "casual"], icon: "wave" },
  { text: "how are you", type: "phrase", category: "greetings", priority: "medium", tags: ["social", "questions"], icon: "help-circle" },
  
  // Politeness
  { text: "please", type: "word", category: "politeness", priority: "high", tags: ["social", "polite", "basic"], icon: "heart" },
  { text: "thank you", type: "phrase", category: "politeness", priority: "high", tags: ["social", "polite", "basic"], icon: "heart" },
  { text: "thanks", type: "word", category: "politeness", priority: "high", tags: ["social", "polite", "casual"], icon: "thumbs-up" },
  { text: "you're welcome", type: "phrase", category: "politeness", priority: "medium", tags: ["social", "polite"], icon: "smile" },
  { text: "excuse me", type: "phrase", category: "politeness", priority: "medium", tags: ["social", "polite"], icon: "hand" },
  { text: "sorry", type: "word", category: "politeness", priority: "high", tags: ["social", "polite", "basic"], icon: "frown" },
  
  // Family
  { text: "mom", type: "word", category: "family", priority: "high", tags: ["family", "people"], icon: "heart" },
  { text: "dad", type: "word", category: "family", priority: "high", tags: ["family", "people"], icon: "heart" },
  { text: "mother", type: "word", category: "family", priority: "medium", tags: ["family", "people", "formal"], icon: "heart" },
  { text: "father", type: "word", category: "family", priority: "medium", tags: ["family", "people", "formal"], icon: "heart" },
  { text: "brother", type: "word", category: "family", priority: "medium", tags: ["family", "people"], icon: "user" },
  { text: "sister", type: "word", category: "family", priority: "medium", tags: ["family", "people"], icon: "user" },
  { text: "grandma", type: "word", category: "family", priority: "medium", tags: ["family", "people"], icon: "heart" },
  { text: "grandpa", type: "word", category: "family", priority: "medium", tags: ["family", "people"], icon: "heart" },
  { text: "family", type: "word", category: "family", priority: "medium", tags: ["family", "people"], icon: "users" },
  
  // Actions and Activities
  { text: "play", type: "word", category: "activities", priority: "high", tags: ["actions", "fun"], icon: "gamepad-2" },
  { text: "work", type: "word", category: "activities", priority: "medium", tags: ["actions", "adult"], icon: "briefcase" },
  { text: "sleep", type: "word", category: "activities", priority: "high", tags: ["actions", "rest"], icon: "bed" },
  { text: "rest", type: "word", category: "activities", priority: "medium", tags: ["actions", "rest"], icon: "pause" },
  { text: "walk", type: "word", category: "activities", priority: "medium", tags: ["actions", "movement"], icon: "footprints" },
  { text: "run", type: "word", category: "activities", priority: "low", tags: ["actions", "movement", "exercise"], icon: "running" },
  { text: "sit", type: "word", category: "activities", priority: "medium", tags: ["actions", "position"], icon: "chair" },
  { text: "stand", type: "word", category: "activities", priority: "medium", tags: ["actions", "position"], icon: "user" },
  { text: "read", type: "word", category: "activities", priority: "medium", tags: ["actions", "learning"], icon: "book" },
  { text: "write", type: "word", category: "activities", priority: "low", tags: ["actions", "learning"], icon: "pencil" },
  { text: "draw", type: "word", category: "activities", priority: "low", tags: ["actions", "creative"], icon: "palette" },
  { text: "sing", type: "word", category: "activities", priority: "low", tags: ["actions", "creative", "music"], icon: "mic" },
  { text: "dance", type: "word", category: "activities", priority: "low", tags: ["actions", "creative", "music"], icon: "music" },
  { text: "watch TV", type: "phrase", category: "activities", priority: "medium", tags: ["entertainment", "relaxation"], icon: "tv" },
  { text: "listen music", type: "phrase", category: "activities", priority: "medium", tags: ["entertainment", "music"], icon: "headphones" },
  
  // Yes/No and Basic Responses
  { text: "yes", type: "word", category: "responses", priority: "high", tags: ["basic", "essential", "agreement"], icon: "check" },
  { text: "no", type: "word", category: "responses", priority: "high", tags: ["basic", "essential", "disagreement"], icon: "x" },
  { text: "maybe", type: "word", category: "responses", priority: "medium", tags: ["basic", "uncertainty"], icon: "help-circle" },
  { text: "okay", type: "word", category: "responses", priority: "high", tags: ["basic", "agreement"], icon: "check" },
  { text: "good", type: "word", category: "responses", priority: "high", tags: ["basic", "positive"], icon: "thumbs-up" },
  { text: "bad", type: "word", category: "responses", priority: "medium", tags: ["basic", "negative"], icon: "thumbs-down" },
  { text: "more", type: "word", category: "responses", priority: "high", tags: ["basic", "quantity"], icon: "plus" },
  { text: "less", type: "word", category: "responses", priority: "medium", tags: ["basic", "quantity"], icon: "minus" },
  { text: "done", type: "word", category: "responses", priority: "high", tags: ["basic", "completion"], icon: "check-circle" },
  { text: "finished", type: "word", category: "responses", priority: "high", tags: ["basic", "completion"], icon: "check-circle-2" },
  { text: "wait", type: "word", category: "responses", priority: "medium", tags: ["basic", "time"], icon: "clock" },
  
  // Time
  { text: "now", type: "word", category: "time", priority: "high", tags: ["time", "present"], icon: "clock" },
  { text: "later", type: "word", category: "time", priority: "medium", tags: ["time", "future"], icon: "clock" },
  { text: "before", type: "word", category: "time", priority: "low", tags: ["time", "past"], icon: "rewind" },
  { text: "after", type: "word", category: "time", priority: "low", tags: ["time", "future"], icon: "fast-forward" },
  { text: "today", type: "word", category: "time", priority: "medium", tags: ["time", "present"], icon: "calendar" },
  { text: "tomorrow", type: "word", category: "time", priority: "medium", tags: ["time", "future"], icon: "calendar-plus" },
  { text: "yesterday", type: "word", category: "time", priority: "low", tags: ["time", "past"], icon: "calendar-minus" },
  { text: "morning", type: "word", category: "time", priority: "medium", tags: ["time", "day_part"], icon: "sunrise" },
  { text: "afternoon", type: "word", category: "time", priority: "low", tags: ["time", "day_part"], icon: "sun" },
  { text: "evening", type: "word", category: "time", priority: "low", tags: ["time", "day_part"], icon: "sunset" },
  { text: "night", type: "word", category: "time", priority: "medium", tags: ["time", "day_part"], icon: "moon" },
  
  // Descriptions
  { text: "big", type: "word", category: "descriptions", priority: "medium", tags: ["size", "adjectives"], icon: "maximize" },
  { text: "small", type: "word", category: "descriptions", priority: "medium", tags: ["size", "adjectives"], icon: "minimize" },
  { text: "hot", type: "word", category: "descriptions", priority: "medium", tags: ["temperature", "adjectives"], icon: "thermometer" },
  { text: "cold", type: "word", category: "descriptions", priority: "medium", tags: ["temperature", "adjectives"], icon: "snowflake" },
  { text: "warm", type: "word", category: "descriptions", priority: "medium", tags: ["temperature", "adjectives"], icon: "sun" },
  { text: "cool", type: "word", category: "descriptions", priority: "low", tags: ["temperature", "adjectives"], icon: "wind" },
  { text: "fast", type: "word", category: "descriptions", priority: "low", tags: ["speed", "adjectives"], icon: "zap" },
  { text: "slow", type: "word", category: "descriptions", priority: "low", tags: ["speed", "adjectives"], icon: "turtle" },
  { text: "loud", type: "word", category: "descriptions", priority: "medium", tags: ["sound", "adjectives"], icon: "volume-2" },
  { text: "quiet", type: "word", category: "descriptions", priority: "medium", tags: ["sound", "adjectives"], icon: "volume-x" },
  { text: "soft", type: "word", category: "descriptions", priority: "low", tags: ["texture", "adjectives"], icon: "feather" },
  { text: "hard", type: "word", category: "descriptions", priority: "low", tags: ["texture", "adjectives"], icon: "square" },
  
  // Colors
  { text: "red", type: "word", category: "colors", priority: "medium", tags: ["colors", "descriptive"], icon: "circle" },
  { text: "blue", type: "word", category: "colors", priority: "medium", tags: ["colors", "descriptive"], icon: "circle" },
  { text: "green", type: "word", category: "colors", priority: "medium", tags: ["colors", "descriptive"], icon: "circle" },
  { text: "yellow", type: "word", category: "colors", priority: "medium", tags: ["colors", "descriptive"], icon: "circle" },
  { text: "black", type: "word", category: "colors", priority: "low", tags: ["colors", "descriptive"], icon: "circle" },
  { text: "white", type: "word", category: "colors", priority: "low", tags: ["colors", "descriptive"], icon: "circle" },
  { text: "pink", type: "word", category: "colors", priority: "low", tags: ["colors", "descriptive"], icon: "circle" },
  { text: "purple", type: "word", category: "colors", priority: "low", tags: ["colors", "descriptive"], icon: "circle" },
  
  // Questions
  { text: "what", type: "word", category: "questions", priority: "high", tags: ["questions", "basic"], icon: "help-circle" },
  { text: "where", type: "word", category: "questions", priority: "high", tags: ["questions", "basic"], icon: "map-pin" },
  { text: "when", type: "word", category: "questions", priority: "medium", tags: ["questions", "time"], icon: "clock" },
  { text: "who", type: "word", category: "questions", priority: "medium", tags: ["questions", "people"], icon: "user" },
  { text: "why", type: "word", category: "questions", priority: "medium", tags: ["questions", "reasoning"], icon: "help-circle" },
  { text: "how", type: "word", category: "questions", priority: "medium", tags: ["questions", "method"], icon: "help-circle" },
  
  // Places
  { text: "home", type: "word", category: "places", priority: "high", tags: ["places", "basic"], icon: "home" },
  { text: "school", type: "word", category: "places", priority: "high", tags: ["places", "learning"], icon: "graduation-cap" },
  { text: "work", type: "word", category: "places", priority: "medium", tags: ["places", "adult"], icon: "briefcase" },
  { text: "store", type: "word", category: "places", priority: "medium", tags: ["places", "shopping"], icon: "shopping-bag" },
  { text: "hospital", type: "word", category: "places", priority: "medium", tags: ["places", "medical"], icon: "cross" },
  { text: "doctor", type: "word", category: "places", priority: "medium", tags: ["places", "medical", "people"], icon: "stethoscope" },
  { text: "park", type: "word", category: "places", priority: "low", tags: ["places", "outdoor"], icon: "trees" },
  { text: "outside", type: "word", category: "places", priority: "medium", tags: ["places", "outdoor"], icon: "sun" },
  { text: "inside", type: "word", category: "places", priority: "medium", tags: ["places", "indoor"], icon: "home" },
  
  // Technology and Modern Life
  { text: "phone", type: "word", category: "technology", priority: "medium", tags: ["technology", "communication"], icon: "phone" },
  { text: "computer", type: "word", category: "technology", priority: "low", tags: ["technology", "work"], icon: "laptop" },
  { text: "tablet", type: "word", category: "technology", priority: "low", tags: ["technology", "entertainment"], icon: "tablet" },
  { text: "TV", type: "word", category: "technology", priority: "medium", tags: ["technology", "entertainment"], icon: "tv" },
  
  // Emergency and Safety
  { text: "help me", type: "phrase", category: "emergency", priority: "high", tags: ["emergency", "safety", "urgent"], icon: "alert-triangle" },
  { text: "emergency", type: "word", category: "emergency", priority: "high", tags: ["emergency", "safety", "urgent"], icon: "alert-triangle" },
  { text: "call 911", type: "phrase", category: "emergency", priority: "high", tags: ["emergency", "safety", "urgent"], icon: "phone-call" },
  { text: "danger", type: "word", category: "emergency", priority: "high", tags: ["emergency", "safety"], icon: "alert-triangle" },
  { text: "safe", type: "word", category: "emergency", priority: "medium", tags: ["safety", "positive"], icon: "shield-check" },
  
  // Common Phrases
  { text: "I love you", type: "phrase", category: "phrases", priority: "high", tags: ["social", "affection", "family"], icon: "heart" },
  { text: "I'm fine", type: "phrase", category: "phrases", priority: "medium", tags: ["status", "positive"], icon: "thumbs-up" },
  { text: "I don't know", type: "phrase", category: "phrases", priority: "medium", tags: ["uncertainty", "thoughts"], icon: "help-circle" },
  { text: "I can't", type: "phrase", category: "phrases", priority: "medium", tags: ["limitation", "help"], icon: "x-circle" },
  { text: "I want to go", type: "phrase", category: "phrases", priority: "medium", tags: ["movement", "desire"], icon: "arrow-right" },
  { text: "I need help", type: "phrase", category: "phrases", priority: "high", tags: ["help", "urgent"], icon: "helping-hand" },
  { text: "I'm hungry", type: "phrase", category: "phrases", priority: "high", tags: ["needs", "food"], icon: "utensils" },
  { text: "I'm tired", type: "phrase", category: "phrases", priority: "high", tags: ["needs", "rest"], icon: "bed" },
  { text: "I'm done", type: "phrase", category: "phrases", priority: "medium", tags: ["completion", "status"], icon: "check-circle" },
  { text: "not now", type: "phrase", category: "phrases", priority: "medium", tags: ["time", "refusal"], icon: "x" },
  { text: "maybe later", type: "phrase", category: "phrases", priority: "low", tags: ["time", "uncertainty"], icon: "clock" },
  { text: "I forgot", type: "phrase", category: "phrases", priority: "low", tags: ["memory", "explanation"], icon: "help-circle" }
];

export const getCategoryWords = (category: string): AACWord[] => {
  return aacVocabulary.filter(word => word.category === category);
};

export const getWordsByTags = (tags: string[]): AACWord[] => {
  return aacVocabulary.filter(word => 
    tags.some(tag => word.tags.includes(tag))
  );
};

export const getWordsByPriority = (priority: 'high' | 'medium' | 'low'): AACWord[] => {
  return aacVocabulary.filter(word => word.priority === priority);
};

export const getAllCategories = (): string[] => {
  return [...new Set(aacVocabulary.map(word => word.category))];
};