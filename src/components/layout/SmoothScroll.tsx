import { ReactLenis } from "lenis/react";
import { ReactNode } from "react";
import "lenis/dist/lenis.css";

export default function SmoothScroll({ children }: { children: ReactNode }) {
  return <ReactLenis root>{children}</ReactLenis>;
}
