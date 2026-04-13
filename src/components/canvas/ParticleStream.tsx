import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function ParticleStream() {
  const particlesRef = useRef<THREE.Points>(null);

  const particleCount = 3000;
  const positions = new Float32Array(particleCount * 3);

  // Initialize particles in a torus around the black hole
  for (let i = 0; i < particleCount; i++) {
    const i3 = i * 3;
    const radius = 6 + Math.random() * 8;
    const theta = Math.random() * Math.PI * 2;
    const phi = (Math.random() - 0.5) * Math.PI * 0.4;

    positions[i3] = radius * Math.cos(theta) * Math.cos(phi);
    positions[i3 + 1] = radius * Math.sin(phi);
    positions[i3 + 2] = radius * Math.sin(theta) * Math.cos(phi);
  }

  useFrame(() => {
    if (!particlesRef.current) return;

    const positions = particlesRef.current.geometry.attributes.position
      .array as Float32Array;

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      const x = positions[i3];
      const y = positions[i3 + 1];
      const z = positions[i3 + 2];

      const distance = Math.sqrt(x * x + y * y + z * z);

      // Gravitational pull with spiral motion
      if (distance > 0.5) {
        const force = 0.015 / (distance * distance);
        const tangentialForce = 0.008 / distance;

        // Radial pull
        positions[i3] -= x * force;
        positions[i3 + 1] -= y * force;
        positions[i3 + 2] -= z * force;

        // Orbital motion (spiral)
        const angle = Math.atan2(z, x);
        positions[i3] += Math.cos(angle + Math.PI / 2) * tangentialForce;
        positions[i3 + 2] += Math.sin(angle + Math.PI / 2) * tangentialForce;
      } else {
        // Reset particle
        const radius = 6 + Math.random() * 8;
        const theta = Math.random() * Math.PI * 2;
        const phi = (Math.random() - 0.5) * Math.PI * 0.4;

        positions[i3] = radius * Math.cos(theta) * Math.cos(phi);
        positions[i3 + 1] = radius * Math.sin(phi);
        positions[i3 + 2] = radius * Math.sin(theta) * Math.cos(phi);
      }
    }

    particlesRef.current.geometry.attributes.position.needsUpdate = true;
  });

  // Create a round particle texture
  const particleTexture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
      gradient.addColorStop(0, "rgba(255,255,255,1)");
      gradient.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(16, 16, 16, 0, Math.PI * 2);
      ctx.fill();
    }
    const texture = new THREE.CanvasTexture(canvas);
    return texture;
  }, []);

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08} // Slightly larger to compensate for transparency
        color="#ff9944"
        transparent
        opacity={0.8}
        map={particleTexture}
        alphaMap={particleTexture}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        sizeAttenuation
        vertexColors={false}
      />
    </points>
  );
}
