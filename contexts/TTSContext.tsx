import React, { createContext, useState, useContext, useEffect, useCallback, useRef } from 'react';
import { TTSSettings, Voice, Language } from '@/app/types';
import ExpoSpeechProvider from '@/providers/ExpoSpeechProvider';
import { SCENES } from '@/config/scenes';

// Function to derive supported languages from scenes
const deriveSupportedLanguages = (): Language[] => {
  // Get all unique language codes from scenes
  const languageCodes = new Set<string>();
  SCENES.forEach(scene => {
    Object.keys(scene.sentences).forEach(langCode => {
      languageCodes.add(langCode);
    });
  });

  // Map language codes to full Language objects with names and flags
  const languageMap: Record<string, { name: string, flag: string }> = {
    'en-US': { name: 'English (US)', flag: '🇺🇸' },
    'zh-CN': { name: 'Chinese (Simplified)', flag: '🇨🇳' },
    'zh-TW': { name: 'Chinese (Traditional)', flag: '🇹🇼' },
    'ja-JP': { name: 'Japanese', flag: '🇯🇵' },
    // Add more mappings as needed
  };

  return Array.from(languageCodes).map(code => ({
    code,
    name: languageMap[code]?.name || code,
    flag: languageMap[code]?.flag || '🌐',
  }));
};

interface TTSContextType {
  settings: TTSSettings;
  isSpeaking: boolean;
  isLoading: boolean;
  currentText: string;
  availableVoices: Voice[];
  availableLanguages: Language[];
  availableTTSLanguages: string[];
  availableScenes: typeof SCENES;
  providerVersion: string; // Added provider version
  updateSettings: (newSettings: Partial<TTSSettings>) => Promise<void>;
  speak: () => void;
  stop: () => Promise<void>;
  setCurrentText: (text: string) => void;
  nextSentence: () => void;
  previousSentence: () => void;
  error: string | null;
}

// Default settings
const defaultSettings: TTSSettings = {
  pitch: 1.0,
  rate: 1.0,
  language: 'en-US',
  voice: null,
  selectedScene: 'default',
  selectedSentenceIndex: 0,
};

const TTSContext = createContext<TTSContextType | null>(null);

export const useTTS = () => {
  const context = useContext(TTSContext);
  if (!context) {
    throw new Error('useTTS must be used within a TTSProvider');
  }
  return context;
};

