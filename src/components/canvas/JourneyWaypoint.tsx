import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

interface WaypointProps {
  type: "launch" | "orbit" | "transit" | "arrival";
  active: boolean;
}

// Stage 0: Liftoff — Earth globe + rising rocket contrail
function LaunchScene() {
  const rocketRef = useRef<THREE.Group>(null);
  const exhaustRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (rocketRef.current) {
      rocketRef.current.position.y = -1.2 + Math.sin(state.clock.elapsedTime * 0.8) * 0.1;
    }
    if (exhaustRef.current) {
      (exhaustRef.current.material as THREE.MeshBasicMaterial).opacity =
        0.6 + Math.sin(state.clock.elapsedTime * 15) * 0.25;
    }
  });

  const earthTex = useMemo(() => {
    const size = 256;
    const c = document.createElement("canvas");
    c.width = size; c.height = size;
    const ctx = c.getContext("2d")!;
    ctx.fillStyle = "#1a4fa0";
    ctx.fillRect(0, 0, size, size);
    const blobs: [number, number, number, number][] = [
      [0.35, 0.38, 0.14, 0.18],
      [0.58, 0.42, 0.16, 0.12],
      [0.22, 0.58, 0.1, 0.12],
    ];
    for (const [cx, cy, rx, ry] of blobs) {
      const g = ctx.createRadialGradient(cx * size, cy * size, 0, cx * size, cy * size, rx * size);
      g.addColorStop(0, "rgba(30,120,40,0.9)");
      g.addColorStop(1, "rgba(30,120,40,0)");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.ellipse(cx * size, cy * size, rx * size, ry * size, 0.5, 0, Math.PI * 2);
      ctx.fill();
    }
    // Atmosphere rim
    const rim = ctx.createRadialGradient(size / 2, size / 2, size * 0.38, size / 2, size / 2, size / 2);
    rim.addColorStop(0, "rgba(0,0,0,0)");
    rim.addColorStop(1, "rgba(0,0,0,0.5)");
    ctx.fillStyle = rim;
    ctx.fillRect(0, 0, size, size);
    return new THREE.CanvasTexture(c);
  }, []);

  return (
    <group>
      {/* Earth */}
      <mesh rotation={[0.4, 0, 0]}>
        <sphereGeometry args={[1.8, 48, 48]} />
        <meshStandardMaterial map={earthTex} roughness={0.7} metalness={0.0} />
      </mesh>
      {/* Atmosphere halo */}
      <mesh rotation={[0.4, 0, 0]}>
        <sphereGeometry args={[1.92, 32, 32]} />
        <meshBasicMaterial color="#3399ff" transparent opacity={0.12} side={THREE.BackSide} depthWrite={false} />
      </mesh>

      {/* Rocket */}
      <group ref={rocketRef} position={[0, -1.2, 1.6]}>
        {/* Body */}
        <mesh>
          <cylinderGeometry args={[0.06, 0.09, 0.7, 12]} />
          <meshStandardMaterial color="#e8ecf0" roughness={0.3} metalness={0.8} />
        </mesh>
        {/* Nose */}
        <mesh position={[0, 0.42, 0]}>
          <coneGeometry args={[0.06, 0.25, 12]} />
          <meshStandardMaterial color="#cc3333" roughness={0.3} metalness={0.7} />
        </mesh>
        {/* Fins */}
        {[0, 1, 2].map((i) => {
          const angle = (i / 3) * Math.PI * 2;
          return (
            <mesh key={i} position={[Math.sin(angle) * 0.09, -0.28, Math.cos(angle) * 0.09]}
              rotation={[0, -angle, 0]}>
              <boxGeometry args={[0.02, 0.22, 0.14]} />
              <meshStandardMaterial color="#cc3333" roughness={0.4} metalness={0.6} />
            </mesh>
          );
        })}
        {/* Engine glow */}
        <mesh ref={exhaustRef} position={[0, -0.45, 0]}>
          <sphereGeometry args={[0.12, 12, 12]} />
          <meshBasicMaterial color="#ff8800" transparent opacity={0.8} />
        </mesh>
        <pointLight position={[0, -0.5, 0]} color="#ff6600" intensity={1.5} distance={2} />
      </group>

      {/* Launch light */}
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={2} color="#cce4ff" />
    </group>
  );
}

