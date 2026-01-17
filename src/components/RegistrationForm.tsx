import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User, Phone, Heart, Lock, ArrowRight, Check } from 'lucide-react';

interface RegistrationFormProps {
  onComplete: () => void;
}

type Step = 'info' | 'password' | 'otp';

const RegistrationForm: React.FC<RegistrationFormProps> = ({ onComplete }) => {
  const [step, setStep] = useState<Step>('info');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    emergencyContact: '',
    password: '',
    confirmPassword: '',
    otp: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateInfo = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Please enter your name';
    if (!formData.phone.trim() || formData.phone.length < 10) newErrors.phone = 'Please enter a valid phone number';
    if (!formData.emergencyContact.trim() || formData.emergencyContact.length < 10) {
      newErrors.emergencyContact = 'Please enter a valid emergency contact';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePassword = () => {
    const newErrors: Record<string, string> = {};
    if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmitInfo = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateInfo()) {
      setStep('password');
    }
  };

  const handleSubmitPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (validatePassword()) {
      // Simulate sending OTP
      setStep('otp');
    }
  };

  const handleSubmitOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.otp.length === 6) {
      onComplete();
    } else {
      setErrors({ otp: 'Please enter a valid 6-digit OTP' });
    }
  };

  const inputClasses = "bg-background/80 border-warm-beige/50 focus:border-primary/50";

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Progress indicator */}
      <div className="flex items-center justify-center gap-3 mb-8">
        {['info', 'password', 'otp'].map((s, index) => (
          <React.Fragment key={s}>
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                step === s
                  ? 'bg-primary text-primary-foreground shadow-warm'
                  : ['info', 'password', 'otp'].indexOf(step) > index
                  ? 'bg-sage text-soft-brown'
                  : 'bg-muted text-muted-foreground'
              }`}
            >
              {['info', 'password', 'otp'].indexOf(step) > index ? (
                <Check className="w-4 h-4" />
              ) : (
                index + 1
              )}
            </div>
            {index < 2 && (
              <div
                className={`h-0.5 w-8 transition-all duration-300 ${
                  ['info', 'password', 'otp'].indexOf(step) > index
                    ? 'bg-sage'
                    : 'bg-muted'
                }`}
              />
            )}
          </React.Fragment>
        ))}
      </div>

      {step === 'info' && (
        <form onSubmit={handleSubmitInfo} className="space-y-5 animate-fade-in-up">
          <div className="text-center mb-6">
            <h3 className="font-serif text-xl text-foreground mb-2">Let's get to know you</h3>
            <p className="text-sm text-muted-foreground">Your information is kept safe and private</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="name" className="text-soft-brown flex items-center gap-2">
              <User className="w-4 h-4" /> Your Name
            </Label>
            <Input
              id="name"
              placeholder="What should we call you?"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={inputClasses}
            />
            {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="text-soft-brown flex items-center gap-2">
              <Phone className="w-4 h-4" /> Your Phone Number
            </Label>
            <Input
              id="phone"
              type="tel"
              placeholder="Your phone number"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className={inputClasses}
            />
            {errors.phone && <p className="text-sm text-destructive">{errors.phone}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="emergency" className="text-soft-brown flex items-center gap-2">
              <Heart className="w-4 h-4" /> Emergency Contact
            </Label>
            <Input
              id="emergency"
              type="tel"
              placeholder="Phone of someone you trust"
              value={formData.emergencyContact}
              onChange={(e) => setFormData({ ...formData, emergencyContact: e.target.value })}
              className={inputClasses}
            />
            <p className="text-xs text-muted-foreground">Someone who loves you and we can reach in emergencies</p>
            {errors.emergencyContact && <p className="text-sm text-destructive">{errors.emergencyContact}</p>}
          </div>

          <Button type="submit" className="w-full" variant="warm">
            Continue <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </form>
      )}

      {step === 'password' && (
        <form onSubmit={handleSubmitPassword} className="space-y-5 animate-fade-in-up">
          <div className="text-center mb-6">
            <h3 className="font-serif text-xl text-foreground mb-2">Create your password</h3>
            <p className="text-sm text-muted-foreground">Keep your conversations secure</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-soft-brown flex items-center gap-2">
              <Lock className="w-4 h-4" /> Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className={inputClasses}
            />
            {errors.password && <p className="text-sm text-destructive">{errors.password}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-soft-brown flex items-center gap-2">
              <Lock className="w-4 h-4" /> Confirm Password
            </Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              className={inputClasses}
            />
            {errors.confirmPassword && <p className="text-sm text-destructive">{errors.confirmPassword}</p>}
          </div>

          <Button type="submit" className="w-full" variant="warm">
            Continue <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </form>
      )}

      {step === 'otp' && (
        <form onSubmit={handleSubmitOtp} className="space-y-5 animate-fade-in-up">
          <div className="text-center mb-6">
            <h3 className="font-serif text-xl text-foreground mb-2">Verify your number</h3>
            <p className="text-sm text-muted-foreground">
              We've sent a code to {formData.phone}
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="otp" className="text-soft-brown text-center block">
              Enter 6-digit OTP
            </Label>
            <Input
              id="otp"
              type="text"
              maxLength={6}
              placeholder="• • • • • •"
              value={formData.otp}
              onChange={(e) => setFormData({ ...formData, otp: e.target.value.replace(/\D/g, '') })}
              className={`${inputClasses} text-center text-2xl tracking-widest`}
            />
            {errors.otp && <p className="text-sm text-destructive text-center">{errors.otp}</p>}
          </div>

          <p className="text-xs text-center text-muted-foreground">
            For demo purposes, enter any 6 digits
          </p>

          <Button type="submit" className="w-full" variant="warm">
            Verify & Continue <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </form>
      )}
    </div>
  );
};

export default RegistrationForm;
