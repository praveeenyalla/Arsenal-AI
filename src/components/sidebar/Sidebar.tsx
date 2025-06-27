import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  MessageSquare, 
  Search, 
  Settings, 
  User, 
  LogOut, 
  ChevronLeft,
  History,
  Trash2,
  Edit3
} from 'lucide-react';
import type { Conversation } from '../../types';

interface SidebarProps {
  conversations: Conversation[];
  currentConversationId: string;
  onNewConversation: () => void;
  onSelectConversation: (id: string) => void;
  onDeleteConversation: (id: string) => void;
  onSignOut: () => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  conversations,
  currentConversationId,
  onNewConversation,
  onSelectConversation,
  onDeleteConversation,
  onSignOut,
  isCollapsed,
  onToggleCollapse,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredConversations = conversations.filter(conv =>
    conv.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <motion.div
      className={`bg-gray-900 border-r border-gray-700 flex flex-col transition-all duration-300 ${
        isCollapsed ? 'w-16' : 'w-80'
      }`}
      initial={false}
      animate={{ width: isCollapsed ? 64 : 320 }}
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <h2 className="text-lg font-semibold text-white">Arsenal AI</h2>
          )}
          <button
            onClick={onToggleCollapse}
            className="p-2 text-gray-400 hover:text-white transition-colors"
          >
            <ChevronLeft className={`w-5 h-5 transition-transform ${isCollapsed ? 'rotate-180' : ''}`} />
          </button>
        </div>
      </div>

      {/* New Conversation Button */}
      <div className="p-4">
        <button
          onClick={onNewConversation}
          className={`w-full flex items-center gap-3 p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors ${
            isCollapsed ? 'justify-center' : ''
          }`}
        >
          <Plus className="w-5 h-5" />
          {!isCollapsed && <span>New Conversation</span>}
        </button>
      </div>

      {/* Search */}
      {!isCollapsed && (
        <div className="px-4 pb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search conversations..."
              className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      )}

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto">
        {!isCollapsed && (
          <div className="px-4 pb-2">
            <div className="flex items-center gap-2 text-xs font-medium text-gray-400 uppercase tracking-wider">
              <History className="w-4 h-4" />
              <span>Recent Conversations</span>
            </div>
          </div>
        )}
        
        <div className="space-y-1 px-2">
          <AnimatePresence>
            {filteredConversations.map((conversation) => (
              <motion.div
                key={conversation.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className={`group relative flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                  conversation.id === currentConversationId
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:bg-gray-800'
                } ${isCollapsed ? 'justify-center' : ''}`}
                onClick={() => onSelectConversation(conversation.id)}
              >
                <MessageSquare className="w-4 h-4 flex-shrink-0" />
                {!isCollapsed && (
                  <>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        {conversation.title}
                      </p>
                      <p className="text-xs opacity-70">
                        {conversation.message_count} messages
                      </p>
                    </div>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          // Handle edit conversation title
                        }}
                        className="p-1 text-gray-400 hover:text-white transition-colors"
                      >
                        <Edit3 className="w-3 h-3" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteConversation(conversation.id);
                        }}
                        className="p-1 text-gray-400 hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="border-t border-gray-700 p-4 space-y-2">
        <button
          className={`w-full flex items-center gap-3 p-3 text-gray-300 hover:bg-gray-800 rounded-lg transition-colors ${
            isCollapsed ? 'justify-center' : ''
          }`}
        >
          <Settings className="w-5 h-5" />
          {!isCollapsed && <span>Settings</span>}
        </button>
        
        <button
          className={`w-full flex items-center gap-3 p-3 text-gray-300 hover:bg-gray-800 rounded-lg transition-colors ${
            isCollapsed ? 'justify-center' : ''
          }`}
        >
          <User className="w-5 h-5" />
          {!isCollapsed && <span>Profile</span>}
        </button>
        
        <button
          onClick={onSignOut}
          className={`w-full flex items-center gap-3 p-3 text-gray-300 hover:bg-red-600 hover:text-white rounded-lg transition-colors ${
            isCollapsed ? 'justify-center' : ''
          }`}
        >
          <LogOut className="w-5 h-5" />
          {!isCollapsed && <span>Sign Out</span>}
        </button>
      </div>
    </motion.div>
  );
};