import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { Suspense, useState } from "react";
import SolarSystem from "../components/canvas/SolarSystem";
import Planet from "../components/canvas/Planet";
import Navbar from "../components/ui/Navbar";
import LuxuryButton from "../components/ui/LuxuryButton";
import { planetsData, PlanetData } from "../data/planetsData";

// Full-screen planet detail overlay
function PlanetDetail({ planet, onClose }: { planet: PlanetData; onClose: () => void }) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 50,
        display: "flex",
        animation: "detailIn 0.45s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      {/* 3D planet — right side */}
      <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
        <Canvas
          camera={{ position: [0, 0, 4], fov: 45 }}
          dpr={[1, 2]}
          style={{ width: "100%", height: "100%" }}
        >
          <color attach="background" args={["#02020a"]} />
          <Stars radius={100} depth={50} count={3000} factor={3} saturation={0} fade speed={0.3} />

          <ambientLight intensity={0.06} />
          <directionalLight position={[4, 3, 5]} intensity={3} color="#e8f0ff" />
          <pointLight position={[-5, 1, -3]} intensity={2} color={planet.color} distance={20} />
          <pointLight position={[0, -4, 2]} intensity={0.4} color="#112244" distance={12} />

          <Suspense fallback={null}>
            {/* Normalize all planets to radius 1.2 so they all fit well in frame */}
            <Planet
              data={{ ...planet, distance: 0, orbitSpeed: 0, radius: 1.2 }}
            />
            <OrbitControls
              autoRotate
              autoRotateSpeed={0.6}
              enableZoom={false}
              enablePan={false}
              minPolarAngle={Math.PI * 0.3}
              maxPolarAngle={Math.PI * 0.7}
            />
          </Suspense>

          <EffectComposer>
            <Bloom intensity={0.9} luminanceThreshold={0.2} luminanceSmoothing={0.85} height={300} />
          </EffectComposer>
        </Canvas>
      </div>

      {/* Info panel — left side */}
      <div
        style={{
          width: "42%",
          height: "100%",
          background: "linear-gradient(270deg, rgba(2,2,10,0) 0%, rgba(2,2,10,0.88) 30%, rgba(2,2,10,0.98) 100%)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "6rem 5% 4rem 8%",
          overflowY: "auto",
          order: -1,
        }}
      >
        {/* Back button */}
        <button
          onClick={onClose}
          style={{
            background: "none",
            border: "none",
            color: "rgba(255,255,255,0.5)",
            fontSize: "0.75rem",
            fontFamily: "var(--font-tech)",
            letterSpacing: "3px",
            textTransform: "uppercase",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: 0,
            marginBottom: "3rem",
            transition: "color 0.2s",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.color = "white"; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.5)"; }}
        >
          ← SOLAR SYSTEM
        </button>

        {/* Planet name */}
        <div
          style={{
            fontSize: "0.75rem",
            fontFamily: "var(--font-tech)",
            letterSpacing: "5px",
            color: planet.color,
            marginBottom: "0.75rem",
            textTransform: "uppercase",
          }}
        >
          DESTINATION
        </div>
        <h1
          style={{
            fontSize: "clamp(3rem, 6vw, 5.5rem)",
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            margin: "0 0 0.25rem 0",
            lineHeight: 0.95,
            color: "white",
            borderLeft: `5px solid ${planet.color}`,
            paddingLeft: "1.5rem",
          }}
        >
          {planet.name.toUpperCase()}
        </h1>

        <p
          style={{
            fontSize: "1rem",
            lineHeight: 1.85,
            opacity: 0.75,
            fontFamily: "var(--font-body)",
            fontWeight: 300,
            marginTop: "1.5rem",
            paddingLeft: "1.5rem",
            maxWidth: "400px",
          }}
        >
          {planet.description}
        </p>

        {/* Stats grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1px",
            marginTop: "2.5rem",
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          {[
            { label: "Travel Time", value: planet.travelTime },
            { label: "Temperature", value: planet.temperature },
            { label: "Atmosphere", value: planet.atmosphere },
            { label: "Radius", value: `${planet.radius} × Earth` },
          ].map(({ label, value }) => (
            <div
              key={label}
              style={{
                padding: "1.2rem 1.4rem",
                background: "rgba(2,2,10,0.8)",
              }}
            >
              <div
                style={{
                  fontSize: "0.68rem",
                  fontFamily: "var(--font-tech)",
                  letterSpacing: "2px",
                  color: planet.color,
                  opacity: 0.9,
                  marginBottom: "0.4rem",
                  textTransform: "uppercase",
                }}
              >
                {label}
              </div>
              <div
                style={{
                  fontSize: "0.95rem",
                  fontFamily: "var(--font-body)",
                  fontWeight: 500,
                  color: "white",
                }}
              >
                {value}
              </div>
            </div>
          ))}
        </div>

        {/* Mission brief */}
        <div style={{ marginTop: "2.5rem" }}>
          <div
            style={{
              fontSize: "0.7rem",
              fontFamily: "var(--font-tech)",
              letterSpacing: "3px",
              color: "rgba(255,255,255,0.4)",
              marginBottom: "1rem",
              textTransform: "uppercase",
            }}
          >
            Mission Brief
          </div>
          {planet.funFacts.map((fact, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                gap: "1rem",
                alignItems: "flex-start",
                marginBottom: "0.9rem",
              }}
            >
              <div
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  background: planet.color,
                  marginTop: "0.45rem",
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontSize: "0.9rem",
                  lineHeight: 1.7,
                  opacity: 0.8,
                  fontFamily: "var(--font-body)",
                  fontWeight: 300,
                }}
              >
                {fact}
              </span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ marginTop: "3rem" }}>
          <LuxuryButton
            variant="primary"
            onClick={() => {}}
            style={{ width: "100%" }}
          >
            Plan This Journey
          </LuxuryButton>
        </div>
      </div>

      <style>{`
        @keyframes detailIn {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

export default function Destinations() {
  const [selectedPlanet, setSelectedPlanet] = useState<PlanetData | null>(null);

  return (
    <>
      <Navbar />

      {/* Solar system overview */}
      {!selectedPlanet && (
        <>
          <div
            style={{
              position: "fixed",
              top: "50%",
              left: "5%",
              transform: "translateY(-50%)",
              zIndex: 5,
              color: "white",
              maxWidth: "460px",
              pointerEvents: "none",
            }}
          >
            <h1
              style={{
                fontSize: "clamp(2.5rem, 5vw, 4rem)",
                margin: 0,
                fontFamily: "var(--font-display)",
                lineHeight: 0.95,
                fontWeight: 700,
                marginBottom: "1rem",
              }}
            >
              EXPLORE
              <br />
              <span style={{ color: "var(--c-accent-blue)" }}>DESTINATIONS</span>
            </h1>
            <p style={{ fontSize: "1rem", opacity: 0.65, lineHeight: 1.7, fontFamily: "var(--font-body)", fontWeight: 300 }}>
              Click any planet to view mission data and plan your journey.
            </p>
          </div>

          <Canvas
            camera={{ position: [0, 30, 50], fov: 60 }}
            style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", zIndex: 0 }}
          >
            <color attach="background" args={["#000008"]} />
            <Suspense fallback={null}>
              <Stars radius={200} depth={80} count={6000} factor={4} saturation={0} fade speed={0.3} />
              <SolarSystem onPlanetSelect={(name) => {
                const p = planetsData.find((d) => d.name === name);
                if (p) setSelectedPlanet(p);
              }} />
              <ambientLight intensity={0.04} />
              <OrbitControls
                enableZoom
                enablePan={false}
                minDistance={15}
                maxDistance={250}
                autoRotate
                autoRotateSpeed={0.4}
              />
              <EffectComposer>
                <Bloom intensity={1.4} luminanceThreshold={0.15} luminanceSmoothing={0.9} height={300} />
              </EffectComposer>
            </Suspense>
          </Canvas>
        </>
      )}

      {/* Full-screen planet detail */}
      {selectedPlanet && (
        <PlanetDetail planet={selectedPlanet} onClose={() => setSelectedPlanet(null)} />
      )}
    </>
  );
}
