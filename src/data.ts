
export type Category = "learn" | "chill" | "reset" | "build";

export interface Activity {
  id: string;
  name: string;
  category: Category;
  type: "link" | "checklist";
  url?: string;
  checklist?: string[];
  energy?: "low" | "medium" | "high";
  description?: string;
}

export const activities: Activity[] = [
  // LEARN
  {
    id: "leetcode",
    name: "LeetCode / Codewars",
    category: "learn",
    type: "link",
    url: "https://leetcode.com",
    energy: "high",
    description: "Keep the brain sharp with some problems."
  },
  {
    id: "system-design",
    name: "System Design Prep",
    category: "learn",
    type: "link",
    url: "https://github.com/karanpratapsingh/system-design",
    energy: "medium",
    description: "Learn how to build at scale."
  },
  {
    id: "tech-books",
    name: "Read Tech Book",
    category: "learn",
    type: "checklist",
    checklist: ["Open NodeJS Design Patterns or Database Internals", "Read 1 chapter", "Take 3 notes"],
    energy: "medium"
  },
  {
    id: "low-level",
    name: "Low Level Coding",
    category: "learn",
    type: "checklist",
    checklist: ["Choose a topic (C, Rust, Assembly)", "Set a 25 min timer", "Implement one small function"],
    energy: "high"
  },
  {
    id: "courses",
    name: "Online Courses",
    category: "learn",
    type: "link",
    url: "https://www.coursera.org",
    energy: "medium"
  },

  // CHILL
  {
    id: "watch-show",
    name: "Watch a Show",
    category: "chill",
    type: "checklist",
    checklist: ["Pick Regular Show, Gravity Falls, or Master Chef", "Dim the lights", "Enjoy one episode"],
    energy: "low"
  },
  {
    id: "manga-fiction",
    name: "Manga or Kindle Fiction",
    category: "chill",
    type: "checklist",
    checklist: ["Pick a series", "Get comfortable", "Read for 20 mins"],
    energy: "low"
  },
  {
    id: "travel-vlogs",
    name: "Watch YouTube Travel Vlogs",
    category: "chill",
    type: "checklist",
    checklist: ["Seohee Travel", "Tip to Tip", "Pewdiepie Japan"],
    energy: "low"
  },
  {
    id: "lego",
    name: "Rebuild Lego",
    category: "chill",
    type: "checklist",
    checklist: ["Grab a set", "Put on some lo-fi music", "Just build"],
    energy: "low"
  },
  {
    id: "gaming-chill",
    name: "Chill Gaming",
    category: "chill",
    type: "checklist",
    checklist: ["Pick one: Hades, Stardew, Zelda, Kirby, or Pokemon", "Play for one session/run"],
    energy: "low"
  },

  // RESET
  {
    id: "short-walk",
    name: "10-15 Min Walk",
    category: "reset",
    type: "checklist",
    checklist: ["Wear shoes", "Grab phone (optional)", "Step outside now"],
    energy: "low",
    description: "Best for mental resets between study sessions."
  },
  {
    id: "flashcards",
    name: "Answer Flashcards",
    category: "reset",
    type: "checklist",
    checklist: ["Focus on just one card at a time"],
    energy: "medium"
  },
  {
    id: "silence-practice",
    name: "Silence Practice",
    category: "reset",
    type: "checklist",
    checklist: ["Sit comfortably", "Breathe slowly", "Observe surroundings without judgment", "Zone out for 5 mins"],
    energy: "low"
  },
  {
    id: "pocket-notebook",
    name: "Read Pocket Notebook",
    category: "reset",
    type: "checklist",
    checklist: ["Sit comfortably", "Read 1 Page"],
    energy: "low"
  },


  // BUILD
  {
    id: "game-dev",
    name: "Game Development",
    category: "build",
    type: "checklist",
    checklist: ["Open Unity/Godot/Phaser", "Work on: Pong, Platformer, or Space Invaders", "Implement one new feature"],
    energy: "high"
  },
  {
    id: "project-ideas",
    name: "Build Your Own X",
    category: "build",
    type: "link",
    url: "https://github.com/codecrafters-io/build-your-own-x",
    energy: "high",
    description: "Challenge yourself with a complex project."
  },
  {
    id: "chat-websockets",
    name: "Real Time Chat App",
    category: "build",
    type: "checklist",
    checklist: ["Setup socket.io server", "Create basic frontend", "Send first message"],
    energy: "medium"
  },
  {
    id: "discord-bots",
    name: "Discord Bot",
    category: "build",
    type: "checklist",
    checklist: ["Open discord developer portal", "Setup bot token", "Write a basic !ping command"],
    energy: "medium"
  }
];

export const categories = [
  { id: "learn", name: "Learn", icon: "BookOpen", color: "indigo" },
  { id: "chill", name: "Chill", icon: "Coffee", color: "emerald" },
  { id: "reset", name: "Reset", icon: "RefreshCw", color: "amber" },
  { id: "build", name: "Build", icon: "Hammer", color: "rose" },
] as const;
