import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function HeroText() {
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();

  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        textAlign: "center",
        zIndex: 10,
        width: "100%",
        pointerEvents: "none",
      }}
    >
      <h1
        style={{
          fontSize: "clamp(3rem, 8vw, 6rem)",
          fontWeight: 900,
          margin: 0,
          lineHeight: 1.05,
          fontFamily: "var(--font-display)",
          letterSpacing: "-2px",
          textTransform: "uppercase",
          background: "linear-gradient(180deg, #ffffff 0%, rgba(255,255,255,0.65) 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          filter: "drop-shadow(0 0 40px rgba(0, 212, 255, 0.15))",
        }}
      >
        BEYOND THE <br />
        <span style={{ color: "var(--c-accent-blue)", WebkitTextFillColor: "var(--c-accent-blue)" }}>
          EVENT HORIZON
        </span>
      </h1>

      <p
        style={{
          fontSize: "clamp(0.9rem, 1.8vw, 1.15rem)",
          maxWidth: "520px",
          margin: "2rem auto",
          lineHeight: 1.8,
          opacity: 0.7,
          fontFamily: "var(--font-body)",
          fontWeight: 300,
          letterSpacing: "0.5px",
        }}
      >
        Experience the ultimate frontier of luxury space travel.
        Where known reality bends and the cosmos reveals its deepest mysteries.
      </p>

      <button
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => navigate("/destinations")}
        style={{
          pointerEvents: "auto",
          marginTop: "1rem",
          padding: "1.1rem 3rem",
          fontSize: "0.85rem",
          textTransform: "uppercase",
          letterSpacing: "4px",
          fontWeight: 600,
          fontFamily: "var(--font-tech)",
          cursor: "pointer",
          background: hovered
            ? "rgba(0, 212, 255, 0.08)"
            : "rgba(255, 255, 255, 0.04)",
          border: hovered
            ? "1px solid rgba(0, 212, 255, 0.6)"
            : "1px solid rgba(255, 255, 255, 0.2)",
          color: hovered ? "var(--c-accent-blue)" : "white",
          borderRadius: "2px",
          backdropFilter: "blur(12px)",
          boxShadow: hovered
            ? "0 0 30px rgba(0, 212, 255, 0.25), inset 0 0 20px rgba(0, 212, 255, 0.05)"
            : "none",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        START YOUR JOURNEY
      </button>
    </div>
  );
}
