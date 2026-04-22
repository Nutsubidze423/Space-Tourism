import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface ModelProps {
  color: string;
  type: string;
}

// Orion-X: Luxury deep-space cruiser
function OrionX({ color }: { color: string }) {
  const engineGlowRef = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    if (engineGlowRef.current) {
      engineGlowRef.current.intensity = 1.8 + Math.sin(state.clock.elapsedTime * 8) * 0.4;
    }
  });

  const accentColor = color;
  const hullColor = "#c8cdd4";
  const darkMetal = "#1a1e24";
  const glassMat = { roughness: 0, metalness: 1, transmission: 0.6, thickness: 0.5 };

  return (
    <group>
      {/* Primary hull - tapered fuselage */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.55, 0.85, 4.5, 24, 1]} />
        <meshStandardMaterial color={hullColor} roughness={0.25} metalness={0.85} />
      </mesh>

      {/* Forward nose cone */}
      <mesh position={[0, 2.55, 0]}>
        <coneGeometry args={[0.55, 1.4, 24]} />
        <meshStandardMaterial color={hullColor} roughness={0.2} metalness={0.9} />
      </mesh>

      {/* Aft section - wider engine block */}
      <mesh position={[0, -2.8, 0]}>
        <cylinderGeometry args={[0.85, 1.0, 0.8, 24]} />
        <meshStandardMaterial color={darkMetal} roughness={0.4} metalness={0.8} />
      </mesh>

      {/* Cockpit dome */}
      <mesh position={[0, 1.9, 0.3]}>
        <sphereGeometry args={[0.42, 32, 32, 0, Math.PI * 2, 0, Math.PI * 0.6]} />
        <meshPhysicalMaterial color="#0a0e14" {...glassMat} envMapIntensity={3} />
      </mesh>

      {/* Cockpit frame ring */}
      <mesh position={[0, 1.7, 0.15]} rotation={[0.3, 0, 0]}>
        <torusGeometry args={[0.44, 0.025, 12, 32]} />
        <meshStandardMaterial color={accentColor} emissive={accentColor} emissiveIntensity={0.6} metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Solar panel wings — left */}
      <group position={[-1.3, 0.2, 0]} rotation={[0, 0, -0.12]}>
        <mesh>
          <boxGeometry args={[1.6, 0.06, 0.9]} />
          <meshStandardMaterial color="#1a2a4a" roughness={0.3} metalness={0.6} />
        </mesh>
        {/* Panel cells */}
        {[0, 1, 2, 3].map((i) => (
          <mesh key={i} position={[-0.6 + i * 0.4, 0.04, 0]}>
            <boxGeometry args={[0.35, 0.01, 0.82]} />
            <meshStandardMaterial color="#0d1f3a" roughness={0.1} metalness={0.5}
              emissive="#0033aa" emissiveIntensity={0.15} />
          </mesh>
        ))}
        {/* Wing strut */}
        <mesh position={[-0.3, 0, 0]}>
          <cylinderGeometry args={[0.03, 0.05, 0.15, 8]} />
          <meshStandardMaterial color={darkMetal} roughness={0.4} metalness={0.9} />
        </mesh>
      </group>

      {/* Solar panel wings — right */}
      <group position={[1.3, 0.2, 0]} rotation={[0, 0, 0.12]}>
        <mesh>
          <boxGeometry args={[1.6, 0.06, 0.9]} />
          <meshStandardMaterial color="#1a2a4a" roughness={0.3} metalness={0.6} />
        </mesh>
        {[0, 1, 2, 3].map((i) => (
          <mesh key={i} position={[-0.6 + i * 0.4, 0.04, 0]}>
            <boxGeometry args={[0.35, 0.01, 0.82]} />
            <meshStandardMaterial color="#0d1f3a" roughness={0.1} metalness={0.5}
              emissive="#0033aa" emissiveIntensity={0.15} />
          </mesh>
        ))}
        <mesh position={[0.3, 0, 0]}>
          <cylinderGeometry args={[0.03, 0.05, 0.15, 8]} />
          <meshStandardMaterial color={darkMetal} roughness={0.4} metalness={0.9} />
        </mesh>
      </group>

      {/* Accent stripes */}
      {[-0.5, 0.5].map((y, i) => (
        <mesh key={i} position={[0, y, 0]}>
          <cylinderGeometry args={[0.87, 0.87, 0.06, 24]} />
          <meshStandardMaterial color={accentColor} emissive={accentColor} emissiveIntensity={0.5} roughness={0.1} />
        </mesh>
      ))}

      {/* Thruster cluster — 4 nozzles */}
      {[[-0.35, -0.35], [0.35, -0.35], [-0.35, 0.35], [0.35, 0.35]].map(([x, z], i) => (
        <group key={i} position={[x, -3.25, z]}>
          <mesh>
            <cylinderGeometry args={[0.12, 0.2, 0.5, 16]} />
            <meshStandardMaterial color={darkMetal} roughness={0.5} metalness={0.8} />
          </mesh>
          <mesh position={[0, -0.3, 0]}>
            <cylinderGeometry args={[0.2, 0.12, 0.25, 16]} />
            <meshStandardMaterial color="#111" roughness={0.8} metalness={0.4} />
          </mesh>
          {/* Engine bloom */}
          <mesh position={[0, -0.5, 0]}>
            <sphereGeometry args={[0.14, 16, 16]} />
            <meshBasicMaterial color={accentColor} transparent opacity={0.9} />
          </mesh>
        </group>
      ))}

      {/* Engine light source */}
      <pointLight ref={engineGlowRef} position={[0, -3.5, 0]} color={accentColor} intensity={2} distance={5} />

      {/* RCS thrusters — side bumps */}
      {[
        [0.88, 1.2, 0], [-0.88, 1.2, 0],
        [0.88, -1.0, 0], [-0.88, -1.0, 0],
      ].map(([x, y, z], i) => (
        <mesh key={i} position={[x, y, z]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.06, 0.06, 0.18, 8]} />
          <meshStandardMaterial color={darkMetal} roughness={0.4} metalness={0.9} />
        </mesh>
      ))}

      {/* Docking port ring at nose */}
      <mesh position={[0, 3.26, 0]}>
        <torusGeometry args={[0.18, 0.04, 8, 24]} />
        <meshStandardMaterial color={darkMetal} roughness={0.3} metalness={1} />
      </mesh>

      {/* Hull detail panels */}
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const angle = (i / 6) * Math.PI * 2;
        return (
          <mesh key={i} position={[Math.sin(angle) * 0.87, -0.8, Math.cos(angle) * 0.87]}
            rotation={[0, -angle, 0]}>
            <boxGeometry args={[0.18, 0.6, 0.04]} />
            <meshStandardMaterial color={i % 2 === 0 ? "#e0e4ea" : darkMetal} roughness={0.3} metalness={0.85} />
          </mesh>
        );
      })}
    </group>
  );
}

