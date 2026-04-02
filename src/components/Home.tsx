import React from "react";
import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { useStore } from "../store";
import { categories, activities } from "../data";

const Home: React.FC = () => {
  const { selectCategory, setScreen, lastActivity, selectActivity, distractionsAvoided } = useStore();

  const handleRandomize = () => {
    const randomIdx = Math.floor(Math.random() * activities.length);
    selectActivity(activities[randomIdx]);
  };

  const bannerGradients: Record<string, string> = {
    learn: "from-indigo-600 to-cyan-500",
    chill: "from-orange-500 to-red-600",
    reset: "from-pink-500 to-rose-700",
    build: "from-purple-600 to-blue-500",
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <div className="flex flex-col gap-12 p-10 max-w-5xl mx-auto min-h-screen selection:bg-white/20">
      
      {/* Header Profile Section */}
      <header className="flex items-center justify-between">
        <div className="space-y-1">
          <span className="text-[10px] font-black tracking-[0.4em] text-primary uppercase neon-glow-purple">
            Missions Overview
          </span>
          <h1 className="text-5xl font-black italic tracking-tighter uppercase">STOREFRONT</h1>
        </div>
        <div className="text-right hidden sm:block">
           <div className="text-[10px] font-bold text-muted-foreground uppercase opacity-50">
             Distractions Avoided
           </div>
           <div className="text-4xl font-black tracking-tighter text-white">
              {distractionsAvoided.toString().padStart(2, '0')}
           </div>
        </div>
      </header>

      {/* Categories Hero Gallery */}
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        {categories.map((cat, idx) => {
          const Icon = (Icons as any)[cat.icon];
          const gradient = bannerGradients[cat.id] || "from-muted to-secondary";
          
          return (
            <motion.button
              key={cat.id}
              variants={item}
              onClick={() => selectCategory(cat.id as any)}
              className="group relative h-48 w-full hero-card overflow-visible text-left"
            >
              <div className={`absolute inset-0 bg-gradient-to-r ${gradient} rounded-[2rem] opacity-90 group-hover:opacity-100 transition-opacity`} />
              
              {/* Content Overlay */}
              <div className="relative z-10 p-8 flex flex-col h-full justify-center">
                 <span className="text-[10px] font-black tracking-[0.2em] text-white/60 uppercase mb-1">
                    0{idx + 1} Selection
                 </span>
                 <h2 className="text-4xl font-black italic uppercase tracking-tighter text-white group-hover:scale-105 transition-transform origin-left">
                    {cat.name}
                 </h2>
                 <p className="text-[10px] font-bold text-white/50 uppercase tracking-widest mt-2 group-hover:text-white/80 transition-colors">
                    Explore Objectives
                 </p>
                 
                 {/* Floating Icon - Now inside the card to prevent clipping */}
                 <div className="absolute top-1/2 -translate-y-1/2 right-4 floating-icon text-white/10 group-hover:text-white/25 group-hover:right-6 transition-all duration-500 pointer-events-none drop-shadow-2xl">
                    <Icon size={100} strokeWidth={1} />
                 </div>
              </div>

              {/* Internal selection glow */}
              <div className="absolute inset-x-8 -bottom-4 h-12 bg-white/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.button>
          );
        })}
      </motion.div>

      {/* Dashboard Actions */}
      <div className="flex flex-col gap-6 pt-12 border-t border-white/5">
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={handleRandomize}
            className="flex-1 px-10 py-5 rounded-[1.5rem] bg-white text-black font-black italic uppercase tracking-tighter hover:bg-white/90 active:scale-95 transition-all flex items-center justify-center gap-3 group shadow-2xl shadow-white/10"
          >
            <Icons.Dices size={24} className="group-hover:rotate-45 transition-transform" />
            Random Objective
          </button>

          <button
            onClick={() => setScreen("urge")}
            className="px-10 py-5 rounded-[1.5rem] border-2 border-rose-500/50 text-rose-500 font-bold italic uppercase tracking-tighter hover:bg-rose-500/10 transition-all flex items-center justify-center gap-3"
          >
            <Icons.ShieldAlert size={24} />
            Antidote Required
          </button>
        </div>

        <div className="flex flex-wrap gap-4 justify-center">
          <button
            onClick={() => setScreen("add-activity")}
            className="px-6 py-3 rounded-full bg-white/5 text-muted-foreground hover:text-white font-bold italic uppercase text-[10px] tracking-widest transition-all hover:bg-white/10 flex items-center gap-2"
          >
            <Icons.Plus size={14} />
            Develop Mission
          </button>

          <button
            onClick={() => setScreen("journal")}
            className="px-6 py-3 rounded-full bg-white/5 text-muted-foreground hover:text-white font-bold italic uppercase text-[10px] tracking-widest transition-all hover:bg-white/10 flex items-center gap-2"
          >
            <Icons.BookOpen size={14} />
            Archive Log
          </button>
          
          {lastActivity && (
             <button
               onClick={() => selectActivity(lastActivity)}
               className="px-6 py-3 rounded-full border border-white/10 text-primary font-bold italic uppercase text-[10px] tracking-widest transition-all hover:bg-primary/10 flex items-center gap-2"
             >
               <Icons.RotateCcw size={14} />
               Resume Previous
             </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
