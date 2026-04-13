import { useEffect, useRef, useState } from "react";

export default function AmbientSound() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);
  const gainNodeRef = useRef<GainNode | null>(null);

  useEffect(() => {
    const handleInteraction = () => {
      if (!audioContextRef.current) {
        initAudio();
      } else if (audioContextRef.current.state === "suspended") {
        audioContextRef.current.resume();
      }
      setIsPlaying(true);
      window.removeEventListener("click", handleInteraction);
      window.removeEventListener("keydown", handleInteraction);
    };

    window.addEventListener("click", handleInteraction);
    window.addEventListener("keydown", handleInteraction);

    return () => {
      window.removeEventListener("click", handleInteraction);
      window.removeEventListener("keydown", handleInteraction);
      stopAudio();
    };
  }, []);

  const initAudio = () => {
    const AudioContext =
      window.AudioContext || (window as any).webkitAudioContext;
    const ctx = new AudioContext();
    audioContextRef.current = ctx;

    const masterGain = ctx.createGain();
    masterGain.gain.value = 0.1; // Low volume
    masterGain.connect(ctx.destination);
    gainNodeRef.current = masterGain;

    // Create drone oscillators
    const freqs = [55, 110, 112, 165]; // Atmospheric chord

    freqs.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      osc.type = i % 2 === 0 ? "sine" : "triangle";
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      // LFO for modulation
      const lfo = ctx.createOscillator();
      lfo.frequency.value = 0.1 + Math.random() * 0.2;
      const lfoGain = ctx.createGain();
      lfoGain.gain.value = 10;
      lfo.connect(lfoGain.gain);

      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.value = 400;

      const panner = ctx.createStereoPanner();
      panner.pan.value = Math.random() * 2 - 1;

      osc.connect(filter);
      filter.connect(panner);
      panner.connect(masterGain);

      osc.start();
      lfo.start();
      oscillatorsRef.current.push(osc);
    });
  };

  const stopAudio = () => {
    oscillatorsRef.current.forEach((osc) => osc.stop());
    if (audioContextRef.current) {
      audioContextRef.current.close();
    }
  };

  const toggleMute = () => {
    if (gainNodeRef.current) {
      const target = isPlaying ? 0 : 0.1;
      gainNodeRef.current.gain.setTargetAtTime(
        target,
        audioContextRef.current!.currentTime,
        0.5,
      );
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <button
      onClick={toggleMute}
      style={{
        position: "fixed",
        bottom: "2rem",
        right: "2rem",
        zIndex: 1000,
        background: "rgba(255,255,255,0.1)",
        border: "none",
        borderRadius: "50%",
        width: "40px",
        height: "40px",
        color: "white",
        cursor: "pointer",
        backdropFilter: "blur(5px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "1.2rem",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "0.7rem",
          fontWeight: "bold",
        }}
      >
        {isPlaying ? "ON" : "OFF"}
      </div>
    </button>
  );
}
