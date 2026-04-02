import React, { useState } from "react";
import * as Icons from "lucide-react";
import { useStore } from "../store";
import type { Category } from "../data";

const AddActivity: React.FC = () => {
  const { setScreen, addActivity } = useStore();
  const [name, setName] = useState("");
  const [category, setCategory] = useState<Category>("build");
  const [type, setType] = useState<"link" | "checklist">("link");
  const [url, setUrl] = useState("");
  const [energy, setEnergy] = useState<"low" | "medium" | "high">("medium");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;
    
    addActivity({
      name,
      category,
      type,
      url: type === "link" ? url : undefined,
      checklist: type === "checklist" ? ["Action 1", "Action 2"] : undefined, // Placeholder
      energy
    });
    setScreen("home");
  };

  return (
    <div className="flex flex-col gap-10 p-10 max-w-2xl mx-auto min-h-screen justify-center w-full">
      <header className="flex flex-col gap-2">
        <button
          onClick={() => setScreen("home")}
          className="flex items-center gap-2 text-[10px] font-black uppercase text-white/50 hover:text-white transition-colors mb-4"
        >
          <Icons.ArrowLeft size={12} /> Cancel Deployment
        </button>
        <span className="text-[10px] font-black tracking-[0.4em] text-primary uppercase mb-1 neon-glow-purple">
          Resource Creation
        </span>
        <h1 className="text-5xl font-black italic uppercase tracking-tighter text-white">
          New Mission
        </h1>
      </header>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <label className="block">
            <span className="text-[10px] font-black tracking-[0.2em] text-muted-foreground uppercase px-4 mb-2 block">
              Objective Name
            </span>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-8 py-5 rounded-full bg-white/5 border-2 border-transparent focus:border-primary outline-none text-xl font-bold uppercase italic transition-all"
              placeholder="E.G. NODEJS MICROSERVICES"
              required
            />
          </label>

          <div className="grid grid-cols-2 gap-4">
            <label>
              <span className="text-[10px] font-black tracking-[0.2em] text-muted-foreground uppercase px-4 mb-2 block">
                Category
              </span>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as Category)}
                className="w-full px-8 py-5 rounded-full bg-white/5 border-2 border-transparent focus:border-primary outline-none font-bold uppercase transition-all appearance-none cursor-pointer"
              >
                <option value="learn" className="bg-black">Learn</option>
                <option value="chill" className="bg-black">Chill</option>
                <option value="reset" className="bg-black">Reset</option>
                <option value="build" className="bg-black">Build</option>
              </select>
            </label>

            <label>
              <span className="text-[10px] font-black tracking-[0.2em] text-muted-foreground uppercase px-4 mb-2 block">
                Intensity
              </span>
              <select
                value={energy}
                onChange={(e) => setEnergy(e.target.value as any)}
                className="w-full px-8 py-5 rounded-full bg-white/5 border-2 border-transparent focus:border-primary outline-none font-bold uppercase transition-all appearance-none cursor-pointer"
              >
                <option value="low" className="bg-black">Low</option>
                <option value="medium" className="bg-black">Medium</option>
                <option value="high" className="bg-black">High</option>
              </select>
            </label>
          </div>

          <label className="block">
            <span className="text-[10px] font-black tracking-[0.2em] text-muted-foreground uppercase px-4 mb-2 block">
              Mission Type
            </span>
            <div className="grid grid-cols-2 gap-4">
               {["link", "checklist"].map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setType(t as any)}
                    className={`px-8 py-4 rounded-full font-black italic uppercase transition-all ${
                      type === t ? 'bg-primary text-white' : 'bg-white/5 text-muted-foreground hover:bg-white/10'
                    }`}
                  >
                    {t}
                  </button>
               ))}
            </div>
          </label>

          {type === "link" && (
            <label className="block">
              <span className="text-[10px] font-black tracking-[0.2em] text-muted-foreground uppercase px-4 mb-2 block">
                Target URL
              </span>
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full px-8 py-4 rounded-full bg-white/5 border-2 border-transparent focus:border-primary outline-none font-bold transition-all"
                placeholder="https://..."
              />
            </label>
          )}
        </div>

        <button
          type="submit"
          className="w-full py-6 rounded-full bg-white text-black font-black italic uppercase text-2xl tracking-tighter hover:scale-[1.02] active:scale-95 transition-all shadow-2xl shadow-primary/20"
        >
          Confirm Deployment
        </button>
      </form>
    </div>
  );
};

export default AddActivity;
