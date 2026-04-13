import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import gsap from "gsap";

export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const location = useLocation();
  const el = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!el.current) return;

    // Simple fade transition on route change
    gsap.fromTo(
      el.current,
      { opacity: 0, y: 20, filter: "blur(10px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.8,
        ease: "power3.out",
      },
    );
  }, [location.pathname]);

  return (
    <div ref={el} style={{ width: "100%", minHeight: "100vh" }}>
      {children}
    </div>
  );
}
