import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface LidarScanProps {
  roverPosition: [number, number, number];
  scanPoints?: number;
}

const LidarScan = ({ roverPosition, scanPoints = 200 }: LidarScanProps) => {
  const pointsRef = useRef<THREE.Points>(null);
  const timeRef = useRef(0);

  const basePositions = useMemo(() => {
    const positions = new Float32Array(scanPoints * 3);
    
    // Generate scan pattern around rover
    for (let i = 0; i < scanPoints; i++) {
      const angle = (i / scanPoints) * Math.PI * 2;
      const distance = 1.5 + Math.random() * 2.5;
      const height = (Math.random() - 0.5) * 1.5;
      
      positions[i * 3] = Math.cos(angle) * distance;
      positions[i * 3 + 1] = height;
      positions[i * 3 + 2] = Math.sin(angle) * distance;
    }
    
    return positions;
  }, [scanPoints]);

  useFrame((_, delta) => {
    if (pointsRef.current) {
      timeRef.current += delta;
      
      // Animate scan rotation
      pointsRef.current.rotation.y = timeRef.current * 0.5;
      
      // Pulse effect
      const scale = 1 + Math.sin(timeRef.current * 3) * 0.05;
      pointsRef.current.scale.setScalar(scale);
    }
  });

  const colors = useMemo(() => {
    const colors = new Float32Array(scanPoints * 3);
    
    for (let i = 0; i < scanPoints; i++) {
      // Green to yellow gradient based on distance
      const t = Math.random();
      colors[i * 3] = 0.4 + t * 0.6; // R: more yellow when further
      colors[i * 3 + 1] = 0.9; // G: always high
      colors[i * 3 + 2] = 0.1; // B: low
    }
    
    return colors;
  }, [scanPoints]);

  return (
    <points ref={pointsRef} position={roverPosition}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={scanPoints}
          array={basePositions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={scanPoints}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        vertexColors
        transparent
        opacity={0.9}
        sizeAttenuation
      />
    </points>
  );
};

export default LidarScan;
