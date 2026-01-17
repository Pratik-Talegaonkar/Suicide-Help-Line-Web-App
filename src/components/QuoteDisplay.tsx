import React, { useState, useEffect } from 'react';
import { getRandomQuote } from '@/data/quotes';

interface QuoteDisplayProps {
  className?: string;
}

const QuoteDisplay: React.FC<QuoteDisplayProps> = ({ className = '' }) => {
  const [quote, setQuote] = useState(getRandomQuote());
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setQuote(getRandomQuote());
        setIsVisible(true);
      }, 500);
    }, 15000); // Change quote every 15 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`text-center transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'} ${className}`}
    >
      <p className="text-lg md:text-xl text-soft-brown/80 italic font-light leading-relaxed">
        "{quote.quote}"
      </p>
      <p className="mt-3 text-sm text-muted-foreground">
        — {quote.author}
      </p>
    </div>
  );
};

export default QuoteDisplay;
