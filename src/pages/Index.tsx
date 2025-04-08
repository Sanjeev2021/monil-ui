
import React, { useState, useEffect } from 'react';
import SpinningOrb from '@/components/SpinningOrb';
import ChatContainer from '@/components/ChatContainer';
import { generateGeminiResponse } from '@/lib/gemini-api';
import { toast } from 'sonner';

interface Message {
  text: string;
  isUser: boolean;
  isLoading?: boolean;
}

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "Hello! I'm Monil, your AI assistant powered by Google Gemini. How can I help you today?",
      isUser: false
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  // The API key is now set as default in the gemini-api.ts file
  const [apiKey, setApiKey] = useState<string>('AIzaSyD5jMB6FmRXKmdk0nvSe7fxYqD1w-x3meo');

  const handleSendMessage = async (message: string) => {
    // Add user message to chat
    const newUserMessage: Message = { text: message, isUser: true };
    setMessages(prev => [...prev, newUserMessage]);
    
    // Add loading message with "..." while waiting
    const loadingMessage: Message = { text: "...", isUser: false, isLoading: true };
    setMessages(prev => [...prev, loadingMessage]);
    
    // Set loading state
    setIsLoading(true);

    try {
      // Get response from Gemini API with default API key
      const response = await generateGeminiResponse(message, apiKey);
      
      // Remove loading message and add bot response
      setMessages(prev => {
        const filtered = prev.filter(msg => !msg.isLoading);
        return [...filtered, { text: response, isUser: false }];
      });
    } catch (error) {
      console.error('Error getting response:', error);
      toast.error("Failed to get a response. Please try again later.");
      
      // Remove loading message on error
      setMessages(prev => prev.filter(msg => !msg.isLoading));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-chatbg text-white flex flex-col md:flex-row">
      {/* Orb Section - 40% on desktop, 100% height on mobile */}
      <div className="w-full md:w-2/5 h-60 md:h-screen bg-black">
        <SpinningOrb isLoading={isLoading} />
      </div>
      
      {/* Chat Section - 60% on desktop */}
      <div className="w-full md:w-3/5 h-[calc(100vh-15rem)] md:h-screen">
        <ChatContainer 
          messages={messages} 
          onSendMessage={handleSendMessage} 
          isLoading={isLoading} 
        />
      </div>
    </div>
  );
};

export default Index;
