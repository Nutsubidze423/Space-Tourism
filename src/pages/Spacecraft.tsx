import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, Stars } from "@react-three/drei";
import { EffectComposer, Bloom, ChromaticAberration } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { Suspense, useState, useRef } from "react";
import * as THREE from "three";
import SpacecraftModel from "../components/canvas/SpacecraftModel";
import Navbar from "../components/ui/Navbar";
import LuxuryButton from "../components/ui/LuxuryButton";
import { spacecraftList } from "../data/spacecraftData";

export default function Spacecraft() {
  const [activeShipIndex, setActiveShipIndex] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const pendingRef = useRef(0);

  const activeShip = spacecraftList[activeShipIndex];

  const switchShip = (newIndex: number) => {
    if (transitioning) return;
    pendingRef.current = newIndex;
    setTransitioning(true);
    setTimeout(() => {
      setActiveShipIndex(newIndex);
      setTimeout(() => setTransitioning(false), 250);
    }, 250);
  };

  const nextShip = () => switchShip((activeShipIndex + 1) % spacecraftList.length);
  const prevShip = () => switchShip((activeShipIndex - 1 + spacecraftList.length) % spacecraftList.length);

  return (
    <>
      <Navbar />

      {/* 3D Canvas */}
      <div style={{ position: "fixed", inset: 0, zIndex: 0 }}>
        <Canvas shadows dpr={[1, 1.5]} camera={{ position: [0, 2, 10], fov: 45 }}>
          <color attach="background" args={["#030508"]} />
          <fog attach="fog" args={["#030508", 20, 60]} />
          <Suspense fallback={null}>
            <Stars radius={120} depth={60} count={3000} factor={3} saturation={0} fade speed={0.5} />

            <SpacecraftModel color={activeShip.color} type={activeShip.id} />

            <directionalLight position={[4, 8, 5]} intensity={2.5} color="#cce0ff" castShadow />
            <directionalLight position={[-5, 2, -6]} intensity={1.2} color={activeShip.color} />
            <pointLight position={[0, -5, 3]} intensity={0.6} color="#223355" />
            <ambientLight intensity={0.08} />

            <OrbitControls
              autoRotate
              autoRotateSpeed={1.2}
              enableZoom={false}
              minPolarAngle={Math.PI * 0.25}
              maxPolarAngle={Math.PI * 0.75}
            />
            <Environment preset="night" />

            <EffectComposer>
              <Bloom intensity={0.8} luminanceThreshold={0.3} luminanceSmoothing={0.85} height={200} />
              <ChromaticAberration
                blendFunction={BlendFunction.NORMAL}
                offset={new THREE.Vector2(0.0005, 0.0005)}
              />
            </EffectComposer>
          </Suspense>
        </Canvas>

        {/* Transition fade overlay */}
        <div style={{
          position: "absolute",
          inset: 0,
          background: "#030508",
          opacity: transitioning ? 1 : 0,
          transition: "opacity 0.25s ease",
          pointerEvents: "none",
          zIndex: 1,
        }} />
      </div>

      {/* UI Overlay */}
      <div style={{
        position: "fixed",
        bottom: "5%",
        left: "50%",
        transform: "translateX(-50%)",
        width: "90%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-end",
        zIndex: 10,
        pointerEvents: "none",
      }}>
        {/* Specs Panel */}
        <div
          key={activeShipIndex}
          className="glass"
          style={{
            padding: "2.5rem 3rem",
            maxWidth: "480px",
            pointerEvents: "auto",
            borderRadius: "2px",
            border: "1px solid rgba(255,255,255,0.08)",
            animation: "specIn 0.4s ease-out both",
            animationDelay: "0.2s",
          }}
        >
          <div style={{
            fontSize: "0.7rem",
            fontFamily: "var(--font-tech)",
            letterSpacing: "4px",
            color: activeShip.color,
            marginBottom: "0.5rem",
            textTransform: "uppercase",
          }}>
            {activeShip.class}
          </div>

          <h1 style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2rem, 3.5vw, 3rem)",
            margin: "0 0 2rem 0",
            color: "white",
            lineHeight: 1,
            fontWeight: 700,
            borderLeft: `3px solid ${activeShip.color}`,
            paddingLeft: "1rem",
          }}>
            {activeShip.name}
          </h1>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginBottom: "1.8rem" }}>
            <SpecItem label="LENGTH" value={activeShip.specs.length} color={activeShip.color} />
            <SpecItem label="CREW" value={activeShip.specs.crew.toString()} color={activeShip.color} />
            <SpecItem label="SPEED" value={activeShip.specs.speed} color={activeShip.color} />
            <SpecItem label="RANGE" value={activeShip.specs.range} color={activeShip.color} />
          </div>

          <p style={{
            opacity: 0.7,
            lineHeight: 1.8,
            fontFamily: "var(--font-body)",
            fontWeight: 300,
            fontSize: "0.95rem",
          }}>
            {activeShip.description}
          </p>
        </div>

        {/* Carousel + ship dots */}
        <div style={{ pointerEvents: "auto", display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "1.2rem" }}>
          {/* Ship index dots */}
          <div style={{ display: "flex", gap: "0.6rem" }}>
            {spacecraftList.map((_, i) => (
              <div key={i} style={{
                width: i === activeShipIndex ? "24px" : "8px",
                height: "8px",
                borderRadius: "4px",
                background: i === activeShipIndex ? activeShip.color : "rgba(255,255,255,0.2)",
                transition: "all 0.35s ease",
                cursor: "pointer",
              }} onClick={() => switchShip(i)} />
            ))}
          </div>

          <div style={{ display: "flex", gap: "1rem" }}>
            <LuxuryButton variant="secondary" onClick={prevShip} style={{ minWidth: "120px" }}>PREV</LuxuryButton>
            <LuxuryButton variant="secondary" onClick={nextShip} style={{ minWidth: "120px" }}>NEXT</LuxuryButton>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes specIn {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
}

function SpecItem({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div style={{ borderLeft: `2px solid ${color}`, paddingLeft: "0.8rem", opacity: 0.9 }}>
      <div style={{
        fontSize: "0.65rem",
        opacity: 0.5,
        marginBottom: "0.25rem",
        fontFamily: "var(--font-tech)",
        letterSpacing: "2px",
        textTransform: "uppercase",
      }}>
        {label}
      </div>
      <div style={{ fontSize: "1.3rem", fontWeight: 700, fontFamily: "var(--font-display)" }}>
        {value}
      </div>
    </div>
  );
}
