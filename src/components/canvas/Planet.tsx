import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { PlanetData } from "../../data/planetsData";

interface PlanetProps {
  data: PlanetData;
  onClick?: () => void;
  isSelected?: boolean;
}

export default function Planet({ data, onClick, isSelected }: PlanetProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const orbitRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (meshRef.current) {
      // Planet rotation
      meshRef.current.rotation.y += data.rotationSpeed;
    }

    if (orbitRef.current) {
      // Orbital movement
      orbitRef.current.rotation.y += data.orbitSpeed;
    }
  });

  return (
    <group ref={orbitRef}>
      <group position={[data.distance * 10, 0, 0]}>
        <mesh
          ref={meshRef}
          onClick={onClick}
          onPointerOver={(e) => {
            e.stopPropagation();
            document.body.style.cursor = "pointer";
          }}
          onPointerOut={() => {
            document.body.style.cursor = "auto";
          }}
        >
          <sphereGeometry args={[data.radius, 64, 64]} />
          <meshStandardMaterial
            color={data.color}
            roughness={0.7}
            metalness={0.2}
            emissive={data.color}
            emissiveIntensity={isSelected ? 0.3 : 0.1}
          />
        </mesh>

        {/* Atmosphere glow */}
        {data.name !== "Mercury" && (
          <mesh>
            <sphereGeometry args={[data.radius * 1.1, 32, 32]} />
            <meshBasicMaterial
              color={data.color}
              transparent
              opacity={0.15}
              blending={THREE.AdditiveBlending}
              side={THREE.BackSide}
            />
          </mesh>
        )}

        {/* Selection ring */}
        {isSelected && (
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[data.radius * 1.3, data.radius * 1.4, 64]} />
            <meshBasicMaterial
              color="#00d4ff"
              transparent
              opacity={0.8}
              side={THREE.DoubleSide}
            />
          </mesh>
        )}
      </group>

      {/* Orbit path */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry
          args={[data.distance * 10 - 0.02, data.distance * 10 + 0.02, 128]}
        />
        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.1}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}
