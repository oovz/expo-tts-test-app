// Minimal implementation of the Expo Speech provider
import * as Speech from 'expo-speech';
import { Voice, Language } from '@/app/types';
import Constants from 'expo-constants';

class ExpoSpeechProvider {
  private availableVoices: Voice[] = [];
  private availableTTSLanguages: Set<string> = new Set();
  private initialized = false;

  // Get expo-speech version from the project dependencies
  getVersion(): string {
    try {
      // Access the expo-speech version from Constants.expoConfig
      const expoConfig = Constants.expoConfig;
      if (expoConfig?.sdkVersion === '52.0.0') {
        // For installed expo modules, we can derive the approximate version from the SDK
        return `~13.0.1 (SDK ${expoConfig.sdkVersion})`;
      }
      
      return `Unknown (SDK ${expoConfig?.sdkVersion})`;
    } catch (error) {
      console.error('Failed to get expo-speech version:', error);
      return 'Unknown';
    }
  }

  async initialize(): Promise<void> {
    if (this.initialized) return;
    
    try {
      const voices = await Speech.getAvailableVoicesAsync();
      
      this.availableVoices = voices.map(voice => ({
        identifier: voice.identifier,
        name: voice.name,
        quality: voice.quality,
        language: voice.language
      }));
      
      // Extract unique languages from voices
      this.availableTTSLanguages = new Set(
        this.availableVoices.map(voice => voice.language)
      );

      // Log all available TTS languages
      console.log('Available TTS languages:', Array.from(this.availableTTSLanguages));
      
      this.initialized = true;
      console.log(`ExpoSpeechProvider initialized with ${this.availableVoices.length} voices and ${this.availableTTSLanguages.size} languages`);
    } catch (error) {
      console.error('Failed to initialize ExpoSpeechProvider:', error);
      throw error;
    }
  }

  async getVoices(): Promise<Voice[]> {
    if (!this.initialized) {
      await this.initialize();
    }
    return this.availableVoices;
  }
  
  async getAvailableLanguageCodes(): Promise<string[]> {
    if (!this.initialized) {
      await this.initialize();
    }
    return Array.from(this.availableTTSLanguages);
  }

  speak(text: string, options: {
    language?: string; 
    voice?: string; 
    pitch?: number; 
    rate?: number;
    onDone?: () => void;
    onStart?: () => void;
    onError?: (error: Error) => void;
    onStopped?: () => void;
  }): void {
    // Since Speech.speak returns void and doesn't support awaiting,
    // we shouldn't mark this method as async to avoid implying 
    // that it returns a Promise that resolves when speech is complete
    if (!this.initialized) {
      this.initialize().then(() => {
        this.performSpeak(text, options);
      }).catch(error => {
        if (options.onError) {
          options.onError(new Error(`Failed to initialize speech: ${error.message}`));
        }
      });
    } else {
      this.performSpeak(text, options);
    }
  }
  
  private performSpeak(text: string, options: {
    language?: string; 
    voice?: string; 
    pitch?: number; 
    rate?: number;
    onDone?: () => void;
    onStart?: () => void;
    onError?: (error: Error) => void;
    onStopped?: () => void;
  }): void {
    try {
      // Check for text length limit
      if (text.length > Speech.maxSpeechInputLength) {
        console.warn(`Text exceeds maximum length (${Speech.maxSpeechInputLength}). It will be truncated.`);
        text = text.substring(0, Speech.maxSpeechInputLength);
      }
      
      Speech.speak(text, {
        language: options.language,
        voice: options.voice || undefined,
        pitch: options.pitch,
        rate: options.rate,
        onDone: options.onDone,
        onStart: options.onStart,
        onError: options.onError,
        onStopped: options.onStopped,
      });
    } catch (error) {
      console.error('Speech error:', error);
      if (options.onError && error instanceof Error) {
        options.onError(error);
      } else if (options.onError) {
        options.onError(new Error('Unknown speech error'));
      }
    }
  }

  async stop(): Promise<void> {
    try {
      await Speech.stop();
    } catch (error) {
      console.error('Error stopping speech:', error);
      throw error;
    }
  }

  async isSpeaking(): Promise<boolean> {
    try {
      return await Speech.isSpeakingAsync();
    } catch (error) {
      console.error('Error checking if speaking:', error);
      return false;
    }
  }
}

export default new ExpoSpeechProvider();