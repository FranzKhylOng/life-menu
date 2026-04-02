import React, { useEffect } from "react";
import { useStore } from "./store";
import Home from "./components/Home";
import CategoryView from "./components/CategoryView";
import ActivityDetail from "./components/ActivityDetail";
import UrgeOverride from "./components/UrgeOverride";
import AddActivity from "./components/AddActivity";
import JournalView from "./components/JournalView";
import TimerOverlay from "./components/TimerOverlay";
import { AnimatePresence, motion } from "framer-motion";

const App: React.FC = () => {
  const { currentScreen, tickTimer, isTimerRunning } = useStore();

  useEffect(() => {
    let interval: any;
    if (isTimerRunning) {
      interval = setInterval(() => {
        tickTimer();
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, tickTimer]);

  const renderScreen = () => {
    switch (currentScreen) {
      case "home":
        return <Home key="home" />;
      case "category":
        return <CategoryView key="category" />;
      case "activity":
        return <ActivityDetail key="activity" />;
      case "urge":
        return <UrgeOverride key="urge" />;
      case "add-activity":
        return <AddActivity key="add-activity" />;
      case "journal":
        return <JournalView key="journal" />;
      default:
        return <Home key="home" />;
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/20 relative overflow-hidden">
      
      {/* Redesigned: Game UI Overlays */}
      <div className="scanlines" />
      <div className="crt-bloom" />
      
      {/* Background vignette */}
      <div className="absolute inset-0 bg-radial-[circle_at_50%_50%] from-transparent via-transparent to-black/40 pointer-events-none" />

      <main className="relative z-10 container mx-auto px-4 min-h-screen flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentScreen}
            initial={{ opacity: 0, scale: 0.98, x: -10 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 1.02, x: 10 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="w-full flex justify-center"
          >
            {renderScreen()}
          </motion.div>
        </AnimatePresence>

        <TimerOverlay />
      </main>
    </div>
  );
};

export default App;
