import { useMemo } from "react";
import * as THREE from "three";

interface EnvironmentPointCloudProps {
  pointCount?: number;
}

// Height-based color gradient (blue -> cyan -> green -> yellow -> red)
const getHeightColor = (normalizedHeight: number): [number, number, number] => {
  const h = Math.max(0, Math.min(1, normalizedHeight));
  
  if (h < 0.25) {
    // Blue to Cyan
    const t = h / 0.25;
    return [0, t, 1];
  } else if (h < 0.5) {
    // Cyan to Green
    const t = (h - 0.25) / 0.25;
    return [0, 1, 1 - t];
  } else if (h < 0.75) {
    // Green to Yellow
    const t = (h - 0.5) / 0.25;
    return [t, 1, 0];
  } else {
    // Yellow to Red
    const t = (h - 0.75) / 0.25;
    return [1, 1 - t, 0];
  }
};

const EnvironmentPointCloud = ({ pointCount = 8000 }: EnvironmentPointCloudProps) => {
  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(pointCount * 3);
    const colors = new Float32Array(pointCount * 3);

    let idx = 0;
    const addPoint = (x: number, y: number, z: number, minY: number, maxY: number) => {
      if (idx >= pointCount) return;
      positions[idx * 3] = x + (Math.random() - 0.5) * 0.1;
      positions[idx * 3 + 1] = y + (Math.random() - 0.5) * 0.1;
      positions[idx * 3 + 2] = z + (Math.random() - 0.5) * 0.1;
      
      const normalizedHeight = (y - minY) / (maxY - minY);
      const [r, g, b] = getHeightColor(normalizedHeight);
      colors[idx * 3] = r;
      colors[idx * 3 + 1] = g;
      colors[idx * 3 + 2] = b;
      idx++;
    };

    const minY = 0;
    const maxY = 6;

    // Room 1 - Main room walls
    for (let i = 0; i < 1500; i++) {
      const y = Math.random() * 6;
      const side = Math.floor(Math.random() * 4);
      if (side === 0) addPoint(-8 + Math.random() * 0.3, y, Math.random() * 10 - 5, minY, maxY);
      else if (side === 1) addPoint(Math.random() * 0.3, y, Math.random() * 10 - 5, minY, maxY);
      else if (side === 2) addPoint(Math.random() * 8 - 8, y, -5 + Math.random() * 0.3, minY, maxY);
      else addPoint(Math.random() * 8 - 8, y, 5 + Math.random() * 0.3, minY, maxY);
    }

    // Room 2 - Connected room
    for (let i = 0; i < 1200; i++) {
      const y = Math.random() * 6;
      const side = Math.floor(Math.random() * 3);
      if (side === 0) addPoint(Math.random() * 6, y, 5 + Math.random() * 0.3, minY, maxY);
      else if (side === 1) addPoint(Math.random() * 6, y, 12 + Math.random() * 0.3, minY, maxY);
      else addPoint(6 + Math.random() * 0.3, y, 5 + Math.random() * 7, minY, maxY);
    }

    // Corridor
    for (let i = 0; i < 800; i++) {
      const y = Math.random() * 6;
      const z = 12 + Math.random() * 8;
      addPoint(-2 + Math.random() * 0.2, y, z, minY, maxY);
      addPoint(2 + Math.random() * 0.2, y, z, minY, maxY);
    }

    // Room 3 - End room
    for (let i = 0; i < 1000; i++) {
      const y = Math.random() * 6;
      const side = Math.floor(Math.random() * 4);
      if (side === 0) addPoint(-6 + Math.random() * 0.3, y, 20 + Math.random() * 6, minY, maxY);
      else if (side === 1) addPoint(6 + Math.random() * 0.3, y, 20 + Math.random() * 6, minY, maxY);
      else if (side === 2) addPoint(Math.random() * 12 - 6, y, 20 + Math.random() * 0.3, minY, maxY);
      else addPoint(Math.random() * 12 - 6, y, 26 + Math.random() * 0.3, minY, maxY);
    }

    // Obstacles/furniture scattered
    for (let i = 0; i < 600; i++) {
      const y = Math.random() * 3;
      // Table in room 1
      if (i < 200) {
        addPoint(-5 + Math.random() * 2, y, Math.random() * 2 - 1, minY, maxY);
      }
      // Shelf in room 2
      else if (i < 400) {
        addPoint(3 + Math.random() * 1.5, y, 8 + Math.random() * 2, minY, maxY);
      }
      // Objects in room 3
      else {
        addPoint(Math.random() * 4 - 2, y, 22 + Math.random() * 3, minY, maxY);
      }
    }

    // Floor points (sparse)
    for (let i = 0; i < 500; i++) {
      const x = Math.random() * 20 - 10;
      const z = Math.random() * 30 - 5;
      addPoint(x, Math.random() * 0.2, z, minY, maxY);
    }

    // Ceiling points (sparse)
    for (let i = 0; i < 400; i++) {
      const x = Math.random() * 20 - 10;
      const z = Math.random() * 30 - 5;
      addPoint(x, 5.8 + Math.random() * 0.4, z, minY, maxY);
    }

    return { positions, colors };
  }, [pointCount]);

  return (
    <points>
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
        size={0.12}
        vertexColors
        transparent
        opacity={0.95}
        sizeAttenuation
      />
    </points>
  );
};

export default EnvironmentPointCloud;
