export type Language = 'en' | 'fr' | 'ar';

export interface FAQEntry {
  id: string;
  language: Language;
  display_questions: string[];
  question_variants: string[];
  answer: string;
  tags: string[];
}

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai' | 'system';
  source?: 'AI' | 'FAQ';
  timestamp: Date;
  isTyping?: boolean;
}

export interface ChatState {
  isOpen: boolean;
  messages: Message[];
  language: Language | null;
  isLoading: boolean;
}