
import React from 'react';
import OnboardingForm from '@/components/auth/OnboardingForm';

const Onboarding: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4 bg-gradient-to-b from-accent/5 to-background">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold">Welcome to SmartStride</h1>
        <p className="text-muted-foreground mt-2">Let's personalize your experience</p>
      </div>
      
      <div className="w-full max-w-lg">
        <OnboardingForm />
      </div>
    </div>
  );
};

export default Onboarding;
