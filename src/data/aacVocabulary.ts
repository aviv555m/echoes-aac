export interface AACWord {
  text: string;
  type: 'word' | 'phrase' | 'action';
  category: string;
  priority: 'high' | 'medium' | 'low';
  tags: string[];
}

export const aacVocabulary: AACWord[] = [
  // Essential Communication
  { text: "I", type: "word", category: "pronouns", priority: "high", tags: ["basic", "essential"] },
  { text: "you", type: "word", category: "pronouns", priority: "high", tags: ["basic", "essential"] },
  { text: "me", type: "word", category: "pronouns", priority: "high", tags: ["basic", "essential"] },
  { text: "we", type: "word", category: "pronouns", priority: "medium", tags: ["basic", "social"] },
  { text: "they", type: "word", category: "pronouns", priority: "medium", tags: ["basic", "social"] },
  
  // Basic Verbs
  { text: "want", type: "word", category: "verbs", priority: "high", tags: ["basic", "essential", "needs"] },
  { text: "need", type: "word", category: "verbs", priority: "high", tags: ["basic", "essential", "needs"] },
  { text: "like", type: "word", category: "verbs", priority: "high", tags: ["basic", "feelings", "preferences"] },
  { text: "love", type: "word", category: "verbs", priority: "high", tags: ["feelings", "social"] },
  { text: "have", type: "word", category: "verbs", priority: "high", tags: ["basic", "essential"] },
  { text: "get", type: "word", category: "verbs", priority: "high", tags: ["basic", "actions"] },
  { text: "give", type: "word", category: "verbs", priority: "medium", tags: ["basic", "actions", "social"] },
  { text: "go", type: "word", category: "verbs", priority: "high", tags: ["basic", "actions", "movement"] },
  { text: "come", type: "word", category: "verbs", priority: "high", tags: ["basic", "actions", "movement"] },
  { text: "stop", type: "word", category: "verbs", priority: "high", tags: ["basic", "actions", "safety"] },
  { text: "help", type: "word", category: "verbs", priority: "high", tags: ["basic", "essential", "safety"] },
  { text: "see", type: "word", category: "verbs", priority: "medium", tags: ["basic", "senses"] },
  { text: "hear", type: "word", category: "verbs", priority: "medium", tags: ["basic", "senses"] },
  { text: "feel", type: "word", category: "verbs", priority: "medium", tags: ["basic", "feelings", "senses"] },
  { text: "think", type: "word", category: "verbs", priority: "medium", tags: ["thoughts", "advanced"] },
  { text: "know", type: "word", category: "verbs", priority: "medium", tags: ["thoughts", "basic"] },
  { text: "understand", type: "word", category: "verbs", priority: "medium", tags: ["thoughts", "communication"] },
  { text: "remember", type: "word", category: "verbs", priority: "low", tags: ["thoughts", "time"] },
  { text: "forget", type: "word", category: "verbs", priority: "low", tags: ["thoughts", "time"] },
  
  // Basic Needs
  { text: "water", type: "word", category: "food_drink", priority: "high", tags: ["basic", "essential", "needs"] },
  { text: "food", type: "word", category: "food_drink", priority: "high", tags: ["basic", "essential", "needs"] },
  { text: "eat", type: "word", category: "food_drink", priority: "high", tags: ["basic", "essential", "actions"] },
  { text: "drink", type: "word", category: "food_drink", priority: "high", tags: ["basic", "essential", "actions"] },
  { text: "hungry", type: "word", category: "food_drink", priority: "high", tags: ["basic", "needs", "feelings"] },
  { text: "thirsty", type: "word", category: "food_drink", priority: "high", tags: ["basic", "needs", "feelings"] },
  { text: "breakfast", type: "word", category: "food_drink", priority: "medium", tags: ["meals", "time"] },
  { text: "lunch", type: "word", category: "food_drink", priority: "medium", tags: ["meals", "time"] },
  { text: "dinner", type: "word", category: "food_drink", priority: "medium", tags: ["meals", "time"] },
  { text: "snack", type: "word", category: "food_drink", priority: "medium", tags: ["meals"] },
  { text: "milk", type: "word", category: "food_drink", priority: "medium", tags: ["drinks"] },
  { text: "juice", type: "word", category: "food_drink", priority: "medium", tags: ["drinks"] },
  { text: "coffee", type: "word", category: "food_drink", priority: "low", tags: ["drinks", "adult"] },
  { text: "tea", type: "word", category: "food_drink", priority: "low", tags: ["drinks"] },
  
  // Bathroom and Body
  { text: "bathroom", type: "word", category: "bathroom_body", priority: "high", tags: ["basic", "essential", "needs"] },
  { text: "toilet", type: "word", category: "bathroom_body", priority: "high", tags: ["basic", "essential", "needs"] },
  { text: "wash", type: "word", category: "bathroom_body", priority: "medium", tags: ["hygiene", "actions"] },
  { text: "shower", type: "word", category: "bathroom_body", priority: "medium", tags: ["hygiene"] },
  { text: "bath", type: "word", category: "bathroom_body", priority: "medium", tags: ["hygiene"] },
  { text: "brush teeth", type: "phrase", category: "bathroom_body", priority: "medium", tags: ["hygiene", "routine"] },
  { text: "hands", type: "word", category: "bathroom_body", priority: "medium", tags: ["body_parts"] },
  { text: "face", type: "word", category: "bathroom_body", priority: "medium", tags: ["body_parts"] },
  { text: "hair", type: "word", category: "bathroom_body", priority: "low", tags: ["body_parts"] },
  
  // Feelings and Emotions
  { text: "happy", type: "word", category: "feelings", priority: "high", tags: ["emotions", "positive"] },
  { text: "sad", type: "word", category: "feelings", priority: "high", tags: ["emotions", "negative"] },
  { text: "angry", type: "word", category: "feelings", priority: "high", tags: ["emotions", "negative"] },
  { text: "mad", type: "word", category: "feelings", priority: "high", tags: ["emotions", "negative"] },
  { text: "excited", type: "word", category: "feelings", priority: "medium", tags: ["emotions", "positive"] },
  { text: "scared", type: "word", category: "feelings", priority: "medium", tags: ["emotions", "negative"] },
  { text: "worried", type: "word", category: "feelings", priority: "medium", tags: ["emotions", "negative"] },
  { text: "calm", type: "word", category: "feelings", priority: "medium", tags: ["emotions", "positive"] },
  { text: "tired", type: "word", category: "feelings", priority: "high", tags: ["physical", "state"] },
  { text: "awake", type: "word", category: "feelings", priority: "medium", tags: ["physical", "state"] },
  { text: "sleepy", type: "word", category: "feelings", priority: "medium", tags: ["physical", "state"] },
  { text: "comfortable", type: "word", category: "feelings", priority: "medium", tags: ["physical", "positive"] },
  { text: "uncomfortable", type: "word", category: "feelings", priority: "medium", tags: ["physical", "negative"] },
  { text: "hurt", type: "word", category: "feelings", priority: "high", tags: ["physical", "negative", "medical"] },
  { text: "pain", type: "word", category: "feelings", priority: "high", tags: ["physical", "negative", "medical"] },
  { text: "sick", type: "word", category: "feelings", priority: "high", tags: ["physical", "negative", "medical"] },
  { text: "better", type: "word", category: "feelings", priority: "medium", tags: ["physical", "positive", "medical"] },
  
  // Social Greetings
  { text: "hello", type: "word", category: "greetings", priority: "high", tags: ["social", "basic", "polite"] },
  { text: "hi", type: "word", category: "greetings", priority: "high", tags: ["social", "basic", "casual"] },
  { text: "goodbye", type: "word", category: "greetings", priority: "high", tags: ["social", "basic", "polite"] },
  { text: "bye", type: "word", category: "greetings", priority: "high", tags: ["social", "basic", "casual"] },
  { text: "good morning", type: "phrase", category: "greetings", priority: "medium", tags: ["social", "polite", "time"] },
  { text: "good night", type: "phrase", category: "greetings", priority: "medium", tags: ["social", "polite", "time"] },
  { text: "see you later", type: "phrase", category: "greetings", priority: "medium", tags: ["social", "casual"] },
  { text: "how are you", type: "phrase", category: "greetings", priority: "medium", tags: ["social", "questions"] },
  
  // Politeness
  { text: "please", type: "word", category: "politeness", priority: "high", tags: ["social", "polite", "basic"] },
  { text: "thank you", type: "phrase", category: "politeness", priority: "high", tags: ["social", "polite", "basic"] },
  { text: "thanks", type: "word", category: "politeness", priority: "high", tags: ["social", "polite", "casual"] },
  { text: "you're welcome", type: "phrase", category: "politeness", priority: "medium", tags: ["social", "polite"] },
  { text: "excuse me", type: "phrase", category: "politeness", priority: "medium", tags: ["social", "polite"] },
  { text: "sorry", type: "word", category: "politeness", priority: "high", tags: ["social", "polite", "basic"] },
  
  // Family
  { text: "mom", type: "word", category: "family", priority: "high", tags: ["family", "people"] },
  { text: "dad", type: "word", category: "family", priority: "high", tags: ["family", "people"] },
  { text: "mother", type: "word", category: "family", priority: "medium", tags: ["family", "people", "formal"] },
  { text: "father", type: "word", category: "family", priority: "medium", tags: ["family", "people", "formal"] },
  { text: "brother", type: "word", category: "family", priority: "medium", tags: ["family", "people"] },
  { text: "sister", type: "word", category: "family", priority: "medium", tags: ["family", "people"] },
  { text: "grandma", type: "word", category: "family", priority: "medium", tags: ["family", "people"] },
  { text: "grandpa", type: "word", category: "family", priority: "medium", tags: ["family", "people"] },
  { text: "family", type: "word", category: "family", priority: "medium", tags: ["family", "people"] },
  
  // Actions and Activities
  { text: "play", type: "word", category: "activities", priority: "high", tags: ["actions", "fun"] },
  { text: "work", type: "word", category: "activities", priority: "medium", tags: ["actions", "adult"] },
  { text: "sleep", type: "word", category: "activities", priority: "high", tags: ["actions", "rest"] },
  { text: "rest", type: "word", category: "activities", priority: "medium", tags: ["actions", "rest"] },
  { text: "walk", type: "word", category: "activities", priority: "medium", tags: ["actions", "movement"] },
  { text: "run", type: "word", category: "activities", priority: "low", tags: ["actions", "movement", "exercise"] },
  { text: "sit", type: "word", category: "activities", priority: "medium", tags: ["actions", "position"] },
  { text: "stand", type: "word", category: "activities", priority: "medium", tags: ["actions", "position"] },
  { text: "read", type: "word", category: "activities", priority: "medium", tags: ["actions", "learning"] },
  { text: "write", type: "word", category: "activities", priority: "low", tags: ["actions", "learning"] },
  { text: "draw", type: "word", category: "activities", priority: "low", tags: ["actions", "creative"] },
  { text: "sing", type: "word", category: "activities", priority: "low", tags: ["actions", "creative", "music"] },
  { text: "dance", type: "word", category: "activities", priority: "low", tags: ["actions", "creative", "music"] },
  { text: "watch TV", type: "phrase", category: "activities", priority: "medium", tags: ["entertainment", "relaxation"] },
  { text: "listen music", type: "phrase", category: "activities", priority: "medium", tags: ["entertainment", "music"] },
  
  // Yes/No and Basic Responses
  { text: "yes", type: "word", category: "responses", priority: "high", tags: ["basic", "essential", "agreement"] },
  { text: "no", type: "word", category: "responses", priority: "high", tags: ["basic", "essential", "disagreement"] },
  { text: "maybe", type: "word", category: "responses", priority: "medium", tags: ["basic", "uncertainty"] },
  { text: "okay", type: "word", category: "responses", priority: "high", tags: ["basic", "agreement"] },
  { text: "good", type: "word", category: "responses", priority: "high", tags: ["basic", "positive"] },
  { text: "bad", type: "word", category: "responses", priority: "medium", tags: ["basic", "negative"] },
  { text: "more", type: "word", category: "responses", priority: "high", tags: ["basic", "quantity"] },
  { text: "less", type: "word", category: "responses", priority: "medium", tags: ["basic", "quantity"] },
  { text: "done", type: "word", category: "responses", priority: "high", tags: ["basic", "completion"] },
  { text: "finished", type: "word", category: "responses", priority: "high", tags: ["basic", "completion"] },
  { text: "wait", type: "word", category: "responses", priority: "medium", tags: ["basic", "time"] },
  
  // Time
  { text: "now", type: "word", category: "time", priority: "high", tags: ["time", "present"] },
  { text: "later", type: "word", category: "time", priority: "medium", tags: ["time", "future"] },
  { text: "before", type: "word", category: "time", priority: "low", tags: ["time", "past"] },
  { text: "after", type: "word", category: "time", priority: "low", tags: ["time", "future"] },
  { text: "today", type: "word", category: "time", priority: "medium", tags: ["time", "present"] },
  { text: "tomorrow", type: "word", category: "time", priority: "medium", tags: ["time", "future"] },
  { text: "yesterday", type: "word", category: "time", priority: "low", tags: ["time", "past"] },
  { text: "morning", type: "word", category: "time", priority: "medium", tags: ["time", "day_part"] },
  { text: "afternoon", type: "word", category: "time", priority: "low", tags: ["time", "day_part"] },
  { text: "evening", type: "word", category: "time", priority: "low", tags: ["time", "day_part"] },
  { text: "night", type: "word", category: "time", priority: "medium", tags: ["time", "day_part"] },
  
  // Descriptions
  { text: "big", type: "word", category: "descriptions", priority: "medium", tags: ["size", "adjectives"] },
  { text: "small", type: "word", category: "descriptions", priority: "medium", tags: ["size", "adjectives"] },
  { text: "hot", type: "word", category: "descriptions", priority: "medium", tags: ["temperature", "adjectives"] },
  { text: "cold", type: "word", category: "descriptions", priority: "medium", tags: ["temperature", "adjectives"] },
  { text: "warm", type: "word", category: "descriptions", priority: "medium", tags: ["temperature", "adjectives"] },
  { text: "cool", type: "word", category: "descriptions", priority: "low", tags: ["temperature", "adjectives"] },
  { text: "fast", type: "word", category: "descriptions", priority: "low", tags: ["speed", "adjectives"] },
  { text: "slow", type: "word", category: "descriptions", priority: "low", tags: ["speed", "adjectives"] },
  { text: "loud", type: "word", category: "descriptions", priority: "medium", tags: ["sound", "adjectives"] },
  { text: "quiet", type: "word", category: "descriptions", priority: "medium", tags: ["sound", "adjectives"] },
  { text: "soft", type: "word", category: "descriptions", priority: "low", tags: ["texture", "adjectives"] },
  { text: "hard", type: "word", category: "descriptions", priority: "low", tags: ["texture", "adjectives"] },
  
  // Colors
  { text: "red", type: "word", category: "colors", priority: "medium", tags: ["colors", "descriptive"] },
  { text: "blue", type: "word", category: "colors", priority: "medium", tags: ["colors", "descriptive"] },
  { text: "green", type: "word", category: "colors", priority: "medium", tags: ["colors", "descriptive"] },
  { text: "yellow", type: "word", category: "colors", priority: "medium", tags: ["colors", "descriptive"] },
  { text: "black", type: "word", category: "colors", priority: "low", tags: ["colors", "descriptive"] },
  { text: "white", type: "word", category: "colors", priority: "low", tags: ["colors", "descriptive"] },
  { text: "pink", type: "word", category: "colors", priority: "low", tags: ["colors", "descriptive"] },
  { text: "purple", type: "word", category: "colors", priority: "low", tags: ["colors", "descriptive"] },
  
  // Questions
  { text: "what", type: "word", category: "questions", priority: "high", tags: ["questions", "basic"] },
  { text: "where", type: "word", category: "questions", priority: "high", tags: ["questions", "basic"] },
  { text: "when", type: "word", category: "questions", priority: "medium", tags: ["questions", "time"] },
  { text: "who", type: "word", category: "questions", priority: "medium", tags: ["questions", "people"] },
  { text: "why", type: "word", category: "questions", priority: "medium", tags: ["questions", "reasoning"] },
  { text: "how", type: "word", category: "questions", priority: "medium", tags: ["questions", "method"] },
  
  // Places
  { text: "home", type: "word", category: "places", priority: "high", tags: ["places", "basic"] },
  { text: "school", type: "word", category: "places", priority: "high", tags: ["places", "learning"] },
  { text: "work", type: "word", category: "places", priority: "medium", tags: ["places", "adult"] },
  { text: "store", type: "word", category: "places", priority: "medium", tags: ["places", "shopping"] },
  { text: "hospital", type: "word", category: "places", priority: "medium", tags: ["places", "medical"] },
  { text: "doctor", type: "word", category: "places", priority: "medium", tags: ["places", "medical", "people"] },
  { text: "park", type: "word", category: "places", priority: "low", tags: ["places", "outdoor"] },
  { text: "outside", type: "word", category: "places", priority: "medium", tags: ["places", "outdoor"] },
  { text: "inside", type: "word", category: "places", priority: "medium", tags: ["places", "indoor"] },
  
  // Technology and Modern Life
  { text: "phone", type: "word", category: "technology", priority: "medium", tags: ["technology", "communication"] },
  { text: "computer", type: "word", category: "technology", priority: "low", tags: ["technology", "work"] },
  { text: "tablet", type: "word", category: "technology", priority: "low", tags: ["technology", "entertainment"] },
  { text: "TV", type: "word", category: "technology", priority: "medium", tags: ["technology", "entertainment"] },
  
  // Emergency and Safety
  { text: "help me", type: "phrase", category: "emergency", priority: "high", tags: ["emergency", "safety", "urgent"] },
  { text: "emergency", type: "word", category: "emergency", priority: "high", tags: ["emergency", "safety", "urgent"] },
  { text: "call 911", type: "phrase", category: "emergency", priority: "high", tags: ["emergency", "safety", "urgent"] },
  { text: "danger", type: "word", category: "emergency", priority: "high", tags: ["emergency", "safety"] },
  { text: "safe", type: "word", category: "emergency", priority: "medium", tags: ["safety", "positive"] },
  
  // Common Phrases
  { text: "I love you", type: "phrase", category: "phrases", priority: "high", tags: ["social", "affection", "family"] },
  { text: "I'm fine", type: "phrase", category: "phrases", priority: "medium", tags: ["status", "positive"] },
  { text: "I don't know", type: "phrase", category: "phrases", priority: "medium", tags: ["uncertainty", "thoughts"] },
  { text: "I can't", type: "phrase", category: "phrases", priority: "medium", tags: ["limitation", "help"] },
  { text: "I want to go", type: "phrase", category: "phrases", priority: "medium", tags: ["movement", "desire"] },
  { text: "I need help", type: "phrase", category: "phrases", priority: "high", tags: ["help", "urgent"] },
  { text: "I'm hungry", type: "phrase", category: "phrases", priority: "high", tags: ["needs", "food"] },
  { text: "I'm tired", type: "phrase", category: "phrases", priority: "high", tags: ["needs", "rest"] },
  { text: "I'm done", type: "phrase", category: "phrases", priority: "medium", tags: ["completion", "status"] },
  { text: "not now", type: "phrase", category: "phrases", priority: "medium", tags: ["time", "refusal"] },
  { text: "maybe later", type: "phrase", category: "phrases", priority: "low", tags: ["time", "uncertainty"] },
  { text: "I forgot", type: "phrase", category: "phrases", priority: "low", tags: ["memory", "explanation"] }
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