import { Canvas } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import { Suspense, useState } from "react";
import Navbar from "../components/ui/Navbar";
import { crewList, CrewMember } from "../data/crewData";

export default function Crew() {
  const [activeMember, setActiveMember] = useState<CrewMember>(crewList[0]);

  return (
    <>
      {/* Star background */}
      <div style={{ position: "fixed", inset: 0, zIndex: 0 }}>
        <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
          <color attach="background" args={["#050508"]} />
          <Suspense fallback={null}>
            <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={0.5} />
          </Suspense>
        </Canvas>
      </div>

      {/* Right — crew photo */}
      <div style={{ position: "fixed", right: 0, top: 0, width: "52%", height: "100%", zIndex: 1, overflow: "hidden" }}>
        <img
          key={activeMember.id}
          src={activeMember.image.replace("w=200", "w=900").replace("h=200", "h=1200")}
          alt={activeMember.name}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center top",
            animation: "photoIn 0.55s cubic-bezier(0.4, 0, 0.2, 1) both",
          }}
        />
        {/* Gradient fade to left */}
        <div style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(90deg, #050508 0%, rgba(5,5,8,0.55) 35%, transparent 70%)",
          pointerEvents: "none",
        }} />
        {/* Bottom fade */}
        <div style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(0deg, #050508 0%, transparent 30%)",
          pointerEvents: "none",
        }} />
      </div>

      <Navbar />

      {/* Left — crew info */}
      <div style={{
        position: "fixed",
        left: 0,
        top: 0,
        width: "58%",
        height: "100%",
        zIndex: 2,
        display: "flex",
        alignItems: "center",
        pointerEvents: "none",
      }}>
        <div
          key={activeMember.id}
          style={{ marginLeft: "8%", maxWidth: "520px", animation: "contentIn 0.4s ease-out both" }}
        >
          <div style={{
            color: "var(--c-accent-blue)",
            fontFamily: "var(--font-tech)",
            fontSize: "0.75rem",
            letterSpacing: "5px",
            textTransform: "uppercase",
            marginBottom: "1rem",
          }}>
            MEET THE TEAM
          </div>

          <h1 style={{
            fontSize: "clamp(2.8rem, 5vw, 4.5rem)",
            margin: "0 0 0.4rem 0",
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            lineHeight: 1,
            textTransform: "uppercase",
            borderLeft: "4px solid var(--c-accent-blue)",
            paddingLeft: "1.5rem",
          }}>
            {activeMember.name}
          </h1>

          <div style={{
            fontSize: "1.1rem",
            opacity: 0.6,
            fontFamily: "var(--font-body)",
            fontWeight: 300,
            letterSpacing: "1px",
            paddingLeft: "1.5rem",
            marginBottom: "2rem",
          }}>
            {activeMember.role}
          </div>

          <p style={{
            fontSize: "1rem",
            lineHeight: 1.85,
            opacity: 0.8,
            fontFamily: "var(--font-body)",
            fontWeight: 300,
            paddingLeft: "1.5rem",
            maxWidth: "400px",
          }}>
            {activeMember.bio}
          </p>

          {/* Stats */}
          <div style={{ display: "flex", gap: "2.5rem", marginTop: "2.5rem", paddingLeft: "1.5rem" }}>
            <Stat label="Missions" value={activeMember.stats.missions} />
            <Stat label="Hours in Space" value={activeMember.stats.hoursInSpace} />
            <Stat label="Spacewalks" value={activeMember.stats.spacewalks} />
          </div>

          {/* Crew selector */}
          <div style={{
            display: "flex",
            gap: "1.2rem",
            marginTop: "3.5rem",
            paddingLeft: "1.5rem",
            pointerEvents: "auto",
          }}>
            {crewList.map((member) => {
              const isActive = activeMember.id === member.id;
              return (
                <button
                  key={member.id}
                  onClick={() => setActiveMember(member)}
                  title={member.name}
                  style={{
                    width: isActive ? "80px" : "64px",
                    height: isActive ? "80px" : "64px",
                    borderRadius: "50%",
                    border: isActive ? "2px solid var(--c-accent-blue)" : "2px solid rgba(255,255,255,0.15)",
                    background: "none",
                    backgroundImage: `url(${member.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center top",
                    cursor: "pointer",
                    opacity: isActive ? 1 : 0.45,
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    boxShadow: isActive ? "0 0 20px rgba(0,212,255,0.5), 0 0 0 3px rgba(0,212,255,0.15)" : "none",
                    flexShrink: 0,
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes photoIn {
          from { opacity: 0; transform: scale(1.04); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes contentIn {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div style={{
        fontSize: "2.2rem",
        fontWeight: 900,
        color: "white",
        fontFamily: "var(--font-display)",
        lineHeight: 1,
      }}>
        {value.toLocaleString()}
      </div>
      <div style={{
        fontSize: "0.7rem",
        textTransform: "uppercase",
        letterSpacing: "2px",
        opacity: 0.5,
        marginTop: "0.4rem",
        fontFamily: "var(--font-tech)",
      }}>
        {label}
      </div>
    </div>
  );
}
