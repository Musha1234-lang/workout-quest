
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Trophy } from 'lucide-react';
import { toast } from "@/hooks/use-toast";
import { Badge } from '@/components/ui/badge';

interface Meal {
  id: number;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  category: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  completed: boolean;
}

const RecommendedMeals: React.FC = () => {
  const [recommendedMeals, setRecommendedMeals] = useState<Meal[]>([
    {
      id: 1,
      name: "Greek Yogurt with Berries",
      calories: 240,
      protein: 18,
      carbs: 26,
      fat: 6,
      category: 'breakfast',
      completed: false
    },
    {
      id: 2,
      name: "Quinoa Salad with Grilled Chicken",
      calories: 360,
      protein: 28,
      carbs: 38,
      fat: 9,
      category: 'lunch',
      completed: false
    },
    {
      id: 3,
      name: "Protein Smoothie",
      calories: 220,
      protein: 25,
      carbs: 15,
      fat: 5,
      category: 'snack',
      completed: false
    }
  ]);

  const markAsDone = (mealId: number) => {
    setRecommendedMeals(meals => 
      meals.map(meal => 
        meal.id === mealId 
          ? { ...meal, completed: true } 
          : meal
      )
    );
    
    // Show coin animation
    const mealElement = document.getElementById(`meal-${mealId}`);
    if (mealElement) {
      // Create and animate coins
      for (let i = 0; i < 5; i++) {
        const coin = document.createElement('div');
        coin.className = 'absolute z-50 text-yellow-500 animate-bounce';
        coin.innerHTML = '🪙';
        coin.style.position = 'absolute';
        coin.style.top = `${Math.random() * 50}px`;
        coin.style.left = `${Math.random() * 100}px`;
        coin.style.fontSize = '1.5rem';
        
        mealElement.appendChild(coin);
        
        // Remove coin after animation
        setTimeout(() => {
          coin.remove();
        }, 1000);
      }
    }

    // Show success toast with reward
    toast({
      title: "Meal completed! +10 XP",
      description: "Keep up the good work! You're making progress.",
      variant: "success",
    });
  };

  const getCategoryColor = (category: string) => {
    switch(category) {
      case 'breakfast': return 'bg-orange-100 text-orange-800';
      case 'lunch': return 'bg-green-100 text-green-800';
      case 'dinner': return 'bg-blue-100 text-blue-800';
      default: return 'bg-purple-100 text-purple-800';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Trophy className="h-5 w-5 mr-2 text-amber-500" />
          Recommended Meals
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {recommendedMeals.map(meal => (
          <div 
            key={meal.id} 
            id={`meal-${meal.id}`}
            className={`relative p-3 border rounded-lg transition-all ${meal.completed ? 'bg-muted/20' : 'hover:bg-accent/10'}`}
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-medium text-sm">{meal.name}</h4>
                  <Badge variant="outline" className={`text-xs ${getCategoryColor(meal.category)}`}>
                    {meal.category}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-1">{meal.calories} kcal</p>
              </div>
              <Button 
                size="sm" 
                variant={meal.completed ? "success" : "outline"}
                className={meal.completed ? "pointer-events-none" : ""}
                onClick={() => !meal.completed && markAsDone(meal.id)}
                disabled={meal.completed}
              >
                <Check className="h-4 w-4 mr-1" />
                {meal.completed ? "Completed" : "Mark Done"}
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-2 mt-2">
              <div className="text-xs">
                <span className="text-muted-foreground">Protein:</span> {meal.protein}g
              </div>
              <div className="text-xs">
                <span className="text-muted-foreground">Carbs:</span> {meal.carbs}g
              </div>
              <div className="text-xs">
                <span className="text-muted-foreground">Fat:</span> {meal.fat}g
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default RecommendedMeals;
