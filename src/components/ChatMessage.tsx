
import React from 'react';
import { cn } from '@/lib/utils';

interface ChatMessageProps {
  message: string;
  isUser: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, isUser }) => {
  return (
    <div 
      className={cn(
        "mb-4 max-w-[80%] rounded-2xl p-4 animate-fade-in",
        isUser 
          ? "bg-gradient-to-r from-blue-700 to-blue-600 ml-auto text-white" 
          : "bg-gradient-to-r from-slate-800 to-slate-700 mr-auto"
      )}
    >
      <p className="whitespace-pre-wrap">{message}</p>
    </div>
  );
};

export default ChatMessage;
