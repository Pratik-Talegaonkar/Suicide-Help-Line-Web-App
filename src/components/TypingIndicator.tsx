import React from 'react';

const TypingIndicator: React.FC = () => {
  return (
    <div className="flex items-center gap-1 p-4 bg-sage-muted/50 rounded-2xl rounded-bl-md w-fit">
      <span className="w-2 h-2 bg-soft-brown/50 rounded-full typing-dot" />
      <span className="w-2 h-2 bg-soft-brown/50 rounded-full typing-dot" />
      <span className="w-2 h-2 bg-soft-brown/50 rounded-full typing-dot" />
    </div>
  );
};

export default TypingIndicator;
