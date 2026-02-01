import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Radio } from 'lucide-react';
import Altimeter from '@/components/cockpit/Altimeter';
import Compass from '@/components/cockpit/Compass';
import ArtificialHorizon from '@/components/cockpit/ArtificialHorizon';
import VerticalSpeed from '@/components/cockpit/VerticalSpeed';
import SensorStatus from '@/components/cockpit/SensorStatus';

const Telemetry: React.FC = () => {
  // Simulated telemetry data
  const [altitude, setAltitude] = useState(0);
  const [heading, setHeading] = useState(45);
  const [pitch, setPitch] = useState(0);
  const [roll, setRoll] = useState(0);
  const [verticalSpeed, setVerticalSpeed] = useState(0);
  const [isConnected, setIsConnected] = useState(true);

  // Simulate live data updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate gentle variations
      setAltitude(prev => prev + (Math.random() - 0.48) * 0.5);
      setHeading(prev => (prev + (Math.random() - 0.5) * 2 + 360) % 360);
      setPitch(prev => Math.max(-20, Math.min(20, prev + (Math.random() - 0.5) * 1)));
      setRoll(prev => Math.max(-30, Math.min(30, prev + (Math.random() - 0.5) * 2)));
      setVerticalSpeed(prev => prev * 0.9 + (Math.random() - 0.5) * 0.3);
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const sensors = [
    { name: 'IMU', status: 'active' as const, icon: 'imu' as const },
    { name: 'Barometer', status: 'active' as const, icon: 'barometer' as const },
    { name: 'Temp', status: 'active' as const, icon: 'temperature' as const },
    { name: 'Link', status: isConnected ? 'active' as const : 'error' as const, icon: 'connection' as const },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden touch-control">
      {/* Background grid */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(hsl(var(--primary) / 0.3) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--primary) / 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />
      
      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-4 py-2 border-b border-border/50 bg-card/30 backdrop-blur-sm">
        <Link 
          to="/" 
          className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-xs font-medium">REMOTE</span>
        </Link>
        
        <h1 className="text-sm font-bold tracking-wider text-primary">
          TELEMETRY
        </h1>
        
        <div className="flex items-center gap-2">
          <Radio className={`w-4 h-4 ${isConnected ? 'text-success' : 'text-destructive animate-status-blink'}`} />
          <span className={`text-xs font-medium ${isConnected ? 'text-success' : 'text-destructive'}`}>
            {isConnected ? 'LIVE' : 'NO LINK'}
          </span>
        </div>
      </header>

      {/* Main cockpit layout */}
      <main className="relative z-10 flex h-[calc(100vh-48px)] p-4 gap-4">
        {/* Left side - Vertical Speed */}
        <div className="flex flex-col justify-center">
          <VerticalSpeed rate={verticalSpeed} maxRate={3} />
        </div>

        {/* Center panel - Main instruments */}
        <div className="flex-1 flex items-center justify-center gap-6">
          {/* Artificial Horizon */}
          <div className="flex flex-col items-center gap-2">
            <ArtificialHorizon pitch={pitch} roll={roll} />
            <span className="text-[10px] text-muted-foreground tracking-wider">ATTITUDE</span>
          </div>

          {/* Altimeter - Center */}
          <div className="flex flex-col items-center gap-2">
            <Altimeter altitude={altitude} maxAltitude={50} />
            <span className="text-[10px] text-muted-foreground tracking-wider">RELATIVE ALT</span>
          </div>

          {/* Compass */}
          <div className="flex flex-col items-center gap-2">
            <Compass heading={heading} />
            <span className="text-[10px] text-muted-foreground tracking-wider">HEADING</span>
          </div>
        </div>

        {/* Right side - Sensor Status */}
        <div className="flex flex-col justify-center w-32">
          <SensorStatus sensors={sensors} />
        </div>
      </main>

      {/* Bottom status bar */}
      <footer className="fixed bottom-0 left-0 right-0 z-10 px-4 py-1.5 border-t border-border/50 bg-card/30 backdrop-blur-sm">
        <div className="flex justify-between items-center text-[10px] text-muted-foreground font-mono">
          <span>ALT: {altitude.toFixed(2)}m</span>
          <span>HDG: {heading.toFixed(0)}°</span>
          <span>PITCH: {pitch.toFixed(1)}°</span>
          <span>ROLL: {roll.toFixed(1)}°</span>
          <span>V/S: {verticalSpeed.toFixed(2)}m/s</span>
        </div>
      </footer>
    </div>
  );
};

export default Telemetry;
