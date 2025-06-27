import React from 'react';
import { motion } from 'framer-motion';
import { User, Zap, Copy, ExternalLink } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { formatDistanceToNow } from 'date-fns';
import type { Message } from '../../types';

interface MessageBubbleProps {
  message: Message;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const copyMessage = () => {
    navigator.clipboard.writeText(message.content);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex gap-4 group ${
        message.role === 'user' ? 'flex-row-reverse' : 'flex-row'
      }`}
    >
      {/* Avatar */}
      <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
        message.role === 'user'
          ? 'bg-gradient-to-r from-blue-500 to-purple-600'
          : 'bg-gradient-to-r from-gray-700 to-gray-600'
      }`}>
        {message.role === 'user' ? (
          <User className="w-5 h-5 text-white" />
        ) : (
          <Zap className="w-5 h-5 text-white" />
        )}
      </div>

      {/* Message Content */}
      <div className={`flex-1 max-w-3xl ${
        message.role === 'user' ? 'text-right' : 'text-left'
      }`}>
        <div className={`inline-block p-4 rounded-2xl ${
          message.role === 'user'
            ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
            : 'bg-gray-800 border border-gray-700 text-gray-100'
        }`}>
          {message.role === 'assistant' ? (
            <div className="prose prose-invert prose-sm max-w-none">
              <ReactMarkdown
                components={{
                  code({ node, inline, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || '');
                    return !inline && match ? (
                      <SyntaxHighlighter
                        style={oneDark}
                        language={match[1]}
                        PreTag="div"
                        className="rounded-lg"
                        {...props}
                      >
                        {String(children).replace(/\n$/, '')}
                      </SyntaxHighlighter>
                    ) : (
                      <code className="bg-gray-700 px-1 py-0.5 rounded text-sm" {...props}>
                        {children}
                      </code>
                    );
                  },
                  a({ href, children }) {
                    return (
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300 inline-flex items-center gap-1"
                      >
                        {children}
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    );
                  },
                }}
              >
                {message.content}
              </ReactMarkdown>
            </div>
          ) : (
            <p className="whitespace-pre-wrap">{message.content}</p>
          )}
        </div>

        {/* Sources */}
        {message.sources && message.sources.length > 0 && (
          <div className="mt-2 text-xs text-gray-400">
            <span className="font-medium">Sources: </span>
            {message.sources.map((source, index) => (
              <a
                key={index}
                href={source}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 mr-2"
              >
                [{index + 1}]
              </a>
            ))}
          </div>
        )}

        {/* Message Actions */}
        <div className="flex items-center gap-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="text-xs text-gray-500">
            {formatDistanceToNow(message.timestamp, { addSuffix: true })}
          </span>
          <button
            onClick={copyMessage}
            className="p-1 text-gray-500 hover:text-gray-300 transition-colors"
            title="Copy message"
          >
            <Copy className="w-3 h-3" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};