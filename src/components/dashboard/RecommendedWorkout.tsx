
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dumbbell, Clock, Zap, Calendar } from 'lucide-react';
import ProgressRing from './ProgressRing';
import { useNavigate } from 'react-router-dom';

interface RecommendedWorkoutProps {
  title?: string;
  duration?: number;
  intensity?: 'Low' | 'Medium' | 'High';
  completion?: number;
}

const RecommendedWorkout: React.FC<RecommendedWorkoutProps> = ({
  title = "Upper Body Strength",
  duration = 45,
  intensity = "Medium",
  completion = 0,
}) => {
  const navigate = useNavigate();

  const getIntensityColor = () => {
    switch (intensity) {
      case 'Low': return 'text-green-500';
      case 'Medium': return 'text-amber-500';
      case 'High': return 'text-red-500';
      default: return 'text-amber-500';
    }
  };

  return (
    <Card className="workout-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold flex items-center">
          <Dumbbell className="h-5 w-5 mr-2 text-accent" />
          {title}
        </CardTitle>
        <CardDescription>
          Recommended for today
        </CardDescription>
      </CardHeader>
      <CardContent className="py-2">
        <div className="flex justify-between items-center">
          <div className="space-y-2">
            <div className="flex items-center text-muted-foreground">
              <Clock className="h-4 w-4 mr-1" />
              <span className="text-sm">{duration} minutes</span>
            </div>
            <div className="flex items-center">
              <Zap className={`h-4 w-4 mr-1 ${getIntensityColor()}`} />
              <span className={`text-sm ${getIntensityColor()}`}>{intensity} intensity</span>
            </div>
            <div className="flex items-center text-muted-foreground">
              <Calendar className="h-4 w-4 mr-1" />
              <span className="text-sm">Today</span>
            </div>
          </div>
          <div className="flex-shrink-0">
            <ProgressRing progress={completion} size={80} strokeWidth={8} textClassName="text-lg font-semibold" />
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-2">
        <Button className="w-full" onClick={() => navigate('/workouts/details/1')}>
          Start Workout
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RecommendedWorkout;