// Nebula Runner: Aggressive stealth fighter
function NebulaRunner({ color }: { color: string }) {
  const trailRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (trailRef.current) {
      (trailRef.current.material as THREE.MeshBasicMaterial).opacity =
        0.6 + Math.sin(state.clock.elapsedTime * 12) * 0.25;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 2]}>
      {/* Main fuselage — needle body */}
      <mesh>
        <cylinderGeometry args={[0.22, 0.6, 5.5, 6, 1]} />
        <meshStandardMaterial color="#1c1f26" roughness={0.15} metalness={0.95} />
      </mesh>

      {/* Nose spike */}
      <mesh position={[0, 3.2, 0]}>
        <coneGeometry args={[0.22, 1.8, 6]} />
        <meshStandardMaterial color="#141619" roughness={0.1} metalness={1} />
      </mesh>

      {/* Main swept wings — left */}
      <mesh position={[-1.8, -0.5, 0]} rotation={[0, 0, 0.35]}>
        <boxGeometry args={[2.8, 0.07, 0.8]} />
        <meshStandardMaterial color="#191c22" roughness={0.2} metalness={0.9} />
      </mesh>
      {/* Wing accent */}
      <mesh position={[-2.8, -0.8, 0]} rotation={[0, 0, 0.35]}>
        <boxGeometry args={[1.0, 0.05, 0.18]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.8} roughness={0.05} />
      </mesh>

      {/* Main swept wings — right */}
      <mesh position={[1.8, -0.5, 0]} rotation={[0, 0, -0.35]}>
        <boxGeometry args={[2.8, 0.07, 0.8]} />
        <meshStandardMaterial color="#191c22" roughness={0.2} metalness={0.9} />
      </mesh>
      <mesh position={[2.8, -0.8, 0]} rotation={[0, 0, -0.35]}>
        <boxGeometry args={[1.0, 0.05, 0.18]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.8} roughness={0.05} />
      </mesh>

      {/* Tail fins */}
      <mesh position={[0, -2.2, 0.55]} rotation={[-0.4, 0, 0]}>
        <boxGeometry args={[0.08, 1.4, 0.7]} />
        <meshStandardMaterial color="#111316" roughness={0.2} metalness={0.95} />
      </mesh>
      <mesh position={[0, -2.2, -0.55]} rotation={[0.4, 0, 0]}>
        <boxGeometry args={[0.08, 1.4, 0.7]} />
        <meshStandardMaterial color="#111316" roughness={0.2} metalness={0.95} />
      </mesh>

      {/* Cockpit canopy */}
      <mesh position={[0, 1.0, 0.32]} rotation={[0.3, 0, 0]}>
        <sphereGeometry args={[0.32, 24, 24, 0, Math.PI * 2, 0, Math.PI * 0.55]} />
        <meshPhysicalMaterial color="#060a10" roughness={0} metalness={1}
          transmission={0.45} thickness={0.3} envMapIntensity={4} />
      </mesh>

      {/* Engine intake scoops */}
      {[-0.28, 0.28].map((x, i) => (
        <mesh key={i} position={[x, -1.2, 0.32]}>
          <cylinderGeometry args={[0.18, 0.14, 0.5, 12]} />
          <meshStandardMaterial color="#0d1014" roughness={0.3} metalness={0.8} />
        </mesh>
      ))}

      {/* Engine glow nozzle */}
      <mesh position={[0, -2.9, 0]}>
        <cylinderGeometry args={[0.28, 0.6, 0.6, 16]} />
        <meshStandardMaterial color="#0d1014" roughness={0.4} metalness={0.8} />
      </mesh>
      <mesh ref={trailRef} position={[0, -3.4, 0]}>
        <sphereGeometry args={[0.35, 16, 16]} />
        <meshBasicMaterial color={color} transparent opacity={0.75} />
      </mesh>
      <pointLight position={[0, -3.5, 0]} color={color} intensity={3} distance={6} />

      {/* Hull accent lines */}
      {[0.6, -0.4].map((y, i) => (
        <mesh key={i} position={[0, y, 0]}>
          <cylinderGeometry args={[0.61, 0.61, 0.04, 6]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.7} roughness={0.05} />
        </mesh>
      ))}

      {/* Weapon hardpoints */}
      {[-0.5, 0.5].map((x, i) => (
        <mesh key={i} position={[x, 0.5, 0.4]}>
          <cylinderGeometry args={[0.04, 0.04, 0.9, 8]} />
          <meshStandardMaterial color="#0a0d10" roughness={0.2} metalness={0.95} />
        </mesh>
      ))}
    </group>
  );
}

