import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface ModelProps {
  color: string;
  type: string;
}

export default function SpacecraftModel({ color, type }: ModelProps) {
  const groupRef = useRef<THREE.Group>(null);
  const engineRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (groupRef.current) {
      // Gentle floating animation
      groupRef.current.position.y =
        Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
      groupRef.current.rotation.z =
        Math.sin(state.clock.elapsedTime * 0.2) * 0.05;
    }

    // Engine pulse
    if (engineRef.current) {
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 10) * 0.1;
      engineRef.current.scale.setScalar(pulse);
    }
  });

  // Procedural ship generation based on type
  const renderShip = () => {
    switch (type) {
      case "orion-x":
        return (
          <group>
            {/* Main Hull */}
            <mesh>
              <capsuleGeometry args={[1, 4, 8, 16]} />
              <meshStandardMaterial
                color="#e0e0e0"
                roughness={0.3}
                metalness={0.8}
              />
            </mesh>
            {/* Cockpit */}
            <mesh position={[0, 1.5, 0.5]}>
              <sphereGeometry args={[0.8, 32, 32]} />
              <meshPhysicalMaterial
                color="#111"
                roughness={0}
                metalness={1}
                transmission={0.5}
                thickness={1}
              />
            </mesh>
            {/* Rings */}
            <mesh position={[0, -0.5, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[1.5, 0.2, 16, 32]} />
              <meshStandardMaterial
                color={color}
                emissive={color}
                emissiveIntensity={0.5}
              />
            </mesh>
            {/* Engines */}
            <group position={[0, -2.2, 0]}>
              <mesh ref={engineRef}>
                <cylinderGeometry args={[0.2, 0.8, 1]} />
                <meshBasicMaterial color="#00ffff" />
              </mesh>
              <pointLight color="#00ffff" intensity={2} distance={3} />
            </group>
          </group>
        );
      case "nebula-runner":
        return (
          <group rotation={[0, 0, Math.PI / 2]}>
            {/* Aggressive arrow shape */}
            <mesh>
              <coneGeometry args={[1, 4, 4]} />
              <meshStandardMaterial
                color="#222"
                roughness={0.4}
                metalness={0.9}
              />
            </mesh>
            {/* Wings */}
            <mesh position={[0, -1, 0]} scale={[3, 0.2, 1]}>
              <boxGeometry />
              <meshStandardMaterial
                color={color}
                roughness={0.2}
                metalness={0.5}
              />
            </mesh>
            {/* Engine Glow */}
            <mesh position={[0, -2, 0]}>
              <sphereGeometry args={[0.3]} />
              <meshBasicMaterial color="#ffaa00" />
            </mesh>
          </group>
        );
      default: // Titan Hauler
        return (
          <group>
            <mesh>
              <boxGeometry args={[2, 2, 4]} />
              <meshStandardMaterial
                color="#555"
                roughness={0.8}
                metalness={0.4}
              />
            </mesh>
            {/* Cargo containers */}
            {[...Array(6)].map((_, i) => (
              <mesh key={i} position={[i % 2 ? 1.2 : -1.2, 0, i / 2 - 1]}>
                <boxGeometry args={[0.8, 0.8, 0.8]} />
                <meshStandardMaterial color={color} />
              </mesh>
            ))}
          </group>
        );
    }
  };

  return (
    <group ref={groupRef} rotation={[0, Math.PI / 4, 0]}>
      {renderShip()}
    </group>
  );
}