// Stage 1: Orbit — Earth from above + orbital ring + ISS-like station
function OrbitScene() {
  const stationRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (stationRef.current) {
      const t = state.clock.elapsedTime * 0.4;
      stationRef.current.position.x = Math.sin(t) * 2.6;
      stationRef.current.position.z = Math.cos(t) * 2.6;
      stationRef.current.rotation.y = -t;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = state.clock.elapsedTime * 0.08;
    }
  });

  return (
    <group>
      {/* Earth — smaller, seen from above */}
      <mesh>
        <sphereGeometry args={[1.6, 48, 48]} />
        <meshStandardMaterial color="#1a4fa0" roughness={0.7} emissive="#001133" emissiveIntensity={0.3} />
      </mesh>
      {/* Cloud layer */}
      <mesh>
        <sphereGeometry args={[1.65, 32, 32]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.08} side={THREE.FrontSide} depthWrite={false} />
      </mesh>
      {/* Atmosphere */}
      <mesh>
        <sphereGeometry args={[1.75, 32, 32]} />
        <meshBasicMaterial color="#3399ff" transparent opacity={0.1} side={THREE.BackSide} depthWrite={false} />
      </mesh>

      {/* Orbit path ring */}
      <mesh ref={ringRef} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[2.55, 2.62, 128]} />
        <meshBasicMaterial color="#00d4ff" transparent opacity={0.35} side={THREE.DoubleSide} depthWrite={false} />
      </mesh>

      {/* Station */}
      <group ref={stationRef} position={[2.6, 0, 0]}>
        {/* Central hub */}
        <mesh>
          <cylinderGeometry args={[0.12, 0.12, 0.4, 12]} />
          <meshStandardMaterial color="#c0c8d0" roughness={0.3} metalness={0.85} />
        </mesh>
        {/* Solar panels — horizontal */}
        {[-1, 1].map((side) => (
          <group key={side}>
            <mesh position={[side * 0.55, 0, 0]}>
              <boxGeometry args={[0.7, 0.04, 0.3]} />
              <meshStandardMaterial color="#1a2a4a" roughness={0.2} metalness={0.6}
                emissive="#001155" emissiveIntensity={0.3} />
            </mesh>
          </group>
        ))}
        {/* Habitat modules */}
        <mesh position={[0, 0, 0.32]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.09, 0.09, 0.35, 12]} />
          <meshStandardMaterial color="#d0d4da" roughness={0.4} metalness={0.7} />
        </mesh>
        <pointLight color="#88ccff" intensity={0.5} distance={1.5} />
      </group>

      <ambientLight intensity={0.15} />
      <directionalLight position={[6, 4, 3]} intensity={2.5} color="#fff0d0" />
    </group>
  );
}

// Stage 2: Deep Space Transit — spacecraft moving through nebula/stars
function TransitScene() {
  const shipRef = useRef<THREE.Group>(null);
  const nebulaRef = useRef<THREE.Mesh>(null);

  const starPositions = useMemo(() => {
    const pos = new Float32Array(600);
    for (let i = 0; i < 600; i += 3) {
      pos[i] = (Math.random() - 0.5) * 12;
      pos[i + 1] = (Math.random() - 0.5) * 12;
      pos[i + 2] = (Math.random() - 0.5) * 12;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (shipRef.current) {
      shipRef.current.rotation.y = state.clock.elapsedTime * 0.15;
      shipRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.15;
    }
    if (nebulaRef.current) {
      nebulaRef.current.rotation.y = state.clock.elapsedTime * 0.03;
      nebulaRef.current.rotation.z = state.clock.elapsedTime * 0.015;
    }
  });

  return (
    <group>
      {/* Star field */}
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[starPositions, 3]} />
        </bufferGeometry>
        <pointsMaterial color="#ffffff" size={0.04} sizeAttenuation transparent opacity={0.8} />
      </points>

      {/* Nebula cloud */}
      <mesh ref={nebulaRef}>
        <sphereGeometry args={[3.5, 16, 16]} />
        <meshBasicMaterial color="#330066" transparent opacity={0.06} side={THREE.BackSide} depthWrite={false} />
      </mesh>
      <mesh rotation={[0.5, 0.3, 0]}>
        <sphereGeometry args={[2.8, 12, 12]} />
        <meshBasicMaterial color="#003355" transparent opacity={0.05} side={THREE.BackSide} depthWrite={false} />
      </mesh>

      {/* Spacecraft — simplified Orion shape */}
      <group ref={shipRef} position={[0, 0, 0]} scale={[0.9, 0.9, 0.9]}>
        <mesh>
          <cylinderGeometry args={[0.22, 0.4, 2.2, 16]} />
          <meshStandardMaterial color="#b8bec8" roughness={0.25} metalness={0.9} />
        </mesh>
        <mesh position={[0, 1.3, 0]}>
          <coneGeometry args={[0.22, 0.6, 16]} />
          <meshStandardMaterial color="#9aa0aa" roughness={0.2} metalness={0.95} />
        </mesh>
        {/* Solar panels */}
        {[-1, 1].map((side) => (
          <mesh key={side} position={[side * 0.9, 0.2, 0]}>
            <boxGeometry args={[1.2, 0.04, 0.5]} />
            <meshStandardMaterial color="#1a2a4a" roughness={0.2} metalness={0.5}
              emissive="#002244" emissiveIntensity={0.4} />
          </mesh>
        ))}
        {/* Engine glow */}
        <mesh position={[0, -1.2, 0]}>
          <sphereGeometry args={[0.18, 12, 12]} />
          <meshBasicMaterial color="#00aaff" transparent opacity={0.85} />
        </mesh>
        <pointLight position={[0, -1.4, 0]} color="#0088ff" intensity={2} distance={4} />
      </group>

      <ambientLight intensity={0.04} />
      <pointLight position={[-6, 4, -3]} color="#aa44ff" intensity={1.5} distance={15} />
      <pointLight position={[6, -2, 5]} color="#0044aa" intensity={1} distance={15} />
    </group>
  );
}

