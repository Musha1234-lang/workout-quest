
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  BarChart3, 
  Dumbbell, 
  Heart, 
  Home, 
  ListTodo, 
  Settings, 
  Utensils,
  UserCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  to: string;
  isActive: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, label, to, isActive }) => {
  return (
    <Link 
      to={to} 
      className={cn(
        "flex items-center space-x-3 px-3 py-2 rounded-lg transition-all",
        isActive 
          ? "bg-accent text-accent-foreground" 
          : "hover:bg-accent/10 text-muted-foreground hover:text-foreground"
      )}
    >
      <span className={cn("", isActive ? "" : "text-muted-foreground")}>{icon}</span>
      <span className="font-medium">{label}</span>
    </Link>
  );
};

const Sidebar: React.FC = () => {
  const location = useLocation();
  
  const sidebarItems = [
    { icon: <Home size={20} />, label: "Dashboard", to: "/" },
    { icon: <Dumbbell size={20} />, label: "Workouts", to: "/workouts" },
    { icon: <BarChart3 size={20} />, label: "Progress", to: "/progress" },
    { icon: <ListTodo size={20} />, label: "Habits", to: "/habits" },
    { icon: <Utensils size={20} />, label: "Nutrition", to: "/nutrition" },
    { icon: <Heart size={20} />, label: "Recovery", to: "/recovery" },
    { icon: <UserCircle size={20} />, label: "Profile", to: "/profile" },
    { icon: <Settings size={20} />, label: "Settings", to: "/settings" },
  ];
  
  return (
    <div className="w-64 border-r h-[calc(100vh-60px)] p-4 hidden lg:block">
      <div className="space-y-1">
        {sidebarItems.map((item) => (
          <SidebarItem
            key={item.to}
            icon={item.icon}
            label={item.label}
            to={item.to}
            isActive={location.pathname === item.to}
          />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
