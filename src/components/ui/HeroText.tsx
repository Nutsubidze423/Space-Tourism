import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LINE1 = "BEYOND THE";
const LINE2 = "EVENT HORIZON";

function LetterReveal({ text, delay = 0, color }: { text: string; delay?: number; color?: string }) {
  return (
    <>
      {text.split("").map((char, i) => (
        <span
          key={i}
          style={{
            display: "inline-block",
            opacity: 0,
            animation: `letterIn 0.04s ease forwards`,
            animationDelay: `${delay + i * 0.06}s`,
            whiteSpace: char === " " ? "pre" : undefined,
            color: color,
            WebkitTextFillColor: color,
          }}
        >
          {char}
        </span>
      ))}
    </>
  );
}

export default function HeroText() {
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();

  return (
    <>
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
            filter: "drop-shadow(0 0 40px rgba(0, 212, 255, 0.15))",
          }}
        >
          <span
            style={{
              display: "block",
              background: "linear-gradient(180deg, #ffffff 0%, rgba(255,255,255,0.65) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            <LetterReveal text={LINE1} delay={2.6} />
          </span>
          <span style={{ display: "block" }}>
            <LetterReveal text={LINE2} delay={2.6 + LINE1.length * 0.06 + 0.1} color="var(--c-accent-blue)" />
          </span>
        </h1>

        <p
          style={{
            fontSize: "clamp(0.9rem, 1.8vw, 1.15rem)",
            maxWidth: "520px",
            margin: "2rem auto",
            lineHeight: 1.8,
            opacity: 0,
            fontFamily: "var(--font-body)",
            fontWeight: 300,
            letterSpacing: "0.5px",
            animation: `fadeUp 0.8s ease forwards`,
            animationDelay: `${2.6 + (LINE1.length + LINE2.length) * 0.06 + 0.3}s`,
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
            background: hovered ? "rgba(0, 212, 255, 0.08)" : "rgba(255, 255, 255, 0.04)",
            border: hovered ? "1px solid rgba(0, 212, 255, 0.6)" : "1px solid rgba(255, 255, 255, 0.2)",
            color: hovered ? "var(--c-accent-blue)" : "white",
            borderRadius: "2px",
            backdropFilter: "blur(12px)",
            boxShadow: hovered ? "0 0 30px rgba(0, 212, 255, 0.25), inset 0 0 20px rgba(0, 212, 255, 0.05)" : "none",
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            opacity: 0,
            animation: `fadeUp 0.8s ease forwards`,
            animationDelay: `${2.6 + (LINE1.length + LINE2.length) * 0.06 + 0.6}s`,
          }}
        >
          START YOUR JOURNEY
        </button>
      </div>

      <style>{`
        @keyframes letterIn {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
}