// Stage 3: Arrival — destination planet looming large
function ArrivalScene() {
  const planetRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  const planetTex = useMemo(() => {
    const size = 256;
    const c = document.createElement("canvas");
    c.width = size; c.height = size;
    const ctx = c.getContext("2d")!;
    ctx.fillStyle = "#8B3A2A";
    ctx.fillRect(0, 0, size, size);
    for (let i = 0; i < 25; i++) {
      const x = (Math.sin(i * 53.1) * 0.5 + 0.5) * size;
      const y = (Math.cos(i * 41.7) * 0.5 + 0.5) * size;
      const r = 8 + (Math.sin(i * 7.1) * 0.5 + 0.5) * 28;
      const g = ctx.createRadialGradient(x, y, 0, x, y, r);
      const dark = Math.sin(i * 13) > 0;
      g.addColorStop(0, dark ? "rgba(100,40,30,0.7)" : "rgba(180,80,50,0.5)");
      g.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }
    // Polar cap
    const cap = ctx.createRadialGradient(size / 2, 0, 0, size / 2, 0, size * 0.2);
    cap.addColorStop(0, "rgba(220,215,200,0.9)");
    cap.addColorStop(1, "rgba(220,215,200,0)");
    ctx.fillStyle = cap;
    ctx.fillRect(0, 0, size, size);
    // Limb darkening
    const limb = ctx.createRadialGradient(size / 2, size / 2, size * 0.35, size / 2, size / 2, size / 2);
    limb.addColorStop(0, "rgba(0,0,0,0)");
    limb.addColorStop(1, "rgba(0,0,0,0.55)");
    ctx.fillStyle = limb;
    ctx.fillRect(0, 0, size, size);
    return new THREE.CanvasTexture(c);
  }, []);

  useFrame((state) => {
    if (planetRef.current) {
      planetRef.current.rotation.y = state.clock.elapsedTime * 0.04;
    }
    if (glowRef.current) {
      (glowRef.current.material as THREE.MeshBasicMaterial).opacity =
        0.12 + Math.sin(state.clock.elapsedTime * 0.5) * 0.03;
    }
  });

  return (
    <group>
      {/* Mars */}
      <mesh ref={planetRef} position={[0.3, 0, 0]}>
        <sphereGeometry args={[2.0, 64, 64]} />
        <meshStandardMaterial map={planetTex} roughness={0.75} metalness={0.05} />
      </mesh>
      {/* Thin atmosphere */}
      <mesh ref={glowRef} position={[0.3, 0, 0]}>
        <sphereGeometry args={[2.12, 32, 32]} />
        <meshBasicMaterial color="#dd7744" transparent opacity={0.13} side={THREE.BackSide} depthWrite={false} />
      </mesh>

      {/* Approach trajectory arc */}
      {(() => {
        const points: THREE.Vector3[] = [];
        for (let i = 0; i <= 32; i++) {
          const t = i / 32;
          points.push(new THREE.Vector3(
            -4 + t * 3,
            -1.5 + t * 1.2,
            Math.sin(t * Math.PI) * 0.5
          ));
        }
        return (
          <line>
            <bufferGeometry setFromPoints={points} />
            <lineBasicMaterial color="#00d4ff" transparent opacity={0.4} />
          </line>
        );
      })()}

      {/* Stars behind */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[(() => {
              const p = new Float32Array(300);
              for (let i = 0; i < 300; i += 3) {
                p[i] = (Math.random() - 0.5) * 14;
                p[i + 1] = (Math.random() - 0.5) * 14;
                p[i + 2] = -5 + (Math.random() - 0.5) * 4;
              }
              return p;
            })(), 3]}
          />
        </bufferGeometry>
        <pointsMaterial color="#ffffff" size={0.04} sizeAttenuation transparent opacity={0.7} />
      </points>

      <ambientLight intensity={0.06} />
      <directionalLight position={[8, 3, 4]} intensity={2.8} color="#fff5e8" />
      <pointLight position={[-5, 2, -3]} color="#441100" intensity={0.4} distance={12} />
    </group>
  );
}

export default function JourneyWaypoint({ type, active }: WaypointProps) {
  if (!active) return null;

  switch (type) {
    case "launch":
      return <Float floatIntensity={0.3} rotationIntensity={0.1} speed={0.8}><LaunchScene /></Float>;
    case "orbit":
      return <OrbitScene />;
    case "transit":
      return <Float floatIntensity={0.2} rotationIntensity={0.05} speed={0.5}><TransitScene /></Float>;
    case "arrival":
      return <Float floatIntensity={0.15} rotationIntensity={0.08} speed={0.6}><ArrivalScene /></Float>;
    default:
      return null;
  }
}
