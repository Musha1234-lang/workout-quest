
import React from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { CircleDashed, Medal, Star, Trophy, Award, Crown, Dumbbell, Flame, Zap } from "lucide-react";

// User data (in a real app, this would come from a database)
const userData = {
  name: "Alex Johnson",
  email: "alex@example.com",
  username: "alexj",
  avatar: "/placeholder.svg"
};

const Profile = () => {
  const achievements = [
    { 
      id: 1, 
      title: "Early Bird", 
      description: "Completed 5 workouts before 8am", 
      icon: <Flame className="h-8 w-8 text-orange-500" />,
      date: "Mar 15, 2025",
      progress: 100
    },
    { 
      id: 2, 
      title: "Strength Master", 
      description: "Lifted 5000 lbs total in one session", 
      icon: <Dumbbell className="h-8 w-8 text-blue-500" />,
      date: "Feb 28, 2025",
      progress: 100
    },
    { 
      id: 3, 
      title: "Consistency King", 
      description: "Completed workouts 5 days in a row", 
      icon: <Crown className="h-8 w-8 text-yellow-500" />,
      date: "Mar 10, 2025",
      progress: 100
    },
    { 
      id: 4, 
      title: "Marathon Ready", 
      description: "Ran a total of 26.2 miles in a week", 
      icon: <Zap className="h-8 w-8 text-green-500" />,
      date: null,
      progress: 62
    },
  ];

  const rewards = [
    {
      id: 1,
      title: "Premium Workout Plan",
      description: "Unlocked for consistent weekly workouts",
      points: 500,
      icon: <Star className="h-6 w-6 text-yellow-500" />
    },
    {
      id: 2,
      title: "7-Day Nutrition Guide",
      description: "Earned for logging meals for 2 weeks",
      points: 350,
      icon: <Medal className="h-6 w-6 text-purple-500" />
    },
    {
      id: 3,
      title: "10% Off Partner Store",
      description: "Special discount from our fitness partners",
      points: 1000,
      icon: <Trophy className="h-6 w-6 text-amber-500" />
    },
  ];

  return (
    <div className="container py-8">
      {/* Profile Header */}
      <Card className="mb-6">
        <CardHeader className="pb-4">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <Avatar className="h-24 w-24">
              <AvatarImage src={userData.avatar} alt="Profile" />
              <AvatarFallback>{userData.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div className="text-center md:text-left">
              <CardTitle className="text-2xl">{userData.name}</CardTitle>
              <p className="text-muted-foreground">@{userData.username}</p>
              <div className="flex flex-wrap gap-2 mt-3 justify-center md:justify-start">
                <Badge variant="secondary">Fitness Enthusiast</Badge>
                <Badge variant="outline">Level 8</Badge>
                <Badge className="bg-accent text-accent-foreground">1,250 Points</Badge>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Workouts Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">27</div>
            <p className="text-xs text-muted-foreground">+3 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Current Streak</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5 days</div>
            <p className="text-xs text-muted-foreground">Personal best: 14 days</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Points This Month</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">580</div>
            <p className="text-xs text-muted-foreground">Rank: Silver</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs for Achievements and Rewards */}
      <Tabs defaultValue="achievements" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="rewards">Rewards</TabsTrigger>
        </TabsList>

        <TabsContent value="achievements">
          <Card>
            <CardHeader>
              <CardTitle>Your Achievements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {achievements.map((achievement) => (
                  <div key={achievement.id} className="border rounded-lg p-4 flex gap-4">
                    <div className="flex-shrink-0 flex items-center justify-center">
                      {achievement.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{achievement.title}</h3>
                      <p className="text-sm text-muted-foreground">{achievement.description}</p>
                      {achievement.date ? (
                        <p className="text-xs mt-1 text-green-600">Unlocked on {achievement.date}</p>
                      ) : (
                        <div className="mt-2">
                          <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-primary" 
                              style={{ width: `${achievement.progress}%` }}
                            />
                          </div>
                          <p className="text-xs mt-1">{achievement.progress}% complete</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rewards">
          <Card>
            <CardHeader>
              <CardTitle>Your Rewards</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {rewards.map((reward) => (
                  <div key={reward.id} className="border rounded-lg p-4 flex gap-4">
                    <div className="flex-shrink-0 flex items-center justify-center">
                      {reward.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{reward.title}</h3>
                      <p className="text-sm text-muted-foreground">{reward.description}</p>
                      <p className="text-xs mt-1 text-amber-600">{reward.points} points earned</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile;
