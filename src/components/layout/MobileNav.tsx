
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  BarChart3, 
  Dumbbell, 
  Heart, 
  Home, 
  ListTodo, 
  Menu,
  Settings, 
  Utensils,
  UserCircle,
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  to: string;
  isActive: boolean;
  onClick?: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, to, isActive, onClick }) => {
  return (
    <Link 
      to={to} 
      className="flex items-center py-3 px-4 rounded-lg transition-colors"
      onClick={onClick}
    >
      <span className={cn(
        "mr-3", 
        isActive ? "text-accent" : "text-muted-foreground"
      )}>
        {icon}
      </span>
      <span className={cn(
        "text-sm font-medium", 
        isActive ? "text-accent" : "text-foreground"
      )}>
        {label}
      </span>
    </Link>
  );
};

const MobileNav: React.FC = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  
  const navItems = [
    { icon: <Home size={20} />, label: "Dashboard", to: "/" },
    { icon: <Dumbbell size={20} />, label: "Workouts", to: "/workouts" },
    { icon: <BarChart3 size={20} />, label: "Progress", to: "/progress" },
    { icon: <ListTodo size={20} />, label: "Habits", to: "/habits" },
    { icon: <Utensils size={20} />, label: "Nutrition", to: "/nutrition" },
    { icon: <Heart size={20} />, label: "Recovery", to: "/recovery" },
    { icon: <UserCircle size={20} />, label: "Profile", to: "/profile" },
    { icon: <Settings size={20} />, label: "Settings", to: "/settings" },
  ];
  
  const bottomNavItems = [
    { icon: <Home size={20} />, label: "Home", to: "/" },
    { icon: <Dumbbell size={20} />, label: "Workouts", to: "/workouts" },
    { icon: <BarChart3 size={20} />, label: "Progress", to: "/progress" },
    { icon: <Menu size={20} />, label: "More", to: "#", isMenu: true },
  ];

  return (
    <>
      {/* Bottom Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t z-30 lg:hidden">
        <div className="flex justify-around items-center h-16 max-w-md mx-auto">
          {bottomNavItems.map((item) => {
            const isActive = location.pathname === item.to;
            
            if (item.isMenu) {
              return (
                <Sheet key="menu-sheet" open={isOpen} onOpenChange={setIsOpen}>
                  <SheetTrigger asChild>
                    <button className="flex flex-col items-center justify-center py-1 flex-1">
                      <span className={cn(
                        "p-1 rounded-full", 
                        isOpen ? "text-accent" : "text-muted-foreground"
                      )}>
                        {item.icon}
                      </span>
                      <span className={cn(
                        "text-xs", 
                        isOpen ? "text-accent font-medium" : "text-muted-foreground"
                      )}>
                        {item.label}
                      </span>
                    </button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-[80%] sm:w-[350px] pt-12">
                    <div className="px-2 py-4">
                      <h3 className="text-lg font-medium mb-4">Menu</h3>
                      <div className="space-y-1">
                        {navItems.map((item) => {
                          const isActive = location.pathname === item.to;
                          return (
                            <NavItem 
                              key={item.to}
                              icon={item.icon}
                              label={item.label}
                              to={item.to}
                              isActive={isActive}
                              onClick={() => setIsOpen(false)}
                            />
                          );
                        })}
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              );
            }
            
            return (
              <Link 
                key={item.to}
                to={item.to} 
                className="flex flex-col items-center justify-center py-1 flex-1"
              >
                <span className={cn(
                  "p-1 rounded-full", 
                  isActive ? "text-accent" : "text-muted-foreground"
                )}>
                  {item.icon}
                </span>
                <span className={cn(
                  "text-xs", 
                  isActive ? "text-accent font-medium" : "text-muted-foreground"
                )}>
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default MobileNav;
