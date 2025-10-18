
import type { Server, Skill, Project } from './types';
import { CodeBracketIcon, ServerStackIcon, ChatBubbleBottomCenterTextIcon } from '@heroicons/react/24/outline';

/*
  README: HOW TO CUSTOMIZE YOUR PORTFOLIO
  
  This file contains all the personal data for the portfolio.
  Simply edit the values below to update your site.
*/

// 1. PERSONAL INFORMATION
export const PERSONAL_INFO = {
  name: "Mohammed",
  nationality: "Syria",
  // You can set your age here. It will be displayed in the "About" section.
  age: 27, 
  // A short tagline that appears under your name in the hero section.
  tagline: "Web Dev • JS • Discord Bot Developer",
  // A short bio for the "About" section.
  bio: "A passionate developer from Syria, specializing in JavaScript and creating powerful Discord bots. I thrive on building communities and crafting elegant digital experiences.",
};

// Discord Info
export const DISCORD_USER_ID = "968563794974478366";
export const DISCORD_USERNAME = "221.k";

// This is the static image URL for your profile picture in the "About" section.
// REMOVED: This is now fetched live from Discord via Lanyard.

// 2. DISCORD WEBHOOK URL
// IMPORTANT: Paste your Discord webhook URL here.
// This is where the ratings will be sent.
// To keep this URL secret, it's best to use a backend proxy,
// but for simplicity, we are placing it here. Be aware that it will be visible in the browser's network requests.
export const WEBHOOK_URL = "https://discord.com/api/webhooks/1425237010892853380/C0Fof1Gw1E42vYJxxgjGcMftGx-JzrLq_Rcfy1mPB3zsDlvA72jDrmVp16cCtafY8kvq";

// This is the default avatar used in the Discord embed for ratings.
// You can change this URL to a picture of yourself or your logo.
export const DEFAULT_AVATAR_URL = "./mypic.png";


// 3. THEME COLORS
// Hex color codes for the Discord embed, matching the light and dark themes.
export const THEME_COLORS = {
  dark: 0x22d3ee, //  Cyan-500
  light: 0xfb923c, // Orange-400
};

// 4. SERVERS I MANAGE
// Add or remove servers you manage here.
// The card will link to the `inviteLink`.
export const SERVERS: Server[] = [
  {
    name: "ASWAYZ Community",
    description: "A growing community hub.",
    role: "Manager, Moderator",
    avatar: "./aswayz.png",
    inviteLink: "https://discord.gg/DDZXYw3sYq",
  },
  {
    name: "MT Community",
    description: "Combines Events & Chatting for MTRP / FiveM fans.",
    role: "Manager",
    avatar: "./mt-community.jpeg",
    inviteLink: "https://discord.gg/KJUJKTdS5D",
  },
];


// 5. SKILLS
// List your skills and your proficiency level (0-100).
export const SKILLS: Skill[] = [
  {
    name: "JavaScript",
    level: 90,
    icon: CodeBracketIcon,
  },
  {
    name: "Discord.js",
    level: 95,
    icon: ChatBubbleBottomCenterTextIcon,
  },
  {
    name: "Node.js",
    level: 85,
    icon: ServerStackIcon,
  },
];

// 6. FAVORITE PLAYER
export const FAV_PLAYER_INFO = {
  name: "Cristiano Ronaldo",
  fullName: "Cristiano Ronaldo dos Santos Aveiro",
  // Background image for the card.
  cardBackgroundUrl: "https://images5.alphacoders.com/476/thumb-1920-476824.jpg",
  // The main image of the player. The user can replace this URL.
  playerImageUrl: "https://i.imgur.com/yS7s4l6.png",
  birthDate: "February 5, 1985",
  birthPlace: "Funchal, Madeira, Portugal",
  careerSummary: "One of the greatest footballers of all time, Ronaldo began his career at Sporting CP before iconic spells at Manchester United, Real Madrid, and Juventus. Known for his prolific goalscoring, he has won five Ballon d'Or awards and numerous trophies, including five Champions League titles. He continues to break records at Al Nassr and for the Portugal national team.",
  stats: [
    { label: "Career Goals", value: "895+" },
    { label: "Ballon d'Or", value: "5" },
    { label: "Champions League", value: "5" },
    { label: "Best Club", value: "Real Madrid" }
  ]
};

// 7. PROJECTS
// Add your projects here.
export const PROJECTS: Project[] = [
  {
    title: "Discord Bot Dashboard",
    description: "A web-based dashboard for managing my Discord bots, allowing server admins to configure settings without using text commands.",
    imageUrl: "https://cdn.discordapp.com/attachments/1409886941410885732/1428989531988824075/image.png?ex=68f4806a&is=68f32eea&hm=b823e1e2d194c6328a9b1c784e1b8535a9cc9e8a75dd1340156a5c276a6e2e54&",
    tags: ["React", "Node.js", "Discord.js", "TailwindCSS"],
    liveUrl: "#",
    repoUrl: "#",
  },
  {
    title: "Portfolio Website",
    description: "The very site you're looking at! A single-page animated portfolio built with React and TailwindCSS to showcase my skills.",
    imageUrl: "https://cdn.discordapp.com/attachments/1425236976298102814/1428901618786631862/IMG_7555.png?ex=68f42fd5&is=68f2de55&hm=8f6da95f2303314e2b5e4e5aea68a047889116192f02e1fe3f5d970672a7ff86&$0",
    tags: ["React", "TypeScript", "TailwindCSS", "Vite"],
    repoUrl: "#",
  },
  {
    title: "Community Bot",
    description: "A multi-purpose Discord bot for the ASWAYZ Community, featuring moderation tools, an economy system, and fun commands.",
    imageUrl: "https://cdn.discordapp.com/attachments/1425236976298102814/1428901619139088474/IMG_7554.png?ex=68f42fd5&is=68f2de55&hm=4d547ae6d623b8e82bde1339281ad40886865ef9083e09ed7aab4984deae0f72&$0",
    tags: ["Discord.js", "Node.js", "MongoDB"],
    liveUrl: "https://discord.gg/DDZXYw3sYq",
  },
];


// 8. FEATURE FLAGS
// Turn experimental features on/off here.
export const FEATURE_FLAGS = {
  liveStatus: true,
  copyDiscord: true,
  easterEggs: true,
  modeTransition: true,
  cursorTrail: true,
  soundFX: false // Disabled for now
};