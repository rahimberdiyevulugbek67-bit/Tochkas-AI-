export type Language = 'ru' | 'uz' | 'en' | 'zh';

export type ActiveTab = 
  | 'chat'
  | 'images'
  | 'video'
  | 'voice'
  | 'youtube'
  | 'minecraft'
  | 'seo'
  | 'profile'
  | 'settings';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  provider: 'google';
  createdAt: string;
  plan: 'free' | 'pro' | 'unlimited';
  credits: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: number;
  category?: 'general' | 'minecraft' | 'youtube' | 'voice';
  audioUrl?: string;
}

export interface GeneratedImage {
  id: string;
  prompt: string;
  category: 'youtube-avatar' | 'youtube-thumbnail' | 'minecraft' | 'realistic';
  aspectRatio: '1:1' | '16:9' | '9:16' | '4:3';
  imageUrl: string;
  createdAt: number;
}

export type VideoDuration = '10s' | '20s' | '30s' | '60s' | '100s';
export type VideoFormat = '16:9' | '9:16' | '1:1';
export type VideoVoice = 'male' | 'female' | 'calm-male' | 'expressive-female';

export interface GeneratedVideo {
  id: string;
  prompt: string;
  duration: VideoDuration;
  format: VideoFormat;
  voice: VideoVoice;
  videoUrl?: string;
  status: 'processing' | 'completed' | 'failed';
  errorMessage?: string;
  createdAt: number;
}

export interface YouTubeGeneration {
  id: string;
  type: 'shorts' | 'long' | 'script' | 'titles' | 'description' | 'thumbnail' | 'continuation';
  topic: string;
  result: string;
  createdAt: number;
}
