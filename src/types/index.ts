export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  created_at: string;
}

export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  conversation_id: string;
  sources?: string[];
  thinking?: boolean;
}

export interface Conversation {
  id: string;
  title: string;
  user_id: string;
  created_at: string;
  updated_at: string;
  message_count: number;
}

export interface SearchResult {
  title: string;
  url: string;
  snippet: string;
}

export interface AIPersona {
  id: string;
  name: string;
  description: string;
  icon: string;
  prompt: string;
}