// Titan Hauler: Heavy industrial freighter
function TitanHauler({ color }: { color: string }) {
  const engineRefs = [
    useRef<THREE.PointLight>(null),
    useRef<THREE.PointLight>(null),
    useRef<THREE.PointLight>(null),
  ];

  useFrame((state) => {
    engineRefs.forEach((ref, i) => {
      if (ref.current) {
        ref.current.intensity = 1.2 + Math.sin(state.clock.elapsedTime * 6 + i * 1.2) * 0.3;
      }
    });
  });

  const hull = "#4a5060";
  const rust = "#6a5040";
  const panel = "#3a3f4a";

  return (
    <group>
      {/* Command module — forward */}
      <mesh position={[0, 2.8, 0]}>
        <boxGeometry args={[1.4, 1.2, 1.2]} />
        <meshStandardMaterial color={hull} roughness={0.55} metalness={0.7} />
      </mesh>

      {/* Bridge viewport */}
      <mesh position={[0, 3.1, 0.62]}>
        <boxGeometry args={[0.9, 0.4, 0.08]} />
        <meshPhysicalMaterial color="#050a12" roughness={0} metalness={1}
          transmission={0.5} envMapIntensity={2} />
      </mesh>
      {/* Bridge light */}
      <mesh position={[0, 3.1, 0.65]}>
        <boxGeometry args={[0.85, 0.36, 0.01]} />
        <meshBasicMaterial color="#80aaff" transparent opacity={0.3} />
      </mesh>

      {/* Spine/truss connecting command to engines */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.5, 5.5, 0.5]} />
        <meshStandardMaterial color={panel} roughness={0.6} metalness={0.65} />
      </mesh>

      {/* Truss cross-beams */}
      {[-1.5, -0.5, 0.5, 1.5].map((y, i) => (
        <mesh key={i} position={[0, y, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.04, 0.04, 1.5, 8]} />
          <meshStandardMaterial color={panel} roughness={0.6} metalness={0.7} />
        </mesh>
      ))}

      {/* Cargo modules — left side */}
      {[1.2, 0, -1.2].map((y, i) => (
        <group key={i} position={[-1.1, y, 0]}>
          <mesh>
            <boxGeometry args={[1.0, 0.95, 0.9]} />
            <meshStandardMaterial color={i % 2 === 0 ? rust : hull} roughness={0.7} metalness={0.5} />
          </mesh>
          {/* Cargo door detail */}
          <mesh position={[0.51, 0, 0]}>
            <boxGeometry args={[0.02, 0.85, 0.8]} />
            <meshStandardMaterial color={panel} roughness={0.4} metalness={0.8} />
          </mesh>
          {/* Hinge detail */}
          {[-0.35, 0.35].map((z, j) => (
            <mesh key={j} position={[0.52, 0, z]}>
              <cylinderGeometry args={[0.04, 0.04, 0.12, 8]} />
              <meshStandardMaterial color="#888" roughness={0.3} metalness={0.9} />
            </mesh>
          ))}
        </group>
      ))}

      {/* Cargo modules — right side */}
      {[1.2, 0, -1.2].map((y, i) => (
        <group key={i} position={[1.1, y, 0]}>
          <mesh>
            <boxGeometry args={[1.0, 0.95, 0.9]} />
            <meshStandardMaterial color={i % 2 !== 0 ? rust : hull} roughness={0.7} metalness={0.5} />
          </mesh>
          <mesh position={[-0.51, 0, 0]}>
            <boxGeometry args={[0.02, 0.85, 0.8]} />
            <meshStandardMaterial color={panel} roughness={0.4} metalness={0.8} />
          </mesh>
          {[-0.35, 0.35].map((z, j) => (
            <mesh key={j} position={[-0.52, 0, z]}>
              <cylinderGeometry args={[0.04, 0.04, 0.12, 8]} />
              <meshStandardMaterial color="#888" roughness={0.3} metalness={0.9} />
            </mesh>
          ))}
        </group>
      ))}

      {/* Engine block — aft */}
      <mesh position={[0, -2.8, 0]}>
        <boxGeometry args={[1.6, 1.0, 1.4]} />
        <meshStandardMaterial color={panel} roughness={0.5} metalness={0.75} />
      </mesh>

      {/* 3 engine bells */}
      {[[-0.5, 0], [0.5, 0], [0, 0]].map(([x, z], i) => (
        <group key={i} position={[x, -3.4, z]}>
          <mesh>
            <cylinderGeometry args={[0.18, 0.35, 0.7, 16]} />
            <meshStandardMaterial color="#222" roughness={0.6} metalness={0.7} />
          </mesh>
          <mesh position={[0, -0.4, 0]}>
            <cylinderGeometry args={[0.35, 0.25, 0.2, 16]} />
            <meshStandardMaterial color="#111" roughness={0.8} metalness={0.5} />
          </mesh>
          <mesh position={[0, -0.6, 0]}>
            <sphereGeometry args={[0.22, 16, 16]} />
            <meshBasicMaterial color={color} transparent opacity={0.85} />
          </mesh>
          <pointLight ref={engineRefs[i]} position={[0, -0.7, 0]}
            color={color} intensity={1.5} distance={4} />
        </group>
      ))}

      {/* Radiator panels */}
      {[
        [0, 0.8, 0.75],
        [0, 0.8, -0.75],
      ].map(([x, y, z], i) => (
        <mesh key={i} position={[x, y, z]}>
          <boxGeometry args={[1.3, 2.2, 0.04]} />
          <meshStandardMaterial color="#cc3300" roughness={0.3} metalness={0.5}
            emissive="#440800" emissiveIntensity={0.4} />
        </mesh>
      ))}

      {/* Navigation lights */}
      {[[-0.72, 2.8, 0.61], [0.72, 2.8, 0.61]].map(([x, y, z], i) => (
        <mesh key={i} position={[x, y, z]}>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshBasicMaterial color={i === 0 ? "#ff4444" : "#44ff44"} />
        </mesh>
      ))}
    </group>
  );
}

export default function SpacecraftModel({ color, type }: ModelProps) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.15;
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.18) * 0.03;
    }
  });

  const renderShip = () => {
    switch (type) {
      case "orion-x":
        return <OrionX color={color} />;
      case "nebula-runner":
        return <NebulaRunner color={color} />;
      default:
        return <TitanHauler color={color} />;
    }
  };

  return (
    <group ref={groupRef} rotation={[0, Math.PI / 6, 0]}>
      {renderShip()}
    </group>
  );
}
