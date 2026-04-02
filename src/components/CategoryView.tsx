import React from "react";
import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { useStore } from "../store";
import { categories } from "../data";

const CategoryView: React.FC = () => {
  const { selectedCategory, selectCategory, selectActivity, activities } = useStore();

  if (!selectedCategory) return null;

  const filteredActivities = activities.filter(
    (a) => a.category === selectedCategory
  );
  
  const categoryInfo = categories.find((c) => c.id === selectedCategory);
  if (!categoryInfo) return null;

  const Icon = (Icons as Record<string, any>)[categoryInfo.icon] || Icons.HelpCircle;

  const bannerGradients: Record<string, string> = {
    learn: "from-indigo-600 to-cyan-500",
    chill: "from-orange-500 to-red-600",
    reset: "from-pink-500 to-rose-700",
    build: "from-purple-600 to-blue-500",
  };

  const gradient = bannerGradients[categoryInfo.id] || "from-muted to-secondary";

  return (
    <div className="flex flex-col gap-10 p-10 max-w-5xl mx-auto min-h-screen w-full selection:bg-white/10">
      
      {/* Header Banner - Hero Style */}
      <header className="relative w-full h-48 rounded-[2rem] overflow-hidden flex items-center justify-between p-10">
        <div className={`absolute inset-0 bg-gradient-to-r ${gradient} opacity-90`} />
        
        <div className="relative z-10 flex flex-col">
          <button
            onClick={() => selectCategory(null)}
            className="flex items-center gap-2 text-[10px] font-black uppercase text-white/50 hover:text-white transition-colors mb-4"
          >
            <Icons.ArrowLeft size={12} /> Back to Storefront
          </button>
          <span className="text-[10px] font-black tracking-[0.4em] text-white/60 uppercase mb-1 neon-glow-purple">
            Objective Deck
          </span>
          <h1 className="text-5xl font-black italic uppercase tracking-tighter text-white">
            {selectedCategory}
          </h1>
        </div>

        <div className="absolute right-[-2rem] top-1/2 -translate-y-1/2 opacity-20 text-white pointer-events-none">
           <Icon size={180} strokeWidth={1} />
        </div>
      </header>

      {/* Activities Grid - Game Store Style */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredActivities.map((activity, idx) => (
          <motion.button
            key={activity.id}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: idx * 0.1 }}
            onClick={() => selectActivity(activity)}
            className="group relative flex flex-col p-8 rounded-[1.5rem] bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/10 transition-all text-left"
          >
            <div className="flex items-center justify-between mb-4">
               <div className="p-3 rounded-xl bg-white/10 text-white group-hover:bg-primary transition-colors">
                  <Icons.Target size={20} />
               </div>
               <Icons.ChevronRight size={16} className="text-white/20 group-hover:translate-x-1 transition-transform" />
            </div>
            
            <h3 className="text-xl font-black italic uppercase tracking-tight text-white/90 group-hover:text-white transition-colors mb-2">
               {activity.name}
            </h3>
            
            {activity.energy && (
               <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest bg-white/5 px-2 py-1 rounded inline-block w-fit">
                 {activity.energy} INTENSITY
               </span>
            )}

            {/* Glowing background on hover */}
            <div className="absolute inset-x-8 -bottom-2 h-8 bg-primary/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.button>
        ))}
      </div>

      {filteredActivities.length === 0 && (
         <div className="text-center py-24 text-muted-foreground italic opacity-50 uppercase tracking-[0.5em] text-[10px]">
            No Missions Cached
         </div>
      )}
    </div>
  );
};

export default CategoryView;
