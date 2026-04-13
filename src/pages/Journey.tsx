import { Canvas } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import { Suspense, useState, useEffect } from "react";
import JourneyWaypoint from "../components/canvas/JourneyWaypoint";
import Navbar from "../components/ui/Navbar";

const journeyStages = [
  {
    id: "launch",
    title: "Liftoff",
    description:
      "Departing Earth atmosphere at 25,000 mph. Experience 3Gs of force as you leave the cradle of humanity.",
    altitude: "0-100 km",
    time: "T+00:00",
  },
  {
    id: "orbit",
    title: "Orbital Insertion",
    description:
      "Stabilizing orbit at 400km. Witness the curvature of Earth and the thin blue line of our atmosphere.",
    altitude: "400 km",
    time: "T+00:15",
  },
  {
    id: "transit",
    title: "Deep Space Transit",
    description:
      "Accelerating to cruising velocity. The stars become your companions as Earth fades to a pale blue dot.",
    altitude: "Interplanetary",
    time: "T+24:00",
  },
  {
    id: "arrival",
    title: "Destination Arrival",
    description:
      "Begin deceleration burn. Your destination looms large in the viewport, a new world waiting to be explored.",
    altitude: "Orbit Insertion",
    time: "Mission Day 3",
  },
];

export default function Journey() {
  const [activeStage, setActiveStage] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const stage = Math.min(
        Math.floor((scrollY + windowHeight / 2) / windowHeight),
        journeyStages.length - 1,
      );
      setActiveStage(stage);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <Navbar />

      {/* Fixed 3D Background */}
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
        <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
          <color attach="background" args={["#020202"]} />
          <Stars
            radius={100}
            depth={50}
            count={5000}
            factor={4}
            saturation={0}
            fade
          />
          <ambientLight intensity={0.2} />

          <Suspense fallback={null}>
            <group position={[2, 0, 0]}>
              <JourneyWaypoint
                type={journeyStages[activeStage].id as any}
                active={true}
              />
            </group>
          </Suspense>
        </Canvas>
      </div>

      {/* Scrolling Content */}
      <div style={{ position: "relative", zIndex: 1 }}>
        {journeyStages.map((stage, index) => (
          <div
            key={stage.id}
            style={{
              height: "100vh",
              display: "flex",
              alignItems: "center",
              padding: "0 10%",
              opacity: activeStage === index ? 1 : 0.3,
              transition: "opacity 0.5s",
              pointerEvents: "none", // Allow scroll but click through to canvas if needed
            }}
          >
            <div
              className="glass"
              style={{
                padding: "3rem",
                maxWidth: "500px",
                borderLeft: `4px solid ${index === activeStage ? "#00d4ff" : "transparent"}`,
                transform: activeStage === index ? "scale(1.05)" : "scale(1)",
                transition: "all 0.5s",
                pointerEvents: "auto",
              }}
            >
              <div
                style={{
                  color: "var(--c-accent-blue)",
                  fontWeight: 600,
                  marginBottom: "0.5rem",
                  letterSpacing: "3px",
                  fontFamily: "var(--font-tech)",
                  textTransform: "uppercase",
                }}
              >
                {stage.time}
              </div>
              <h2
                style={{
                  fontSize: "4rem",
                  margin: "0 0 1rem 0",
                  fontFamily: "var(--font-display)",
                  lineHeight: 1,
                  fontWeight: 700,
                }}
              >
                {stage.title}
              </h2>
              <p
                style={{
                  fontSize: "1.1rem",
                  lineHeight: 1.8,
                  opacity: 0.9,
                  fontFamily: "var(--font-body)",
                  fontWeight: 300,
                }}
              >
                {stage.description}
              </p>
              <div
                style={{
                  marginTop: "1.5rem",
                  padding: "0.5rem 1rem",
                  background: "rgba(255,255,255,0.05)",
                  display: "inline-block",
                  borderRadius: "2px",
                  fontSize: "0.8rem",
                  fontFamily: "var(--font-tech)",
                  borderLeft: "2px solid var(--c-accent-gold)",
                }}
              >
                ALTITUDE: {stage.altitude}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Scroll Indicator */}
      <div
        style={{
          position: "fixed",
          right: "2rem",
          top: "50%",
          transform: "translateY(-50%)",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          zIndex: 10,
        }}
      >
        {journeyStages.map((_, i) => (
          <div
            key={i}
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              background:
                i === activeStage
                  ? "var(--c-accent-blue)"
                  : "rgba(255,255,255,0.2)",
              transition: "all 0.3s",
            }}
          />
        ))}
      </div>
    </>
  );
}
