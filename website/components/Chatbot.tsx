import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Icon } from './ui/Icon';

interface Message {
  id: string;
  role: 'user' | 'bot';
  text: string;
  sources?: { title: string; uri: string }[];
}

export const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'bot',
      text: 'Greetings. I am Reelin\'s AI assistant. How can I help you optimize your infrastructure today?'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userText = inputValue.trim();
    setInputValue('');
    
    // Add User Message
    const newUserMsg: Message = { id: Date.now().toString(), role: 'user', text: userText };
    setMessages(prev => [...prev, newUserMsg]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      // Construct history for context
      const history = messages.map(m => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: m.text }]
      }));

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [...history, { role: 'user', parts: [{ text: userText }] }],
        config: {
          tools: [{ googleSearch: {} }],
          systemInstruction: "You are the AI assistant for Reelin, a premium AI automation agency. Your tone is professional, concise, futuristic, and helpful. You use Google Search to provide up-to-date information when relevant."
        }
      });

      const generatedText = response.text || "I apologize, I couldn't process that request.";
      
      // Extract grounding sources if available
      const sources: { title: string; uri: string }[] = [];
      const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
      
      if (chunks) {
        chunks.forEach((chunk: any) => {
          if (chunk.web) {
            sources.push({ title: chunk.web.title, uri: chunk.web.uri });
          }
        });
      }

      const newBotMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'bot',
        text: generatedText,
        sources: sources.length > 0 ? sources : undefined
      };

      setMessages(prev => [...prev, newBotMsg]);

    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: 'bot',
        text: "System connection interrupted. Please try again later."
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[60] flex flex-col items-end">
      {/* Chat Window */}
      <div 
        className={`mb-4 w-[350px] md:w-[400px] bg-white/90 dark:bg-black/90 backdrop-blur-xl border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-2xl overflow-hidden transition-all duration-300 origin-bottom-right ${
          isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-10 pointer-events-none'
        }`}
      >
        {/* Header */}
        <div className="bg-zinc-50/50 dark:bg-zinc-900/50 p-4 border-b border-zinc-200 dark:border-zinc-800 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-sm font-semibold text-black dark:text-white">Reelin Intelligence</span>
          </div>
          <button 
            onClick={() => setIsOpen(false)} 
            className="text-zinc-500 hover:text-black dark:hover:text-white transition-colors"
          >
            <Icon name="X" size={16} />
          </button>
        </div>

        {/* Messages */}
        <div className="h-[400px] overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
              <div 
                className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                  msg.role === 'user' 
                    ? 'bg-blue-600 text-white rounded-br-none' 
                    : 'bg-zinc-100 dark:bg-zinc-800 text-black dark:text-zinc-200 rounded-bl-none'
                }`}
              >
                {msg.text}
              </div>
              
              {/* Sources Display */}
              {msg.sources && msg.sources.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2 max-w-[85%]">
                  {msg.sources.map((source, idx) => (
                    <a 
                      key={idx} 
                      href={source.uri} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-2 py-1 rounded-md bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 text-[10px] text-zinc-500 hover:text-blue-500 dark:hover:text-blue-400 transition-colors truncate max-w-full"
                    >
                      <Icon name="Globe" size={10} className="mr-1 flex-shrink-0" />
                      <span className="truncate max-w-[150px]">{source.title}</span>
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
          {isLoading && (
            <div className="flex items-center gap-2 text-zinc-400 text-xs ml-2">
              <div className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce"></div>
              <div className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce delay-100"></div>
              <div className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce delay-200"></div>
              <span className="ml-1">Thinking...</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <form onSubmit={handleSend} className="p-4 border-t border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-black/50">
          <div className="relative">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask about AI strategies..."
              className="w-full bg-zinc-100 dark:bg-zinc-900 border-none rounded-full pl-4 pr-12 py-3 text-sm text-black dark:text-white placeholder-zinc-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
            />
            <button 
              type="submit"
              disabled={!inputValue.trim() || isLoading}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-black dark:bg-white text-white dark:text-black rounded-full disabled:opacity-30 disabled:cursor-not-allowed hover:opacity-80 transition-opacity"
            >
              <Icon name="ArrowRight" size={16} />
            </button>
          </div>
        </form>
      </div>

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center ${
          isOpen 
            ? 'bg-zinc-200 dark:bg-zinc-800 text-black dark:text-white' 
            : 'bg-black dark:bg-white text-white dark:text-black'
        }`}
      >
        <Icon name={isOpen ? "X" : "Zap"} size={24} />
      </button>
    </div>
  );
};
