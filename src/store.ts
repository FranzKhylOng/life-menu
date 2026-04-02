import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Activity, Category } from "./data";
import { activities as initialActivities } from "./data";

export type Screen = "home" | "category" | "activity" | "urge" | "add-activity" | "journal";

export interface JournalEntry {
  id: string;
  activityName: string;
  timestamp: number;
  duration?: number;
}

interface AppState {
  currentScreen: Screen;
  selectedCategory: Category | null;
  selectedActivity: Activity | null;
  lastActivity: Activity | null;
  
  // Custom Data
  activities: Activity[];
  studyJournal: JournalEntry[];
  distractionsAvoided: number;
  
  // Timer state
  timerRemaining: number;
  isTimerRunning: boolean;
  timerComplete: boolean;

  setScreen: (screen: Screen) => void;
  selectCategory: (category: Category | null) => void;
  selectActivity: (activity: Activity | null) => void;
  
  // CRUD Actions
  addActivity: (activity: Omit<Activity, "id">) => void;
  deleteActivity: (id: string) => void;
  
  // Journal Actions
  addToJournal: (activityName: string, duration?: number) => void;
  incrementDistractions: () => void;
  
  startTimer: (seconds: number) => void;
  tickTimer: () => void;
  stopTimer: () => void;
  resetTimer: () => void;
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      currentScreen: "home",
      selectedCategory: null,
      selectedActivity: null,
      lastActivity: null,
      
      activities: initialActivities,
      studyJournal: [],
      distractionsAvoided: 0,
      
      timerRemaining: 0,
      isTimerRunning: false,
      timerComplete: false,

      setScreen: (screen) => set({ currentScreen: screen }),
      
      selectCategory: (category) => set({ 
        selectedCategory: category, 
        currentScreen: category ? "category" : "home" 
      }),
      
      selectActivity: (activity) => set({ 
        selectedActivity: activity, 
        lastActivity: activity || get().lastActivity,
        currentScreen: activity ? "activity" : "home"
      }),
      
      addActivity: (activityData) => {
        const id = Math.random().toString(36).substring(7);
        const newActivity: Activity = { ...activityData, id };
        set((state) => ({ 
          activities: [...state.activities, newActivity] 
        }));
      },
      
      deleteActivity: (id) => set((state) => ({
        activities: state.activities.filter(a => a.id !== id)
      })),

      addToJournal: (activityName, duration) => {
        const entry: JournalEntry = {
          id: Math.random().toString(36).substring(7),
          activityName,
          timestamp: Date.now(),
          duration
        };
        set((state) => ({ 
          studyJournal: [entry, ...state.studyJournal] 
        }));
      },

      incrementDistractions: () => set((state) => ({ 
        distractionsAvoided: state.distractionsAvoided + 1 
      })),

      startTimer: (seconds) => {
        set({ 
          timerRemaining: seconds, 
          isTimerRunning: true, 
          timerComplete: false 
        });
      },
      
      tickTimer: () => {
        const { timerRemaining, isTimerRunning, selectedActivity } = get();
        if (isTimerRunning && timerRemaining > 0) {
          set({ timerRemaining: timerRemaining - 1 });
        } else if (isTimerRunning && timerRemaining === 0) {
          set({ isTimerRunning: false, timerComplete: true });
          if (selectedActivity) {
            get().addToJournal(selectedActivity.name);
          }
        }
      },
      
      stopTimer: () => set({ isTimerRunning: false }),
      resetTimer: () => set({ 
        isTimerRunning: false, 
        timerRemaining: 0, 
        timerComplete: false 
      }),
    }),
    {
      name: "life-menu-storage",
      partialize: (state) => ({ 
        activities: state.activities,
        studyJournal: state.studyJournal,
        lastActivity: state.lastActivity,
        distractionsAvoided: state.distractionsAvoided 
      }),
    }
  )
);
