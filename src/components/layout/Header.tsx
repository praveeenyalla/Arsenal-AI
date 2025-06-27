import React from 'react';
import { motion } from 'framer-motion';
import { 
  Zap, 
  Globe, 
  Image, 
  FileText, 
  Users, 
  Briefcase, 
  ChevronDown,
  Bell,
  Menu
} from 'lucide-react';

interface HeaderProps {
  onToggleSidebar: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onToggleSidebar }) => {
  const features = [
    { icon: Globe, label: 'Web Search', description: 'Real-time information' },
    { icon: Image, label: 'Image Analysis', description: 'Visual understanding' },
    { icon: FileText, label: 'Document Processing', description: 'File analysis' },
    { icon: Users, label: 'Team Collaboration', description: 'Shared workspaces' },
    { icon: Briefcase, label: 'Business Intelligence', description: 'Data insights' },
  ];

  return (
    <header className="bg-gray-900/95 backdrop-blur-sm border-b border-gray-700 sticky top-0 z-50">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left Section */}
          <div className="flex items-center gap-4">
            <button
              onClick={onToggleSidebar}
              className="lg:hidden p-2 text-gray-400 hover:text-white transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
            
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Arsenal AI</h1>
                <p className="text-xs text-gray-400">Advanced AI Assistant</p>
              </div>
            </div>
          </div>

          {/* Center Section - Features */}
          <div className="hidden lg:flex items-center gap-6">
            {features.map((feature, index) => (
              <motion.button
                key={index}
                className="flex items-center gap-2 px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-all group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <feature.icon className="w-4 h-4" />
                <span className="text-sm font-medium">{feature.label}</span>
              </motion.button>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            <button className="p-2 text-gray-400 hover:text-white transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full"></span>
            </button>
            
            <div className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-lg">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-300">Arsenal AI 3.0</span>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};