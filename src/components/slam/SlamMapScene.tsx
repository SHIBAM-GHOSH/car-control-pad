import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import EnvironmentPointCloud from "./EnvironmentPointCloud";
import TrajectoryPath from "./TrajectoryPath";
import CurrentPosition from "./CurrentPosition";

interface SlamMapSceneProps {
  trajectoryPoints: [number, number, number][];
  currentPosition: [number, number, number];
}

const SlamMapScene = ({ trajectoryPoints, currentPosition }: SlamMapSceneProps) => {
  return (
    <Canvas
      style={{ background: "#1a1a1a" }}
      gl={{ antialias: true }}
    >
      <PerspectiveCamera
        makeDefault
        position={[20, 15, 25]}
        fov={45}
      />
      
      <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minDistance={10}
        maxDistance={60}
        target={[0, 2, 10]}
      />

      {/* Environment point cloud */}
      <EnvironmentPointCloud pointCount={8000} />
      
      {/* Trajectory path */}
      <TrajectoryPath points={trajectoryPoints} />
      
      {/* Current position marker */}
      <CurrentPosition position={currentPosition} />
      
      {/* Ground grid */}
      <gridHelper 
        args={[40, 40, "#333333", "#222222"]} 
        position={[0, 0, 10]} 
      />
    </Canvas>
  );
};

export default SlamMapScene;
