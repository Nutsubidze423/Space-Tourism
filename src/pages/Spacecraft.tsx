import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, Stars } from "@react-three/drei";
import { EffectComposer, Bloom, ChromaticAberration } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { Suspense, useState } from "react";
import * as THREE from "three";
import SpacecraftModel from "../components/canvas/SpacecraftModel";
import Navbar from "../components/ui/Navbar";
import LuxuryButton from "../components/ui/LuxuryButton";
import { spacecraftList } from "../data/spacecraftData";

export default function Spacecraft() {
  const [activeShipIndex, setActiveShipIndex] = useState(0);
  const activeShip = spacecraftList[activeShipIndex];

  const nextShip = () => {
    setActiveShipIndex((prev) => (prev + 1) % spacecraftList.length);
  };

  const prevShip = () => {
    setActiveShipIndex(
      (prev) => (prev - 1 + spacecraftList.length) % spacecraftList.length,
    );
  };

  return (
    <>
      <Navbar />

      {/* 3D Canvas */}
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
        <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 2, 10], fov: 45 }}>
          <color attach="background" args={["#030508"]} />
          <fog attach="fog" args={["#030508", 20, 60]} />
          <Suspense fallback={null}>
            <Stars radius={120} depth={60} count={4000} factor={3} saturation={0} fade speed={0.5} />

            <SpacecraftModel
              key={activeShip.id}
              color={activeShip.color}
              type={activeShip.id}
            />

            {/* Key light — strong from upper-front */}
            <directionalLight position={[4, 8, 5]} intensity={2.5} color="#cce0ff" castShadow />
            {/* Rim light — from behind */}
            <directionalLight position={[-5, 2, -6]} intensity={1.2} color={activeShip.color} />
            {/* Fill — soft from below */}
            <pointLight position={[0, -5, 3]} intensity={0.6} color="#223355" />
            {/* Ambient */}
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
              <Bloom intensity={0.8} luminanceThreshold={0.3} luminanceSmoothing={0.85} height={300} />
              <ChromaticAberration
                blendFunction={BlendFunction.NORMAL}
                offset={new THREE.Vector2(0.0005, 0.0005)}
              />
            </EffectComposer>
          </Suspense>
        </Canvas>
      </div>

      {/* UI Overlay */}
      <div
        style={{
          position: "absolute",
          bottom: "5%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "90%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "end",
          pointerEvents: "none", // Let clicks pass through to canvas
        }}
      >
        {/* Specs Panel */}
        <div
          className="glass"
          style={{
            padding: "3rem",
            maxWidth: "500px",
            pointerEvents: "auto",
            textAlign: "left",
            borderRadius: "2px",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "4rem",
              margin: "0 0 0.5rem 0",
              color: activeShip.color,
              lineHeight: 0.9,
              fontWeight: 700,
            }}
          >
            {activeShip.name}
          </h1>
          <h3
            style={{
              opacity: 0.7,
              margin: "0 0 2rem 0",
              fontFamily: "var(--font-tech)",
              letterSpacing: "2px",
              textTransform: "uppercase",
              fontSize: "1rem",
            }}
          >
            {activeShip.class}
          </h3>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "2rem",
              marginBottom: "2rem",
            }}
          >
            <SpecItem label="LENGTH" value={activeShip.specs.length} />
            <SpecItem label="CREW" value={activeShip.specs.crew.toString()} />
            <SpecItem label="SPEED" value={activeShip.specs.speed} />
            <SpecItem label="RANGE" value={activeShip.specs.range} />
          </div>

          <p
            style={{
              opacity: 0.8,
              lineHeight: 1.8,
              fontFamily: "var(--font-body)",
              fontWeight: 300,
            }}
          >
            {activeShip.description}
          </p>
        </div>

        {/* Carousel Controls */}
        <div style={{ pointerEvents: "auto", display: "flex", gap: "1.5rem" }}>
          <LuxuryButton
            variant="secondary"
            onClick={prevShip}
            style={{ minWidth: "150px" }}
          >
            PREV
          </LuxuryButton>
          <LuxuryButton
            variant="secondary"
            onClick={nextShip}
            style={{ minWidth: "150px" }}
          >
            NEXT
          </LuxuryButton>
        </div>
      </div>
    </>
  );
}

function SpecItem({ label, value }: { label: string; value: string }) {
  return (
    <div
      style={{
        borderLeft: "2px solid rgba(255,255,255,0.2)",
        paddingLeft: "1rem",
      }}
    >
      <div
        style={{
          fontSize: "0.8rem",
          opacity: 0.5,
          marginBottom: "0.2rem",
          fontFamily: "var(--font-tech)",
          letterSpacing: "1px",
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontSize: "1.5rem",
          fontWeight: "bold",
          fontFamily: "var(--font-display)",
        }}
      >
        {value}
      </div>
    </div>
  );
}
