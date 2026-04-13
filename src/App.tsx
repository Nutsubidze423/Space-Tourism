import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Destinations from "./pages/Destinations";
import Spacecraft from "./pages/Spacecraft";
import Crew from "./pages/Crew";
import Journey from "./pages/Journey";
import Booking from "./pages/Booking";
import PageTransition from "./components/layout/PageTransition";
import AmbientSound from "./components/audio/AmbientSound";
import "./styles/tokens.css";

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <PageTransition key={location.pathname}>
      <Routes location={location}>
        <Route path="/" element={<Home />} />
        <Route path="/destinations" element={<Destinations />} />
        <Route path="/spacecraft" element={<Spacecraft />} />
        <Route path="/crew" element={<Crew />} />
        <Route path="/journey" element={<Journey />} />
        <Route path="/book" element={<Booking />} />
      </Routes>
    </PageTransition>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AmbientSound />
      <AnimatedRoutes />
    </BrowserRouter>
  );
}

export default App;
