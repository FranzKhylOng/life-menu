import React from "react";
import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { useStore } from "../store";

const JournalView: React.FC = () => {
  const { setScreen, studyJournal } = useStore();

  const formatDate = (timestamp: number) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true
    }).format(new Date(timestamp));
  };

  return (
    <div className="flex flex-col gap-10 p-10 max-w-4xl mx-auto min-h-screen justify-center w-full selection:bg-white/10">
      <header className="flex flex-col gap-2">
        <button
          onClick={() => setScreen("home")}
          className="flex items-center gap-2 text-[10px] font-black uppercase text-white/50 hover:text-white transition-colors mb-4"
        >
          <Icons.ArrowLeft size={12} /> Exit Archive
        </button>
        <span className="text-[10px] font-black tracking-[0.4em] text-primary uppercase mb-1 neon-glow-purple">
          Historical Log
        </span>
        <h1 className="text-5xl font-black italic uppercase tracking-tighter text-white">
          Mission Archive
        </h1>
      </header>

      {studyJournal.length > 0 ? (
        <div className="space-y-4">
          <h3 className="text-[10px] font-black tracking-[0.2em] text-muted-foreground uppercase px-4 mb-2">
             Recent Executions
          </h3>
          <div className="flex flex-col gap-3">
             {studyJournal.map((entry, idx) => (
               <motion.div
                 key={entry.id}
                 initial={{ opacity: 0, x: -20 }}
                 animate={{ opacity: 1, x: 0 }}
                 transition={{ delay: idx * 0.05 }}
                 className="flex items-center justify-between p-6 rounded-[1.5rem] bg-white/5 border border-white/5 hover:bg-white/10 transition-all group"
               >
                 <div className="flex flex-col">
                    <span className="text-xl font-black italic uppercase tracking-tight text-white group-hover:text-primary transition-colors">
                       {entry.activityName}
                    </span>
                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-1">
                       Session Recorded
                    </span>
                 </div>
                 <div className="text-right">
                    <div className="text-sm font-bold text-white/80">
                       {formatDate(entry.timestamp)}
                    </div>
                    {entry.duration && (
                       <div className="text-[8px] font-black text-primary uppercase mt-1">
                          {entry.duration} MIN Duration
                       </div>
                    )}
                 </div>
               </motion.div>
             ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-24 text-muted-foreground italic opacity-50 uppercase tracking-[0.5em] text-[10px]">
           Archive Empty
        </div>
      )}
    </div>
  );
};

export default JournalView;
