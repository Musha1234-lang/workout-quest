
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, Dumbbell, Target, ArrowLeft, CheckCircle, Play, Star } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface Exercise {
  id: number;
  name: string;
  sets: number;
  reps: number;
  rest: number;
  completed: boolean;
}

const SAMPLE_EXERCISES: Exercise[] = [
  { id: 1, name: "Push-ups", sets: 3, reps: 12, rest: 60, completed: false },
  { id: 2, name: "Pull-ups", sets: 3, reps: 8, rest: 90, completed: false },
  { id: 3, name: "Shoulder Press", sets: 3, reps: 10, rest: 60, completed: false },
  { id: 4, name: "Bicep Curls", sets: 3, reps: 12, rest: 60, completed: false },
  { id: 5, name: "Tricep Dips", sets: 3, reps: 12, rest: 60, completed: false },
];

const WorkoutDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [exercises, setExercises] = useState<Exercise[]>(SAMPLE_EXERCISES);
  const [workoutStarted, setWorkoutStarted] = useState(false);
  const [showReward, setShowReward] = useState(false);
  const [rewardPoints, setRewardPoints] = useState(0);
  
  // This would normally be fetched from an API
  const workout = {
    id: Number(id),
    title: "Upper Body Strength",
    type: "Strength Training",
    duration: 45,
    intensity: "Medium",
    targetMuscles: ["Chest", "Back", "Shoulders", "Arms"],
    description: "A comprehensive upper body workout designed to build strength and muscle definition.",
    exercises: exercises,
  };

  const handleToggleExercise = (exerciseId: number) => {
    setExercises(prev => 
      prev.map(ex => 
        ex.id === exerciseId ? { ...ex, completed: !ex.completed } : ex
      )
    );
    
    // If completing an exercise, maybe show a mini reward
    const exercise = exercises.find(ex => ex.id === exerciseId);
    if (exercise && !exercise.completed) {
      // Small points for completing each exercise
      const points = Math.floor(Math.random() * 15) + 5;
      showMiniReward(points);
    }
  };

  const handleStartWorkout = () => {
    setWorkoutStarted(true);
    toast({
      title: "Workout started",
      description: "Your workout has begun! Follow along with the exercises below.",
    });
  };
  
  const showMiniReward = (points: number) => {
    const smallToast = () => toast({
      title: `+${points} points`,
      description: "Keep up the good work!",
    });
    smallToast();
  };
  
  const showRewardAnimation = (points: number) => {
    setRewardPoints(points);
    setShowReward(true);
    setTimeout(() => setShowReward(false), 3000);
  };

  const completeWorkout = () => {
    // Calculate total points based on exercises completed
    const totalExercises = exercises.length;
    const completedExercises = exercises.filter(ex => ex.completed).length;
    const completionPercentage = (completedExercises / totalExercises) * 100;
    
    // Base points plus bonus for completion percentage
    const basePoints = 50;
    const bonusPoints = Math.floor(completionPercentage * 1.5);
    const totalPoints = basePoints + bonusPoints;
    
    // Show big reward animation
    showRewardAnimation(totalPoints);
    
    toast({
      title: "Workout completed!",
      description: `Great job! You earned ${totalPoints} points for this workout.`,
    });
    
    setTimeout(() => navigate('/workouts'), 3000);
  };

  const allCompleted = exercises.every(ex => ex.completed);
  
  return (
    <div className="space-y-6 relative">
      {/* Reward Animation Overlay */}
      {showReward && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-accent/80 rounded-lg p-8 flex flex-col items-center animate-scale-in text-center">
            <div className="mb-4">
              <div className="relative animate-bounce">
                <Star className="h-20 w-20 text-yellow-400 fill-yellow-400" />
                <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-bold text-white">
                  {rewardPoints}
                </span>
              </div>
            </div>
            <h2 className="text-2xl font-bold mb-2">Awesome Work!</h2>
            <p className="text-lg">You earned {rewardPoints} points</p>
            <div className="mt-4 flex gap-4">
              {Array(5).fill(0).map((_, i) => (
                <div key={i} className="coin" style={{
                  animation: `coin-fall ${0.5 + Math.random()}s ease-out ${i * 0.2}s`,
                }}>
                  <div className="h-8 w-8 bg-yellow-400 rounded-full border-2 border-yellow-500 flex items-center justify-center font-bold text-xs">
                    +{Math.floor(rewardPoints/5)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={() => navigate('/workouts')}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold">{workout.title}</h1>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Overview</CardTitle>
          <CardDescription>{workout.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Duration</p>
                <p className="font-medium">{workout.duration} minutes</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Dumbbell className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Type</p>
                <p className="font-medium">{workout.type}</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2 mb-4">
            <Target className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">Target Muscles</p>
              <div className="flex gap-2 mt-1 flex-wrap">
                {workout.targetMuscles.map((muscle, i) => (
                  <span key={i} className="bg-accent/10 text-accent px-2 py-1 rounded-full text-xs">
                    {muscle}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          <div className="mt-6">
            <h3 className="font-medium mb-3">Exercises</h3>
            <div className="space-y-4">
              {workout.exercises.map((exercise) => (
                <div 
                  key={exercise.id} 
                  className="p-4 rounded-lg border flex justify-between items-center"
                >
                  <div>
                    <h4 className="font-medium">{exercise.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {exercise.sets} sets x {exercise.reps} reps • {exercise.rest}s rest
                    </p>
                  </div>
                  <Button 
                    variant={exercise.completed ? "default" : "outline"} 
                    size="sm"
                    className={exercise.completed ? "bg-green-600 hover:bg-green-700" : ""}
                    onClick={() => handleToggleExercise(exercise.id)}
                    disabled={!workoutStarted}
                  >
                    {exercise.completed ? (
                      <>
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Done
                      </>
                    ) : "Mark Done"}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex gap-2 justify-end">
          {allCompleted ? (
            <Button onClick={completeWorkout}>
              Complete Workout
            </Button>
          ) : (
            <Button onClick={handleStartWorkout} disabled={workoutStarted}>
              <Play className="h-4 w-4 mr-1" />
              Start Workout
            </Button>
          )}
        </CardFooter>
      </Card>
      
      <style>
        {`
        @keyframes coin-fall {
          0% { transform: translateY(-50px) rotate(0deg); opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { transform: translateY(100px) rotate(360deg); opacity: 0; }
        }
        
        .coin {
          position: absolute;
          opacity: 0;
        }
        `}
      </style>
    </div>
  );
};

export default WorkoutDetails;
