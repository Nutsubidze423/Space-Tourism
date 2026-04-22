import { Canvas } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { Suspense, useState, useEffect } from "react";
import JourneyWaypoint from "../components/canvas/JourneyWaypoint";
import Navbar from "../components/ui/Navbar";

const journeyStages = [
  {
    id: "launch",
    title: "Liftoff",
    description:
      "Departing Earth atmosphere at 25,000 mph. Experience 3Gs of force as you leave the cradle of humanity.",
    altitude: "0–100 km",
    time: "T+00:00",
    color: "#ff6644",
  },
  {
    id: "orbit",
    title: "Orbital Insertion",
    description:
      "Stabilizing orbit at 400 km. Witness the curvature of Earth and the thin blue line of our atmosphere.",
    altitude: "400 km",
    time: "T+00:15",
    color: "#00d4ff",
  },
  {
    id: "transit",
    title: "Deep Space Transit",
    description:
      "Accelerating to cruising velocity. Stars become your companions as Earth fades to a pale blue dot.",
    altitude: "Interplanetary",
    time: "T+24:00",
    color: "#aa44ff",
  },
  {
    id: "arrival",
    title: "Destination Arrival",
    description:
      "Begin deceleration burn. Your destination looms large — a new world waiting to be explored.",
    altitude: "Orbit Insertion",
    time: "Mission Day 3",
    color: "#ff8833",
  },
];

export default function Journey() {
  const [activeStage, setActiveStage] = useState(0);

  useEffect(() => {
    document.body.style.minHeight = `${journeyStages.length * 100}vh`;
    return () => { document.body.style.minHeight = ""; };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const wh = window.innerHeight;
      const stage = Math.min(Math.floor(scrollY / wh + 0.35), journeyStages.length - 1);
      setActiveStage(stage);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const stage = journeyStages[activeStage];

  return (
    <>
      <Navbar />

      {/* Full-screen layout: left = text, right = 3D (split via CSS) */}
      <div style={{ position: "fixed", inset: 0, display: "flex", zIndex: 0 }}>

        {/* Left panel — text */}
        <div
          style={{
            width: "45%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            padding: "0 5% 0 8%",
            background: "linear-gradient(90deg, rgba(2,2,8,0.92) 0%, rgba(2,2,8,0.7) 80%, rgba(2,2,8,0) 100%)",
            zIndex: 2,
            pointerEvents: "none",
          }}
        >
          <div style={{ transition: "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)" }}>
            <div
              style={{
                color: stage.color,
                fontFamily: "var(--font-tech)",
                fontSize: "0.8rem",
                letterSpacing: "4px",
                textTransform: "uppercase",
                marginBottom: "1rem",
                transition: "color 0.5s",
              }}
            >
              {stage.time}
            </div>

            <h2
              style={{
                fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
                margin: "0 0 1.5rem 0",
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                lineHeight: 1,
                borderLeft: `4px solid ${stage.color}`,
                paddingLeft: "1.5rem",
                transition: "border-color 0.5s",
              }}
            >
              {stage.title}
            </h2>

            <p
              style={{
                fontSize: "1.05rem",
                lineHeight: 1.9,
                opacity: 0.8,
                fontFamily: "var(--font-body)",
                fontWeight: 300,
                paddingLeft: "1.5rem",
                maxWidth: "360px",
              }}
            >
              {stage.description}
            </p>

            <div
              style={{
                marginTop: "2rem",
                marginLeft: "1.5rem",
                padding: "0.6rem 1.2rem",
                background: "rgba(255,255,255,0.04)",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.8rem",
                borderRadius: "2px",
                fontSize: "0.75rem",
                fontFamily: "var(--font-tech)",
                letterSpacing: "2px",
                borderLeft: `2px solid ${stage.color}`,
                transition: "border-color 0.5s",
              }}
            >
              <span style={{ opacity: 0.5 }}>ALTITUDE</span>
              <span style={{ color: "white" }}>{stage.altitude}</span>
            </div>

            {/* Stage dots */}
            <div style={{ display: "flex", gap: "0.75rem", marginTop: "3rem", paddingLeft: "1.5rem" }}>
              {journeyStages.map((_s, i) => (
                <div
                  key={i}
                  style={{
                    width: i === activeStage ? "28px" : "8px",
                    height: "8px",
                    borderRadius: "4px",
                    background: i === activeStage ? stage.color : "rgba(255,255,255,0.2)",
                    transition: "all 0.4s",
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right panel — 3D canvas */}
        <div style={{ flex: 1, height: "100%", position: "relative", overflow: "hidden" }}>
          <Canvas camera={{ position: [0, 0, 5], fov: 55 }} style={{ width: "100%", height: "100%" }}>
            <color attach="background" args={["#010108"]} />
            <Stars radius={100} depth={60} count={4000} factor={3} saturation={0} fade speed={0.4} />

            <Suspense fallback={null}>
              <JourneyWaypoint
                key={stage.id}
                type={stage.id as "launch" | "orbit" | "transit" | "arrival"}
                active={true}
              />
            </Suspense>

            <EffectComposer>
              <Bloom intensity={1.0} luminanceThreshold={0.2} luminanceSmoothing={0.9} height={300} />
            </EffectComposer>
          </Canvas>
        </div>
      </div>

      {/* Invisible scrollable height */}
      <div style={{ position: "relative", zIndex: 1, pointerEvents: "none" }}>
        {journeyStages.map((_s, i) => (
          <div key={i} style={{ height: "100vh" }} />
        ))}
      </div>
    </>
  );
}
