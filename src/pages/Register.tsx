
import React from 'react';
import RegisterForm from '@/components/auth/RegisterForm';
import { Link } from 'react-router-dom';

const Register: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4 bg-gradient-to-b from-accent/5 to-background">
      <div className="mb-8 text-center">
        <div className="flex justify-center mb-4">
          <div className="bg-accent rounded-full p-3">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="text-white">
              <path d="M16 4v16m-2-4H6a2 2 0 01-2-2v-4a2 2 0 012-2h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M20 8h-4v8h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
        <h1 className="text-3xl font-bold">Join SmartStride</h1>
        <p className="text-muted-foreground mt-2">Start your personalized fitness journey</p>
      </div>
      
      <div className="w-full max-w-md">
        <RegisterForm />
      </div>
      
      <div className="mt-8 text-sm text-muted-foreground text-center">
        <p>By signing up, you agree to our <Link to="/terms" className="text-accent hover:underline">Terms of Service</Link> and <Link to="/privacy" className="text-accent hover:underline">Privacy Policy</Link>.</p>
      </div>
    </div>
  );
};

export default Register;
