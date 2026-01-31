import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import CavePointCloud from "./CavePointCloud";
import RoverTrajectory from "./RoverTrajectory";
import LidarScan from "./LidarScan";
import RoverMarker from "./RoverMarker";

interface SlamSceneProps {
  roverPosition: [number, number, number];
}

const SlamScene = ({ roverPosition }: SlamSceneProps) => {
  return (
    <Canvas
      style={{ background: "transparent" }}
      gl={{ antialias: true, alpha: true }}
    >
      <PerspectiveCamera
        makeDefault
        position={[15, 10, 15]}
        fov={50}
      />
      
      <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minDistance={5}
        maxDistance={50}
        autoRotate
        autoRotateSpeed={0.3}
      />

      {/* Ambient lighting */}
      <ambientLight intensity={0.3} />
      
      {/* Cave point cloud walls */}
      <CavePointCloud pointCount={4000} />
      
      {/* Rover trajectory path */}
      <RoverTrajectory pathLength={60} />
      
      {/* Current LiDAR scan visualization */}
      <LidarScan roverPosition={roverPosition} scanPoints={300} />
      
      {/* Rover marker */}
      <RoverMarker position={roverPosition} />
      
      {/* Grid for reference */}
      <gridHelper args={[30, 30, "#1a3a4a", "#0a1a20"]} position={[0, -10, 0]} />
    </Canvas>
  );
};

export default SlamScene;
