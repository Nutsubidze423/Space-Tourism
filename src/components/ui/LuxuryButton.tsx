import { useRef, useState } from "react";
import gsap from "gsap";

interface LuxuryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "tertiary";
  icon?: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function LuxuryButton({
  children,
  variant = "primary",
  icon,
  onClick,
  style,
  ...props
}: LuxuryButtonProps) {
  const btnRef = useRef<HTMLButtonElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    gsap.to(btnRef.current, { scale: 1.05, duration: 0.3, ease: "power2.out" });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    gsap.to(btnRef.current, { scale: 1, duration: 0.3, ease: "power2.out" });
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    gsap.to(btnRef.current, { scale: 0.95, duration: 0.1, yoyo: true, repeat: 1 });
    if (onClick) onClick(e);
  };

  const getVariantStyles = () => {
    switch (variant) {
      case "primary":
        return {
          background: "rgba(255, 255, 255, 0.05)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          boxShadow: isHovered
            ? "0 0 30px rgba(0, 212, 255, 0.4), inset 0 0 20px rgba(0, 212, 255, 0.1)"
            : "0 0 0 rgba(0,0,0,0)",
          color: isHovered ? "#00d4ff" : "white",
        };
      case "secondary":
        return {
          background: "transparent",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          boxShadow: isHovered ? "0 0 20px rgba(189, 0, 255, 0.3)" : "none",
          color: isHovered ? "#bd00ff" : "rgba(255,255,255,0.8)",
        };
      case "tertiary":
        return {
          background: "transparent",
          border: "none",
          color: isHovered ? "white" : "rgba(255,255,255,0.6)",
          letterSpacing: "2px",
        };
    }
  };

  return (
    <button
      ref={btnRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      style={{
        position: "relative",
        padding: "1.2rem 3rem",
        fontSize: "0.9rem",
        textTransform: "uppercase",
        letterSpacing: "3px",
        fontWeight: 600,
        fontFamily: "var(--font-tech), sans-serif",
        cursor: "pointer",
        backdropFilter: "blur(10px)",
        borderRadius: "2px",
        transition: "color 0.3s, background 0.3s, box-shadow 0.3s, border-color 0.3s",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "1rem",
        ...getVariantStyles(),
        ...style,
      }}
      {...props}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "-100%",
          width: "100%",
          height: "100%",
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
          transform: isHovered ? "translateX(200%)" : "translateX(0)",
          transition: "transform 0.6s ease-in-out",
        }}
      />
      {children}
      {icon && <span style={{ fontSize: "1.2em" }}>{icon}</span>}
    </button>
  );
}
