
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Circle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/components/ui/use-toast';

interface Habit {
  id: number;
  name: string;
  target: number;
  current: number;
  streak: number;
  days: boolean[];
}

const HabitTracker: React.FC = () => {
  const { toast } = useToast();
  const [habits, setHabits] = useState<Habit[]>([
    {
      id: 1,
      name: "Daily Workout",
      target: 7,
      current: 4,
      streak: 4,
      days: [true, true, true, true, false, false, false],
    },
    {
      id: 2,
      name: "Drink Water",
      target: 7,
      current: 6,
      streak: 6,
      days: [true, true, true, true, true, true, false],
    },
    {
      id: 3,
      name: "Track Nutrition",
      target: 7,
      current: 3,
      streak: 1,
      days: [true, false, true, true, false, false, false],
    },
  ]);

  const toggleDay = (habitId: number, dayIndex: number) => {
    setHabits(prevHabits => 
      prevHabits.map(habit => {
        if (habit.id === habitId) {
          const newDays = [...habit.days];
          newDays[dayIndex] = !newDays[dayIndex];
          
          const newCurrent = newDays.filter(Boolean).length;
          let newStreak = 0;
          
          // Calculate new streak (simplified)
          for (let i = newDays.length - 1; i >= 0; i--) {
            if (newDays[i]) {
              newStreak++;
            } else {
              break;
            }
          }
          
          toast({
            title: newDays[dayIndex] ? "Habit completed" : "Habit uncompleted",
            description: `${habit.name} for day ${dayIndex + 1}`,
          });
          
          return {
            ...habit,
            days: newDays,
            current: newCurrent,
            streak: newStreak
          };
        }
        return habit;
      })
    );
  };

  const calculateProgress = (current: number, target: number) => {
    return Math.round((current / target) * 100);
  };

  const daysOfWeek = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Habit Tracker</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {habits.map((habit) => (
          <div key={habit.id} className="space-y-2">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium">{habit.name}</h3>
                <div className="flex items-center text-xs text-muted-foreground">
                  <span className="mr-2">{habit.current}/{habit.target} days</span>
                  <span className="flex items-center">
                    <CheckCircle2 className="h-3 w-3 mr-1 text-accent" /> 
                    {habit.streak} day streak
                  </span>
                </div>
              </div>
            </div>
            
            <Progress 
              value={calculateProgress(habit.current, habit.target)} 
              className="h-2"
            />
            
            <div className="flex justify-between mt-2">
              {habit.days.map((completed, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className={cn(
                    "h-8 w-8 p-0 rounded-full",
                    completed && "bg-accent text-accent-foreground border-accent"
                  )}
                  onClick={() => toggleDay(habit.id, index)}
                >
                  {daysOfWeek[index]}
                </Button>
              ))}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default HabitTracker;
