
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, X, Check } from 'lucide-react';
import NutritionLog from '@/components/nutrition/NutritionLog';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { toast } from "@/hooks/use-toast";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from '@/components/ui/badge';
import AddMealForm from '@/components/nutrition/AddMealForm';
import RecommendedMeals from '@/components/nutrition/RecommendedMeals';

const Nutrition: React.FC = () => {
  const [showAddMealDialog, setShowAddMealDialog] = useState(false);
  const [nutritionData, setNutritionData] = useState({
    caloriesConsumed: 1450,
    calorieTarget: 2000,
    protein: 85,
    proteinTarget: 120,
    carbs: 150,
    carbsTarget: 200,
    fat: 40,
    fatTarget: 65,
  });

  const handleAddMeal = (mealData: any) => {
    // Update nutrition data
    setNutritionData(prev => ({
      ...prev,
      caloriesConsumed: prev.caloriesConsumed + mealData.calories,
      protein: prev.protein + mealData.protein,
      carbs: prev.carbs + mealData.carbs,
      fat: prev.fat + mealData.fat
    }));

    // Show success toast
    toast({
      title: "Meal added",
      description: `${mealData.name} has been added to your log.`,
    });

    // Close the dialog
    setShowAddMealDialog(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Nutrition</h1>
        <Dialog open={showAddMealDialog} onOpenChange={setShowAddMealDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Meal
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add Meal</DialogTitle>
              <DialogDescription>
                Enter the details for your meal below.
              </DialogDescription>
            </DialogHeader>
            <AddMealForm onAddMeal={handleAddMeal} />
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <NutritionLog 
            caloriesConsumed={nutritionData.caloriesConsumed}
            calorieTarget={nutritionData.calorieTarget}
            protein={nutritionData.protein}
            proteinTarget={nutritionData.proteinTarget}
            carbs={nutritionData.carbs}
            carbsTarget={nutritionData.carbsTarget}
            fat={nutritionData.fat}
            fatTarget={nutritionData.fatTarget}
          />
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Nutrition Insights</CardTitle>
              <CardDescription>Personalized recommendations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Daily Goals</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">•</span>
                    <p className="text-sm">You're currently {nutritionData.calorieTarget - nutritionData.caloriesConsumed} calories below your target. Consider adding a protein-rich snack.</p>
                  </li>
                  <li className="flex items-start">
                    <span className="text-amber-500 mr-2">•</span>
                    <p className="text-sm">Your protein intake is {nutritionData.proteinTarget - nutritionData.protein}g under target, which may slow muscle recovery.</p>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    <p className="text-sm">Good job keeping carbs steady - this helps maintain consistent energy.</p>
                  </li>
                </ul>
              </div>
              
              <div className="pt-2">
                <h3 className="font-medium mb-2">Weekly Patterns</h3>
                <p className="text-sm text-muted-foreground">
                  Based on your last 7 days of nutrition logging:
                </p>
                <ul className="mt-2 space-y-2">
                  <li className="flex items-start">
                    <span className="text-accent mr-2">•</span>
                    <p className="text-sm">You tend to miss protein goals on weekends</p>
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent mr-2">•</span>
                    <p className="text-sm">Your hydration is 20% lower on workout days</p>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <RecommendedMeals />
        </div>
      </div>
    </div>
  );
};

export default Nutrition;
