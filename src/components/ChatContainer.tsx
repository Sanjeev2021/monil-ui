
import React, { useEffect, useRef } from 'react';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';

interface Message {
  text: string;
  isUser: boolean;
  isLoading?: boolean;
}

interface ChatContainerProps {
  messages: Message[];
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

const ChatContainer: React.FC<ChatContainerProps> = ({ messages, onSendMessage, isLoading }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="h-full flex flex-col">
      <div className="flex-grow overflow-y-auto p-4 message-container">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <ChatMessage 
              key={index} 
              message={message.text} 
              isUser={message.isUser} 
              isLoading={message.isLoading}
            />
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <div className="p-4 bg-slate-900/50 border-t border-slate-800">
        <ChatInput onSendMessage={onSendMessage} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default ChatContainer;
