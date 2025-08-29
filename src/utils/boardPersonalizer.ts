import { aacVocabulary, AACWord, getWordsByTags, getWordsByPriority } from '@/data/aacVocabulary';

export interface PersonalizedBoard {
  categories: {
    [key: string]: AACWord[];
  };
  buttonSize: 'small' | 'medium' | 'large';
  speechSpeed: number;
}

export const generatePersonalizedBoard = (answers: Record<string, string>): PersonalizedBoard => {
  let selectedWords: AACWord[] = [];
  let buttonSize: 'small' | 'medium' | 'large' = 'medium';
  let speechSpeed = 1.0;

  // Determine button size
  buttonSize = (answers.button_size as 'small' | 'medium' | 'large') || 'medium';
  
  // Determine speech speed
  switch (answers.speech_speed) {
    case 'slow':
      speechSpeed = 0.7;
      break;
    case 'fast':
      speechSpeed = 1.3;
      break;
    default:
      speechSpeed = 1.0;
  }

  // Always include essential high-priority words
  selectedWords.push(...getWordsByPriority('high').filter(word => 
    word.tags.includes('essential') || word.tags.includes('basic')
  ));

  // Add words based on primary communication goal
  switch (answers.primary_communication_goal) {
    case 'express_needs':
      selectedWords.push(...getWordsByTags(['needs', 'help', 'medical']));
      break;
    case 'have_conversations':
      selectedWords.push(...getWordsByTags(['social', 'questions', 'greetings']));
      break;
    case 'share_thoughts':
      selectedWords.push(...getWordsByTags(['thoughts', 'feelings', 'opinions']));
      break;
    case 'ask_questions':
      selectedWords.push(...getWordsByTags(['questions', 'learning', 'curiosity']));
      break;
  }

  // Add words based on food importance
  if (answers.food_importance === 'very_often') {
    selectedWords.push(...aacVocabulary.filter(word => word.category === 'food_drink'));
  } else if (answers.food_importance === 'sometimes') {
    selectedWords.push(...aacVocabulary.filter(word => 
      word.category === 'food_drink' && word.priority === 'high'
    ));
  }

  // Add bathroom words if needed
  if (answers.bathroom_importance === 'critical') {
    selectedWords.push(...aacVocabulary.filter(word => word.category === 'bathroom_body'));
  } else if (answers.bathroom_importance === 'important') {
    selectedWords.push(...aacVocabulary.filter(word => 
      word.category === 'bathroom_body' && word.priority === 'high'
    ));
  }

  // Add medical words if needed
  if (answers.pain_discomfort === 'yes_often' || answers.medical_needs === 'yes_essential') {
    selectedWords.push(...getWordsByTags(['medical', 'pain', 'physical']));
  }

  // Add social words based on preferences
  if (answers.social_greetings === 'very_important') {
    selectedWords.push(...aacVocabulary.filter(word => word.category === 'greetings'));
    selectedWords.push(...aacVocabulary.filter(word => word.category === 'politeness'));
  }

  // Add family words
  if (answers.family_communication === 'daily') {
    selectedWords.push(...aacVocabulary.filter(word => word.category === 'family'));
  }

  // Add feeling words
  if (answers.express_feelings === 'very_important') {
    selectedWords.push(...aacVocabulary.filter(word => word.category === 'feelings'));
  }

  // Add activity words
  if (answers.daily_activities === 'love_sharing') {
    selectedWords.push(...aacVocabulary.filter(word => word.category === 'activities'));
  }

  // Add entertainment words
  if (answers.entertainment === 'love_entertainment') {
    selectedWords.push(...getWordsByTags(['entertainment', 'music', 'creative']));
  }

  // Add sports/games words
  if (answers.sports_games === 'very_interested') {
    selectedWords.push(...getWordsByTags(['sports', 'games', 'exercise']));
  }

  // Add question words for curious users
  if (answers.ask_questions === 'very_curious') {
    selectedWords.push(...aacVocabulary.filter(word => word.category === 'questions'));
  }

  // Add time words if important
  if (answers.time_concepts === 'very_important' || answers.future_planning === 'love_planning') {
    selectedWords.push(...aacVocabulary.filter(word => word.category === 'time'));
  }

  // Add description words
  if (answers.describing_things === 'love_describing') {
    selectedWords.push(...aacVocabulary.filter(word => 
      word.category === 'descriptions' || word.category === 'colors'
    ));
  }

  // Add yes/no if frequently used
  if (answers.yes_no_frequency === 'very_often') {
    selectedWords.push(...aacVocabulary.filter(word => 
      word.category === 'responses' && (word.text === 'yes' || word.text === 'no')
    ));
  }

  // Add vocabulary based on level preference
  if (answers.vocabulary_level === 'simple_words') {
    selectedWords = selectedWords.filter(word => 
      word.tags.includes('basic') || word.priority === 'high'
    );
  } else if (answers.vocabulary_level === 'advanced_vocabulary') {
    selectedWords.push(...getWordsByTags(['advanced', 'formal']));
  }

  // Add emergency words if safety is a concern
  selectedWords.push(...aacVocabulary.filter(word => word.category === 'emergency'));

  // Remove duplicates
  const uniqueWords = selectedWords.filter((word, index, self) => 
    index === self.findIndex(w => w.text === word.text)
  );

  // Add some high-priority words if the selection is too small
  if (uniqueWords.length < 50) {
    const additionalWords = getWordsByPriority('high').filter(word => 
      !uniqueWords.some(existing => existing.text === word.text)
    );
    uniqueWords.push(...additionalWords.slice(0, 50 - uniqueWords.length));
  }

  // Group by categories
  const categories: { [key: string]: AACWord[] } = {};
  
  uniqueWords.forEach(word => {
    if (!categories[word.category]) {
      categories[word.category] = [];
    }
    categories[word.category].push(word);
  });

  // Sort categories by importance based on user preferences
  const sortedCategories: { [key: string]: AACWord[] } = {};
  
  const categoryPriority = getCategoryPriority(answers);
  
  categoryPriority.forEach(categoryName => {
    if (categories[categoryName]) {
      sortedCategories[categoryName] = categories[categoryName].sort((a, b) => {
        const priorityOrder = { 'high': 0, 'medium': 1, 'low': 2 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      });
    }
  });

  // Add any remaining categories
  Object.keys(categories).forEach(category => {
    if (!sortedCategories[category]) {
      sortedCategories[category] = categories[category];
    }
  });

  return {
    categories: sortedCategories,
    buttonSize,
    speechSpeed
  };
};

const getCategoryPriority = (answers: Record<string, string>): string[] => {
  const priority: string[] = [];

  // Most important category first
  switch (answers.most_important_category) {
    case 'basic_needs':
      priority.push('food_drink', 'bathroom_body', 'emergency');
      break;
    case 'social_connection':
      priority.push('greetings', 'family', 'politeness', 'phrases');
      break;
    case 'expressing_self':
      priority.push('feelings', 'verbs', 'responses');
      break;
    case 'activities_interests':
      priority.push('activities', 'technology', 'places');
      break;
  }

  // Add other important categories based on specific answers
  if (answers.express_feelings === 'very_important') {
    priority.unshift('feelings');
  }
  
  if (answers.family_communication === 'daily') {
    priority.splice(1, 0, 'family');
  }

  if (answers.ask_questions === 'very_curious') {
    priority.splice(2, 0, 'questions');
  }

  // Add remaining standard categories
  const standardCategories = [
    'pronouns', 'verbs', 'responses', 'greetings', 'politeness', 
    'food_drink', 'bathroom_body', 'feelings', 'family', 'activities', 
    'time', 'descriptions', 'colors', 'questions', 'places', 
    'technology', 'emergency', 'phrases'
  ];

  standardCategories.forEach(category => {
    if (!priority.includes(category)) {
      priority.push(category);
    }
  });

  return priority;
};