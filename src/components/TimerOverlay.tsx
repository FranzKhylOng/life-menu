import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as Icons from "lucide-react";
import { useStore } from "../store";

const TimerOverlay: React.FC = () => {
  const { timerRemaining, isTimerRunning, timerComplete, resetTimer, currentScreen } = useStore();

  if (!isTimerRunning && !timerComplete) return null;
  
  if (currentScreen === "urge") return null;

  const minutes = Math.floor(timerRemaining / 60);
  const seconds = timerRemaining % 60;

  return (
    <AnimatePresence>
      {(isTimerRunning || timerComplete) && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-12 left-1/2 -translate-x-1/2 z-50 w-full max-w-sm px-6"
        >
          <div className={`p-6 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex items-center justify-between gap-6 border backdrop-blur-3xl overflow-hidden relative ${
            timerComplete ? 'border-emerald-500/50 bg-emerald-950/20' : 'border-primary/50 bg-primary/10'
          }`}>
             
             <div className="flex items-center gap-4">
              <div className={`p-4 rounded-2xl ${timerComplete ? 'bg-emerald-500/20 text-emerald-400' : 'bg-primary/20 text-primary'}`}>
                {timerComplete ? <Icons.Check size={28} /> : <Icons.Timer size={28} />}
              </div>
              <div>
                <div className="text-4xl font-black italic tracking-tighter tabular-nums leading-none">
                  {timerComplete ? "DONE" : `${minutes}:${seconds.toString().padStart(2, '0')}`}
                </div>
                <div className="text-[10px] uppercase tracking-widest font-black text-white/50 mt-1">
                  {timerComplete ? "Mission Complete" : "Execution Mode"}
                </div>
              </div>
            </div>

            <button
              onClick={resetTimer}
              className="p-3 rounded-full hover:bg-white/10 transition-colors group"
            >
              <Icons.X size={24} className="text-white/40 group-hover:text-white" />
            </button>

            {/* Glowing bottom line */}
            <div className={`absolute bottom-0 left-0 right-0 h-1 ${timerComplete ? 'bg-emerald-500' : 'bg-primary'} opacity-50 shadow-[0_0_20px_rgba(168,85,247,0.5)]`} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TimerOverlay;
