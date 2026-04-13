import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function FloatingHelmet() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      // Floating animation
      groupRef.current.position.y =
        Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
      groupRef.current.rotation.z =
        Math.sin(state.clock.elapsedTime * 0.2) * 0.05;
    }
  });

  return (
    <group ref={groupRef} scale={[2, 2, 2]}>
      {/* Helmet Main */}
      <mesh>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color="#eeeeee" roughness={0.3} metalness={0.5} />
      </mesh>

      {/* Visor */}
      <mesh position={[0, 0.1, 0.6]} rotation={[0.2, 0, 0]}>
        <sphereGeometry
          args={[0.7, 32, 32, 0, Math.PI * 2, 0, Math.PI * 0.35]}
        />
        <meshPhysicalMaterial
          color="#ffd700"
          roughness={0}
          metalness={1}
          envMapIntensity={2}
        />
      </mesh>

      {/* Side details */}
      <mesh position={[1, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.2, 0.2, 0.5, 16]} />
        <meshStandardMaterial color="#333" />
      </mesh>
      <mesh position={[-1, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.2, 0.2, 0.5, 16]} />
        <meshStandardMaterial color="#333" />
      </mesh>
    </group>
  );
}
