
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import HabitTracker from '@/components/habit/HabitTracker';

const Habits: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Habit Tracking</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <HabitTracker />
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Insights</CardTitle>
              <CardDescription>
                How your habits are affecting your fitness journey
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-medium">Consistency Score</h3>
                <div className="flex items-center">
                  <div className="h-2.5 flex-grow bg-gray-200 rounded-full overflow-hidden">
                    <div className="bg-accent h-full rounded-full" style={{ width: "78%" }}></div>
                  </div>
                  <span className="ml-2 font-medium">78%</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Your consistency has improved by 6% in the last 14 days
                </p>
              </div>
              
              <div className="pt-2">
                <h3 className="font-medium mb-2">Recommendations</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="text-accent mr-2">•</span>
                    <p className="text-sm">Try to complete your Daily Workout habit for 3 more days to reach a 7-day streak</p>
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent mr-2">•</span>
                    <p className="text-sm">Your best streak has been with "Drink Water" - keep it up!</p>
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent mr-2">•</span>
                    <p className="text-sm">Consider tracking your nutrition daily for better results</p>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Habits;
