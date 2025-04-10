
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const progressData = [
  { date: '1/15', weight: 185, bodyFat: 22, strength: 100, endurance: 70 },
  { date: '1/22', weight: 183, bodyFat: 21.5, strength: 105, endurance: 72 },
  { date: '1/29', weight: 182, bodyFat: 21.2, strength: 110, endurance: 75 },
  { date: '2/5', weight: 180, bodyFat: 20.8, strength: 115, endurance: 77 },
  { date: '2/12', weight: 179, bodyFat: 20.5, strength: 120, endurance: 80 },
  { date: '2/19', weight: 177, bodyFat: 20.0, strength: 125, endurance: 82 },
  { date: '2/26', weight: 176, bodyFat: 19.6, strength: 130, endurance: 85 },
  { date: '3/5', weight: 175, bodyFat: 19.2, strength: 135, endurance: 88 },
];

const workoutData = [
  { month: 'Jan', workouts: 12, minutes: 540, calories: 6200 },
  { month: 'Feb', workouts: 15, minutes: 680, calories: 7800 },
  { month: 'Mar', workouts: 18, minutes: 820, calories: 9400 },
];

const Progress: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Progress Tracking</h1>
      
      <Tabs defaultValue="body">
        <TabsList className="mb-4">
          <TabsTrigger value="body">Body Metrics</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>
        
        {/* Body Metrics Tab */}
        <TabsContent value="body" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Body Composition</CardTitle>
                  <CardDescription>Track changes in your body metrics over time</CardDescription>
                </div>
                <Select defaultValue="8weeks">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Time Range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="4weeks">Last 4 weeks</SelectItem>
                    <SelectItem value="8weeks">Last 8 weeks</SelectItem>
                    <SelectItem value="3months">Last 3 months</SelectItem>
                    <SelectItem value="6months">Last 6 months</SelectItem>
                    <SelectItem value="1year">Last year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={progressData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Line yAxisId="left" type="monotone" dataKey="weight" name="Weight (lbs)" stroke="#8884d8" activeDot={{ r: 8 }} />
                    <Line yAxisId="right" type="monotone" dataKey="bodyFat" name="Body Fat %" stroke="#82ca9d" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="p-4 border rounded-lg">
                  <p className="text-sm text-muted-foreground">Starting Weight</p>
                  <p className="text-2xl font-semibold">{progressData[0].weight} lbs</p>
                  <p className="text-sm text-green-500 mt-1">
                    -{progressData[0].weight - progressData[progressData.length - 1].weight} lbs since start
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <p className="text-sm text-muted-foreground">Current Body Fat</p>
                  <p className="text-2xl font-semibold">{progressData[progressData.length - 1].bodyFat}%</p>
                  <p className="text-sm text-green-500 mt-1">
                    -{progressData[0].bodyFat - progressData[progressData.length - 1].bodyFat}% since start
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Performance Tab */}
        <TabsContent value="performance" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Fitness Performance</CardTitle>
                  <CardDescription>Track your strength and endurance improvements</CardDescription>
                </div>
                <Select defaultValue="8weeks">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Time Range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="4weeks">Last 4 weeks</SelectItem>
                    <SelectItem value="8weeks">Last 8 weeks</SelectItem>
                    <SelectItem value="3months">Last 3 months</SelectItem>
                    <SelectItem value="6months">Last 6 months</SelectItem>
                    <SelectItem value="1year">Last year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={progressData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="strength" name="Strength (1RM)" stroke="#8B5CF6" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="endurance" name="Endurance" stroke="#0EA5E9" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="p-4 border rounded-lg">
                  <p className="text-sm text-muted-foreground">Strength Improvement</p>
                  <p className="text-2xl font-semibold">+{progressData[progressData.length - 1].strength - progressData[0].strength}%</p>
                  <p className="text-sm text-green-500 mt-1">
                    Since {progressData[0].date}
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <p className="text-sm text-muted-foreground">Endurance Improvement</p>
                  <p className="text-2xl font-semibold">+{progressData[progressData.length - 1].endurance - progressData[0].endurance}%</p>
                  <p className="text-sm text-green-500 mt-1">
                    Since {progressData[0].date}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Activity Tab */}
        <TabsContent value="activity" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Workout Activity</CardTitle>
                  <CardDescription>See your workout frequency and intensity</CardDescription>
                </div>
                <Select defaultValue="3months">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Time Range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1month">Last month</SelectItem>
                    <SelectItem value="3months">Last 3 months</SelectItem>
                    <SelectItem value="6months">Last 6 months</SelectItem>
                    <SelectItem value="1year">Last year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={workoutData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="workouts" name="Workouts" fill="#8B5CF6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              
              <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="p-4 border rounded-lg">
                  <p className="text-sm text-muted-foreground">Total Workouts</p>
                  <p className="text-2xl font-semibold">{workoutData.reduce((sum, item) => sum + item.workouts, 0)}</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <p className="text-sm text-muted-foreground">Total Minutes</p>
                  <p className="text-2xl font-semibold">{workoutData.reduce((sum, item) => sum + item.minutes, 0)}</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <p className="text-sm text-muted-foreground">Total Calories</p>
                  <p className="text-2xl font-semibold">{workoutData.reduce((sum, item) => sum + item.calories, 0).toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Progress;
