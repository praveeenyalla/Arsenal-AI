import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Search, Paperclip, Zap, Globe, Brain, Sparkles } from 'lucide-react';
import { MessageBubble } from './MessageBubble';
import { TypingIndicator } from './TypingIndicator';
import { generateAIResponse } from '../../lib/ai';
import type { Message } from '../../types';

interface ChatInterfaceProps {
  conversationId: string;
  onNewMessage?: (message: Message) => void;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({
  conversationId,
  onNewMessage
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm Arsenal AI, your advanced AI assistant. I can help you with complex questions, research, coding, analysis, and much more. I have access to real-time web search to provide you with the most current information. What would you like to explore today?",
      role: 'assistant',
      timestamp: new Date(),
      conversation_id: conversationId,
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [searchMode, setSearchMode] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: 'user',
      timestamp: new Date(),
      conversation_id: conversationId,
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      const response = await generateAIResponse(
        [...messages, userMessage],
        searchMode ? input : undefined
      );

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response.content,
        role: 'assistant',
        timestamp: new Date(),
        conversation_id: conversationId,
        sources: response.sources,
      };

      setMessages(prev => [...prev, assistantMessage]);
      onNewMessage?.(assistantMessage);
    } catch (error) {
      console.error('Error generating response:', error);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const quickPrompts = [
    { icon: Brain, text: "Explain quantum computing", color: "from-purple-500 to-pink-500" },
    { icon: Globe, text: "Latest AI developments", color: "from-blue-500 to-cyan-500" },
    { icon: Sparkles, text: "Write a creative story", color: "from-green-500 to-teal-500" },
  ];

  return (
    <div className="flex flex-col h-full">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
        <AnimatePresence>
          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}
        </AnimatePresence>

        {isTyping && <TypingIndicator />}

        {/* Quick Prompts (shown when no messages) */}
        {messages.length === 1 && !isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8"
          >
            {quickPrompts.map((prompt, index) => (
              <motion.button
                key={index}
                onClick={() => setInput(prompt.text)}
                className={`p-4 rounded-xl bg-gradient-to-r ${prompt.color} bg-opacity-10 border border-gray-700 hover:border-gray-600 transition-all group`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <prompt.icon className="w-6 h-6 text-white mb-2 group-hover:scale-110 transition-transform" />
                <p className="text-sm text-gray-300 group-hover:text-white transition-colors">
                  {prompt.text}
                </p>
              </motion.button>
            ))}
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <div className="border-t border-gray-700 bg-gray-800/50 backdrop-blur-sm p-4">
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
          <div className="relative">
            <div className="flex items-center space-x-2 mb-3">
              <button
                type="button"
                onClick={() => setSearchMode(!searchMode)}
                className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  searchMode
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                <Search className="w-4 h-4" />
                <span>Web Search</span>
              </button>
              <div className="text-xs text-gray-500">
                {searchMode ? 'AI will search the web for current information' : 'Standard AI response'}
              </div>
            </div>

            <div className="relative">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={searchMode ? "Ask me anything - I'll search the web for the latest information..." : "Ask Arsenal AI anything..."}
                className="w-full p-4 pr-20 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={1}
                style={{ minHeight: '56px', maxHeight: '200px' }}
              />
              
              <div className="absolute right-2 bottom-2 flex items-center space-x-2">
                <button
                  type="button"
                  className="p-2 text-gray-400 hover:text-white transition-colors"
                  title="Attach file"
                >
                  <Paperclip className="w-5 h-5" />
                </button>
                <button
                  type="submit"
                  disabled={!input.trim() || isTyping}
                  className={`p-2 rounded-lg transition-all ${
                    input.trim() && !isTyping
                      ? 'bg-blue-500 text-white hover:bg-blue-600 shadow-lg'
                      : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </form>
        
        <div className="text-center text-xs text-gray-500 mt-3">
          Arsenal AI can make mistakes. Consider checking important information.
        </div>
      </div>
    </div>
  );
};