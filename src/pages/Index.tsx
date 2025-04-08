
import React, { useState, useEffect } from 'react';
import SpinningOrb from '@/components/SpinningOrb';
import ChatContainer from '@/components/ChatContainer';
import ApiKeyInput from '@/components/ApiKeyInput';
import { generateGeminiResponse } from '@/lib/gemini-api';
import { toast } from 'sonner';

interface Message {
  text: string;
  isUser: boolean;
}

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "Hello! I'm your AI assistant powered by Google Gemini. How can I help you today?",
      isUser: false
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState<string>('');
  const [showApiKeyInput, setShowApiKeyInput] = useState(true);

  useEffect(() => {
    const savedApiKey = localStorage.getItem('gemini-api-key');
    if (savedApiKey) {
      setApiKey(savedApiKey);
      setShowApiKeyInput(false);
    }
  }, []);

  const handleApiKeySubmit = (key: string) => {
    setApiKey(key);
    localStorage.setItem('gemini-api-key', key);
    setShowApiKeyInput(false);
  };

  const handleSendMessage = async (message: string) => {
    if (!apiKey) {
      setShowApiKeyInput(true);
      return;
    }

    // Add user message to chat
    const newUserMessage: Message = { text: message, isUser: true };
    setMessages(prev => [...prev, newUserMessage]);
    
    // Set loading state
    setIsLoading(true);

    try {
      // Get response from Gemini API
      const response = await generateGeminiResponse(message, apiKey);
      
      // Add bot response to chat
      const newBotMessage: Message = { text: response, isUser: false };
      setMessages(prev => [...prev, newBotMessage]);
    } catch (error) {
      console.error('Error getting response:', error);
      toast.error("Failed to get a response. Please check your API key or try again later.");
      
      if ((error as Error).message.includes('API key')) {
        setShowApiKeyInput(true);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-chatbg text-white flex flex-col md:flex-row">
      {/* API Key Dialog */}
      <ApiKeyInput 
        onApiKeySubmit={handleApiKeySubmit} 
        isOpen={showApiKeyInput} 
      />
      
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
