import React from 'react';
import { Heart } from 'lucide-react';

interface ChatMessageProps {
  message: string;
  isUser: boolean;
  timestamp?: Date;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, isUser, timestamp }) => {
  return (
    <div
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} ${
        isUser ? 'animate-slide-in-right' : 'animate-slide-in-left'
      }`}
    >
      <div
        className={`max-w-[80%] md:max-w-[70%] ${
          isUser
            ? 'bg-primary text-primary-foreground rounded-2xl rounded-br-md'
            : 'bg-sage-muted/60 text-foreground rounded-2xl rounded-bl-md'
        } px-5 py-3 shadow-soft`}
      >
        {!isUser && (
          <div className="flex items-center gap-2 mb-2 text-primary/80">
            <Heart className="w-3 h-3" />
            <span className="text-xs font-medium">Your companion</span>
          </div>
        )}
        <p className="text-sm leading-relaxed whitespace-pre-wrap">{message}</p>
        {timestamp && (
          <p className={`text-xs mt-2 ${isUser ? 'text-primary-foreground/60' : 'text-muted-foreground'}`}>
            {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </p>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
