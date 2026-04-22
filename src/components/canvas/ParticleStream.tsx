import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const PARTICLE_COUNT = 1200;

export default function ParticleStream() {
  const particlesRef = useRef<THREE.Points>(null);
  const frameRef = useRef(0);

  const positions = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      const radius = 6 + Math.random() * 8;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI * 0.4;
      pos[i3]     = radius * Math.cos(theta) * Math.cos(phi);
      pos[i3 + 1] = radius * Math.sin(phi);
      pos[i3 + 2] = radius * Math.sin(theta) * Math.cos(phi);
    }
    return pos;
  }, []);

  const particleTexture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 32; canvas.height = 32;
    const ctx = canvas.getContext("2d")!;
    const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
    gradient.addColorStop(0, "rgba(255,255,255,1)");
    gradient.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = gradient;
    ctx.beginPath(); ctx.arc(16, 16, 16, 0, Math.PI * 2); ctx.fill();
    return new THREE.CanvasTexture(canvas);
  }, []);

  useFrame(() => {
    if (!particlesRef.current) return;
    frameRef.current++;
    if (frameRef.current % 2 !== 0) return; // update every other frame

    const pos = particlesRef.current.geometry.attributes.position.array as Float32Array;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      const x = pos[i3], y = pos[i3 + 1], z = pos[i3 + 2];
      const dist = Math.sqrt(x * x + y * y + z * z);

      if (dist > 0.5) {
        const force = 0.015 / (dist * dist);
        const tangential = 0.008 / dist;
        pos[i3]     -= x * force;
        pos[i3 + 1] -= y * force;
        pos[i3 + 2] -= z * force;
        const angle = Math.atan2(z, x);
        pos[i3]     += Math.cos(angle + Math.PI / 2) * tangential;
        pos[i3 + 2] += Math.sin(angle + Math.PI / 2) * tangential;
      } else {
        const radius = 6 + Math.random() * 8;
        const theta = Math.random() * Math.PI * 2;
        const phi = (Math.random() - 0.5) * Math.PI * 0.4;
        pos[i3]     = radius * Math.cos(theta) * Math.cos(phi);
        pos[i3 + 1] = radius * Math.sin(phi);
        pos[i3 + 2] = radius * Math.sin(theta) * Math.cos(phi);
      }
    }

    particlesRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} count={PARTICLE_COUNT} />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        color="#ff9944"
        transparent
        opacity={0.8}
        map={particleTexture}
        alphaMap={particleTexture}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  );
}
