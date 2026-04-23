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
            animation: "letterIn 0.04s ease forwards",
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

const subtitleDelay = 2.6 + (LINE1.length + LINE2.length) * 0.06 + 0.3;
const buttonDelay = subtitleDelay + 0.35;

export default function HeroText() {
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      {/* Left-aligned hero panel */}
      <div style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "50%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        padding: "0 0 0 8%",
        background: "linear-gradient(90deg, rgba(3,3,3,0.72) 0%, rgba(3,3,3,0.4) 70%, transparent 100%)",
        pointerEvents: "none",
        zIndex: 5,
      }}>
        <div>
          {/* Eyebrow */}
          <div style={{
            opacity: 0,
            animation: `fadeUp 0.6s ease forwards`,
            animationDelay: "2.5s",
            fontFamily: "var(--font-tech)",
            fontSize: "0.72rem",
            letterSpacing: "6px",
            color: "var(--c-accent-blue)",
            textTransform: "uppercase",
            marginBottom: "1.5rem",
          }}>
            Event Horizon — Class I Voyage
          </div>

          {/* Title */}
          <h1 style={{
            fontSize: "clamp(3rem, 6vw, 5.5rem)",
            fontWeight: 900,
            margin: "0 0 1.8rem 0",
            lineHeight: 1,
            fontFamily: "var(--font-display)",
            letterSpacing: "-2px",
            textTransform: "uppercase",
          }}>
            <span style={{
              display: "block",
              background: "linear-gradient(180deg, #ffffff 0%, rgba(255,255,255,0.7) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              filter: "drop-shadow(0 0 30px rgba(0,212,255,0.12))",
            }}>
              <LetterReveal text={LINE1} delay={2.6} />
            </span>
            <span style={{ display: "block" }}>
              <LetterReveal
                text={LINE2}
                delay={2.6 + LINE1.length * 0.06 + 0.1}
                color="var(--c-accent-blue)"
              />
            </span>
          </h1>

          {/* Divider */}
          <div style={{
            width: 0,
            height: "2px",
            background: "linear-gradient(90deg, var(--c-accent-blue), transparent)",
            marginBottom: "1.8rem",
            opacity: 0,
            animation: "lineExpand 0.6s ease forwards",
            animationDelay: `${subtitleDelay - 0.15}s`,
          }} />

          {/* Subtitle */}
          <p style={{
            fontSize: "clamp(0.9rem, 1.4vw, 1.05rem)",
            maxWidth: "400px",
            lineHeight: 1.85,
            opacity: 0,
            fontFamily: "var(--font-body)",
            fontWeight: 300,
            letterSpacing: "0.3px",
            color: "rgba(255,255,255,0.72)",
            animation: "fadeUp 0.7s ease forwards",
            animationDelay: `${subtitleDelay}s`,
          }}>
            Experience the ultimate frontier of luxury space travel.
            Where known reality bends and the cosmos reveals its deepest mysteries.
          </p>

          {/* CTA */}
          <div style={{
            marginTop: "2.5rem",
            opacity: 0,
            animation: "fadeUp 0.7s ease forwards",
            animationDelay: `${buttonDelay}s`,
            pointerEvents: "auto",
          }}>
            <button
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              onClick={() => navigate("/destinations")}
              style={{
                padding: "1rem 2.8rem",
                fontSize: "0.8rem",
                textTransform: "uppercase",
                letterSpacing: "4px",
                fontWeight: 600,
                fontFamily: "var(--font-tech)",
                cursor: "pointer",
                background: hovered ? "rgba(0,212,255,0.1)" : "rgba(255,255,255,0.04)",
                border: hovered ? "1px solid rgba(0,212,255,0.7)" : "1px solid rgba(255,255,255,0.18)",
                color: hovered ? "var(--c-accent-blue)" : "rgba(255,255,255,0.9)",
                borderRadius: "2px",
                backdropFilter: "blur(12px)",
                boxShadow: hovered ? "0 0 28px rgba(0,212,255,0.2), inset 0 0 16px rgba(0,212,255,0.05)" : "none",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            >
              START YOUR JOURNEY
            </button>

            <div style={{
              marginTop: "1.2rem",
              fontSize: "0.7rem",
              fontFamily: "var(--font-tech)",
              letterSpacing: "3px",
              color: "rgba(255,255,255,0.3)",
            }}>
              SCROLL TO EXPLORE ↓
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes letterIn {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes lineExpand {
          from { width: 0; opacity: 0; }
          to   { width: 160px; opacity: 1; }
        }
      `}</style>
    </>
  );
}
