import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Html, Float } from "@react-three/drei";
import * as THREE from "three";

interface TicketProps {
  destination: string;
  date: string;
  passengers: number;
  price: string;
}

export default function TicketPreview({
  destination,
  date,
  passengers,
  price,
}: TicketProps) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      // Gentle floating and rotation
      groupRef.current.rotation.y =
        Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      groupRef.current.rotation.x =
        Math.sin(state.clock.elapsedTime * 0.3) * 0.05;
    }
  });

  return (
    <Float floatIntensity={1} rotationIntensity={0.5}>
      <group ref={groupRef}>
        {/* Holographic Card Background */}
        <mesh>
          <boxGeometry args={[4, 2.5, 0.1]} />
          <meshPhysicalMaterial
            color="#ffffff"
            transmission={0.6}
            thickness={2}
            roughness={0}
            metalness={0.5}
            clearcoat={1}
          />
        </mesh>

        {/* Border glow */}
        <mesh>
          <boxGeometry args={[4.05, 2.55, 0.08]} />
          <meshBasicMaterial color="#00d4ff" transparent opacity={0.3} />
        </mesh>

        {/* Content projection */}
        <Html
          transform
          position={[0, 0, 0.06]}
          scale={0.5}
          style={{
            width: "750px",
            height: "450px",
            padding: "40px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            background:
              "linear-gradient(135deg, rgba(0,0,0,0.8), rgba(20,20,50,0.8))",
            borderRadius: "15px",
            border: "2px solid rgba(0, 212, 255, 0.5)",
            color: "white",
            fontFamily: "var(--font-body)",
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h1
              style={{
                margin: 0,
                fontFamily: "var(--font-heading)",
                fontSize: "3rem",
                letterSpacing: "4px",
              }}
            >
              BOARDING PASS
            </h1>
            <div style={{ fontSize: "2rem" }}>🚀</div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 1fr",
              gap: "2rem",
            }}
          >
            <div>
              <div
                style={{
                  fontSize: "1.2rem",
                  opacity: 0.6,
                  marginBottom: "0.5rem",
                }}
              >
                DESTINATION
              </div>
              <div
                style={{
                  fontSize: "2.5rem",
                  fontWeight: "bold",
                  color: "#00d4ff",
                  fontFamily: "var(--font-heading)",
                }}
              >
                {destination}
              </div>
            </div>
            <div>
              <div
                style={{
                  fontSize: "1.2rem",
                  opacity: 0.6,
                  marginBottom: "0.5rem",
                }}
              >
                CLASS
              </div>
              <div style={{ fontSize: "2rem", fontWeight: "bold" }}>
                PREMIUM
              </div>
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <div style={{ fontSize: "1rem", opacity: 0.6 }}>DATE</div>
              <div style={{ fontSize: "1.5rem" }}>{date || "SELECT DATE"}</div>
            </div>
            <div>
              <div style={{ fontSize: "1rem", opacity: 0.6 }}>PASSENGERS</div>
              <div style={{ fontSize: "1.5rem" }}>{passengers}</div>
            </div>
            <div>
              <div style={{ fontSize: "1rem", opacity: 0.6 }}>TOTAL</div>
              <div style={{ fontSize: "1.5rem", color: "#ffd700" }}>
                {price}
              </div>
            </div>
          </div>

          <div
            style={{
              borderTop: "2px dashed rgba(255,255,255,0.3)",
              paddingTop: "20px",
              display: "flex",
              justifyContent: "space-between",
              opacity: 0.7,
              fontSize: "0.9rem",
            }}
          >
            <span>EVENT HORIZON SPACE TOURISM</span>
            <span>
              TOKEN: {Math.random().toString(36).substr(2, 9).toUpperCase()}
            </span>
          </div>
        </Html>
      </group>
    </Float>
  );
}
