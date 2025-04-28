import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import ExpoSpeechProvider from '../../providers/ExpoSpeechProvider';

interface SimpleTTSPlayerProps {
  text: string;
  language?: string;
}

export default function SimpleTTSPlayer({ text, language = 'en-US' }: SimpleTTSPlayerProps) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const handleSpeak = async () => {
    try {
      setIsLoading(true);
      setIsSpeaking(true);
      await ExpoSpeechProvider.speak(text, {
        language: language,
        pitch: 1.0,
        rate: 1.0
      });
      
      // Poll for speaking status since there's no reliable callback
      const checkSpeaking = setInterval(async () => {
        const stillSpeaking = await ExpoSpeechProvider.isSpeaking();
        if (!stillSpeaking) {
          setIsSpeaking(false);
          clearInterval(checkSpeaking);
        }
      }, 500);
      
    } catch (error) {
      console.error('Speech error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStop = async () => {
    try {
      await ExpoSpeechProvider.stop();
      setIsSpeaking(false);
    } catch (error) {
      console.error('Failed to stop speech:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <ThemedText style={styles.text}>{text}</ThemedText>
        <ThemedText style={styles.language}>Language: {language}</ThemedText>
      </View>
      
      <TouchableOpacity
        style={[
          styles.button,
          { backgroundColor: isSpeaking ? '#ff5252' : colors.tint }
        ]}
        onPress={isSpeaking ? handleStop : handleSpeak}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <ThemedText style={styles.buttonText}>
            {isSpeaking ? 'Stop' : 'Speak'}
          </ThemedText>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  textContainer: {
    marginBottom: 16,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 8,
  },
  language: {
    fontSize: 12,
    opacity: 0.7,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});