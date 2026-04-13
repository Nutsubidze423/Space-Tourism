import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stage, Environment } from "@react-three/drei";
import { Suspense, useState } from "react";
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
        <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 8], fov: 50 }}>
          <color attach="background" args={["#050505"]} />
          <Suspense fallback={null}>
            <Stage environment="city" intensity={0.5} contactShadow={false}>
              <SpacecraftModel
                key={activeShip.id} // Re-mounts on change for animation
                color={activeShip.color}
                type={activeShip.id}
              />
            </Stage>
            <OrbitControls autoRotate autoRotateSpeed={2} />
            <Environment preset="city" />
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
