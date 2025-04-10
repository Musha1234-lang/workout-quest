
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Battery, Moon, BarChart, Activity } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import ProgressRing from '../dashboard/ProgressRing';

const RecoveryInsights: React.FC = () => {
  const sleepData = {
    duration: 7.2,
    target: 8,
    quality: 85,
    deepSleep: 2.1,
    remSleep: 1.8,
    lightSleep: 3.3
  };
  
  const readinessData = {
    score: 78,
    restingHR: 58,
    hrvScore: 65,
    bodySignals: ['Recovered', 'Ready for moderate training']
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recovery Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Sleep Section */}
          <div>
            <h3 className="font-medium flex items-center mb-4">
              <Moon className="h-4 w-4 mr-2 text-blue-400" />
              Sleep
            </h3>
            
            <div className="flex justify-between mb-2">
              <span className="text-sm text-muted-foreground">Duration</span>
              <div>
                <span className="font-medium">{sleepData.duration}</span>
                <span className="text-sm text-muted-foreground"> / {sleepData.target} hrs</span>
              </div>
            </div>
            <Progress value={(sleepData.duration / sleepData.target) * 100} className="h-2 mb-4" />
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">Deep Sleep</span>
                <span className="text-sm">{sleepData.deepSleep} hrs</span>
              </div>
              <Progress value={(sleepData.deepSleep / sleepData.duration) * 100} className="h-1 bg-blue-100" indicatorClassName="bg-blue-600" />
              
              <div className="flex justify-between">
                <span className="text-sm">REM Sleep</span>
                <span className="text-sm">{sleepData.remSleep} hrs</span>
              </div>
              <Progress value={(sleepData.remSleep / sleepData.duration) * 100} className="h-1 bg-purple-100" indicatorClassName="bg-purple-600" />
              
              <div className="flex justify-between">
                <span className="text-sm">Light Sleep</span>
                <span className="text-sm">{sleepData.lightSleep} hrs</span>
              </div>
              <Progress value={(sleepData.lightSleep / sleepData.duration) * 100} className="h-1 bg-gray-100" indicatorClassName="bg-gray-400" />
            </div>
          </div>
          
          {/* Readiness Section */}
          <div>
            <h3 className="font-medium flex items-center mb-4">
              <Battery className="h-4 w-4 mr-2 text-green-500" />
              Recovery Readiness
            </h3>
            
            <div className="flex items-center justify-center mb-4">
              <ProgressRing 
                progress={readinessData.score} 
                size={120}
                strokeWidth={12}
              />
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Activity className="h-4 w-4 mr-2 text-red-500" />
                  <span className="text-sm">Resting Heart Rate</span>
                </div>
                <span className="font-medium">{readinessData.restingHR} bpm</span>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <BarChart className="h-4 w-4 mr-2 text-purple-500" />
                  <span className="text-sm">HRV Score</span>
                </div>
                <span className="font-medium">{readinessData.hrvScore}</span>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t">
              <h4 className="text-sm font-medium mb-2">Recommendations</h4>
              <ul className="text-sm space-y-1">
                {readinessData.bodySignals.map((signal, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    {signal}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecoveryInsights;
