export default function HeroText() {
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
          lineHeight: 1.1,
          fontFamily: "var(--font-display)",
          letterSpacing: "-2px",
          textTransform: "uppercase",
          background:
            "linear-gradient(180deg, #ffffff 0%, rgba(255,255,255,0.7) 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          filter: "drop-shadow(0 0 30px rgba(0, 212, 255, 0.2))",
        }}
      >
        BEYOND THE <br />
        <span
          style={{
            color: "var(--c-accent-blue)",
            WebkitTextFillColor: "var(--c-accent-blue)",
          }}
        >
          EVENT HORIZON
        </span>
      </h1>

      <p
        style={{
          fontSize: "clamp(1rem, 2vw, 1.2rem)",
          maxWidth: "600px",
          margin: "2rem auto",
          lineHeight: 1.8,
          opacity: 0.8,
          fontFamily: "var(--font-body)",
          fontWeight: 300,
          letterSpacing: "1px",
        }}
      >
        Experience the ultimate frontier of luxury space travel. Where known
        reality bends and the cosmos reveals its deepest mysteries.
      </p>

      <button
        style={{
          background: "white",
          color: "black",
          border: "none",
          padding: "1rem 2rem",
          fontSize: "1.2rem",
          borderRadius: "50px",
          cursor: "pointer",
          marginTop: "2rem",
          fontWeight: "bold",
          transition: "transform 0.2s",
          pointerEvents: "auto",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      >
        START YOUR JOURNEY
      </button>

      <style>{`
        @keyframes shimmer {
          0% { background-position: 200% center; }
          100% { background-position: -200% center; }
        }
      `}</style>
    </div>
  );
}
