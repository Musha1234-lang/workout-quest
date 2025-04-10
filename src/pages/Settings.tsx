
import React, { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription,
  CardFooter
} from "@/components/ui/card";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { 
  User, 
  Bell, 
  Shield, 
  Smartphone, 
  Save, 
  Check,
  Settings as SettingsIcon
} from "lucide-react";

// User data (in a real app, this would come from a database)
const userData = {
  name: "Alex Johnson",
  email: "alex@example.com",
  username: "alexj",
  phone: "+1 (555) 123-4567",
  avatar: "/placeholder.svg",
  preferences: {
    notifications: {
      email: true,
      push: true,
      weeklyReport: true,
      workoutReminders: true
    },
    privacy: {
      profileVisibility: "public",
      showWorkoutHistory: true,
      shareAchievements: true
    }
  }
};

const Settings = () => {
  const { toast } = useToast();
  const [user, setUser] = useState(userData);
  const [loading, setLoading] = useState(false);

  const handleChange = (field: string, value: string) => {
    setUser({ ...user, [field]: value });
  };

  const handleToggleNotification = (field: string) => {
    setUser({
      ...user,
      preferences: {
        ...user.preferences,
        notifications: {
          ...user.preferences.notifications,
          [field]: !user.preferences.notifications[field as keyof typeof user.preferences.notifications]
        }
      }
    });
  };

  const handleTogglePrivacy = (field: string) => {
    setUser({
      ...user,
      preferences: {
        ...user.preferences,
        privacy: {
          ...user.preferences.privacy,
          [field]: !user.preferences.privacy[field as keyof typeof user.preferences.privacy]
        }
      }
    });
  };

  const handleSetProfileVisibility = (visibility: string) => {
    setUser({
      ...user,
      preferences: {
        ...user.preferences,
        privacy: {
          ...user.preferences.privacy,
          profileVisibility: visibility
        }
      }
    });
  };

  const handleSaveChanges = () => {
    setLoading(true);
    // Simulate API request
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Settings saved",
        description: "Your profile settings have been updated successfully.",
      });
    }, 800);
  };

  return (
    <div className="container py-8 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <SettingsIcon className="w-6 h-6" />
          Settings
        </h1>
        <Button onClick={handleSaveChanges} disabled={loading}>
          {loading ? "Saving..." : "Save Changes"}
        </Button>
      </div>
      
      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList>
          <TabsTrigger value="profile" className="flex items-center gap-1">
            <User className="w-4 h-4" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-1">
            <Bell className="w-4 h-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="privacy" className="flex items-center gap-1">
            <Shield className="w-4 h-4" />
            Privacy
          </TabsTrigger>
          <TabsTrigger value="devices" className="flex items-center gap-1">
            <Smartphone className="w-4 h-4" />
            Connected Devices
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your personal information and how it appears on your profile</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm text-muted-foreground">Upload a new profile picture</p>
                  <Button variant="outline" size="sm" className="mt-2">
                    Choose Image
                  </Button>
                </div>
              </div>
              
              <Separator />
              
              <div className="grid gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Full Name
                    </label>
                    <Input 
                      id="name" 
                      value={user.name} 
                      onChange={(e) => handleChange('name', e.target.value)} 
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="username" className="text-sm font-medium">
                      Username
                    </label>
                    <Input 
                      id="username" 
                      value={user.username} 
                      onChange={(e) => handleChange('username', e.target.value)} 
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email Address
                    </label>
                    <Input 
                      id="email" 
                      type="email" 
                      value={user.email} 
                      onChange={(e) => handleChange('email', e.target.value)} 
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-medium">
                      Phone Number
                    </label>
                    <Input 
                      id="phone" 
                      type="tel" 
                      value={user.phone} 
                      onChange={(e) => handleChange('phone', e.target.value)} 
                    />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={handleSaveChanges} disabled={loading}>
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full"></span>
                    Saving...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Save className="w-4 h-4" />
                    Save Changes
                  </span>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Control which notifications you receive from WorkQuest</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Email Notifications</h3>
                    <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                  </div>
                  <Button 
                    variant={user.preferences.notifications.email ? "default" : "outline"}
                    onClick={() => handleToggleNotification('email')}
                    className={user.preferences.notifications.email ? "bg-green-600 hover:bg-green-700" : ""}
                  >
                    {user.preferences.notifications.email ? (
                      <span className="flex items-center gap-1">
                        <Check className="w-4 h-4" />
                        Enabled
                      </span>
                    ) : "Enable"}
                  </Button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Push Notifications</h3>
                    <p className="text-sm text-muted-foreground">Receive notifications on your device</p>
                  </div>
                  <Button 
                    variant={user.preferences.notifications.push ? "default" : "outline"}
                    onClick={() => handleToggleNotification('push')}
                    className={user.preferences.notifications.push ? "bg-green-600 hover:bg-green-700" : ""}
                  >
                    {user.preferences.notifications.push ? (
                      <span className="flex items-center gap-1">
                        <Check className="w-4 h-4" />
                        Enabled
                      </span>
                    ) : "Enable"}
                  </Button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Weekly Report</h3>
                    <p className="text-sm text-muted-foreground">Receive a weekly summary of your activities</p>
                  </div>
                  <Button 
                    variant={user.preferences.notifications.weeklyReport ? "default" : "outline"}
                    onClick={() => handleToggleNotification('weeklyReport')}
                    className={user.preferences.notifications.weeklyReport ? "bg-green-600 hover:bg-green-700" : ""}
                  >
                    {user.preferences.notifications.weeklyReport ? (
                      <span className="flex items-center gap-1">
                        <Check className="w-4 h-4" />
                        Enabled
                      </span>
                    ) : "Enable"}
                  </Button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Workout Reminders</h3>
                    <p className="text-sm text-muted-foreground">Get reminded about scheduled workouts</p>
                  </div>
                  <Button 
                    variant={user.preferences.notifications.workoutReminders ? "default" : "outline"}
                    onClick={() => handleToggleNotification('workoutReminders')}
                    className={user.preferences.notifications.workoutReminders ? "bg-green-600 hover:bg-green-700" : ""}
                  >
                    {user.preferences.notifications.workoutReminders ? (
                      <span className="flex items-center gap-1">
                        <Check className="w-4 h-4" />
                        Enabled
                      </span>
                    ) : "Enable"}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="privacy">
          <Card>
            <CardHeader>
              <CardTitle>Privacy Settings</CardTitle>
              <CardDescription>Control how others see your profile and activity</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium">Profile Visibility</h3>
                  <p className="text-sm text-muted-foreground">Control who can see your profile</p>
                  <div className="flex gap-2 mt-2">
                    <Button 
                      size="sm" 
                      variant={user.preferences.privacy.profileVisibility === 'public' ? 'default' : 'outline'}
                      onClick={() => handleSetProfileVisibility('public')}
                      className={user.preferences.privacy.profileVisibility === 'public' ? "bg-primary" : ""}
                    >
                      Public
                    </Button>
                    <Button 
                      size="sm" 
                      variant={user.preferences.privacy.profileVisibility === 'friends' ? 'default' : 'outline'}
                      onClick={() => handleSetProfileVisibility('friends')}
                      className={user.preferences.privacy.profileVisibility === 'friends' ? "bg-primary" : ""}
                    >
                      Friends Only
                    </Button>
                    <Button 
                      size="sm" 
                      variant={user.preferences.privacy.profileVisibility === 'private' ? 'default' : 'outline'}
                      onClick={() => handleSetProfileVisibility('private')}
                      className={user.preferences.privacy.profileVisibility === 'private' ? "bg-primary" : ""}
                    >
                      Private
                    </Button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Show Workout History</h3>
                    <p className="text-sm text-muted-foreground">Allow others to see your past workouts</p>
                  </div>
                  <Button 
                    variant={user.preferences.privacy.showWorkoutHistory ? "default" : "outline"}
                    onClick={() => handleTogglePrivacy('showWorkoutHistory')}
                    className={user.preferences.privacy.showWorkoutHistory ? "bg-green-600 hover:bg-green-700" : ""}
                  >
                    {user.preferences.privacy.showWorkoutHistory ? (
                      <span className="flex items-center gap-1">
                        <Check className="w-4 h-4" />
                        Visible
                      </span>
                    ) : "Hidden"}
                  </Button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Share Achievements</h3>
                    <p className="text-sm text-muted-foreground">Automatically share new achievements</p>
                  </div>
                  <Button 
                    variant={user.preferences.privacy.shareAchievements ? "default" : "outline"}
                    onClick={() => handleTogglePrivacy('shareAchievements')}
                    className={user.preferences.privacy.shareAchievements ? "bg-green-600 hover:bg-green-700" : ""}
                  >
                    {user.preferences.privacy.shareAchievements ? (
                      <span className="flex items-center gap-1">
                        <Check className="w-4 h-4" />
                        Enabled
                      </span>
                    ) : "Disabled"}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="devices">
          <Card>
            <CardHeader>
              <CardTitle>Connected Devices</CardTitle>
              <CardDescription>Manage devices that sync with your WorkQuest account</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-md">
                  <div className="flex items-center gap-3">
                    <div className="bg-green-100 p-2 rounded-full">
                      <Smartphone className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">iPhone 13</h3>
                      <p className="text-sm text-muted-foreground">Last synced: Today, 10:24 AM</p>
                    </div>
                  </div>
                  <Badge variant="success">Connected</Badge>
                </div>
                
                <div className="flex items-center justify-between p-4 border rounded-md">
                  <div className="flex items-center gap-3">
                    <div className="bg-green-100 p-2 rounded-full">
                      <svg className="h-5 w-5 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="5" y="2" width="14" height="20" rx="2" />
                        <path d="M12 18h.01" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium">Fitness Watch Pro</h3>
                      <p className="text-sm text-muted-foreground">Last synced: Today, 9:15 AM</p>
                    </div>
                  </div>
                  <Badge variant="success">Connected</Badge>
                </div>
                
                <Button variant="outline" className="w-full">
                  Connect New Device
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
