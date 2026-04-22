import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function FloatingHelmet() {
  const groupRef = useRef<THREE.Group>(null);
  const visorReflectionRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.18;
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.08;
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.22) * 0.04;
    }
    if (visorReflectionRef.current) {
      (visorReflectionRef.current.material as THREE.MeshBasicMaterial).opacity =
        0.12 + Math.sin(state.clock.elapsedTime * 0.6) * 0.05;
    }
  });

  return (
    <group ref={groupRef} scale={[1.8, 1.8, 1.8]}>

      {/* ── Outer shell ── */}
      <mesh>
        <sphereGeometry args={[1, 48, 48]} />
        <meshPhysicalMaterial
          color="#dde2e8"
          roughness={0.18}
          metalness={0.55}
          clearcoat={1}
          clearcoatRoughness={0.1}
          envMapIntensity={1.5}
        />
      </mesh>

      {/* Subtle surface panel lines — horizontal bands */}
      {[-0.35, 0.0, 0.35].map((y, i) => (
        <mesh key={i} position={[0, y, 0]}>
          <torusGeometry args={[Math.sqrt(1 - y * y) * 0.995, 0.008, 8, 64]} />
          <meshStandardMaterial color="#b8bfc8" roughness={0.3} metalness={0.7} />
        </mesh>
      ))}

      {/* ── Visor opening frame ── */}
      <mesh position={[0, 0.08, 0.72]} rotation={[0.18, 0, 0]}>
        <torusGeometry args={[0.56, 0.045, 16, 48, Math.PI * 1.35]} />
        <meshStandardMaterial color="#8a9098" roughness={0.25} metalness={0.9} />
      </mesh>

      {/* ── Gold visor ── */}
      <mesh position={[0, 0.08, 0.65]} rotation={[0.18, 0, 0]}>
        <sphereGeometry args={[0.58, 32, 32, 0, Math.PI * 2, Math.PI * 0.28, Math.PI * 0.44]} />
        <meshPhysicalMaterial
          color="#c8900a"
          roughness={0.0}
          metalness={1}
          envMapIntensity={4}
          side={THREE.FrontSide}
        />
      </mesh>

      {/* Inner visor depth (dark backing) */}
      <mesh position={[0, 0.06, 0.62]} rotation={[0.18, 0, 0]}>
        <sphereGeometry args={[0.55, 24, 24, 0, Math.PI * 2, Math.PI * 0.29, Math.PI * 0.42]} />
        <meshStandardMaterial color="#050810" roughness={0.8} metalness={0.1} side={THREE.BackSide} />
      </mesh>

      {/* Visor reflection shimmer */}
      <mesh ref={visorReflectionRef} position={[-0.12, 0.22, 0.68]} rotation={[0.18, 0, 0]} scale={[1, 0.5, 1]}>
        <circleGeometry args={[0.12, 16]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.15} depthWrite={false} />
      </mesh>

      {/* ── Neck ring ── */}
      <mesh position={[0, -0.88, 0]}>
        <cylinderGeometry args={[0.52, 0.58, 0.22, 32]} />
        <meshStandardMaterial color="#9aa0aa" roughness={0.3} metalness={0.85} />
      </mesh>

      {/* Neck ring locking tabs */}
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const angle = (i / 6) * Math.PI * 2;
        return (
          <mesh key={i} position={[Math.sin(angle) * 0.58, -0.88, Math.cos(angle) * 0.58]}
            rotation={[0, -angle, 0]}>
            <boxGeometry args={[0.1, 0.28, 0.06]} />
            <meshStandardMaterial color="#6a7078" roughness={0.35} metalness={0.9} />
          </mesh>
        );
      })}

      {/* ── Communication antenna — right side ── */}
      <group position={[0.82, 0.55, 0.2]} rotation={[0, 0, 0.3]}>
        <mesh>
          <cylinderGeometry args={[0.025, 0.018, 0.55, 8]} />
          <meshStandardMaterial color="#444950" roughness={0.3} metalness={0.95} />
        </mesh>
        {/* Antenna tip */}
        <mesh position={[0, 0.3, 0]}>
          <sphereGeometry args={[0.04, 8, 8]} />
          <meshBasicMaterial color="#ff4422" />
        </mesh>
        {/* Antenna base housing */}
        <mesh position={[0, -0.28, 0]}>
          <cylinderGeometry args={[0.06, 0.06, 0.1, 10]} />
          <meshStandardMaterial color="#333840" roughness={0.4} metalness={0.85} />
        </mesh>
      </group>

      {/* ── Oxygen port — left side ── */}
      <group position={[-0.85, -0.1, 0.35]}>
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.09, 0.09, 0.12, 12]} />
          <meshStandardMaterial color="#333840" roughness={0.4} metalness={0.9} />
        </mesh>
        {/* Port opening */}
        <mesh position={[-0.07, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.06, 0.06, 0.04, 12]} />
          <meshStandardMaterial color="#111418" roughness={0.8} metalness={0.4} />
        </mesh>
        {/* Status light */}
        <mesh position={[0.07, 0.06, 0]}>
          <sphereGeometry args={[0.025, 8, 8]} />
          <meshBasicMaterial color="#00ff88" />
        </mesh>
      </group>

      {/* ── Helmet lights — above visor ── */}
      {[-0.28, 0.28].map((x, i) => (
        <group key={i} position={[x, 0.62, 0.77]}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.05, 0.05, 0.06, 10]} />
            <meshStandardMaterial color="#2a2e35" roughness={0.4} metalness={0.9} />
          </mesh>
          <mesh position={[0, 0, 0.04]}>
            <circleGeometry args={[0.038, 16]} />
            <meshBasicMaterial color="#ffffee" transparent opacity={0.9} />
          </mesh>
          <pointLight position={[0, 0, 0.1]} color="#fffde8" intensity={0.4} distance={2} />
        </group>
      ))}

      {/* ── NASA-style logo decal area (rectangular plate) ── */}
      <mesh position={[0.3, 0.55, 0.82]} rotation={[0, -0.35, 0]}>
        <boxGeometry args={[0.28, 0.1, 0.01]} />
        <meshStandardMaterial color="#e8eaf0" roughness={0.2} metalness={0.5} />
      </mesh>

      {/* ── Subtle ambient glow under helmet (reflected from suit) ── */}
      <pointLight position={[0, -1.2, 0]} color="#4466aa" intensity={0.3} distance={3} />
    </group>
  );
}
