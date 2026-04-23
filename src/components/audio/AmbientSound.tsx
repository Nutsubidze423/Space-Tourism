import { useRef, useState } from "react";

export default function AmbientSound() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);

  const initAudio = () => {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    const ctx = new AudioContext();
    audioContextRef.current = ctx;

    const masterGain = ctx.createGain();
    masterGain.gain.value = 0;
    masterGain.connect(ctx.destination);
    gainNodeRef.current = masterGain;

    const freqs = [55, 110, 112, 165];
    freqs.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      osc.type = i % 2 === 0 ? "sine" : "triangle";
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      const lfo = ctx.createOscillator();
      lfo.frequency.value = 0.1 + Math.random() * 0.2;
      const lfoGain = ctx.createGain();
      lfoGain.gain.value = 10;
      lfo.connect(lfoGain);
      lfoGain.connect(osc.frequency);

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

  const toggleSound = () => {
    if (!audioContextRef.current) {
      initAudio();
    }
    const ctx = audioContextRef.current!;
    const gain = gainNodeRef.current!;

    if (ctx.state === "suspended") ctx.resume();

    const nextPlaying = !isPlaying;
    gain.gain.setTargetAtTime(nextPlaying ? 0.1 : 0, ctx.currentTime, 0.5);
    setIsPlaying(nextPlaying);
  };

  return (
    <button
      onClick={toggleSound}
      title={isPlaying ? "Mute ambient" : "Play ambient"}
      style={{
        position: "fixed",
        bottom: "2rem",
        right: "2rem",
        zIndex: 1000,
        background: isPlaying ? "rgba(0,212,255,0.12)" : "rgba(255,255,255,0.06)",
        border: isPlaying ? "1px solid rgba(0,212,255,0.35)" : "1px solid rgba(255,255,255,0.1)",
        borderRadius: "50%",
        width: "42px",
        height: "42px",
        color: isPlaying ? "var(--c-accent-blue)" : "rgba(255,255,255,0.5)",
        cursor: "pointer",
        backdropFilter: "blur(8px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "all 0.3s ease",
      }}
    >
      {isPlaying ? (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M11 5L6 9H2v6h4l5 4V5zm8.07 1.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"/>
        </svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M11 5L6 9H2v6h4l5 4V5z" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"/>
          <line x1="23" y1="9" x2="17" y2="15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <line x1="17" y1="9" x2="23" y2="15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      )}
    </button>
  );
}
