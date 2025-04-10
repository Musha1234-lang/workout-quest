
import React from 'react';
import { useForm } from 'react-hook-form';
import { DialogFooter } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface MealFormData {
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

interface AddMealFormProps {
  onAddMeal: (data: MealFormData) => void;
}

const AddMealForm: React.FC<AddMealFormProps> = ({ onAddMeal }) => {
  const form = useForm<MealFormData>({
    defaultValues: {
      name: '',
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
    }
  });

  const handleSubmit = (data: MealFormData) => {
    onAddMeal({
      ...data,
      calories: Number(data.calories),
      protein: Number(data.protein),
      carbs: Number(data.carbs),
      fat: Number(data.fat),
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Meal Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Chicken Salad" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="calories"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Calories (kcal)</FormLabel>
              <FormControl>
                <Input type="number" {...field} onChange={e => field.onChange(Number(e.target.value) || 0)} />
              </FormControl>
            </FormItem>
          )}
        />
        <div className="grid grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="protein"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Protein (g)</FormLabel>
                <FormControl>
                  <Input type="number" {...field} onChange={e => field.onChange(Number(e.target.value) || 0)} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="carbs"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Carbs (g)</FormLabel>
                <FormControl>
                  <Input type="number" {...field} onChange={e => field.onChange(Number(e.target.value) || 0)} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="fat"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fat (g)</FormLabel>
                <FormControl>
                  <Input type="number" {...field} onChange={e => field.onChange(Number(e.target.value) || 0)} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <DialogFooter>
          <Button type="submit">Add Meal</Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default AddMealForm;
