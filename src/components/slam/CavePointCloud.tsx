import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface CavePointCloudProps {
  pointCount?: number;
}

const CavePointCloud = ({ pointCount = 3000 }: CavePointCloudProps) => {
  const pointsRef = useRef<THREE.Points>(null);

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(pointCount * 3);
    const colors = new Float32Array(pointCount * 3);

    // Generate cave-like point cloud structure
    for (let i = 0; i < pointCount; i++) {
      const t = (i / pointCount) * Math.PI * 4;
      const radius = 8 + Math.sin(t * 0.5) * 3 + Math.random() * 2;
      const angle = t + Math.random() * 0.3;
      const height = (i / pointCount) * 20 - 10 + Math.random() * 1.5;

      // Cave walls - cylindrical with variations
      positions[i * 3] = Math.cos(angle) * radius + Math.random() * 0.5;
      positions[i * 3 + 1] = height;
      positions[i * 3 + 2] = Math.sin(angle) * radius + Math.random() * 0.5;

      // Gray colors with slight variation for depth
      const gray = 0.3 + Math.random() * 0.3;
      colors[i * 3] = gray;
      colors[i * 3 + 1] = gray;
      colors[i * 3 + 2] = gray * 1.1;
    }

    return { positions, colors };
  }, [pointCount]);

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={pointCount}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={pointCount}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  );
};

export default CavePointCloud;
