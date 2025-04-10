
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dumbbell, Clock, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface WorkoutCardProps {
  id: number;
  title: string;
  type: string;
  duration: number;
  exercises: number;
  imageUrl?: string;
}

const WorkoutCard: React.FC<WorkoutCardProps> = ({
  id,
  title,
  type,
  duration,
  exercises,
  imageUrl,
}) => {
  const navigate = useNavigate();
  
  return (
    <Card className="workout-card overflow-hidden">
      {imageUrl && (
        <div 
          className="h-40 w-full bg-cover bg-center" 
          style={{ backgroundImage: `url(${imageUrl})` }}
        />
      )}
      <CardHeader className="pb-2">
        <div className="flex justify-between">
          <div>
            <CardTitle className="text-lg font-semibold">{title}</CardTitle>
            <CardDescription>{type}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-0">
        <div className="flex justify-between text-sm">
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
            <span>{duration} min</span>
          </div>
          <div className="flex items-center">
            <Dumbbell className="h-4 w-4 mr-1 text-muted-foreground" />
            <span>{exercises} exercises</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-4">
        <Button 
          variant="outline" 
          className="w-full" 
          onClick={() => navigate(`/workouts/details/${id}`)}
        >
          View Details
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default WorkoutCard;
