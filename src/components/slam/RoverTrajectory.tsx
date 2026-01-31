import { useMemo } from "react";
import * as THREE from "three";

interface RoverTrajectoryProps {
  pathLength?: number;
}

const RoverTrajectory = ({ pathLength = 50 }: RoverTrajectoryProps) => {
  const { curve, keyframePositions } = useMemo(() => {
    const points: THREE.Vector3[] = [];
    const keyframes: THREE.Vector3[] = [];

    // Generate a winding path through the cave
    for (let i = 0; i <= pathLength; i++) {
      const t = i / pathLength;
      const x = Math.sin(t * Math.PI * 2) * 3 + Math.sin(t * Math.PI * 4) * 1.5;
      const y = t * 15 - 7.5;
      const z = Math.cos(t * Math.PI * 2) * 3 + Math.cos(t * Math.PI * 3) * 1;
      
      points.push(new THREE.Vector3(x, y, z));
      
      // Add keyframes every 5 points
      if (i % 5 === 0 && i > 0) {
        keyframes.push(new THREE.Vector3(x, y, z));
      }
    }

    const curve = new THREE.CatmullRomCurve3(points);
    return { curve, keyframePositions: keyframes };
  }, [pathLength]);

  const tubeGeometry = useMemo(() => {
    return new THREE.TubeGeometry(curve, 100, 0.03, 8, false);
  }, [curve]);

  return (
    <group>
      {/* Red trajectory line */}
      <mesh geometry={tubeGeometry}>
        <meshBasicMaterial color="#ff3333" transparent opacity={0.9} />
      </mesh>

      {/* Blue keyframe dots */}
      {keyframePositions.map((pos, idx) => (
        <mesh key={idx} position={pos}>
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshBasicMaterial color="#3388ff" />
        </mesh>
      ))}
    </group>
  );
};

export default RoverTrajectory;
