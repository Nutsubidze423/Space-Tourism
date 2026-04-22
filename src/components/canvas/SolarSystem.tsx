import Planet from "./Planet";
import AsteroidBelt from "./AsteroidBelt";
import { planetsData } from "../../data/planetsData";

interface SolarSystemProps {
  onPlanetSelect: (name: string) => void;
}

export default function SolarSystem({ onPlanetSelect }: SolarSystemProps) {
  return (
    <>
      {/* Sun core */}
      <mesh>
        <sphereGeometry args={[2, 64, 64]} />
        <meshBasicMaterial color="#ffe060" />
      </mesh>
      {/* Sun corona layers */}
      <mesh>
        <sphereGeometry args={[2.25, 32, 32]} />
        <meshBasicMaterial color="#ffaa00" transparent opacity={0.35} depthWrite={false} />
      </mesh>
      <mesh>
        <sphereGeometry args={[2.7, 32, 32]} />
        <meshBasicMaterial color="#ff6600" transparent opacity={0.12} depthWrite={false} />
      </mesh>
      <mesh>
        <sphereGeometry args={[3.5, 32, 32]} />
        <meshBasicMaterial color="#ff3300" transparent opacity={0.04} depthWrite={false} />
      </mesh>

      {/* Sun light sources */}
      <pointLight position={[0, 0, 0]} intensity={4} color="#fff5e0" distance={600} />
      <pointLight position={[0, 0, 0]} intensity={1.5} color="#ff8800" distance={200} />

      {/* Asteroid Belt */}
      <AsteroidBelt />

      {/* Planets */}
      {planetsData.map((planet) => (
        <Planet
          key={planet.name}
          data={planet}
          onClick={() => onPlanetSelect(planet.name)}
        />
      ))}
    </>
  );
}
