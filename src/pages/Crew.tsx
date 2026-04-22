import { Canvas } from "@react-three/fiber";
import { Environment, Float, Stars } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { Suspense, useState } from "react";
import FloatingHelmet from "../components/canvas/FloatingHelmet";
import Navbar from "../components/ui/Navbar";
import { crewList, CrewMember } from "../data/crewData";

export default function Crew() {
  const [activeMember, setActiveMember] = useState<CrewMember>(crewList[0]);

  return (
    <>
      <Navbar />

      {/* 3D Background */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
        }}
      >
        <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
          <color attach="background" args={["#050505"]} />
          <Suspense fallback={null}>
            <Stars
              radius={100}
              depth={50}
              count={5000}
              factor={4}
              saturation={0}
              fade
              speed={1}
            />
            <ambientLight intensity={0.06} />
            {/* Key light */}
            <directionalLight position={[5, 6, 4]} intensity={3} color="#d0e4ff" />
            {/* Rim light — blue-cyan from behind */}
            <pointLight position={[-6, 2, -5]} intensity={2} color="#00d4ff" />
            {/* Fill from below */}
            <pointLight position={[2, -4, 2]} intensity={0.5} color="#223355" />

            <Float speed={1.2} rotationIntensity={0.35} floatIntensity={0.4}>
              <group position={[2.2, 0, 0]} rotation={[0, -0.5, 0]}>
                <FloatingHelmet />
              </group>
            </Float>

            <Environment preset="night" />

            <EffectComposer>
              <Bloom intensity={0.6} luminanceThreshold={0.4} luminanceSmoothing={0.9} height={300} />
            </EffectComposer>
          </Suspense>
        </Canvas>
      </div>

      {/* Content Layout */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          background:
            "linear-gradient(90deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)",
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            textAlign: "left",
            zIndex: 10,
            maxWidth: "600px",
            pointerEvents: "auto",
            marginLeft: "5%",
          }}
        >
          <h4
            style={{
              color: "var(--c-accent-blue)",
              margin: 0,
              letterSpacing: "4px",
              fontFamily: "var(--font-tech)",
              fontSize: "1rem",
            }}
          >
            MEET THE TEAM
          </h4>
          <h1
            style={{
              fontSize: "4.5rem",
              margin: "0.5rem 0",
              fontFamily: "var(--font-display)",
              textTransform: "uppercase",
              fontWeight: 700,
              lineHeight: 1,
            }}
          >
            {activeMember.name}
          </h1>
          <h3
            style={{
              fontSize: "1.8rem",
              opacity: 0.8,
              marginTop: 0,
              fontFamily: "var(--font-body)",
              fontWeight: 300,
            }}
          >
            {activeMember.role}
          </h3>

          <p
            style={{
              fontSize: "1.1rem",
              lineHeight: 1.8,
              margin: "2rem 0",
              opacity: 0.9,
              fontFamily: "var(--font-body)",
              fontWeight: 300,
            }}
          >
            {activeMember.bio}
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "2rem",
              marginTop: "3rem",
            }}
          >
            <Stat label="Missions" value={activeMember.stats.missions} />
            <Stat
              label="Hours in Space"
              value={activeMember.stats.hoursInSpace}
            />
            <Stat label="Spacewalks" value={activeMember.stats.spacewalks} />
          </div>

          <div style={{ display: "flex", gap: "1rem", marginTop: "4rem" }}>
            {crewList.map((member) => (
              <button
                key={member.id}
                onClick={() => setActiveMember(member)}
                style={{
                  width: "60px",
                  height: "60px",
                  borderRadius: "50%",
                  border:
                    activeMember.id === member.id
                      ? "2px solid var(--c-accent-blue)"
                      : "2px solid rgba(255,255,255,0.2)",
                  background: "none",
                  backgroundImage: `url(${member.image})`,
                  backgroundSize: "cover",
                  cursor: "pointer",
                  opacity: activeMember.id === member.id ? 1 : 0.5,
                  transition: "all 0.3s",
                  transform:
                    activeMember.id === member.id ? "scale(1.1)" : "scale(1)",
                  boxShadow:
                    activeMember.id === member.id
                      ? "0 0 20px rgba(0,212,255,0.4)"
                      : "none",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div
        style={{
          fontSize: "2.5rem",
          fontWeight: 900,
          color: "white",
          fontFamily: "var(--font-display)",
        }}
      >
        {value}
      </div>
      <div
        style={{
          fontSize: "0.8rem",
          textTransform: "uppercase",
          letterSpacing: "2px",
          opacity: 0.6,
          marginTop: "0.5rem",
          fontFamily: "var(--font-tech)",
        }}
      >
        {label}
      </div>
    </div>
  );
}
