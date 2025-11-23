
import React, { useState, useRef, useEffect } from 'react';
import type { PageContent, Manual, ChatMessage } from '../types';
import { SparklesIcon } from './icons/SparklesIcon';

interface AiAssistantProps {
    isOpen: boolean;
    contextPage: PageContent | null;
    manual: Manual | null;
    troubleshoot: (context: string, symptom: string) => Promise<string>;
    onNavigate: (pageId: string) => void;
}

export const AiAssistant: React.FC<AiAssistantProps> = ({ isOpen, contextPage, manual, troubleshoot, onNavigate }) => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(scrollToBottom, [messages]);

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;
        const userMessage: ChatMessage = { sender: 'user', text: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const context = `Manual: ${manual?.title || 'N/A'}\nSection: ${contextPage?.title || 'N/A'}\n\nContent:\n${contextPage?.html.substring(0, 4000) || ''}`;
            const aiResponse = await troubleshoot(context, input);
            setMessages(prev => [...prev, { sender: 'ai', text: aiResponse }]);
        } catch (error) {
            console.error("AI Assistant Error:", error);
            setMessages(prev => [...prev, { sender: 'ai', text: 'Sorry, I encountered an error. Please try again.' }]);
        } finally {
            setIsLoading(false);
        }
    };
    
    if (!isOpen) return null;

    const renderMessageContent = (message: ChatMessage) => {
        if (message.sender === 'user') {
          return <p className="text-sm">{message.text}</p>;
        }
    
        const linkRegex = /\[(.*?)\]\(page-id:(.*?)\)/g;
        const parts = [];
        let lastIndex = 0;
        let match;
    
        while ((match = linkRegex.exec(message.text)) !== null) {
          if (match.index > lastIndex) {
            parts.push(message.text.substring(lastIndex, match.index));
          }
          const linkText = match[1];
          const pageId = match[2];
          parts.push(
            <button
              key={match.index}
              onClick={() => onNavigate(pageId)}
              className="inline font-semibold text-brand-highlight hover:underline focus:outline-none"
            >
              {linkText}
            </button>
          );
          lastIndex = linkRegex.lastIndex;
        }
    
        if (lastIndex < message.text.length) {
          parts.push(message.text.substring(lastIndex));
        }
    
        return (
          <div className="text-sm prose prose-invert max-w-none prose-p:my-2">
            {parts.map((part, i) =>
              typeof part === 'string' ? (
                <span key={i} dangerouslySetInnerHTML={{ __html: part.replace(/\n/g, '<br />') }} />
              ) : (
                part
              )
            )}
          </div>
        );
      };

    return (
        <aside className="w-96 bg-brand-secondary border-l border-brand-accent/50 flex flex-col flex-shrink-0">
            <div className="p-4 border-b border-brand-accent/50">
                <h2 className="text-lg font-bold flex items-center">
                    <SparklesIcon className="h-5 w-5 mr-2 text-brand-highlight" />
                    Troubleshooting Assistant
                </h2>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.length === 0 && (
                     <div className="text-center text-brand-light p-4">
                        <p>Describe a symptom to get started.</p>
                        <p className="text-xs mt-2">e.g., "Engine cranks but won't start" or "Abnormal noise from rear axle"</p>
                    </div>
                )}
                {messages.map((msg, index) => (
                    <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-xs lg:max-w-sm px-4 py-2 rounded-lg ${msg.sender === 'user' ? 'bg-brand-highlight text-brand-primary' : 'bg-brand-accent text-brand-text'}`}>
                            {renderMessageContent(msg)}
                        </div>
                    </div>
                ))}
                 {isLoading && (
                    <div className="flex justify-start">
                         <div className="max-w-xs lg:max-w-sm px-4 py-2 rounded-lg bg-brand-accent text-brand-text">
                            <div className="flex items-center space-x-2">
                                <div className="w-2 h-2 rounded-full bg-brand-light animate-pulse-fast [animation-delay:-0.3s]"></div>
                                <div className="w-2 h-2 rounded-full bg-brand-light animate-pulse-fast [animation-delay:-0.15s]"></div>
                                <div className="w-2 h-2 rounded-full bg-brand-light animate-pulse-fast"></div>
                            </div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>
            <div className="p-4 border-t border-brand-accent/50">
                <div className="relative">
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                handleSend();
                            }
                        }}
                        placeholder="Type symptom here..."
                        rows={2}
                        className="w-full bg-brand-primary border border-brand-accent rounded-lg p-2 pr-10 resize-none focus:outline-none focus:ring-2 focus:ring-brand-highlight text-brand-text"
                        disabled={isLoading}
                    />
                    <button 
                        onClick={handleSend}
                        disabled={isLoading || !input.trim()}
                        className="absolute bottom-2 right-2 p-1 rounded-full bg-brand-highlight disabled:bg-brand-light text-brand-primary hover:bg-yellow-400"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                        </svg>
                    </button>
                </div>
            </div>
        </aside>
    );
};
