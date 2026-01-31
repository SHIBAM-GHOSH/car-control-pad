import { useState, useEffect } from "react";
import SlamScene from "@/components/slam/SlamScene";
import SlamOverlay from "@/components/slam/SlamOverlay";

const SlamViewer = () => {
  const [distanceTraveled, setDistanceTraveled] = useState(0);
  const [trackingStatus, setTrackingStatus] = useState<"Tracking" | "Loop Closure" | "Lost">("Tracking");
  const [roverPosition, setRoverPosition] = useState<[number, number, number]>([0, 5, 0]);

  // Simulate distance accumulation and status changes
  useEffect(() => {
    const interval = setInterval(() => {
      setDistanceTraveled((prev) => prev + 0.1 + Math.random() * 0.05);
      
      // Move rover along path
      setRoverPosition((prev) => {
        const newY = prev[1] + 0.02;
        const x = Math.sin(newY * 0.3) * 3;
        const z = Math.cos(newY * 0.3) * 3;
        return [x, newY > 7 ? -7 : newY, z];
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  // Simulate status changes
  useEffect(() => {
    const statusInterval = setInterval(() => {
      const rand = Math.random();
      if (rand > 0.95) {
        setTrackingStatus("Loop Closure");
        setTimeout(() => setTrackingStatus("Tracking"), 2000);
      } else if (rand > 0.98) {
        setTrackingStatus("Lost");
        setTimeout(() => setTrackingStatus("Tracking"), 1500);
      }
    }, 3000);

    return () => clearInterval(statusInterval);
  }, []);

  return (
    <div className="fixed inset-0 bg-background overflow-hidden touch-control">
      {/* Scan line effect overlay */}
      <div 
        className="absolute inset-0 pointer-events-none z-20 opacity-[0.03]"
        style={{
          background: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            hsl(var(--primary) / 0.1) 2px,
            hsl(var(--primary) / 0.1) 4px
          )`,
        }}
      />

      {/* Vignette effect */}
      <div 
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background: `radial-gradient(ellipse at center, transparent 40%, hsl(var(--background)) 100%)`,
        }}
      />

      {/* 3D SLAM Scene - takes 100% of screen */}
      <div className="absolute inset-0">
        <SlamScene roverPosition={roverPosition} />
      </div>

      {/* Minimal HUD overlays */}
      <SlamOverlay 
        distanceTraveled={distanceTraveled}
        trackingStatus={trackingStatus}
      />

      {/* Top border accent */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      
      {/* Bottom border accent */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
    </div>
  );
};

export default SlamViewer;
