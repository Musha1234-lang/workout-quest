
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Utensils, Coffee, Apple } from 'lucide-react';

interface NutritionLogProps {
  caloriesConsumed: number;
  calorieTarget: number;
  protein: number;
  proteinTarget: number;
  carbs: number;
  carbsTarget: number;
  fat: number;
  fatTarget: number;
}

const NutritionLog: React.FC<NutritionLogProps> = ({
  caloriesConsumed = 1450,
  calorieTarget = 2000,
  protein = 85,
  proteinTarget = 120,
  carbs = 150,
  carbsTarget = 200,
  fat = 40,
  fatTarget = 65,
}) => {
  const meals = [
    {
      id: 1,
      name: "Breakfast",
      time: "8:00 AM",
      calories: 420,
      icon: <Coffee className="h-4 w-4" />,
      items: ["Oatmeal with berries", "Greek yogurt", "Black coffee"]
    },
    {
      id: 2,
      name: "Lunch",
      time: "12:30 PM",
      calories: 620,
      icon: <Utensils className="h-4 w-4" />,
      items: ["Grilled chicken salad", "Quinoa", "Olive oil dressing"]
    },
    {
      id: 3,
      name: "Snack",
      time: "3:00 PM",
      calories: 210,
      icon: <Apple className="h-4 w-4" />,
      items: ["Apple", "Almonds"]
    },
    {
      id: 4,
      name: "Dinner",
      time: "7:00 PM",
      calories: 0,
      icon: <Utensils className="h-4 w-4" />,
      items: ["Not logged yet"]
    }
  ];

  const calculatePercentage = (value: number, target: number) => {
    return Math.min(Math.round((value / target) * 100), 100);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Nutrition Log</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Calories</span>
            <span className="text-sm">{caloriesConsumed} / {calorieTarget} kcal</span>
          </div>
          <Progress value={calculatePercentage(caloriesConsumed, calorieTarget)} className="h-2" />
        </div>
        
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Protein</span>
              <span className="text-xs">{protein}g</span>
            </div>
            <Progress value={calculatePercentage(protein, proteinTarget)} className="h-1 bg-blue-100" indicatorClassName="bg-blue-500" />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Carbs</span>
              <span className="text-xs">{carbs}g</span>
            </div>
            <Progress value={calculatePercentage(carbs, carbsTarget)} className="h-1 bg-amber-100" indicatorClassName="bg-amber-500" />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Fat</span>
              <span className="text-xs">{fat}g</span>
            </div>
            <Progress value={calculatePercentage(fat, fatTarget)} className="h-1 bg-green-100" indicatorClassName="bg-green-500" />
          </div>
        </div>
        
        <div className="space-y-3 mt-4">
          <h3 className="font-medium">Today's Meals</h3>
          {meals.map((meal) => (
            <div key={meal.id} className="border rounded-lg p-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="bg-muted rounded-full p-1 mr-2">
                    {meal.icon}
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">{meal.name}</h4>
                    <p className="text-xs text-muted-foreground">{meal.time}</p>
                  </div>
                </div>
                <div className="text-sm font-medium">
                  {meal.calories > 0 ? `${meal.calories} kcal` : '-'}
                </div>
              </div>
              <div className="mt-2">
                <ul className="text-xs text-muted-foreground">
                  {meal.items.map((item, index) => (
                    <li key={index} className="list-disc list-inside">{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default NutritionLog;
