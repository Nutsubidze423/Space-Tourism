import { useState, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { Suspense } from "react";
import Navbar from "../components/ui/Navbar";
import TicketPreview from "../components/canvas/TicketPreview";
import LuxuryButton from "../components/ui/LuxuryButton";

const prices: { [key: string]: number } = {
  MARS: 450000,
  MOON: 150000,
  JUPITER: 1200000,
  SATURN: 1500000,
  EUROPA: 1800000,
  TITAN: 1600000,
};

const destinationColors: { [key: string]: string } = {
  MARS: "#cc4422",
  MOON: "#aabbcc",
  JUPITER: "#cc8844",
  SATURN: "#ddcc88",
  EUROPA: "#aaddff",
  TITAN: "#bb9944",
};

function generateRef() {
  return "EVHZ-" + Math.random().toString(36).substring(2, 8).toUpperCase();
}

export default function Booking() {
  const [formData, setFormData] = useState({ destination: "MARS", date: "", passengers: 1 });
  const [isBooked, setIsBooked] = useState(false);
  const bookingRef = useRef(generateRef());

  const basePrice = prices[formData.destination] || 0;
  const totalPrice = (basePrice * formData.passengers).toLocaleString("en-US", {
    style: "currency", currency: "USD", maximumFractionDigits: 0,
  });

  const accentColor = destinationColors[formData.destination] || "var(--c-accent-blue)";

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "1.1rem 1.2rem",
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.1)",
    color: "white",
    borderRadius: "2px",
    fontSize: "1rem",
    cursor: "pointer",
    fontFamily: "var(--font-body)",
    transition: "border-color 0.3s, background 0.3s",
    outline: "none",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    marginBottom: "0.5rem",
    fontSize: "0.7rem",
    opacity: 0.5,
    fontFamily: "var(--font-tech)",
    letterSpacing: "3px",
    textTransform: "uppercase",
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    bookingRef.current = generateRef();
    setIsBooked(true);
  };

  return (
    <>
      <Navbar />

      {/* 3D Background */}
      <div style={{ position: "fixed", inset: 0, zIndex: 0 }}>
        <Canvas camera={{ position: [0, 0, 6], fov: 45 }} dpr={[1, 1.5]}>
          <color attach="background" args={["#020205"]} />
          <Suspense fallback={null}>
            <Stars radius={100} depth={60} count={4000} factor={3} saturation={0} fade speed={0.4} />
            <ambientLight intensity={0.3} />
            <pointLight position={[5, 5, 5]} intensity={1.5} color="#e8f0ff" />
            <pointLight position={[-3, 0, 3]} intensity={0.8} color={accentColor} />

            {!isBooked && (
              <group position={[2.8, 0, 0]} rotation={[0.15, -0.4, 0.05]}>
                <TicketPreview
                  destination={formData.destination}
                  date={formData.date}
                  passengers={formData.passengers}
                  price={totalPrice}
                />
              </group>
            )}

            <EffectComposer>
              <Bloom intensity={0.6} luminanceThreshold={0.3} luminanceSmoothing={0.85} height={200} />
            </EffectComposer>
          </Suspense>
        </Canvas>
      </div>

      {/* Booking form */}
      {!isBooked && (
        <div style={{
          position: "fixed",
          inset: 0,
          zIndex: 5,
          display: "flex",
          alignItems: "center",
          paddingLeft: "6%",
          pointerEvents: "none",
        }}>
          <div
            style={{
              width: "420px",
              pointerEvents: "auto",
              background: "rgba(2,2,8,0.82)",
              border: "1px solid rgba(255,255,255,0.08)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              padding: "2.8rem",
              animation: "bookingIn 0.5s ease-out both",
            }}
          >
            <div style={{
              fontFamily: "var(--font-tech)",
              fontSize: "0.68rem",
              letterSpacing: "5px",
              color: accentColor,
              marginBottom: "0.8rem",
              textTransform: "uppercase",
              transition: "color 0.4s",
            }}>
              Mission Planning
            </div>

            <h1 style={{
              fontFamily: "var(--font-display)",
              fontSize: "2.8rem",
              margin: "0 0 2rem 0",
              fontWeight: 700,
              lineHeight: 0.95,
              letterSpacing: "-1px",
              borderLeft: `3px solid ${accentColor}`,
              paddingLeft: "1rem",
              transition: "border-color 0.4s",
            }}>
              BOOK YOUR<br />
              <span style={{ color: accentColor }}>JOURNEY</span>
            </h1>

            <form onSubmit={handleSubmit} style={{ display: "grid", gap: "1.4rem" }}>
              <div>
                <label style={labelStyle}>Destination</label>
                <select
                  value={formData.destination}
                  onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                  style={inputStyle}
                >
                  {Object.keys(prices).map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={labelStyle}>Departure Date</label>
                <input
                  type="date"
                  required
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={labelStyle}>Passengers</label>
                <input
                  type="number" min="1" max="10"
                  value={formData.passengers}
                  onChange={(e) => setFormData({ ...formData, passengers: parseInt(e.target.value) || 1 })}
                  style={inputStyle}
                />
              </div>

              {/* Price */}
              <div style={{
                padding: "1rem 1.2rem",
                background: "rgba(255,255,255,0.02)",
                border: `1px solid ${accentColor}22`,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}>
                <span style={{ opacity: 0.6, fontFamily: "var(--font-tech)", fontSize: "0.75rem", letterSpacing: "2px" }}>
                  ESTIMATED TOTAL
                </span>
                <span style={{
                  fontSize: "1.4rem",
                  fontWeight: 700,
                  color: "#ffd700",
                  fontFamily: "var(--font-display)",
                }}>
                  {totalPrice}
                </span>
              </div>

              <LuxuryButton variant="primary" type="submit" style={{ width: "100%", marginTop: "0.5rem" }}>
                CONFIRM RESERVATION
              </LuxuryButton>
            </form>
          </div>
        </div>
      )}

      {/* Full-screen confirmation */}
      {isBooked && (
        <div style={{
          position: "fixed",
          inset: 0,
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "radial-gradient(ellipse at center, rgba(0,20,40,0.9) 0%, rgba(2,2,8,0.98) 60%)",
          animation: "confirmIn 0.6s cubic-bezier(0.4, 0, 0.2, 1) both",
        }}>
          {/* Status ring */}
          <div style={{
            width: "90px",
            height: "90px",
            borderRadius: "50%",
            border: `2px solid ${accentColor}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "2rem",
            boxShadow: `0 0 40px ${accentColor}44, inset 0 0 20px ${accentColor}11`,
            animation: "ringPulse 2s ease-in-out infinite",
          }}>
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke={accentColor} strokeWidth="1.5">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>

          {/* Booking ref */}
          <div style={{
            fontFamily: "var(--font-tech)",
            fontSize: "0.7rem",
            letterSpacing: "6px",
            color: "rgba(255,255,255,0.35)",
            marginBottom: "0.8rem",
          }}>
            MISSION REF: {bookingRef.current}
          </div>

          <h1 style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
            fontWeight: 900,
            margin: "0 0 0.4rem 0",
            textAlign: "center",
            letterSpacing: "-2px",
            color: "white",
          }}>
            RESERVATION
          </h1>
          <h1 style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
            fontWeight: 900,
            margin: "0 0 3rem 0",
            textAlign: "center",
            letterSpacing: "-2px",
            color: accentColor,
          }}>
            CONFIRMED
          </h1>

          {/* Mission brief grid */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1px",
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.06)",
            marginBottom: "3rem",
            width: "min(600px, 88vw)",
          }}>
            {[
              { label: "Destination", value: formData.destination },
              { label: "Departure", value: formData.date || "TBD" },
              { label: "Passengers", value: formData.passengers.toString() },
            ].map(({ label, value }) => (
              <div key={label} style={{ padding: "1.5rem", background: "rgba(2,2,8,0.8)" }}>
                <div style={{
                  fontSize: "0.65rem",
                  fontFamily: "var(--font-tech)",
                  letterSpacing: "3px",
                  color: accentColor,
                  marginBottom: "0.5rem",
                  textTransform: "uppercase",
                }}>
                  {label}
                </div>
                <div style={{
                  fontSize: "1.1rem",
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  color: "white",
                }}>
                  {value}
                </div>
              </div>
            ))}
          </div>

          {/* Total */}
          <div style={{
            fontFamily: "var(--font-tech)",
            fontSize: "0.75rem",
            letterSpacing: "3px",
            color: "rgba(255,255,255,0.4)",
            marginBottom: "0.5rem",
          }}>
            TOTAL CHARGED
          </div>
          <div style={{
            fontFamily: "var(--font-display)",
            fontSize: "2.5rem",
            fontWeight: 900,
            color: "#ffd700",
            marginBottom: "3.5rem",
          }}>
            {totalPrice}
          </div>

          <div style={{ display: "flex", gap: "1rem" }}>
            <LuxuryButton variant="secondary" onClick={() => setIsBooked(false)}>
              BOOK ANOTHER MISSION
            </LuxuryButton>
          </div>
        </div>
      )}

      <style>{`
        @keyframes bookingIn {
          from { opacity: 0; transform: translateX(-20px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes confirmIn {
          from { opacity: 0; transform: scale(0.97); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes ringPulse {
          0%, 100% { box-shadow: 0 0 40px ${accentColor}44, inset 0 0 20px ${accentColor}11; }
          50% { box-shadow: 0 0 60px ${accentColor}66, inset 0 0 30px ${accentColor}22; }
        }
        input[type="date"]::-webkit-calendar-picker-indicator { filter: invert(1); cursor: pointer; }
        select option { background: #0a0a0a; color: white; }
      `}</style>
    </>
  );
}
