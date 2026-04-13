import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Suspense } from "react";
import SolarSystem from "../components/canvas/SolarSystem";
import Navbar from "../components/ui/Navbar";

export default function Destinations() {
  return (
    <>
      <Navbar />

      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "5%",
          transform: "translateY(-50%)",
          zIndex: 5,
          color: "white",
          maxWidth: "500px",
        }}
      >
        <h1
          style={{
            fontSize: "clamp(2.5rem, 6vw, 4rem)",
            margin: 0,
            fontFamily: "var(--font-heading)",
            lineHeight: 0.9,
            marginBottom: "1rem",
          }}
        >
          EXPLORE
          <br />
          DESTINATIONS
        </h1>
        <p style={{ fontSize: "1.1rem", opacity: 0.8, lineHeight: 1.6 }}>
          Click on any planet to learn more and plan your journey across the
          solar system.
        </p>
      </div>

      <Canvas
        camera={{ position: [0, 30, 50], fov: 60 }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
        }}
      >
        <color attach="background" args={["#000000"]} />

        <Suspense fallback={null}>
          <SolarSystem />
          <ambientLight intensity={0.2} />
          <OrbitControls
            enableZoom={true}
            enablePan={true}
            minDistance={20}
            maxDistance={200}
            autoRotate
            autoRotateSpeed={0.5}
          />
        </Suspense>
      </Canvas>
    </>
  );
}
