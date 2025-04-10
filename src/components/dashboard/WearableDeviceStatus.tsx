
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart, Battery, Clock } from 'lucide-react';

interface WearableDeviceStatusProps {
  deviceName?: string;
  batteryLevel?: number;
  lastSync?: string;
  connected?: boolean;
}

const WearableDeviceStatus: React.FC<WearableDeviceStatusProps> = ({
  deviceName = "Demo Wearable",
  batteryLevel = 65,
  lastSync = "Just now",
  connected = true,
}) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">Wearable Device</CardTitle>
          <Badge variant={connected ? "default" : "outline"} className={connected ? "bg-green-500 hover:bg-green-600" : ""}>
            {connected ? "Connected" : "Disconnected"}
          </Badge>
        </div>
        <CardDescription>{deviceName}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between py-1">
          <div className="flex items-center text-muted-foreground">
            <Battery className="h-4 w-4 mr-1" />
            <span>Battery</span>
          </div>
          <div className="font-medium">{batteryLevel}%</div>
        </div>
        <div className="flex items-center justify-between py-1">
          <div className="flex items-center text-muted-foreground">
            <Clock className="h-4 w-4 mr-1" />
            <span>Last sync</span>
          </div>
          <div className="font-medium">{lastSync}</div>
        </div>
        <div className="flex items-center justify-between py-1">
          <div className="flex items-center text-muted-foreground">
            <Heart className="h-4 w-4 mr-1 text-red-500" />
            <span>Heart rate</span>
          </div>
          <div className="flex items-center">
            <span className="font-medium">78</span>
            <span className="text-muted-foreground ml-1">bpm</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WearableDeviceStatus;
