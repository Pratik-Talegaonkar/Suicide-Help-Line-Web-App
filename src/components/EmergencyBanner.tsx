import React from 'react';
import { Heart, Phone } from 'lucide-react';
import { emergencyHelplines } from '@/data/helplines';

interface EmergencyBannerProps {
  compact?: boolean;
}

const EmergencyBanner: React.FC<EmergencyBannerProps> = ({ compact = false }) => {
  if (compact) {
    return (
      <div className="bg-sage-muted/50 border border-sage/30 rounded-xl p-4">
        <div className="flex items-center gap-2 text-soft-brown">
          <Phone className="w-4 h-4" />
          <span className="text-sm font-medium">
            Need immediate help? Call <strong>988</strong> (USA) or <strong>9152987821</strong> (India)
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card/80 backdrop-blur-sm border border-border rounded-2xl p-6 shadow-soft">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-sage/20 rounded-full">
          <Heart className="w-5 h-5 text-primary" />
        </div>
        <h3 className="font-serif text-lg text-foreground">Emergency Helplines</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {emergencyHelplines.slice(0, 5).map((helpline, index) => (
          <div
            key={index}
            className="bg-background/50 rounded-xl p-4 border border-border/50 transition-all duration-300 hover:shadow-soft"
          >
            <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
              {helpline.country}
            </div>
            <div className="font-medium text-foreground text-sm mb-1">
              {helpline.name}
            </div>
            <a
              href={helpline.number.startsWith('http') ? helpline.number : `tel:${helpline.number.replace(/\D/g, '')}`}
              className="text-primary font-semibold hover:underline"
            >
              {helpline.number}
            </a>
            <div className="text-xs text-muted-foreground mt-1">
              {helpline.available}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmergencyBanner;
