import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

interface WaypointProps {
  type: "launch" | "orbit" | "transit" | "arrival";
  active: boolean;
}

export default function JourneyWaypoint({ type, active }: WaypointProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
      meshRef.current.rotation.z += 0.005;
    }
  });

  const getColor = () => {
    switch (type) {
      case "launch":
        return "#ff4444";
      case "orbit":
        return "#4444ff";
      case "transit":
        return "#ffff44";
      case "arrival":
        return "#44ff44";
      default:
        return "#ffffff";
    }
  };

  return (
    <Float floatIntensity={2} rotationIntensity={1}>
      <mesh ref={meshRef} scale={active ? 1.5 : 1}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color={getColor()}
          wireframe={!active}
          transparent
          opacity={active ? 0.8 : 0.3}
          emissive={getColor()}
          emissiveIntensity={active ? 0.5 : 0.1}
        />
      </mesh>
      {active && <pointLight color={getColor()} intensity={1} distance={5} />}
    </Float>
  );
}
