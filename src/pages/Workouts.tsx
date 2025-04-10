
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import WorkoutCard from '@/components/workout/WorkoutCard';

const workoutsData = [
  {
    id: 1,
    title: "Upper Body Strength",
    type: "Strength Training",
    duration: 45,
    exercises: 8,
    imageUrl: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    category: "strength"
  },
  {
    id: 2,
    title: "HIIT Cardio",
    type: "Cardio",
    duration: 30,
    exercises: 12,
    imageUrl: "https://images.unsplash.com/photo-1599058945522-28d584b829f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    category: "cardio"
  },
  {
    id: 3,
    title: "Lower Body Focus",
    type: "Strength Training",
    duration: 50,
    exercises: 10,
    imageUrl: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    category: "strength"
  },
  {
    id: 4,
    title: "Recovery Yoga",
    type: "Flexibility",
    duration: 40,
    exercises: 15,
    imageUrl: "https://images.unsplash.com/photo-1510894347713-fc3ed6fdf539?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    category: "flexibility"
  },
  {
    id: 5,
    title: "Core Crusher",
    type: "Strength Training",
    duration: 25,
    exercises: 8,
    imageUrl: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    category: "strength"
  },
  {
    id: 6,
    title: "Endurance Run",
    type: "Cardio",
    duration: 45,
    exercises: 5,
    imageUrl: "https://images.unsplash.com/photo-1502224562085-639556652f33?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    category: "cardio"
  },
];

// Backup fallback image in case the remote URLs don't load
const fallbackImage = "https://images.unsplash.com/photo-1594737625785-a6cbdabd333c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80";

const Workouts: React.FC = () => {
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredWorkouts = workoutsData.filter(workout => {
    // Apply category filter
    if (filter !== 'all' && workout.category !== filter) {
      return false;
    }
    
    // Apply search query filter
    if (searchQuery && !workout.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    return true;
  });

  // Count workouts by category
  const workoutCounts = {
    all: workoutsData.length,
    strength: workoutsData.filter(w => w.category === 'strength').length,
    cardio: workoutsData.filter(w => w.category === 'cardio').length,
    flexibility: workoutsData.filter(w => w.category === 'flexibility').length
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Workouts</h1>
      
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search workouts..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      <Tabs defaultValue="all" value={filter} onValueChange={setFilter}>
        <div className="flex justify-between items-center overflow-x-auto pb-2">
          <TabsList>
            <TabsTrigger value="all">
              All
              <Badge variant="outline" className="ml-2 bg-primary/10">{workoutCounts.all}</Badge>
            </TabsTrigger>
            <TabsTrigger value="strength">
              Strength
              <Badge variant="outline" className="ml-2 bg-primary/10">{workoutCounts.strength}</Badge>
            </TabsTrigger>
            <TabsTrigger value="cardio">
              Cardio
              <Badge variant="outline" className="ml-2 bg-primary/10">{workoutCounts.cardio}</Badge>
            </TabsTrigger>
            <TabsTrigger value="flexibility">
              Flexibility
              <Badge variant="outline" className="ml-2 bg-primary/10">{workoutCounts.flexibility}</Badge>
            </TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="all" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredWorkouts.length > 0 ? filteredWorkouts.map(workout => (
              <WorkoutCard 
                key={workout.id} 
                {...workout} 
                imageUrl={workout.imageUrl || fallbackImage}
              />
            )) : (
              <div className="col-span-full text-center p-8 border rounded-lg">
                <p className="text-muted-foreground">No workouts found matching your criteria.</p>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="strength" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredWorkouts.length > 0 ? filteredWorkouts.map(workout => (
              <WorkoutCard 
                key={workout.id} 
                {...workout} 
                imageUrl={workout.imageUrl || fallbackImage}
              />
            )) : (
              <div className="col-span-full text-center p-8 border rounded-lg">
                <p className="text-muted-foreground">No strength workouts found matching your criteria.</p>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="cardio" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredWorkouts.length > 0 ? filteredWorkouts.map(workout => (
              <WorkoutCard 
                key={workout.id} 
                {...workout} 
                imageUrl={workout.imageUrl || fallbackImage}
              />
            )) : (
              <div className="col-span-full text-center p-8 border rounded-lg">
                <p className="text-muted-foreground">No cardio workouts found matching your criteria.</p>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="flexibility" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredWorkouts.length > 0 ? filteredWorkouts.map(workout => (
              <WorkoutCard 
                key={workout.id} 
                {...workout} 
                imageUrl={workout.imageUrl || fallbackImage}
              />
            )) : (
              <div className="col-span-full text-center p-8 border rounded-lg">
                <p className="text-muted-foreground">No flexibility workouts found matching your criteria.</p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Workouts;
