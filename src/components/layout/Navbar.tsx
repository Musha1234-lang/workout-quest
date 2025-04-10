import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bell, Menu, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from 'react-router-dom';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

// User data (in a real app, this would come from a database)
const userData = {
  name: "Alex Johnson",
  email: "alex@example.com",
  username: "alexj",
  avatar: "/placeholder.svg"
};

const notifications = [
  { id: 1, title: "New workout recommendation", description: "Try our new HIIT Cardio workout!", time: "Just now" },
  { id: 2, title: "Achievement unlocked", description: "You've earned the Early Bird badge!", time: "2 hours ago" },
  { id: 3, title: "Workout reminder", description: "Don't forget your scheduled workout today", time: "5 hours ago" },
];

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const [notificationCount, setNotificationCount] = useState(3);
  
  const handleNotificationClick = (id: number) => {
    // Mark notification as read
    setNotificationCount(prev => Math.max(0, prev - 1));
    
    toast({
      title: "Notification marked as read",
      description: "You can view all notifications in your profile.",
    });
  };

  const clearAllNotifications = () => {
    setNotificationCount(0);
    toast({
      title: "All notifications cleared",
      description: "Your notification center is now empty.",
    });
  };

  const handleLogout = () => {
    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
    });
    // In a real app, we would clear user session here
    navigate('/login');
  };

  return (
    <nav className="border-b py-3 px-4 bg-background">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center ml-14">  {/* Added ml-14 to align with sidebar */}
          <Link to="/" className="flex items-center">
            <div className="bg-accent rounded-full p-2 mr-2">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white">
                <path d="M16 4v16m-2-4H6a2 2 0 01-2-2v-4a2 2 0 012-2h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M20 8h-4v8h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="text-xl font-bold text-accent">WorkQuest</span>
          </Link>
        </div>

        <div className="flex items-center space-x-4 mr-4">  {/* Added mr-4 for right-side spacing */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell size={20} />
                {notificationCount > 0 && (
                  <span className="absolute top-0 right-0 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs">
                    {notificationCount}
                  </span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-80 p-0">
              <div className="p-4 border-b">
                <div className="flex justify-between items-center">
                  <h4 className="font-semibold">Notifications</h4>
                  {notificationCount > 0 && (
                    <Button variant="ghost" size="sm" onClick={clearAllNotifications}>
                      Clear all
                    </Button>
                  )}
                </div>
              </div>
              <div className="max-h-80 overflow-y-auto">
                {notifications.length > 0 ? (
                  notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className="p-4 border-b last:border-0 cursor-pointer hover:bg-accent/10"
                      onClick={() => handleNotificationClick(notification.id)}
                    >
                      <div className="flex justify-between items-start">
                        <h5 className="font-medium">{notification.title}</h5>
                        <span className="text-xs text-muted-foreground">{notification.time}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{notification.description}</p>
                    </div>
                  ))
                ) : (
                  <div className="p-4 text-center text-muted-foreground">
                    No new notifications
                  </div>
                )}
              </div>
            </PopoverContent>
          </Popover>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <User size={20} />
                <span className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full"></span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <div className="flex items-center gap-2 p-2">
                <div className="rounded-full w-8 h-8 bg-accent flex items-center justify-center text-white font-semibold">
                  {userData.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <DropdownMenuLabel className="p-0">{userData.name}</DropdownMenuLabel>
                  <p className="text-xs text-muted-foreground">{userData.email}</p>
                </div>
              </div>
              <DropdownMenuSeparator />
              <Link to="/profile">
                <DropdownMenuItem>
                  Profile
                </DropdownMenuItem>
              </Link>
              <Link to="/settings">
                <DropdownMenuItem>
                  Settings
                </DropdownMenuItem>
              </Link>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button variant="ghost" size="icon" className="lg:hidden">
            <Menu size={20} />
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
