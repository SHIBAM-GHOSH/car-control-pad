import { useState, useEffect, useCallback } from "react";
import SlamMapScene from "@/components/slam/SlamMapScene";
import SlamHUD from "@/components/slam/SlamHUD";

const SlamViewer = () => {
  const [distanceTraveled, setDistanceTraveled] = useState(0);
  const [trackingStatus, setTrackingStatus] = useState<"Tracking" | "Loop Closure" | "Lost">("Tracking");
  const [trajectoryPoints, setTrajectoryPoints] = useState<[number, number, number][]>([]);
  const [currentPosition, setCurrentPosition] = useState<[number, number, number]>([-6, 1.5, -3]);

  // Generate trajectory path through the environment
  const generateNextPoint = useCallback((progress: number): [number, number, number] => {
    const t = progress;
    
    // Path through rooms: Room1 -> Room2 -> Corridor -> Room3
    if (t < 0.3) {
      // Moving through Room 1
      const p = t / 0.3;
      return [-6 + p * 6, 1.5, -3 + p * 8];
    } else if (t < 0.5) {
      // Moving through Room 2
      const p = (t - 0.3) / 0.2;
      return [0 + p * 3, 1.5, 5 + p * 7];
    } else if (t < 0.7) {
      // Moving through Corridor
      const p = (t - 0.5) / 0.2;
      return [3 - p * 3, 1.5, 12 + p * 8];
    } else {
      // Moving through Room 3
      const p = (t - 0.7) / 0.3;
      return [0 + Math.sin(p * Math.PI) * 3, 1.5, 20 + p * 5];
    }
  }, []);

  // Simulate movement
  useEffect(() => {
    let progress = 0;
    const points: [number, number, number][] = [];
    
    const interval = setInterval(() => {
      progress += 0.005;
      if (progress > 1) progress = 0;
      
      const newPos = generateNextPoint(progress);
      setCurrentPosition(newPos);
      
      // Add to trajectory
      points.push(newPos);
      if (points.length > 200) points.shift();
      setTrajectoryPoints([...points]);
      
      // Update distance
      setDistanceTraveled(prev => prev + 0.08);
    }, 100);

    return () => clearInterval(interval);
  }, [generateNextPoint]);

  // Simulate status changes
  useEffect(() => {
    const statusInterval = setInterval(() => {
      const rand = Math.random();
      if (rand > 0.92) {
        setTrackingStatus("Loop Closure");
        setTimeout(() => setTrackingStatus("Tracking"), 1500);
      }
    }, 5000);

    return () => clearInterval(statusInterval);
  }, []);

  const keyframeCount = Math.floor(trajectoryPoints.length / 8);

  return (
    <div className="fixed inset-0 bg-[#1a1a1a] overflow-hidden touch-none select-none">
      {/* 3D SLAM Map Scene */}
      <div className="absolute inset-0">
        <SlamMapScene 
          trajectoryPoints={trajectoryPoints}
          currentPosition={currentPosition}
        />
      </div>

      {/* HUD Overlay */}
      <SlamHUD 
        distanceTraveled={distanceTraveled}
        trackingStatus={trackingStatus}
        keyframeCount={keyframeCount}
        pointCount={8000}
      />

      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-cyan-500/30" />
      <div className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-cyan-500/30" />
      <div className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-cyan-500/30" />
      <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-cyan-500/30" />
    </div>
  );
};

export default SlamViewer;
