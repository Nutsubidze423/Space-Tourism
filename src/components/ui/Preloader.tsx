import { Html, useProgress } from "@react-three/drei";

export default function Preloader() {
  const { progress } = useProgress();

  return (
    <Html center>
      <div
        style={{
          color: "white",
          fontFamily: "var(--font-heading)",
          textAlign: "center",
          width: "200px",
        }}
      >
        <div
          style={{
            marginBottom: "1rem",
            fontSize: "1.2rem",
            letterSpacing: "2px",
          }}
        >
          LOADING
        </div>
        <div
          style={{
            width: "100%",
            height: "2px",
            background: "rgba(255,255,255,0.2)",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              height: "100%",
              width: `${progress}%`,
              background: "var(--c-accent-blue)",
              transition: "width 0.2s",
            }}
          />
        </div>
        <div style={{ marginTop: "0.5rem", fontSize: "0.9rem", opacity: 0.7 }}>
          {progress.toFixed(0)}%
        </div>
      </div>
    </Html>
  );
}
