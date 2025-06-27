import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { LoginForm } from './components/auth/LoginForm';
import { ChatInterface } from './components/chat/ChatInterface';
import { Sidebar } from './components/sidebar/Sidebar';
import { Header } from './components/layout/Header';
import { getCurrentUser, signOut } from './lib/supabase';
import type { User, Conversation } from './types';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: '1',
      title: 'Welcome to Arsenal AI',
      user_id: 'user1',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      message_count: 1,
    },
  ]);
  const [currentConversationId, setCurrentConversationId] = useState('1');

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const currentUser = await getCurrentUser();
      if (currentUser) {
        setUser({
          id: currentUser.id,
          email: currentUser.email || '',
          name: currentUser.user_metadata?.name || 'User',
          created_at: currentUser.created_at || '',
        });
      }
    } catch (error) {
      console.error('Error checking user:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      setUser(null);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleNewConversation = () => {
    const newConversation: Conversation = {
      id: Date.now().toString(),
      title: 'New Conversation',
      user_id: user?.id || '',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      message_count: 0,
    };
    setConversations(prev => [newConversation, ...prev]);
    setCurrentConversationId(newConversation.id);
  };

  const handleDeleteConversation = (id: string) => {
    setConversations(prev => prev.filter(conv => conv.id !== id));
    if (currentConversationId === id && conversations.length > 1) {
      const remainingConversations = conversations.filter(conv => conv.id !== id);
      setCurrentConversationId(remainingConversations[0]?.id || '');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <motion.div
          className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
      </div>
    );
  }

  if (!user) {
    return <LoginForm onSuccess={checkUser} />;
  }

  return (
    <Router>
      <div className="h-screen bg-gray-900 text-white flex overflow-hidden">
        {/* Sidebar */}
        <AnimatePresence>
          <Sidebar
            conversations={conversations}
            currentConversationId={currentConversationId}
            onNewConversation={handleNewConversation}
            onSelectConversation={setCurrentConversationId}
            onDeleteConversation={handleDeleteConversation}
            onSignOut={handleSignOut}
            isCollapsed={sidebarCollapsed}
            onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
          />
        </AnimatePresence>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)} />
          
          <main className="flex-1 overflow-hidden">
            <Routes>
              <Route
                path="/"
                element={
                  <ChatInterface
                    conversationId={currentConversationId}
                    onNewMessage={(message) => {
                      // Update conversation message count
                      setConversations(prev =>
                        prev.map(conv =>
                          conv.id === currentConversationId
                            ? { ...conv, message_count: conv.message_count + 1, updated_at: new Date().toISOString() }
                            : conv
                        )
                      );
                    }}
                  />
                }
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;