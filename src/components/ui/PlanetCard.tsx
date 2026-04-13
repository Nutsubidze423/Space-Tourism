import { PlanetData } from "../../data/planetsData";
import LuxuryButton from "./LuxuryButton";

interface PlanetCardProps {
  planet: PlanetData;
  onClose: () => void;
}

export default function PlanetCard({ planet, onClose }: PlanetCardProps) {
  return (
    <div
      className="glass interactive"
      style={{
        position: "fixed",
        top: "50%",
        right: "5%",
        transform: "translateY(-50%)",
        zIndex: 100,
        padding: "3rem",
        maxWidth: "450px",
        borderRadius: "2px", // Sharper edges
        animation: "slideIn 0.3s ease-out",
        border: "1px solid rgba(255,255,255,0.1)",
        backdropFilter: "blur(30px)", // Deeper blur
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "2rem",
        }}
      >
        <h2
          style={{
            fontSize: "3.5rem",
            margin: 0,
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            color: planet.color,
            letterSpacing: "-1px",
          }}
        >
          {planet.name}
        </h2>
        <LuxuryButton
          variant="tertiary"
          onClick={onClose}
          style={{ padding: "0.5rem", minWidth: "auto" }}
        >
          CLOSE
        </LuxuryButton>
      </div>

      <p
        style={{
          fontSize: "1rem",
          opacity: 0.9,
          lineHeight: 1.8,
          marginBottom: "2rem",
          fontFamily: "var(--font-body)",
          fontWeight: 300,
        }}
      >
        {planet.description}
      </p>

      <div style={{ display: "grid", gap: "1rem", marginBottom: "2.5rem" }}>
        <InfoRow label="Travel Time" value={planet.travelTime} />
        <InfoRow label="Atmosphere" value={planet.atmosphere} />
        <InfoRow label="Temperature" value={planet.temperature} />
      </div>

      <div style={{ marginBottom: "2.5rem" }}>
        <h3
          style={{
            fontSize: "0.9rem",
            marginBottom: "1rem",
            color: "var(--c-accent-blue)",
            fontFamily: "var(--font-tech)",
            letterSpacing: "2px",
            textTransform: "uppercase",
          }}
        >
          Mission Brief
        </h3>
        <ul
          style={{
            margin: 0,
            paddingLeft: "1.25rem",
            fontSize: "0.9rem",
            lineHeight: 1.8,
            fontFamily: "var(--font-body)",
          }}
        >
          {planet.funFacts.map((fact, i) => (
            <li key={i} style={{ marginBottom: "0.5rem" }}>
              {fact}
            </li>
          ))}
        </ul>
      </div>

      <LuxuryButton variant="primary" style={{ width: "100%" }}>
        Design The Journey
      </LuxuryButton>

      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-50%) translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateY(-50%) translateX(0);
          }
        }
      `}</style>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "1rem",
        background: "rgba(255,255,255,0.03)",
        borderRadius: "2px",
        borderLeft: "2px solid var(--c-accent-blue)",
      }}
    >
      <span
        style={{
          opacity: 0.6,
          fontSize: "0.85rem",
          fontFamily: "var(--font-tech)",
          letterSpacing: "1px",
          textTransform: "uppercase",
        }}
      >
        {label}
      </span>
      <span
        style={{
          fontWeight: 500,
          fontSize: "0.95rem",
          fontFamily: "var(--font-body)",
        }}
      >
        {value}
      </span>
    </div>
  );
}
