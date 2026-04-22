import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { Suspense, useEffect, useRef } from "react";
import BlackHole from "../components/canvas/BlackHole";
import StarField from "../components/canvas/StarField";
import ParticleStream from "../components/canvas/ParticleStream";
import Navbar from "../components/ui/Navbar";
import HeroText from "../components/ui/HeroText";
import Preloader from "../components/ui/Preloader";
import { useScrollProgress } from "../hooks/useScrollProgress";
import gsap from "gsap";

function CameraController() {
  const { camera } = useThree();
  const scrollProgress = useScrollProgress();

  useFrame(() => {
    const targetZ = 6 - scrollProgress * 3;
    camera.position.z += (targetZ - camera.position.z) * 0.05;
  });

  return null;
}

export default function Home() {
  const uiRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.minHeight = "300vh";
    return () => { document.body.style.minHeight = ""; };
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        uiRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 2,
          delay: 2.5,
          ease: "power2.out",
        },
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* UI Container with delayed entry */}
      <div ref={uiRef} style={{ position: "fixed", inset: 0, zIndex: 10, opacity: 0, pointerEvents: "none" }}>
        <Navbar />
        <HeroText />

        <div
          style={{
            position: "fixed",
            bottom: "3rem",
            left: "50%",
            transform: "translateX(-50%)",
            color: "white",
            opacity: 0.6,
            fontSize: "0.8rem",
            textAlign: "center",
            animation: "bounce 2s ease-in-out infinite",
            letterSpacing: "3px",
            textTransform: "uppercase",
            fontFamily: "var(--font-heading)",
          }}
        >
          <div style={{ marginBottom: "1rem" }}>Scroll to Explore</div>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            style={{ opacity: 0.8 }}
          >
            <path d="M7 13L12 18L17 13M7 6L12 11L17 6" />
          </svg>
        </div>
      </div>

      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        gl={{ antialias: true, alpha: false }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
          overflow: "hidden",
        }}
        dpr={[1, 2]} // Quality for high-dpi screens
      >
        <color attach="background" args={["#030303"]} />

        <Suspense fallback={<Preloader />}>
          <CameraController />
          <StarField />
          <BlackHole />
          <ParticleStream />

          <ambientLight intensity={0.05} />
          <pointLight position={[0, 0, 0]} intensity={1.2} color="#ff4400" />

          <EffectComposer>
            <Bloom
              intensity={1.2}
              luminanceThreshold={0.2}
              luminanceSmoothing={0.9}
              height={300}
            />
          </EffectComposer>
        </Suspense>
      </Canvas>

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(10px); }
        }
      `}</style>
    </>
  );
}
