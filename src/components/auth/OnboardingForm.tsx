
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const OnboardingForm: React.FC = () => {
  const [step, setStep] = useState('personal');
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [gender, setGender] = useState('');
  const [activityLevel, setActivityLevel] = useState('');
  const [fitnessGoal, setFitnessGoal] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate saving data
    setTimeout(() => {
      setIsLoading(false);
      
      // Get existing user data
      const userData = JSON.parse(localStorage.getItem('user') || '{}');
      
      // Update with onboarding data
      const updatedUser = {
        ...userData,
        age,
        height,
        weight,
        gender,
        activityLevel,
        fitnessGoal,
        onboardingComplete: true
      };
      
      localStorage.setItem('user', JSON.stringify(updatedUser));
      toast({ 
        title: "Profile complete", 
        description: "Your personalized fitness journey begins now!" 
      });
      navigate('/');
    }, 1000);
  };

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader>
        <CardTitle>Complete Your Profile</CardTitle>
        <CardDescription>
          Tell us about yourself so we can personalize your experience
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="personal" value={step} onValueChange={setStep}>
          <TabsList className="grid grid-cols-3 mb-8">
            <TabsTrigger value="personal">Personal</TabsTrigger>
            <TabsTrigger value="fitness">Fitness</TabsTrigger>
            <TabsTrigger value="goals">Goals</TabsTrigger>
          </TabsList>
          
          <form onSubmit={handleSubmit}>
            <TabsContent value="personal" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  type="number"
                  placeholder="30"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="gender">Gender</Label>
                <RadioGroup value={gender} onValueChange={setGender} className="flex space-x-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="male" id="male" />
                    <Label htmlFor="male">Male</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="female" id="female" />
                    <Label htmlFor="female">Female</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="other" id="other" />
                    <Label htmlFor="other">Other</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="height">Height (cm)</Label>
                  <Input
                    id="height"
                    type="number"
                    placeholder="175"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="weight">Weight (kg)</Label>
                  <Input
                    id="weight"
                    type="number"
                    placeholder="70"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <Button type="button" onClick={() => setStep('fitness')} className="w-full">
                Continue
              </Button>
            </TabsContent>
            
            <TabsContent value="fitness" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="activity-level">Activity Level</Label>
                <Select value={activityLevel} onValueChange={setActivityLevel} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select activity level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sedentary">Sedentary (little or no exercise)</SelectItem>
                    <SelectItem value="light">Light (exercise 1-3 days/week)</SelectItem>
                    <SelectItem value="moderate">Moderate (exercise 3-5 days/week)</SelectItem>
                    <SelectItem value="active">Active (exercise 6-7 days/week)</SelectItem>
                    <SelectItem value="very-active">Very Active (intense exercise daily)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex justify-between mt-6">
                <Button type="button" variant="outline" onClick={() => setStep('personal')}>
                  Back
                </Button>
                <Button type="button" onClick={() => setStep('goals')}>
                  Continue
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="goals" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fitness-goal">Primary Fitness Goal</Label>
                <Select value={fitnessGoal} onValueChange={setFitnessGoal} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your primary goal" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="lose-weight">Lose Weight</SelectItem>
                    <SelectItem value="build-muscle">Build Muscle</SelectItem>
                    <SelectItem value="improve-endurance">Improve Endurance</SelectItem>
                    <SelectItem value="increase-strength">Increase Strength</SelectItem>
                    <SelectItem value="improve-flexibility">Improve Flexibility</SelectItem>
                    <SelectItem value="general-fitness">General Fitness</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex justify-between mt-6">
                <Button type="button" variant="outline" onClick={() => setStep('fitness')}>
                  Back
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Saving..." : "Complete Setup"}
                </Button>
              </div>
            </TabsContent>
          </form>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default OnboardingForm;