export const TTSProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<TTSSettings>(defaultSettings);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [availableVoices, setAvailableVoices] = useState<Voice[]>([]);
  const [availableLanguages, setAvailableLanguages] = useState<Language[]>([]);
  const [availableTTSLanguages, setAvailableTTSLanguages] = useState<string[]>([]);
  const [currentText, setCurrentText] = useState<string>("Hello, welcome to the TTS test app.");
  const [availableScenes] = useState(SCENES);
  const [error, setError] = useState<string | null>(null);

  // Set available languages from scenes on mount
  useEffect(() => {
    setAvailableLanguages(deriveSupportedLanguages());
  }, []);

  // Initialize TTS provider
  useEffect(() => {
    const initTTS = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        await ExpoSpeechProvider.initialize();
        const voices = await ExpoSpeechProvider.getVoices();
        setAvailableVoices(voices);
        
        // Get available language codes from the provider
        const languageCodes = await ExpoSpeechProvider.getAvailableLanguageCodes();
        setAvailableTTSLanguages(languageCodes);
        
        // Log available voices for debugging
        console.log(`TTS Provider initialized with ${voices.length} voices`);
        console.log(`TTS Provider supports ${languageCodes.length} languages`);
        
        if (voices.length > 0) {
          // Log some example voices
          const exampleVoices = voices.slice(0, Math.min(3, voices.length));
          exampleVoices.forEach(voice => {
            console.log(`Voice: ${voice.name}, Language: ${voice.language}`);
          });
        }
      } catch (error) {
        console.error('Failed to initialize TTS:', error);
        setError('Failed to initialize the text-to-speech engine. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    initTTS();
  }, []);

  // Update current text when selected scene, sentence index or language changes
  useEffect(() => {
    updateCurrentTextFromScene();
  }, [settings.selectedScene, settings.selectedSentenceIndex, settings.language]);

  const updateCurrentTextFromScene = useCallback(() => {
    if (settings.selectedScene && typeof settings.selectedSentenceIndex === 'number') {
      const scene = availableScenes.find(s => s.id === settings.selectedScene);
      if (scene) {
        const sentences = scene.sentences[settings.language];
        if (sentences && sentences.length > 0) {
          const index = Math.min(settings.selectedSentenceIndex, sentences.length - 1);
          setCurrentText(sentences[index]);
          return;
        }
      }
    }
    // Fallback if no scene/sentence is selected or available
    setCurrentText("Hello, welcome to the TTS test app.");
  }, [settings.selectedScene, settings.selectedSentenceIndex, settings.language, availableScenes]);

  const updateSettings = useCallback(async (newSettings: Partial<TTSSettings>) => {
    setError(null);
    
    // Check if speech is ongoing and if language or voice is being changed
    if (isSpeaking && (newSettings.language || newSettings.voice)) {
      try {
        // Stop ongoing speech first
        await ExpoSpeechProvider.stop();
        setIsSpeaking(false);
        console.log('Speech stopped due to language or voice change');
      } catch (error) {
        console.error('Error stopping speech on settings change:', error);
      }
    }
    
    // Update settings after stopping speech (if needed)
    setSettings(prev => ({ ...prev, ...newSettings }));
  }, [isSpeaking]);

  const speak = useCallback(() => {
    setError(null);
    
    if (!currentText || currentText.trim() === '') {
      setError('No text to speak. Please enter some text.');
      return;
    }
    
    setIsSpeaking(true);
    
    ExpoSpeechProvider.speak(currentText, {
      pitch: settings.pitch,
      rate: settings.rate,
      language: settings.language,
      voice: settings.voice ?? undefined,
      onStart: () => {
        console.log('Speech started');
      },
      onDone: () => {
        setIsSpeaking(false);
        console.log('Speech completed via onDone callback');
      },
      onError: (speechError: Error) => {
        console.error('Speech error:', speechError);
        setIsSpeaking(false);
        setError(`Error during speech: ${speechError.message}`);
      },
      onStopped: () => {
        console.log('Speech stopped manually');
        setIsSpeaking(false);
      }
    });
  }, [currentText, settings]);

  const stop = useCallback(async () => {
    setError(null);
    
    if (!isSpeaking) return;
    
    try {
      await ExpoSpeechProvider.stop();
      // We don't set isSpeaking to false here because the onStopped callback will do that
    } catch (error) {
      console.error('Failed to stop speech:', error);
      setIsSpeaking(false); // Ensure state is reset even if error occurs
      setError('Failed to stop speech. Please try again.');
    }
  }, [isSpeaking]);

  const nextSentence = useCallback(() => {
    if (settings.selectedScene && typeof settings.selectedSentenceIndex === 'number') {
      const scene = availableScenes.find(s => s.id === settings.selectedScene);
      if (scene) {
        const sentences = scene.sentences[settings.language];
        if (sentences && settings.selectedSentenceIndex < sentences.length - 1) {
          updateSettings({ selectedSentenceIndex: settings.selectedSentenceIndex + 1 });
        }
      }
    }
  }, [settings.selectedScene, settings.selectedSentenceIndex, settings.language, availableScenes, updateSettings]);

  const previousSentence = useCallback(() => {
    if (settings.selectedScene && typeof settings.selectedSentenceIndex === 'number' && settings.selectedSentenceIndex > 0) {
      updateSettings({ selectedSentenceIndex: settings.selectedSentenceIndex - 1 });
    }
  }, [settings.selectedScene, settings.selectedSentenceIndex, updateSettings]);

  return (
    <TTSContext.Provider
      value={{
        settings,
        isSpeaking,
        isLoading,
        currentText,
        availableVoices,
        availableLanguages,
        availableTTSLanguages,
        availableScenes,
        providerVersion: ExpoSpeechProvider.getVersion(), // Expose provider version
        updateSettings,
        speak,
        stop,
        setCurrentText,
        nextSentence,
        previousSentence,
        error,
      }}
    >
      {children}
    </TTSContext.Provider>
  );
};