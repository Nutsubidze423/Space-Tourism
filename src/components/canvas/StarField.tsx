import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
// @ts-ignore
import * as random from "maath/random/dist/maath-random.esm";
import * as THREE from "three";

export default function StarField() {
  const ref = useRef<THREE.Points>(null);
  const sphere = useMemo(() => random.inSphere(new Float32Array(6000 * 3), { radius: 100 }), []);

  useFrame((_state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 25;
      ref.current.rotation.y -= delta / 30;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#ffffff"
          size={0.06}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.9}
        />
      </Points>
    </group>
  );
}
