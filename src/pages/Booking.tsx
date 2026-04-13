import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, ContactShadows } from "@react-three/drei";
import { Suspense } from "react";
import Navbar from "../components/ui/Navbar";
import TicketPreview from "../components/canvas/TicketPreview";
import StarField from "../components/canvas/StarField";
import LuxuryButton from "../components/ui/LuxuryButton";

export default function Booking() {
  const [formData, setFormData] = useState({
    destination: "MARS",
    date: "",
    passengers: 1,
  });

  const [isBooked, setIsBooked] = useState(false);

  const prices: { [key: string]: number } = {
    MARS: 450000,
    MOON: 150000,
    JUPITER: 1200000,
    SATURN: 1500000,
    EUROPA: 1800000,
    TITAN: 1600000,
  };

  const basePrice = prices[formData.destination] || 0;
  const totalPrice = (basePrice * formData.passengers).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsBooked(true);
  };

  const inputStyle = {
    width: "100%",
    padding: "1.2rem",
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.1)",
    color: "white",
    borderRadius: "2px", // Sharp luxury
    fontSize: "1rem",
    cursor: "pointer",
    fontFamily: "var(--font-body)",
    transition: "border-color 0.3s, background 0.3s",
    outline: "none",
  };

  return (
    <>
      <Navbar />

      {/* 3D Background & Ticket Preview */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
        }}
      >
        <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
          <color attach="background" args={["#050505"]} />
          <Suspense fallback={null}>
            <StarField />
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />

            {/* Show Ticket in 3D Space */}
            <group position={[2, 0, 0]} rotation={[0, -0.3, 0]}>
              <TicketPreview
                destination={formData.destination}
                date={formData.date}
                passengers={formData.passengers}
                price={totalPrice}
              />
            </group>

            <Environment preset="city" />
            <ContactShadows
              position={[0, -2, 0]}
              opacity={0.5}
              scale={10}
              blur={2}
              far={4}
            />
          </Suspense>
        </Canvas>
      </div>

      {/* Booking Layout */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          paddingLeft: "5%",
          pointerEvents: "none",
        }}
      >
        {!isBooked ? (
          <div
            className="glass"
            style={{
              padding: "3rem",
              width: "450px",
              pointerEvents: "auto",
              transform: "scale(0.9)",
              animation: "fadeIn 0.5s ease-out",
              border: "1px solid rgba(255,255,255,0.1)",
              backdropFilter: "blur(30px)",
            }}
          >
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "3.5rem",
                margin: "0 0 2rem 0",
                fontWeight: 700,
                lineHeight: 0.9,
                letterSpacing: "-2px",
              }}
            >
              BOOK YOUR
              <br />
              <span style={{ color: "var(--c-accent-blue)" }}>JOURNEY</span>
            </h1>

            <form
              onSubmit={handleSubmit}
              style={{ display: "grid", gap: "1.5rem" }}
            >
              <div>
                <label
                  style={{
                    display: "block",
                    marginBottom: "0.5rem",
                    fontSize: "0.8rem",
                    opacity: 0.6,
                    fontFamily: "var(--font-tech)",
                    letterSpacing: "1px",
                  }}
                >
                  DESTINATION
                </label>
                <select
                  value={formData.destination}
                  onChange={(e) =>
                    setFormData({ ...formData, destination: e.target.value })
                  }
                  style={inputStyle}
                >
                  <option value="MARS">MARS</option>
                  <option value="MOON">MOON</option>
                  <option value="JUPITER">JUPITER</option>
                  <option value="SATURN">SATURN</option>
                  <option value="EUROPA">EUROPA</option>
                  <option value="TITAN">TITAN</option>
                </select>
              </div>

              <div>
                <label
                  style={{
                    display: "block",
                    marginBottom: "0.5rem",
                    fontSize: "0.8rem",
                    opacity: 0.6,
                    fontFamily: "var(--font-tech)",
                    letterSpacing: "1px",
                  }}
                >
                  DEPARTURE DATE
                </label>
                <input
                  type="date"
                  required
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                  style={inputStyle}
                />
              </div>

              <div>
                <label
                  style={{
                    display: "block",
                    marginBottom: "0.5rem",
                    fontSize: "0.8rem",
                    opacity: 0.6,
                    fontFamily: "var(--font-tech)",
                    letterSpacing: "1px",
                  }}
                >
                  PASSENGERS
                </label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={formData.passengers}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      passengers: parseInt(e.target.value),
                    })
                  }
                  style={inputStyle}
                />
              </div>

              <div
                style={{
                  marginTop: "1rem",
                  padding: "1rem",
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.05)",
                  borderRadius: "2px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span
                  style={{
                    opacity: 0.7,
                    fontFamily: "var(--font-tech)",
                    fontSize: "0.9rem",
                  }}
                >
                  ESTIMATED TOTAL
                </span>
                <span
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: 700,
                    color: "#ffd700",
                    fontFamily: "var(--font-display)",
                  }}
                >
                  {totalPrice}
                </span>
              </div>

              <LuxuryButton
                variant="primary"
                type="submit"
                style={{ width: "100%", marginTop: "1rem" }}
              >
                CONFIRM RESERVATION
              </LuxuryButton>
            </form>
          </div>
        ) : (
          <div
            className="glass"
            style={{
              padding: "4rem",
              textAlign: "center",
              pointerEvents: "auto",
              animation: "fadeIn 0.5s ease-out",
            }}
          >
            {/* SVG Icon instead of emoji */}
            <div style={{ marginBottom: "2rem" }}>
              <svg
                width="60"
                height="60"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="1"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                margin: "1rem 0",
                letterSpacing: "-1px",
                fontSize: "3rem",
                fontWeight: 700,
              }}
            >
              BOOKING CONFIRMED
            </h2>
            <p
              style={{
                opacity: 0.8,
                fontSize: "1.1rem",
                lineHeight: 1.8,
                fontFamily: "var(--font-body)",
                fontWeight: 300,
                marginBottom: "2rem",
              }}
            >
              Prepare for liftoff, traveller.
              <br />
              Your ticket to {formData.destination} has been issued.
            </p>
            <LuxuryButton
              variant="secondary"
              onClick={() => setIsBooked(false)}
            >
              Book Another Trip
            </LuxuryButton>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        input[type="date"]::-webkit-calendar-picker-indicator {
          filter: invert(1);
          cursor: pointer;
        }
        select option {
          background: #0a0a0a;
          color: white;
        }
      `}</style>
    </>
  );
}
