import React, { useEffect } from "react";
import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { useStore } from "../store";

const UrgeOverride: React.FC = () => {
  const { setScreen, startTimer, resetTimer, timerRemaining } = useStore();

  useEffect(() => {
    startTimer(5 * 60);
    return () => resetTimer();
  }, [startTimer, resetTimer]);

  const emergencyActions = [
    { name: "5 Deep Breaths", icon: Icons.Wind },
    { name: "Sit Still / No Movement", icon: Icons.UserCheck },
    { name: "Drink Water", icon: Icons.Droplets },
    { name: "Look at something far away", icon: Icons.Eye },
  ];

  return (
    <div className="flex flex-col items-center justify-center gap-10 p-10 max-w-2xl min-h-screen relative z-50 w-full overflow-hidden selection:bg-rose-500/30">
      
      {/* Background vignette - System Alert Red */}
      <motion.div 
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         className="absolute inset-0 bg-radial-[circle_at_50%_50%] from-rose-950/20 via-black/80 to-black pointer-events-none" 
      />
      
      <header className="text-center space-y-4 relative z-10">
        <div className="inline-flex p-8 rounded-[2rem] bg-rose-500/10 text-rose-500 animate-pulse border border-rose-500/20 shadow-[0_0_50px_rgba(244,63,94,0.1)] mb-4">
          <Icons.ShieldAlert size={80} />
        </div>
        <div className="flex flex-col">
            <span className="text-[12px] font-black tracking-[0.4em] text-rose-500 uppercase neon-glow-rose">
              System Breach Detected: URGE
            </span>
            <h1 className="text-8xl font-black italic uppercase tracking-tighter text-rose-100 drop-shadow-2xl">HALT.</h1>
        </div>
      </header>

      {/* Hero Timer */}
      <div className="text-[10rem] font-black tabular-nums text-rose-100 tracking-tighter italic leading-none opacity-90 drop-shadow-2xl">
        {Math.floor(timerRemaining / 60)}:{(timerRemaining % 60).toString().padStart(2, '0')}
      </div>

      {/* Corrective Actions - Gallery Style */}
      <div className="w-full space-y-3 max-w-sm relative z-10">
        <h3 className="text-[10px] font-black tracking-[0.2em] text-rose-400 uppercase text-center mb-6">
           Mandatory Counter-Measures
        </h3>
        {emergencyActions.map((action, idx) => (
          <motion.div
            key={idx}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.8 + idx * 0.1 }}
            className="flex items-center gap-6 px-10 py-5 rounded-full bg-rose-500/5 border border-rose-500/20 text-rose-100 backdrop-blur-md"
          >
            <action.icon size={20} className="text-rose-500 shadow-rose-500/50" />
            <span className="text-lg font-black uppercase tracking-tight italic">{action.name}</span>
          </motion.div>
        ))}
      </div>

      <button
        onClick={() => setScreen("home")}
        className="text-rose-500 hover:text-rose-100 font-black italic uppercase text-xs tracking-widest py-6 px-12 transition-all hover:scale-105 active:scale-95"
      >
        I have regained control → ABORT PROTOCOL
      </button>
    </div>
  );
};

export default UrgeOverride;
