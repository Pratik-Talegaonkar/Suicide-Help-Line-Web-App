import React, { useState, useRef, useEffect } from 'react';
import { Send, LogOut, Leaf, Volume2, VolumeX, AlertOctagon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import ChatMessage from './ChatMessage';
import TypingIndicator from './TypingIndicator';
import QuoteDisplay from './QuoteDisplay';
import VoiceInput from './VoiceInput';
import EmergencyBanner from './EmergencyBanner';
import BreathingCircle from './BreathingCircle';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface ChatInterfaceProps {
  onBack: () => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ onBack }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showEmergencyOverlay, setShowEmergencyOverlay] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

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
      text: `Hello friend. 💚 I'm here to listen. This is a safe, anonymous space. You can share whatever is on your mind. How are you feeling right now?`,
      isUser: false,
      timestamp: new Date()
    };
    setMessages([welcomeMessage]);

    // Initial speak (if browser allows autoplay, otherwise requires interaction)
    // speakText(welcomeMessage.text); // Commented out to avoid startling user immediately, can enable if preferred.
  }, []);

  const speakText = (text: string) => {
    if (isMuted || !window.speechSynthesis) return;

    // Cancel current speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    // Try to select a calm voice if available, otherwise default
    // Note: Voices are browser dependent.
    utterance.rate = 0.9; // Slightly slower
    utterance.pitch = 1.0;

    window.speechSynthesis.speak(utterance);
  };

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const messageToSend = inputValue;
    const userMessage: Message = {
      id: Date.now().toString(),
      text: messageToSend,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: messageToSend }),
      });

      if (!response.ok) throw new Error('Network response was not ok');

      const data = await response.json();

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.reply,
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
      speakText(data.reply);

      if (data.isRiskDetected) {
        setShowEmergencyOverlay(true);
        toast({
          title: "Safety Notice",
          description: "We noticed you might be in distress. Please view the emergency resources.",
          variant: "destructive"
        });
      }

    } catch (error) {
      console.error("Chat Error:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'm having trouble connecting right now, but I'm still here. Please try again or check the emergency resources if you need immediate help.",
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
      toast({
        title: "Connection Error",
        description: "Could not connect to the assistant.",
        variant: "destructive"
      });
    } finally {
      setIsTyping(false);
    }
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
    <div className="min-h-screen bg-gradient-calm flex flex-col relative">
      {/* Emergency Overlay if Risk Detected */}
      {showEmergencyOverlay && (
        <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex flex-col items-center justify-center p-4 animate-in fade-in zoom-in duration-300">
          <div className="max-w-md w-full bg-card border-2 border-destructive/50 rounded-2xl p-6 shadow-2xl text-center space-y-6">
            <div className="flex justify-center">
              <AlertOctagon className="h-16 w-16 text-destructive animate-pulse" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">We Care About You</h2>
            <p className="text-muted-foreground">
              It sounds like you're going through a really hard time. Please please reach out to professional support right now.
            </p>
            <EmergencyBanner />
            <Button
              variant="outline"
              onClick={() => setShowEmergencyOverlay(false)}
              className="w-full mt-4"
            >
              I understand, continue chat
            </Button>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="bg-card/80 backdrop-blur-md border-b border-border px-4 py-4 sticky top-0 z-10">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-sage/30 rounded-full">
              <Leaf className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="font-serif text-lg text-foreground">Your Safe Space</h1>
              <p className="text-xs text-muted-foreground">Anonymous Support Companion</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                setIsMuted(!isMuted);
                window.speechSynthesis.cancel();
              }}
              title={isMuted ? "Unmute Voice" : "Mute Voice"}
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-muted-foreground" /> : <Volume2 className="w-4 h-4 text-primary" />}
            </Button>
            <Button variant="ghost" size="sm" onClick={onBack} className="text-muted-foreground">
              <LogOut className="w-4 h-4 mr-2" />
              Exit
            </Button>
          </div>
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
                I'm here when you're ready.
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
