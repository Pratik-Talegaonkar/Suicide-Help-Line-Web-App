import React from 'react';

interface BreathingCircleProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const BreathingCircle: React.FC<BreathingCircleProps> = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32'
  };

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <div
        className={`${sizeClasses[size]} rounded-full bg-gradient-to-br from-sage/40 to-warm-beige/60 animate-breathe`}
      />
      <div
        className={`absolute ${sizeClasses[size]} rounded-full bg-gradient-to-br from-sage/20 to-peach/30 animate-breathe`}
        style={{ animationDelay: '1s' }}
      />
      <div
        className={`absolute ${sizeClasses[size]} rounded-full bg-gradient-to-br from-cream/30 to-sage/20 animate-breathe`}
        style={{ animationDelay: '2s' }}
      />
    </div>
  );
};

export default BreathingCircle;
