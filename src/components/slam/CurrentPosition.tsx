import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface CurrentPositionProps {
  position: [number, number, number];
}

const CurrentPosition = ({ position }: CurrentPositionProps) => {
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (ringRef.current) {
      ringRef.current.rotation.y += delta * 2;
    }
  });

  return (
    <group position={position}>
      {/* Current position marker - bright cyan */}
      <mesh>
        <sphereGeometry args={[0.25, 16, 16]} />
        <meshBasicMaterial color="#00ffff" />
      </mesh>
      
      {/* Rotating ring indicator */}
      <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.5, 0.03, 8, 24]} />
        <meshBasicMaterial color="#00ffff" transparent opacity={0.7} />
      </mesh>
    </group>
  );
};

export default CurrentPosition;
