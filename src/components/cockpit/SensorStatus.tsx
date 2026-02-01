import React from 'react';
import { Activity, Gauge, Thermometer, Wifi } from 'lucide-react';

interface Sensor {
  name: string;
  status: 'active' | 'warning' | 'error' | 'inactive';
  icon: 'imu' | 'barometer' | 'temperature' | 'connection';
}

interface SensorStatusProps {
  sensors: Sensor[];
}

const iconMap = {
  imu: Activity,
  barometer: Gauge,
  temperature: Thermometer,
  connection: Wifi,
};

const statusColors = {
  active: 'text-success',
  warning: 'text-warning',
  error: 'text-destructive animate-status-blink',
  inactive: 'text-muted-foreground',
};

const statusLabels = {
  active: 'Active',
  warning: 'Warning',
  error: 'Error',
  inactive: 'Inactive',
};

const SensorStatus: React.FC<SensorStatusProps> = ({ sensors }) => {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-[10px] text-muted-foreground font-medium tracking-wider text-center">
        SENSORS
      </span>
      <div className="flex flex-col gap-1.5">
        {sensors.map((sensor) => {
          const Icon = iconMap[sensor.icon];
          return (
            <div 
              key={sensor.name}
              className="flex items-center gap-2 bg-card/50 border border-border rounded px-2 py-1"
            >
              <Icon className={`w-3.5 h-3.5 ${statusColors[sensor.status]}`} />
              <span className="text-xs text-foreground flex-1">{sensor.name}</span>
              <span className={`text-[9px] font-medium ${statusColors[sensor.status]}`}>
                {statusLabels[sensor.status]}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SensorStatus;
