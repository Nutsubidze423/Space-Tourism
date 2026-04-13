import { useState } from "react";
import Planet from "./Planet";
import AsteroidBelt from "./AsteroidBelt";
import { planetsData } from "../../data/planetsData";
import PlanetCard from "../ui/PlanetCard";

export default function SolarSystem() {
  const [selectedPlanet, setSelectedPlanet] = useState<string | null>(null);

  return (
    <>
      {/* Sun */}
      <mesh>
        <sphereGeometry args={[2, 64, 64]} />
        <meshBasicMaterial color="#FDB813" />
      </mesh>

      {/* Sun glow */}
      <mesh>
        <sphereGeometry args={[2.5, 64, 64]} />
        <meshBasicMaterial color="#FFA500" transparent opacity={0.3} />
      </mesh>

      {/* Point light from sun */}
      <pointLight position={[0, 0, 0]} intensity={2} color="#FDB813" />

      {/* Asteroid Belt */}
      <AsteroidBelt />

      {/* Planets */}
      {planetsData.map((planet) => (
        <Planet
          key={planet.name}
          data={planet}
          isSelected={selectedPlanet === planet.name}
          onClick={() => setSelectedPlanet(planet.name)}
        />
      ))}

      {/* Planet info card */}
      {selectedPlanet && (
        <PlanetCard
          planet={planetsData.find((p) => p.name === selectedPlanet)!}
          onClose={() => setSelectedPlanet(null)}
        />
      )}
    </>
  );
}
