import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { PlanetData } from "../../data/planetsData";

interface PlanetProps {
  data: PlanetData;
  onClick?: () => void;
  isSelected?: boolean;
}

function generatePlanetTexture(name: string, color: string): THREE.CanvasTexture {
  const size = 512;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;

  const base = new THREE.Color(color);
  const r = Math.round(base.r * 255);
  const g = Math.round(base.g * 255);
  const b = Math.round(base.b * 255);

  const isGasGiant = name === "Jupiter" || name === "Saturn";
  const isIceGiant = name === "Uranus" || name === "Neptune";
  const isEarth = name === "Earth";
  const isVenus = name === "Venus";

  if (isGasGiant) {
    // Horizontal banded atmosphere
    const bands = name === "Jupiter" ? 18 : 12;
    for (let i = 0; i < bands; i++) {
      const y = (i / bands) * size;
      const h = size / bands;
      const t = i / bands;
      const shift = Math.sin(t * Math.PI * 3) * 30;
      ctx.fillStyle = `rgba(${r + shift | 0}, ${g + (shift * 0.5) | 0}, ${b - shift | 0}, 1)`;
      ctx.fillRect(0, y, size, h + 2);

      // Add subtle wave distortion lines
      ctx.beginPath();
      for (let x = 0; x < size; x += 2) {
        const wave = Math.sin(x * 0.05 + t * 10) * 4;
        ctx.fillStyle = `rgba(${r + shift + 20 | 0},${g + shift | 0},${b | 0},0.2)`;
        ctx.fillRect(x, y + h * 0.5 + wave, 2, 3);
      }
    }

    // Great Red Spot for Jupiter
    if (name === "Jupiter") {
      const gx = size * 0.6;
      const gy = size * 0.58;
      const grd = ctx.createRadialGradient(gx, gy, 0, gx, gy, 38);
      grd.addColorStop(0, "rgba(180,60,30,0.95)");
      grd.addColorStop(0.5, "rgba(160,50,20,0.7)");
      grd.addColorStop(1, "rgba(140,40,10,0)");
      ctx.fillStyle = grd;
      ctx.beginPath();
      ctx.ellipse(gx, gy, 38, 22, 0, 0, Math.PI * 2);
      ctx.fill();
    }
  } else if (isIceGiant) {
    // Smooth gradient with subtle banding
    const grd = ctx.createLinearGradient(0, 0, 0, size);
    grd.addColorStop(0, `rgb(${r + 40},${g + 40},${b + 40})`);
    grd.addColorStop(0.4, `rgb(${r},${g},${b})`);
    grd.addColorStop(0.7, `rgb(${r - 20},${g - 20},${b - 20})`);
    grd.addColorStop(1, `rgb(${r - 40},${g - 40},${b - 40})`);
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, size, size);

    // Subtle atmospheric wisps
    for (let i = 0; i < 6; i++) {
      const y = (i / 6) * size + size / 12;
      const opacity = 0.06 + Math.random() * 0.06;
      ctx.fillStyle = `rgba(255,255,255,${opacity})`;
      ctx.beginPath();
      ctx.ellipse(size / 2, y, size * 0.45, 6, 0, 0, Math.PI * 2);
      ctx.fill();
    }
  } else if (isEarth) {
    // Ocean base
    ctx.fillStyle = `rgb(${r},${g},${b})`;
    ctx.fillRect(0, 0, size, size);

    // Polar ice caps
    const northGrd = ctx.createRadialGradient(size / 2, 0, 0, size / 2, 0, size * 0.25);
    northGrd.addColorStop(0, "rgba(240,250,255,0.95)");
    northGrd.addColorStop(1, "rgba(240,250,255,0)");
    ctx.fillStyle = northGrd;
    ctx.fillRect(0, 0, size, size);

    const southGrd = ctx.createRadialGradient(size / 2, size, 0, size / 2, size, size * 0.2);
    southGrd.addColorStop(0, "rgba(240,250,255,0.95)");
    southGrd.addColorStop(1, "rgba(240,250,255,0)");
    ctx.fillStyle = southGrd;
    ctx.fillRect(0, 0, size, size);

    // Landmasses (rough continent blobs)
    const continents: [number, number, number, number][] = [
      [0.3, 0.35, 0.15, 0.22],
      [0.55, 0.4, 0.18, 0.14],
      [0.45, 0.6, 0.12, 0.16],
      [0.15, 0.55, 0.1, 0.12],
      [0.72, 0.55, 0.09, 0.13],
    ];
    for (const [cx, cy, rx, ry] of continents) {
      const grd = ctx.createRadialGradient(cx * size, cy * size, 0, cx * size, cy * size, rx * size);
      grd.addColorStop(0, "rgba(34,120,40,0.9)");
      grd.addColorStop(0.6, "rgba(60,140,30,0.7)");
      grd.addColorStop(1, "rgba(40,100,20,0)");
      ctx.fillStyle = grd;
      ctx.beginPath();
      ctx.ellipse(cx * size, cy * size, rx * size, ry * size, Math.random() * Math.PI, 0, Math.PI * 2);
      ctx.fill();
    }

    // Cloud wisps
    for (let i = 0; i < 8; i++) {
      const cx = (i / 8 + 0.06) * size;
      const cy = (0.2 + Math.sin(i * 1.7) * 0.3) * size;
      ctx.fillStyle = "rgba(255,255,255,0.35)";
      ctx.beginPath();
      ctx.ellipse(cx, cy, 60, 10, Math.sin(i) * 0.5, 0, Math.PI * 2);
      ctx.fill();
    }
  } else if (isVenus) {
    // Thick cloudy atmosphere
    const grd = ctx.createLinearGradient(0, 0, size, size);
    grd.addColorStop(0, `rgb(${r + 40},${g + 30},${b - 40})`);
    grd.addColorStop(0.5, `rgb(${r},${g},${b})`);
    grd.addColorStop(1, `rgb(${r - 20},${g - 10},${b - 60})`);
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, size, size);

    // Swirling cloud bands
    for (let i = 0; i < 20; i++) {
      const y = (i / 20) * size;
      ctx.fillStyle = `rgba(255,240,200,${0.04 + Math.abs(Math.sin(i)) * 0.08})`;
      ctx.beginPath();
      for (let x = 0; x < size; x++) {
        const wave = Math.sin(x * 0.02 + i * 0.5) * 8 + Math.sin(x * 0.05 + i) * 4;
        ctx.fillRect(x, y + wave, 1, 5);
      }
    }
  } else {
    // Rocky planets (Mercury, Mars, Moon)
    ctx.fillStyle = `rgb(${r},${g},${b})`;
    ctx.fillRect(0, 0, size, size);

    // Terrain variation
    for (let i = 0; i < 40; i++) {
      const x = (Math.sin(i * 97.3) * 0.5 + 0.5) * size;
      const y = (Math.cos(i * 41.7) * 0.5 + 0.5) * size;
      const radius = 5 + (Math.sin(i * 7.1) * 0.5 + 0.5) * 35;
      const dark = Math.sin(i * 13) > 0;
      const grd = ctx.createRadialGradient(x, y, 0, x, y, radius);
      grd.addColorStop(0, dark
        ? `rgba(${r - 35},${g - 30},${b - 20},0.6)`
        : `rgba(${r + 30},${g + 25},${b + 15},0.4)`);
      grd.addColorStop(0.5, dark
        ? `rgba(${r - 15},${g - 12},${b - 8},0.35)`
        : `rgba(${r + 12},${g + 10},${b + 6},0.2)`);
      grd.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = grd;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    }

    // Crater rims
    for (let i = 0; i < 15; i++) {
      const x = (Math.sin(i * 53.1) * 0.5 + 0.5) * size;
      const y = (Math.cos(i * 79.3) * 0.5 + 0.5) * size;
      const radius = 8 + (Math.sin(i * 3.3) * 0.5 + 0.5) * 20;
      ctx.strokeStyle = `rgba(${r + 40},${g + 35},${b + 25},0.5)`;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.stroke();
    }

    // Mars polar cap
    if (name === "Mars") {
      const capGrd = ctx.createRadialGradient(size / 2, 0, 0, size / 2, 0, size * 0.18);
      capGrd.addColorStop(0, "rgba(230,230,220,0.9)");
      capGrd.addColorStop(1, "rgba(230,230,220,0)");
      ctx.fillStyle = capGrd;
      ctx.fillRect(0, 0, size, size);
    }
  }

  // Atmospheric limb glow overlay on all planets
  const limbGrd = ctx.createRadialGradient(size * 0.5, size * 0.5, size * 0.35, size * 0.5, size * 0.5, size * 0.5);
  limbGrd.addColorStop(0, "rgba(0,0,0,0)");
  limbGrd.addColorStop(0.7, "rgba(0,0,0,0)");
  limbGrd.addColorStop(1, "rgba(0,0,0,0.55)");
  ctx.fillStyle = limbGrd;
  ctx.fillRect(0, 0, size, size);

  return new THREE.CanvasTexture(canvas);
}

