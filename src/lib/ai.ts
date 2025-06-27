import type { Message, SearchResult } from '../types';

// Mock AI responses with web search simulation
const mockResponses = [
  "Hello! I'm Arsenal AI, your advanced AI assistant. I can help you with complex questions, research, coding, analysis, and much more. I have access to real-time web search to provide you with the most current information. What would you like to explore today?",
  
  "I can assist you with a wide range of tasks including:\n\n• **Research & Analysis** - Deep dive into any topic with web search\n• **Code Development** - Full-stack development, debugging, optimization\n• **Creative Writing** - Stories, articles, scripts, and more\n• **Problem Solving** - Complex mathematical and logical problems\n• **Learning Support** - Explanations, tutorials, and educational content\n\nWhat specific area interests you most?",
  
  "Based on my web search capabilities, I can provide you with the latest information on any topic. I continuously learn from interactions and can adapt my responses based on context and user preferences. My knowledge spans across:\n\n```\n- Technology & Programming\n- Science & Research\n- Business & Finance\n- Arts & Culture\n- Current Events\n- And much more...\n```\n\nHow can I help you today?",
  
  "I notice you're interested in advanced AI capabilities. Let me search for the latest developments in AI technology...\n\n*[Searching the web for latest AI developments]*\n\nBased on recent findings, the field of AI is rapidly evolving with breakthroughs in:\n\n• **Large Language Models** - More efficient and capable models\n• **Multimodal AI** - Integration of text, image, and audio processing\n• **AI Safety** - Advanced alignment and safety research\n• **Edge AI** - Running AI models on local devices\n\nWould you like me to dive deeper into any of these areas?"
];

const mockSearchResults: SearchResult[] = [
  {
    title: "Latest AI Developments 2024 - TechCrunch",
    url: "https://techcrunch.com/ai-developments-2024",
    snippet: "Comprehensive overview of the latest breakthroughs in artificial intelligence, including new model architectures and applications."
  },
  {
    title: "LLaMA 2 Dataset and Training - Meta AI Research",
    url: "https://ai.meta.com/llama",
    snippet: "Official documentation and research papers on LLaMA 2 dataset, training methodologies, and performance benchmarks."
  },
  {
    title: "Building Production AI Systems - OpenAI",
    url: "https://openai.com/research/production-ai",
    snippet: "Best practices for deploying AI systems at scale, including safety considerations and performance optimization."
  }
];

export const generateAIResponse = async (
  messages: Message[],
  searchQuery?: string
): Promise<{ content: string; sources?: string[] }> => {
  // Simulate thinking time
  await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 2000));
  
  const lastMessage = messages[messages.length - 1];
  let response = mockResponses[Math.floor(Math.random() * mockResponses.length)];
  let sources: string[] = [];
  
  // Simulate web search if query contains certain keywords
  const searchKeywords = ['latest', 'current', 'recent', 'news', 'search', 'find', 'research'];
  const shouldSearch = searchKeywords.some(keyword => 
    lastMessage.content.toLowerCase().includes(keyword)
  );
  
  if (shouldSearch || searchQuery) {
    // Simulate web search
    sources = mockSearchResults.map(result => result.url);
    response = `I've searched the web for the latest information on your query.\n\n${response}\n\n**Sources:**\n${mockSearchResults.map(result => `• [${result.title}](${result.url})`).join('\n')}`;
  }
  
  // Personalize response based on conversation history
  if (messages.length > 3) {
    response = `Based on our conversation, ${response}`;
  }
  
  return { content: response, sources };
};

export const searchWeb = async (query: string): Promise<SearchResult[]> => {
  // Simulate web search delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Return mock search results
  return mockSearchResults.filter(result => 
    result.title.toLowerCase().includes(query.toLowerCase()) ||
    result.snippet.toLowerCase().includes(query.toLowerCase())
  );
};