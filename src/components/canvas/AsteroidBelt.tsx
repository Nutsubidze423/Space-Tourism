import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { InstancedMesh, Matrix4 } from "three";
import * as THREE from "three";

export default function AsteroidBelt() {
  const meshRef = useRef<InstancedMesh>(null);
  const count = 1000;

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.015;
    }
  });

  // Set initial positions
  const init = () => {
    const temp = new Matrix4();
    if (!meshRef.current) return;

    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const radius = 2.5 + Math.random() * 0.8; // Located between Mars (1.5) and Jupiter (5.2) scaled

      // Randomize position slightly
      const x = Math.cos(angle) * radius * 10;
      const z = Math.sin(angle) * radius * 10;
      const y = (Math.random() - 0.5) * 1.5;

      // Random scale and rotation
      const scale = 0.05 + Math.random() * 0.15;
      temp.makeScale(scale, scale, scale);
      temp.setPosition(x, y, z);

      // Random rotation
      const rotX = Math.random() * Math.PI;
      const rotY = Math.random() * Math.PI;
      const rotZ = Math.random() * Math.PI;
      const rotMatrix = new Matrix4().makeRotationFromEuler(
        new THREE.Euler(rotX, rotY, rotZ),
      );
      temp.multiply(rotMatrix);

      meshRef.current.setMatrixAt(i, temp);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  };

  // Use a ref callback to initialize when mesh is ready
  return (
    <instancedMesh
      ref={(mesh) => {
        meshRef.current = mesh;
        if (mesh) init();
      }}
      args={[undefined, undefined, count]}
    >
      <dodecahedronGeometry args={[1, 0]} />
      <meshStandardMaterial color="#8b8b8b" roughness={0.8} metalness={0.2} />
    </instancedMesh>
  );
}
