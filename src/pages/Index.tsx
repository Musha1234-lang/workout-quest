
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dumbbell, ActivitySquare, Heart, Clock } from 'lucide-react';

import MetricCard from '@/components/dashboard/MetricCard';
import ActivityChart from '@/components/dashboard/ActivityChart';
import RecommendedWorkout from '@/components/dashboard/RecommendedWorkout';
import WearableDeviceStatus from '@/components/dashboard/WearableDeviceStatus';
import HabitTracker from '@/components/habit/HabitTracker';
import { useIsMobile } from '@/hooks/use-mobile';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      navigate('/login');
    } else {
      setIsAuthenticated(true);
    }
  }, [navigate]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl sm:text-3xl font-bold">Dashboard</h1>
      
      {/* Metrics Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        <MetricCard 
          title="Steps" 
          value="8,432" 
          icon={<ActivitySquare size={18} />} 
          trend="up" 
          trendValue="+12% vs avg"
        />
        <MetricCard 
          title="Calories" 
          value="420" 
          icon={<Dumbbell size={18} />} 
          trend="up" 
          trendValue="+8% vs avg"
        />
        <MetricCard 
          title="Heart Rate" 
          value="72 bpm" 
          icon={<Heart size={18} />} 
          trend="down" 
          trendValue="-5 from rest"
        />
        <MetricCard 
          title="Active Time" 
          value="45 min" 
          icon={<Clock size={18} />} 
          trend="neutral" 
          trendValue="On target"
        />
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <ActivityChart />
          
          <Card>
            <CardHeader>
              <CardTitle>Recommended Workouts</CardTitle>
              <CardDescription>
                Based on your fitness goals and recovery status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <RecommendedWorkout 
                  title="Upper Body Strength" 
                  duration={45} 
                  intensity="Medium" 
                  completion={0}
                />
                <RecommendedWorkout 
                  title="HIIT Cardio" 
                  duration={30} 
                  intensity="High" 
                  completion={0}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <WearableDeviceStatus />
          <HabitTracker />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
