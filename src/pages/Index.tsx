import React, { useState } from 'react';
import { Leaf, MessageCircle, AlertTriangle, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ChatInterface from '@/components/ChatInterface';
import EmergencyBanner from '@/components/EmergencyBanner';
import BreathingCircle from '@/components/BreathingCircle';

type AppState = 'welcome' | 'chat';

const Index = () => {
  const [appState, setAppState] = useState<AppState>('welcome');

  if (appState === 'chat') {
    return <ChatInterface onBack={() => setAppState('welcome')} />;
  }

  return (
    <div className="min-h-screen bg-gradient-calm">
      <div className="container max-w-4xl mx-auto px-4 py-8 md:py-12">
        {/* Header */}
        <header className="text-center mb-12 animate-fade-in-up">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <BreathingCircle size="md" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Leaf className="w-8 h-8 text-primary" />
              </div>
            </div>
          </div>

          <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-4 leading-tight">
            You Are Not Alone
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto leading-relaxed">
            A gentle space to breathe, feel heard, and find comfort in moments when you need it most.
          </p>
        </header>

        <div className="space-y-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          {/* Main CTA Card */}
          <div className="bg-card/80 backdrop-blur-sm border border-border rounded-3xl p-8 md:p-10 shadow-warm text-center">
            <div className="flex items-center justify-center gap-2 mb-4 text-primary">
              <MessageCircle className="w-5 h-5" />
              <span className="font-medium">Talk to Someone Who Cares</span>
            </div>

            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Our AI companion is here to listen, support, and help you through difficult moments.
              Your conversations are private, anonymous, and never stored.
            </p>

            <Button
              variant="warm"
              size="lg"
              onClick={() => setAppState('chat')}
              className="px-8"
            >
              <Heart className="w-5 h-5 mr-2" />
              Start a Conversation
            </Button>
          </div>

          {/* Important Notices */}
          <div className="space-y-4">
            <div className="bg-peach/50 border border-peach rounded-2xl p-5 flex items-start gap-4">
              <div className="p-2 bg-primary/10 rounded-full shrink-0 mt-0.5">
                <AlertTriangle className="w-4 h-4 text-primary" />
              </div>
              <div>
                <h3 className="font-medium text-foreground mb-1">Important to Know</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  This is an emotional support AI and <strong>not a replacement for professional help</strong>.
                  For clinical concerns, please reach out to a licensed mental health professional.
                </p>
              </div>
            </div>

            <div className="bg-sage-muted/50 border border-sage/40 rounded-2xl p-5 flex items-start gap-4">
              <div className="p-2 bg-sage/30 rounded-full shrink-0 mt-0.5">
                <Heart className="w-4 h-4 text-primary" />
              </div>
              <div>
                <h3 className="font-medium text-foreground mb-1">Need Immediate Help?</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  If you're in crisis or need immediate assistance, please contact your local emergency services
                  or one of the helplines below. You matter, and help is available.
                </p>
              </div>
            </div>
          </div>

          {/* Emergency Helplines */}
          <EmergencyBanner />
        </div>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-border/50 text-center animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <p className="text-sm text-muted-foreground mb-4">
            Remember: It's okay to not be okay. Reaching out is a sign of strength. 💚
          </p>
          <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground/70">
            <Leaf className="w-3 h-3" />
            <span>Your Safe Space • Always Here for You</span>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
