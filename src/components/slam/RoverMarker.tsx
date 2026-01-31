import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface RoverMarkerProps {
  position: [number, number, number];
}

const RoverMarker = ({ position }: RoverMarkerProps) => {
  const ringRef = useRef<THREE.Mesh>(null);
  const pulseRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.5;
    }
    if (pulseRef.current) {
      const scale = 1 + Math.sin(Date.now() * 0.005) * 0.2;
      pulseRef.current.scale.setScalar(scale);
    }
  });

  return (
    <group position={position}>
      {/* Main rover body */}
      <mesh>
        <boxGeometry args={[0.3, 0.15, 0.4]} />
        <meshBasicMaterial color="#00ffff" transparent opacity={0.8} />
      </mesh>
      
      {/* Direction indicator */}
      <mesh position={[0, 0, 0.3]}>
        <coneGeometry args={[0.1, 0.2, 4]} />
        <meshBasicMaterial color="#00ffff" />
      </mesh>
      
      {/* Rotating ring */}
      <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.5, 0.02, 8, 32]} />
        <meshBasicMaterial color="#00ffff" transparent opacity={0.5} />
      </mesh>
      
      {/* Pulse ring */}
      <mesh ref={pulseRef} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.6, 0.65, 32]} />
        <meshBasicMaterial color="#00ffff" transparent opacity={0.3} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
};

export default RoverMarker;
