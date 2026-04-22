import { Canvas } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { Suspense, useEffect, useRef } from "react";
import BlackHole from "../components/canvas/BlackHole";
import StarField from "../components/canvas/StarField";
import ParticleStream from "../components/canvas/ParticleStream";
import Navbar from "../components/ui/Navbar";
import HeroText from "../components/ui/HeroText";
import Preloader from "../components/ui/Preloader";
import gsap from "gsap";

export default function Home() {
  const uiRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        uiRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 2, delay: 2.5, ease: "power2.out" },
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <>
      <div ref={uiRef} style={{ position: "fixed", inset: 0, zIndex: 10, opacity: 0, pointerEvents: "none" }}>
        <Navbar />
        <HeroText />
      </div>

      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        gl={{ antialias: true, alpha: false }}
        style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", zIndex: 0 }}
        dpr={[1, 1.5]}
      >
        <color attach="background" args={["#030303"]} />

        <Suspense fallback={<Preloader />}>
          <StarField />
          <BlackHole />
          <ParticleStream />

          <ambientLight intensity={0.05} />
          <pointLight position={[0, 0, 0]} intensity={1.2} color="#ff4400" />

          <EffectComposer>
            <Bloom intensity={1.2} luminanceThreshold={0.2} luminanceSmoothing={0.9} height={200} />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </>
  );
}
