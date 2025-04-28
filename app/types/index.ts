// Basic type definitions for the TTS testing app

export interface Voice {
  identifier: string;
  name: string;
  language: string;
  quality?: string;
}

export interface Language {
  code: string;
  name: string;
  flag?: string;
}

export interface TTSSettings {
  pitch: number;
  rate: number;
  language: string;
  voice: string | null;
  selectedScene?: string; 
  selectedSentenceIndex?: number;
}

export interface Scene {
  id: string;
  title: string;
  description: string;
  sentences: Record<string, string[]>;
  tags?: string[];
}