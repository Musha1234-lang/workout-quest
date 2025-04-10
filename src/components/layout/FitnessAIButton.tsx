
import React, { useState } from 'react';
import { Send, SmileIcon } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { 
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const FitnessAIButton: React.FC = () => {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Hi! I\'m your Fitness AI Assistant. How can I help with your fitness journey today?'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    
    // Add user message
    setMessages(prev => [...prev, { role: 'user', content: inputMessage }]);
    
    // Clear input
    const userMessage = inputMessage;
    setInputMessage('');
    
    // Generate a more contextual response based on the user's input
    setTimeout(() => {
      const lowerCaseMessage = userMessage.toLowerCase();
      let response = '';
      
      // Enhanced response logic with more categories and specific answers
      if (lowerCaseMessage.includes('workout') && lowerCaseMessage.includes('beginner')) {
        response = "For beginners, I recommend starting with 2-3 days of full-body workouts. Focus on compound movements like squats, push-ups, and rows with proper form. Start with bodyweight exercises before adding weights, and aim for 2-3 sets of 10-12 reps.";
      } 
      else if (lowerCaseMessage.includes('workout') && lowerCaseMessage.includes('intermediate')) {
        response = "For intermediate fitness levels, try a 4-day split focusing on upper/lower body or push/pull/legs. Incorporate progressive overload by increasing weights by 2.5-5% when you can complete all sets with good form. Consider adding supersets to increase intensity.";
      }
      else if (lowerCaseMessage.includes('workout') && lowerCaseMessage.includes('advanced')) {
        response = "For advanced trainers, periodization is key. Consider a 5-6 day split with varying intensities (heavy, moderate, light) throughout the week. Incorporate techniques like drop sets, rest-pause, and tempo training. Recovery becomes even more critical at this stage.";
      }
      else if (lowerCaseMessage.includes('workout') || lowerCaseMessage.includes('exercise')) {
        response = "When planning your workout routine, consider your fitness goals, available time, and recovery needs. For general fitness, aim for 3-5 days of exercise with a mix of strength training, cardio, and flexibility work. Remember that consistency beats perfection!";
      } 
      else if (lowerCaseMessage.includes('diet') || lowerCaseMessage.includes('nutrition') || lowerCaseMessage.includes('eat')) {
        response = "A balanced diet should include lean proteins (0.8-1g per pound of bodyweight), complex carbs (fruits, vegetables, whole grains), and healthy fats. Meal timing matters less than total daily intake for most people. Stay hydrated with at least 8 glasses of water daily and adjust based on activity level.";
      } 
      else if (lowerCaseMessage.includes('protein')) {
        response = "For active individuals, aim for 0.8-1g of protein per pound of bodyweight daily. Good sources include lean meats, eggs, dairy, legumes, and plant-based options like tofu. Spacing protein intake throughout the day (20-30g per meal) may optimize muscle protein synthesis.";
      }
      else if (lowerCaseMessage.includes('cardio')) {
        response = "For heart health, aim for 150 minutes of moderate cardio or 75 minutes of vigorous cardio weekly. Options include walking, running, cycling, swimming, or HIIT. For fat loss, a mix of steady-state and interval training tends to be most effective. Always warm up properly before intense cardio sessions.";
      }
      else if (lowerCaseMessage.includes('weight') && lowerCaseMessage.includes('lose')) {
        response = "For sustainable weight loss, aim for a moderate caloric deficit of 300-500 calories daily, which translates to about 0.5-1 pound per week. Focus on increasing protein intake, strength training to preserve muscle, and staying consistent with your habits rather than pursuing quick fixes.";
      } 
      else if (lowerCaseMessage.includes('muscle') && (lowerCaseMessage.includes('gain') || lowerCaseMessage.includes('build'))) {
        response = "Building muscle requires a slight caloric surplus (200-300 calories above maintenance), adequate protein (0.8-1g per pound of bodyweight), progressive overload in your training, and sufficient recovery. Focus on compound movements and ensure you're getting 7-9 hours of quality sleep.";
      }
      else if (lowerCaseMessage.includes('recovery') || lowerCaseMessage.includes('rest') || lowerCaseMessage.includes('sleep')) {
        response = "Recovery is critical for progress! Ensure 7-9 hours of quality sleep, manage stress levels, stay hydrated, and consider active recovery like walking or yoga on rest days. For muscle recovery, proper nutrition and possibly foam rolling or massage can help reduce soreness.";
      } 
      else if (lowerCaseMessage.includes('stretch') || lowerCaseMessage.includes('flexibility')) {
        response = "Incorporate dynamic stretching before workouts and static stretching after. Aim for 2-3 dedicated flexibility sessions weekly, holding stretches for 15-30 seconds. Yoga and mobility work can significantly improve range of motion and may help prevent injuries while enhancing performance.";
      }
      else if (lowerCaseMessage.includes('injur') || lowerCaseMessage.includes('pain')) {
        response = "If you're experiencing pain during exercise, it's important to stop and assess. Minor discomfort is normal, but sharp pain isn't. Follow RICE (Rest, Ice, Compression, Elevation) for minor injuries, and always consult a healthcare professional for persistent issues or severe pain.";
      }
      else if (lowerCaseMessage.includes('hello') || lowerCaseMessage.includes('hi ') || lowerCaseMessage === 'hi') {
        response = "Hello! I'm your Fitness AI Assistant. I can help with workout plans, nutrition advice, recovery strategies, and more. What aspect of your fitness journey would you like to discuss today?";
      }
      else if (lowerCaseMessage.includes('points') || lowerCaseMessage.includes('reward') || lowerCaseMessage.includes('achievement')) {
        response = "In WorkQuest, you earn points by completing workouts, achieving streaks, and hitting fitness milestones. These points unlock rewards like premium workouts, nutrition plans, and partner discounts. Check your Profile page to see all your achievements and available rewards!";
      }
      else if (lowerCaseMessage.includes('level') || lowerCaseMessage.includes('rank')) {
        response = "Your WorkQuest level increases as you earn points and complete achievements. Each level unlocks new workout types and rewards. Consistency is key to leveling up - try to maintain workout streaks and complete your weekly goals!";
      }
      else {
        response = "That's an interesting fitness question! To give you the most helpful answer, could you provide a bit more context? I can assist with workout plans, nutrition strategies, recovery tips, or specific exercise techniques.";
      }
      
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    }, 800);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="default"
          size="icon"
          className="fixed z-40 bottom-20 lg:bottom-6 right-6 h-14 w-14 rounded-full bg-accent hover:bg-accent/90 text-white shadow-lg flex items-center justify-center"
          onClick={() => setIsOpen(true)}
        >
          <SmileIcon size={24} />
        </Button>
      </SheetTrigger>
      <SheetContent side={isMobile ? "bottom" : "right"} className={cn(
        "sm:max-w-md flex flex-col",
        isMobile && "h-[80vh] rounded-t-xl"
      )}>
        <SheetHeader>
          <div className="flex items-center">
            <Avatar className="h-10 w-10 mr-2">
              <AvatarImage src="/placeholder.svg" alt="AI" />
              <AvatarFallback className="bg-accent text-white">AI</AvatarFallback>
            </Avatar>
            <div>
              <SheetTitle>Fitness Coach</SheetTitle>
              <SheetDescription>
                Your personal fitness assistant
              </SheetDescription>
            </div>
          </div>
        </SheetHeader>
        
        <div className="flex-1 overflow-y-auto py-4 pr-4 -mr-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={cn(
                "mb-4 max-w-[80%] rounded-lg p-3",
                message.role === 'user' 
                  ? "bg-primary text-primary-foreground ml-auto" 
                  : "bg-muted/50 mr-auto"
              )}
            >
              {message.content}
            </div>
          ))}
        </div>
        
        <div className="border-t pt-4 mt-auto">
          <div className="flex gap-2">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your fitness question..."
              className="flex-1"
            />
            <Button onClick={handleSendMessage} size="icon">
              <Send className="h-4 w-4" />
            </Button>
          </div>
          
          {messages.length <= 1 && (
            <div className="flex flex-col gap-2 mt-4">
              <Button variant="outline" className="justify-start" 
                onClick={() => {
                  setInputMessage("Can you recommend a workout routine for beginners?");
                  setTimeout(() => handleSendMessage(), 100);
                }}
              >
                <span>Beginner workouts</span>
              </Button>
              <Button variant="outline" className="justify-start"
                onClick={() => {
                  setInputMessage("How do I earn more points?");
                  setTimeout(() => handleSendMessage(), 100);
                }}
              >
                <span>Earn rewards</span>
              </Button>
              <Button variant="outline" className="justify-start"
                onClick={() => {
                  setInputMessage("What should I eat to build muscle?");
                  setTimeout(() => handleSendMessage(), 100);
                }}
              >
                <span>Nutrition advice</span>
              </Button>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default FitnessAIButton;
