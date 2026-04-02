import React, { useState } from "react";
import * as Icons from "lucide-react";
import { useStore } from "../store";

const ActivityDetail: React.FC = () => {
  const { selectedActivity, selectActivity, selectCategory, startTimer, incrementDistractions } = useStore();
  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({});

  if (!selectedActivity) return null;

  const handleStart = () => {
    incrementDistractions();
    if (selectedActivity.type === "link" && selectedActivity.url) {
      window.open(selectedActivity.url, "_blank");
    }
  };

  const toggleCheck = (idx: number) => {
    setCheckedItems(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  const bannerGradients: Record<string, string> = {
    learn: "from-indigo-600 to-cyan-500",
    chill: "from-orange-500 to-red-600",
    reset: "from-pink-500 to-rose-700",
    build: "from-purple-600 to-blue-500",
  };

  const gradient = bannerGradients[selectedActivity.category] || "from-muted to-secondary";

  return (
    <div className="flex flex-col gap-10 p-10 max-w-5xl mx-auto min-h-screen w-full selection:bg-white/10">
      
      {/* Header Banner - Hero Style */}
      <header className="relative w-full h-48 rounded-[2rem] overflow-hidden flex items-center justify-between p-10">
        <div className={`absolute inset-0 bg-gradient-to-r ${gradient} opacity-90`} />
        
        <div className="relative z-10 flex flex-col">
          <button
            onClick={() => {
               selectActivity(null);
               selectCategory(selectedActivity.category);
            }}
            className="flex items-center gap-2 text-[10px] font-black uppercase text-white/50 hover:text-white transition-colors mb-4"
          >
            <Icons.ArrowLeft size={12} /> Back to Missions
          </button>
          <span className="text-[10px] font-black tracking-[0.4em] text-white/60 uppercase mb-1 neon-glow-purple">
            Mission Briefing
          </span>
          <h1 className="text-5xl font-black italic uppercase tracking-tighter text-white">
            {selectedActivity.name}
          </h1>
        </div>

        <div className="absolute right-[-2rem] top-1/2 -translate-y-1/2 opacity-20 text-white pointer-events-none">
           <Icons.Zap size={180} strokeWidth={1} />
        </div>
      </header>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Left Side: Actions/Checklist */}
        <div className="flex-[2] space-y-8">
           {selectedActivity.description && (
              <p className="text-xl font-bold italic uppercase tracking-tight text-white/60 px-2 line-clamp-2">
                "{selectedActivity.description}"
              </p>
           )}

           {selectedActivity.type === "checklist" && selectedActivity.checklist && (
             <div className="space-y-3">
                <h3 className="text-[10px] font-black tracking-[0.2em] text-muted-foreground uppercase px-4">
                  Log of Execution
                </h3>
                {selectedActivity.checklist.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => toggleCheck(idx)}
                    className={`flex items-center gap-6 px-10 py-5 rounded-full border-2 transition-all w-full text-left group ${
                      checkedItems[idx] ? 'border-primary bg-primary/10' : 'border-transparent bg-white/5 hover:border-primary/20'
                    }`}
                  >
                    <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${
                      checkedItems[idx] ? 'bg-primary border-primary' : 'border-muted'
                    }`}>
                      {checkedItems[idx] && <Icons.Check size={16} className="text-primary-foreground font-black" />}
                    </div>
                    <span className={`text-lg font-bold italic uppercase transition-all ${
                       checkedItems[idx] ? 'line-through opacity-50' : 'opacity-100 group-hover:text-primary transition-colors'
                    }`}>
                       {item}
                    </span>
                  </button>
                ))}
             </div>
           )}

           <button
             onClick={handleStart}
             className="w-full py-8 rounded-[1.5rem] bg-white text-black font-black italic uppercase text-2xl tracking-tighter hover:scale-[1.02] active:scale-95 transition-all shadow-2xl shadow-primary/20 group relative overflow-hidden"
           >
             <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-10 transition-opacity" />
             {selectedActivity.type === "link" ? "Execute Goal (X)" : "Start Mission (X)"}
           </button>
        </div>

        {/* Right Side: Quick Timers */}
        <div className="flex-1 space-y-6">
           <h3 className="text-[10px] font-black tracking-[0.2em] text-muted-foreground uppercase px-4">
             Time Focused
           </h3>
           <div className="flex flex-col gap-3">
             {[5, 10, 25].map((mins) => (
               <button
                 key={mins}
                 onClick={() => startTimer(mins * 60)}
                 className="group relative h-20 rounded-[1.5rem] bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/10 transition-all flex items-center p-8 overflow-hidden"
               >
                 <div className="flex flex-col text-left">
                    <span className="text-2xl font-black italic uppercase tracking-tighter text-white/90 group-hover:text-primary">
                      {mins} MIN
                    </span>
                    <span className="text-[8px] font-bold text-muted-foreground uppercase tracking-widest">
                      Focused session
                    </span>
                 </div>
                 <Icons.Timer size={32} className="ml-auto opacity-10 group-hover:opacity-30 group-hover:rotate-12 transition-all" />
                 
                 {/* Internal glow line */}
                 <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
               </button>
             ))}
           </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityDetail;
