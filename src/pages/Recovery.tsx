
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import RecoveryInsights from '@/components/recovery/RecoveryInsights';

const Recovery: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Recovery</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecoveryInsights />
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Next Workout</CardTitle>
              <CardDescription>Based on your recovery status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-4 bg-accent/10 rounded-lg">
                <h3 className="font-medium text-accent">Moderate Intensity</h3>
                <p className="text-sm mt-1">
                  Your body is recovering well, but still has some fatigue. 
                  We recommend moderate intensity today.
                </p>
              </div>
              
              <div className="mt-4">
                <h3 className="font-medium mb-2">Recommended Activities</h3>
                <ul className="space-y-2">
                  <li className="flex items-center py-2 border-b">
                    <div className="w-2 h-2 bg-accent rounded-full mr-2"></div>
                    <span>Upper Body Strength (moderate weights)</span>
                  </li>
                  <li className="flex items-center py-2 border-b">
                    <div className="w-2 h-2 bg-accent rounded-full mr-2"></div>
                    <span>Moderate Cardio (30 min, 130-150 BPM)</span>
                  </li>
                  <li className="flex items-center py-2">
                    <div className="w-2 h-2 bg-accent rounded-full mr-2"></div>
                    <span>Recovery Yoga</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Recovery Tips</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-accent mr-2">•</span>
                  <p className="text-sm">
                    <span className="font-medium">Hydrate consistently</span> - Your wearable indicates slight dehydration.
                  </p>
                </li>
                <li className="flex items-start">
                  <span className="text-accent mr-2">•</span>
                  <p className="text-sm">
                    <span className="font-medium">Consider foam rolling</span> - Target your lower back which shows signs of tension.
                  </p>
                </li>
                <li className="flex items-start">
                  <span className="text-accent mr-2">•</span>
                  <p className="text-sm">
                    <span className="font-medium">Sleep focus</span> - Try going to bed 30 minutes earlier to improve deep sleep.
                  </p>
                </li>
                <li className="flex items-start">
                  <span className="text-accent mr-2">•</span>
                  <p className="text-sm">
                    <span className="font-medium">Nutrition</span> - Increase protein intake today to support muscle recovery.
                  </p>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Recovery;
