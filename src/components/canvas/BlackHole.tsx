import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { vertexShader, fragmentShader } from "../../shaders/BlackHoleShader";

export default function BlackHole() {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const sphereRef = useRef<THREE.Mesh>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColorInner: { value: new THREE.Color("#ff5500") },
      uColorOuter: { value: new THREE.Color("#0055aa") },
      uMouse: { value: new THREE.Vector2(0, 0) },
    }),
    [],
  );

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.12;

      const material = meshRef.current.material as THREE.ShaderMaterial;
      if (material.uniforms) {
        material.uniforms.uTime.value = state.clock.elapsedTime;
      }
    }

    // Very subtle pulse on event horizon
    if (sphereRef.current) {
      const pulse = 1.0 + Math.sin(state.clock.elapsedTime * 0.3) * 0.01;
      sphereRef.current.scale.setScalar(pulse);
    }
  });

  // Create custom ring geometry without seam
  const ringGeometry = useMemo(() => {
    const geometry = new THREE.RingGeometry(1.6, 5.5, 512, 8, 0, Math.PI * 2);
    return geometry;
  }, []);

  return (
    <group ref={groupRef} rotation={[0.2, 0, 0.3]} position={[0, 0, 0]}>
      {/* Enhanced Event Horizon */}
      <mesh ref={sphereRef}>
        <sphereGeometry args={[1.5, 128, 128]} />
        <meshStandardMaterial
          color="#000000"
          roughness={0.9}
          metalness={0.1}
          emissive="#0a0a0a"
          emissiveIntensity={0.05}
        />
      </mesh>

      {/* Subtle inner shadow ring */}
      <mesh>
        <sphereGeometry args={[1.52, 128, 128]} />
        <meshBasicMaterial color="#000000" transparent opacity={0.3} />
      </mesh>

      {/* Accretion Disk - Custom geometry */}
      <mesh
        ref={meshRef}
        rotation={[-Math.PI / 2, 0, 0]}
        geometry={ringGeometry}
      >
        <shaderMaterial
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={uniforms}
          transparent
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Inner glow */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.4, 1.7, 256]} />
        <meshBasicMaterial
          color="#ff3300"
          transparent
          opacity={0.4}
          blending={THREE.AdditiveBlending}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Atmospheric glow */}
      <sprite scale={[16, 16, 1]}>
        <spriteMaterial
          color="#001122"
          blending={THREE.AdditiveBlending}
          transparent
          opacity={0.15}
        />
      </sprite>
    </group>
  );
}
