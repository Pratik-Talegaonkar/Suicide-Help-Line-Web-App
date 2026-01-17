import React, { useState, useRef, useEffect } from 'react';
import { Send, LogOut, Leaf } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import ChatMessage from './ChatMessage';
import TypingIndicator from './TypingIndicator';
import QuoteDisplay from './QuoteDisplay';
import VoiceInput from './VoiceInput';
import EmergencyBanner from './EmergencyBanner';
import BreathingCircle from './BreathingCircle';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface ChatInterfaceProps {
  onLogout: () => void;
  userName: string;
}

const WEBHOOK_URL = "https://concise-gorilla-grossly.ngrok-free.app/webhook-test/20019ed0-91f4-4154-9f29-031eeeb0caa4";

const sendMessageToAPI = async (userMessage: string, sessionId: string): Promise<string> => {
  try {
    const res = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: userMessage,
        sessionId,
        source: "lovable-web"
      })
    });
    const data = await res.json();
    return data.reply || "I'm here for you. Please tell me more about how you're feeling.";
  } catch (error) {
    console.error("API Error:", error);
    return "I'm having trouble connecting right now, but I'm still here for you. Please try again in a moment.";
  }
};

const ChatInterface: React.FC<ChatInterfaceProps> = ({ onLogout, userName }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const sessionIdRef = useRef<string>(crypto.randomUUID());

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    // Welcome message
    const welcomeMessage: Message = {
      id: 'welcome',
      text: `Hello ${userName}! 💚 I'm so glad you're here. This is a safe space where you can share anything that's on your mind. I'm here to listen without judgment. How are you feeling today?`,
      isUser: false,
      timestamp: new Date()
    };
    setMessages([welcomeMessage]);
  }, [userName]);

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const messageToSend = inputValue;
    setInputValue('');
    setIsTyping(true);

    // Get response from API
    const reply = await sendMessageToAPI(messageToSend, sessionIdRef.current);
    
    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: reply,
      isUser: false,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, botMessage]);
    setIsTyping(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleVoiceTranscript = (transcript: string) => {
    setInputValue(prev => prev + (prev ? ' ' : '') + transcript);
  };

  return (
    <div className="min-h-screen bg-gradient-calm flex flex-col">
      {/* Header */}
      <header className="bg-card/80 backdrop-blur-md border-b border-border px-4 py-4 sticky top-0 z-10">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-sage/30 rounded-full">
              <Leaf className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="font-serif text-lg text-foreground">Your Safe Space</h1>
              <p className="text-xs text-muted-foreground">Here for you, always</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={onLogout} className="text-muted-foreground">
            <LogOut className="w-4 h-4 mr-2" />
            Leave
          </Button>
        </div>
      </header>

      {/* Quote Display */}
      <div className="bg-cream/50 py-6 px-4 border-b border-border/50">
        <div className="max-w-2xl mx-auto">
          <QuoteDisplay />
        </div>
      </div>

      {/* Chat Messages */}
      <main className="flex-1 overflow-y-auto px-4 py-6">
        <div className="max-w-3xl mx-auto space-y-4">
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 animate-fade-in-up">
              <BreathingCircle size="lg" className="mb-8" />
              <p className="text-muted-foreground text-center">
                Take a moment to breathe...<br />
                I'm here when you're ready to talk.
              </p>
            </div>
          )}

          {messages.map(message => (
            <ChatMessage
              key={message.id}
              message={message.text}
              isUser={message.isUser}
              timestamp={message.timestamp}
            />
          ))}

          {isTyping && <TypingIndicator />}
          <div ref={messagesEndRef} />
        </div>
      </main>

      {/* Input Area */}
      <footer className="bg-card/90 backdrop-blur-md border-t border-border px-4 py-4 sticky bottom-0">
        <div className="max-w-3xl mx-auto space-y-3">
          <div className="flex items-center gap-3">
            <VoiceInput onTranscript={handleVoiceTranscript} disabled={isTyping} />
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Share what's on your mind..."
              disabled={isTyping}
              className="flex-1 bg-background/80"
            />
            <Button
              onClick={handleSend}
              disabled={!inputValue.trim() || isTyping}
              variant="warm"
              size="icon"
              className="rounded-full"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
          <EmergencyBanner compact />
        </div>
      </footer>
    </div>
  );
};

export default ChatInterface;
