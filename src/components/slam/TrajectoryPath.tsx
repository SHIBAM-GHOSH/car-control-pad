import { useMemo } from "react";
import * as THREE from "three";

interface TrajectoryPathProps {
  points: [number, number, number][];
}

const TrajectoryPath = ({ points }: TrajectoryPathProps) => {
  const { lineGeometry, keyframePositions } = useMemo(() => {
    if (points.length < 2) {
      return { lineGeometry: null, keyframePositions: [] };
    }

    const vectors = points.map(p => new THREE.Vector3(p[0], p[1], p[2]));
    const curve = new THREE.CatmullRomCurve3(vectors);
    const tubeGeometry = new THREE.TubeGeometry(curve, points.length * 5, 0.05, 8, false);
    
    // Keyframes every few points
    const keyframes = points.filter((_, i) => i % 8 === 0 && i > 0);
    
    return { 
      lineGeometry: tubeGeometry, 
      keyframePositions: keyframes 
    };
  }, [points]);

  if (!lineGeometry) return null;

  return (
    <group>
      {/* Green trajectory line */}
      <mesh geometry={lineGeometry}>
        <meshBasicMaterial color="#00ff00" transparent opacity={0.9} />
      </mesh>

      {/* Keyframe markers */}
      {keyframePositions.map((pos, idx) => (
        <mesh key={idx} position={pos}>
          <sphereGeometry args={[0.15, 12, 12]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
      ))}
    </group>
  );
};

export default TrajectoryPath;
