import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, RefreshCw, BookOpen } from 'lucide-react';
import { Message } from '../types';
import { streamMarxResponse } from '../services/geminiService';

export const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'model',
      text: 'Greetings, comrade. I am the digital consciousness of Karl Marx. Let us analyze the world through dialectical materialism. What is your inquiry today?',
      timestamp: Date.now()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    const modelMsgId = (Date.now() + 1).toString();
    const modelMsg: Message = {
      id: modelMsgId,
      role: 'model',
      text: '',
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, modelMsg]);

    const history = messages.map(m => ({ role: m.role, text: m.text }));

    let fullText = '';
    await streamMarxResponse(history, userMsg.text, (chunk) => {
      fullText += chunk;
      setMessages(prev => prev.map(m => 
        m.id === modelMsgId ? { ...m, text: fullText } : m
      ));
    });
    
    setIsTyping(false);
  };

  const handleSuggestion = (text: string) => {
    setInput(text);
  };

  // Function to highlight citations
  const formatText = (text: string) => {
    // Regex to find content like [引自：《Book》] or **【引自...】**
    const citationRegex = /(\*\*【.*?】\*\*|【.*?】|\[引自：.*?\])/g;
    const parts = text.split(citationRegex);
    
    return parts.map((part, index) => {
      if (citationRegex.test(part)) {
        return (
          <span key={index} className="inline-flex items-center gap-1 text-[#CC3333] font-bold text-xs bg-[#CC3333] bg-opacity-10 px-1 rounded cursor-pointer hover:bg-opacity-20 transition-colors border border-[#CC3333] border-opacity-30">
            <BookOpen size={10} />
            {part.replace(/\*\*|\[|\]/g, '')}
          </span>
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  return (
    <div className="flex flex-col h-full bg-[#151A21]">
      {/* Top: Holographic Marx */}
      <div className="h-1/3 min-h-[200px] w-full relative flex items-center justify-center bg-black border-b border-[#333] hologram">
        {/* Placeholder image for Marx */}
        <div className="relative w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden border-2 border-[#CC3333] shadow-[0_0_20px_rgba(204,51,51,0.5)] z-10 bg-[#0F1216]">
            <img 
                src="https://picsum.photos/id/1062/400/400" 
                alt="Marx Avatar" 
                className="w-full h-full object-cover opacity-80 mix-blend-luminosity hover:mix-blend-normal transition-all duration-700 grayscale hover:grayscale-0"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#CC3333] to-transparent opacity-20 mix-blend-overlay"></div>
        </div>
        {/* Tech elements */}
        <div className="absolute top-4 left-4 text-[10px] text-[#CC3333] font-mono animate-pulse">
            SYS.STATUS: ONLINE<br/>
            MODEL: DIALECTIC-V2
        </div>
        <div className="absolute bottom-4 right-4 text-[10px] text-[#CC3333] font-mono">
           LATENCY: 12ms
        </div>
      </div>

      {/* Middle: Chat History */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[85%] rounded-lg p-3 shadow-sm text-sm md:text-base leading-relaxed ${
              msg.role === 'user' 
                ? 'bg-[#CC3333] text-white rounded-br-none' 
                : 'bg-[#1E242C] text-[#E0E0E0] border border-[#333] rounded-bl-none shadow-[0_2px_8px_rgba(0,0,0,0.3)]'
            }`}>
              <div className="font-serif">
                {formatText(msg.text)}
              </div>
              <div className={`text-[10px] mt-1 opacity-50 font-mono ${msg.role === 'user' ? 'text-white' : 'text-gray-400'}`}>
                {new Date(msg.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
              </div>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
             <div className="bg-[#1E242C] p-3 rounded-lg rounded-bl-none border border-[#333] flex items-center gap-1">
                <span className="w-2 h-2 bg-[#CC3333] rounded-full animate-bounce"></span>
                <span className="w-2 h-2 bg-[#CC3333] rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></span>
                <span className="w-2 h-2 bg-[#CC3333] rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></span>
             </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggestions (Sticky if needed, or inline) */}
      {messages.length < 3 && !isTyping && (
        <div className="px-4 py-2 flex gap-2 overflow-x-auto no-scrollbar">
            {['如何理解商品拜物教？', '解释辩证唯物主义', '资本主义的矛盾是什么？'].map((s, i) => (
                <button 
                    key={i}
                    onClick={() => handleSuggestion(s)}
                    className="whitespace-nowrap px-3 py-1 bg-[#1E242C] border border-[#333] hover:border-[#CC3333] text-xs text-gray-300 rounded-full transition-colors"
                >
                    {s}
                </button>
            ))}
        </div>
      )}

      {/* Bottom: Input */}
      <div className="p-4 bg-[#1E242C] border-t border-[#333]">
        <div className="flex items-center gap-2">
            <button className="p-2 text-gray-400 hover:text-[#CC3333] transition-colors">
                <Mic size={20} />
            </button>
            <div className="flex-1 relative">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Enter inquiry for the dialectical engine..."
                    className="w-full bg-[#0F1216] border border-[#333] text-[#E0E0E0] rounded-full pl-4 pr-10 py-3 focus:outline-none focus:border-[#CC3333] focus:ring-1 focus:ring-[#CC3333] font-mono text-sm"
                    disabled={isTyping}
                />
            </div>
            <button 
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                className="p-3 bg-[#CC3333] text-white rounded-full hover:bg-[#A32929] disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-[0_0_10px_rgba(204,51,51,0.4)]"
            >
                {isTyping ? <RefreshCw className="animate-spin" size={20}/> : <Send size={20} />}
            </button>
        </div>
      </div>
    </div>
  );
};