function generateNormalMap(name: string): THREE.CanvasTexture {
  const size = 256;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;

  // Base normal (flat = 128,128,255)
  ctx.fillStyle = "rgb(128,128,255)";
  ctx.fillRect(0, 0, size, size);

  const isGasGiant = name === "Jupiter" || name === "Saturn";
  const isSmooth = name === "Uranus" || name === "Neptune" || name === "Venus";

  if (!isGasGiant && !isSmooth) {
    // Bump up rough terrain details
    for (let i = 0; i < 20; i++) {
      const x = (Math.sin(i * 53.1) * 0.5 + 0.5) * size;
      const y = (Math.cos(i * 79.3) * 0.5 + 0.5) * size;
      const radius = 10 + (Math.sin(i * 3.3) * 0.5 + 0.5) * 25;
      const grd = ctx.createRadialGradient(x, y, 0, x, y, radius);
      grd.addColorStop(0, "rgba(100,100,255,0.8)");
      grd.addColorStop(0.5, "rgba(128,128,255,0.5)");
      grd.addColorStop(1, "rgba(140,140,255,0)");
      ctx.fillStyle = grd;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  return new THREE.CanvasTexture(canvas);
}

export default function Planet({ data, onClick, isSelected }: PlanetProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const orbitRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  const { colorMap, normalMap } = useMemo(() => ({
    colorMap: generatePlanetTexture(data.name, data.color),
    normalMap: generateNormalMap(data.name),
  }), [data.name, data.color]);

  const hasSaturnRings = data.name === "Saturn";
  const hasUranusRings = data.name === "Uranus";

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += data.rotationSpeed;
    }
    if (orbitRef.current) {
      orbitRef.current.rotation.y += data.orbitSpeed;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = state.clock.elapsedTime * 0.05;
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
            map={colorMap}
            normalMap={normalMap}
            normalScale={new THREE.Vector2(0.6, 0.6)}
            roughness={data.name === "Jupiter" || data.name === "Saturn" ? 0.9 : 0.75}
            metalness={0.05}
            emissive={new THREE.Color(data.color)}
            emissiveIntensity={isSelected ? 0.12 : 0.04}
          />
        </mesh>

        {/* Atmosphere glow */}
        {data.name !== "Mercury" && (
          <mesh>
            <sphereGeometry args={[data.radius * 1.08, 32, 32]} />
            <meshBasicMaterial
              color={data.color}
              transparent
              opacity={data.name === "Venus" ? 0.25 : 0.1}
              blending={THREE.AdditiveBlending}
              side={THREE.BackSide}
              depthWrite={false}
            />
          </mesh>
        )}

        {/* Saturn rings */}
        {hasSaturnRings && (
          <group rotation={[Math.PI * 0.12, 0, 0]}>
            {[0, 1, 2].map((i) => {
              const innerR = data.radius * (1.35 + i * 0.28);
              const outerR = data.radius * (1.58 + i * 0.28);
              const opacity = [0.65, 0.45, 0.25][i];
              return (
                <mesh key={i} rotation={[-Math.PI / 2, 0, 0]}>
                  <ringGeometry args={[innerR, outerR, 128]} />
                  <meshBasicMaterial
                    color="#c8a96e"
                    transparent
                    opacity={opacity}
                    side={THREE.DoubleSide}
                    depthWrite={false}
                    blending={THREE.NormalBlending}
                  />
                </mesh>
              );
            })}
          </group>
        )}

        {/* Uranus faint rings */}
        {hasUranusRings && (
          <mesh ref={ringRef} rotation={[Math.PI * 0.45, 0, 0]}>
            <ringGeometry args={[data.radius * 1.5, data.radius * 1.7, 64]} />
            <meshBasicMaterial
              color="#aaddee"
              transparent
              opacity={0.18}
              side={THREE.DoubleSide}
              depthWrite={false}
            />
          </mesh>
        )}

        {/* Selection ring */}
        {isSelected && (
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[data.radius * 1.5, data.radius * 1.55, 64]} />
            <meshBasicMaterial
              color="#00d4ff"
              transparent
              opacity={0.85}
              side={THREE.DoubleSide}
              depthWrite={false}
            />
          </mesh>
        )}
      </group>

      {/* Orbit path — only in solar system view */}
      {data.distance > 0 && (
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[data.distance * 10 - 0.02, data.distance * 10 + 0.02, 128]} />
          <meshBasicMaterial
            color="#ffffff"
            transparent
            opacity={0.06}
            side={THREE.DoubleSide}
            depthWrite={false}
          />
        </mesh>
      )}
    </group>
  );
}
