import { useState, useCallback } from "react";
import { Settings, Plug } from "lucide-react";
import Joystick from "@/components/Joystick";
import SpeedGauge from "@/components/SpeedGauge";
import ControlButton from "@/components/ControlButton";
import ConnectionStatus from "@/components/ConnectionStatus";

const Index = () => {
  const [steering, setSteering] = useState(0);
  const [throttle, setThrottle] = useState(0);
  const [emergencyStop, setEmergencyStop] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<"connected" | "connecting" | "disconnected">("disconnected");

  const handleConnect = useCallback(() => {
    if (connectionStatus === "disconnected") {
      setConnectionStatus("connecting");
      // Simulate connection delay
      setTimeout(() => {
        setConnectionStatus("connected");
      }, 1500);
    } else if (connectionStatus === "connected") {
      setConnectionStatus("disconnected");
    }
  }, [connectionStatus]);

  const handleSteeringMove = useCallback((x: number, _y: number) => {
    setSteering(x);
  }, []);

  const handleThrottleMove = useCallback((_x: number, y: number) => {
    setThrottle(y);
  }, []);

  const speed = Math.abs(throttle) * 100;

  return (
    <div className="fixed inset-0 bg-background bg-gradient-radial overflow-hidden touch-control">
      {/* Subtle grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(hsl(var(--primary)) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Header */}
      <header className="absolute top-0 left-0 right-0 flex items-center justify-between px-4 py-3 z-10">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/20 border border-primary/40 flex items-center justify-center glow-primary-sm">
              <span className="text-xs font-bold text-primary">RC</span>
            </div>
            <span className="text-sm font-semibold text-foreground">Controller</span>
          </div>
        </div>

        <ConnectionStatus status={connectionStatus} deviceName="Arduino Car" />

        <button className="w-8 h-8 rounded-lg bg-secondary border border-border flex items-center justify-center hover:border-primary/50 transition-colors">
          <Settings size={16} className="text-muted-foreground" />
        </button>
      </header>

      {/* Main control area */}
      <main className="h-full flex items-center justify-between px-6 pt-16 pb-4">
        {/* Left joystick - Steering */}
        <div className="flex flex-col items-center">
          <Joystick
            size={150}
            label="Steering"
            onMove={handleSteeringMove}
          />
          <div className="mt-3 text-center">
            <span className="text-lg font-bold tabular-nums text-foreground">
              {steering > 0 ? "R" : steering < 0 ? "L" : "—"} {Math.abs(Math.round(steering * 100))}%
            </span>
          </div>
        </div>

        {/* Center panel */}
        <div className="flex flex-col items-center gap-2">
          {/* Connection status indicator */}
          <ConnectionStatus status={connectionStatus} deviceName="Arduino Car" />

          {/* Speed gauge */}
          <SpeedGauge speed={speed} size={140} />

          {/* Connect button */}
          <ControlButton
            icon={Plug}
            label={connectionStatus === "connected" ? "Disconnect" : connectionStatus === "connecting" ? "Connecting" : "Connect"}
            active={connectionStatus === "connected"}
            onPress={handleConnect}
            size="lg"
          />
        </div>

        {/* Right joystick - Throttle */}
        <div className="flex flex-col items-center">
          <Joystick
            size={150}
            label="Throttle"
            onMove={handleThrottleMove}
            vertical
          />
          <div className="mt-3 text-center">
            <span className="text-lg font-bold tabular-nums text-foreground">
              {throttle > 0 ? "FWD" : throttle < 0 ? "REV" : "—"} {Math.abs(Math.round(throttle * 100))}%
            </span>
          </div>
        </div>
      </main>

      {/* Status bar at bottom */}
      <div className="absolute bottom-3 left-4 right-4 flex justify-between items-center pointer-events-none">
        <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
          <span>STR: {Math.round(steering * 100)}</span>
          <span className="text-border">|</span>
          <span>THR: {Math.round(throttle * 100)}</span>
        </div>
        <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
          <span>BAT: 85%</span>
          <span className="text-border">|</span>
          <span>RSSI: -42dB</span>
        </div>
      </div>
    </div>
  );
};

export default Index;
