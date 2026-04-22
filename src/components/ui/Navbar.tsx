import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  const navItems = [
    { name: "HOME", path: "/" },
    { name: "DESTINATIONS", path: "/destinations" },
    { name: "SPACECRAFT", path: "/spacecraft" },
    { name: "CREW", path: "/crew" },
    { name: "JOURNEY", path: "/journey" },
    { name: "BOOK", path: "/book" },
  ];

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        padding: "2rem 3rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        zIndex: 100,
        pointerEvents: "auto",
      }}
    >
      {/* Logo */}
      <div
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "1.5rem",
          fontWeight: 900,
          letterSpacing: "-1px",
          color: "white",
        }}
      >
        EVENT HORIZON
      </div>

      {/* Links */}
      <div style={{ display: "flex", gap: "3rem" }}>
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            style={{
              textDecoration: "none",
              color:
                location.pathname === item.path
                  ? "var(--c-accent-blue)"
                  : "white",
              textShadow:
                location.pathname === item.path
                  ? "0 0 10px var(--c-accent-blue)"
                  : "none",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "var(--c-accent-blue)";
              e.currentTarget.style.textShadow =
                "0 0 10px var(--c-accent-blue)";
            }}
            onMouseLeave={(e) => {
              if (location.pathname !== item.path) {
                e.currentTarget.style.color = "white";
                e.currentTarget.style.textShadow = "none";
              }
            }}
          >
            {item.name}
          </Link>
        ))}
      </div>
    </nav>
  );
}
