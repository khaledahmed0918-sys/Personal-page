import React from 'react';

export type Theme = 'light' | 'dark';

export interface Server {
  name: string;
  description: string;
  role: string;
  avatar: string; // URL to the server's image icon
  inviteLink: string; // URL to the Discord invite
}

export interface Skill {
  name: string;
  level: number; // 0-100
  // FIX: Changed icon type to React.ComponentType to correctly type HeroIcons components.
  icon: React.ComponentType<React.ComponentProps<'svg'>>;
}

export interface Project {
  title: string;
  description: string;
  imageUrl: string;
  tags: string[];
  liveUrl?: string;
  repoUrl?: string;
}

export interface RatingData {
    stars: number;
    title: string;
    message: string;
    visitorName: string;
    server?: string;
}

export interface DiscordEmbed {
    title: string;
    author: { name: string };
    fields: { name: string; value: string; inline?: boolean }[];
    thumbnail?: { url: string };
    timestamp: string;
    color: number;
}

export interface LanyardData {
  active_on_discord_web: boolean;
  active_on_discord_desktop: boolean;
  active_on_discord_mobile: boolean;
  listening_to_spotify: boolean;
  spotify: Spotify | null;
  discord_user: DiscordUser;
  discord_status: 'online' | 'idle' | 'dnd' | 'offline';
  activities: Activity[];
}

export interface Spotify {
  track_id: string;
  timestamps: {
    start: number;
    end: number;
  };
  song: string;
  artist: string;
  album_art_url: string;
  album: string;
}

export interface DiscordUser {
  username: string;
  public_flags: number;
  id: string;
  discriminator: string;
  avatar: string;
}

export interface Activity {
  type: number;
  name: string;
  details?: string;
  state?: string;
}