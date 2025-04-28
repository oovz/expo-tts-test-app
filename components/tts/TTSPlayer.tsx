import React from 'react';
import { View, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useTTS } from '@/contexts/TTSContext';
import Slider from '@react-native-community/slider';
import { IconSymbol } from '@/components/ui/IconSymbol';

export default function TTSPlayer() {
  const { 
    settings, 
    updateSettings, 
    speak, 
    stop, 
    isSpeaking, 
    currentText, 
    setCurrentText, 
    nextSentence, 
    previousSentence, 
    availableScenes 
  } = useTTS();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  
  // Find the current scene based on the selected scene ID
  const currentScene = availableScenes.find(scene => scene.id === settings.selectedScene);
  
  // Get total sentences count for the current scene and language
  const totalSentences = currentScene?.sentences[settings.language]?.length || 0;
  
  // Current sentence index (add 1 for display as it's 0-based in code but we want to show 1-based to users)
  const currentSentenceIndex = (settings.selectedSentenceIndex || 0) + 1;

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <View style={styles.textHeader}>
          <ThemedText style={styles.label}>
            Scene: {currentScene ? currentScene.title : 'No Scene selected'}
          </ThemedText>
          <View style={styles.navigationContainer}>
            <TouchableOpacity 
              style={styles.navButton} 
              onPress={previousSentence}
              disabled={currentSentenceIndex <= 1}
            >
              <IconSymbol size={18} name="chevron.left" color={colors.text} />
            </TouchableOpacity>
            
            <View style={styles.sentenceCounter}>
              <ThemedText style={styles.counterText}>
                {currentSentenceIndex}/{totalSentences}
              </ThemedText>
            </View>
            
            <TouchableOpacity 
              style={styles.navButton} 
              onPress={nextSentence}
              disabled={currentSentenceIndex >= totalSentences}
            >
              <IconSymbol size={18} name="chevron.right" color={colors.text} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.textBox}>
          <ThemedText style={styles.text}>{currentText}</ThemedText>
        </View>
      </View>

      <View style={styles.controlsContainer}>
        <View style={styles.sliderContainer}>
          <View style={styles.sliderLabelContainer}>
            <ThemedText style={styles.sliderLabel}>Pitch</ThemedText>
            <ThemedText style={styles.sliderValue}>{settings.pitch.toFixed(1)}</ThemedText>
          </View>
          <Slider
            style={styles.slider}
            minimumValue={0.5}
            maximumValue={2.0}
            step={0.1}
            value={settings.pitch}
            onValueChange={(value) => updateSettings({ pitch: value })}
            minimumTrackTintColor={colors.tint}
            maximumTrackTintColor="#DCDCDC"
            thumbTintColor={colors.tint}
          />
        </View>

        <View style={styles.sliderContainer}>
          <View style={styles.sliderLabelContainer}>
            <ThemedText style={styles.sliderLabel}>Rate</ThemedText>
            <ThemedText style={styles.sliderValue}>{settings.rate.toFixed(1)}</ThemedText>
          </View>
          <Slider
            style={styles.slider}
            minimumValue={0.1}
            maximumValue={2.0}
            step={0.1}
            value={settings.rate}
            onValueChange={(value) => updateSettings({ rate: value })}
            minimumTrackTintColor={colors.tint}
            maximumTrackTintColor="#DCDCDC"
            thumbTintColor={colors.tint}
          />
        </View>
      </View>

      <TouchableOpacity 
        style={[
          styles.button,
          { backgroundColor: isSpeaking ? '#ff5252' : colors.tint }
        ]}
        onPress={isSpeaking ? stop : speak}
      >
        <IconSymbol
          size={24}
          name={isSpeaking ? "stop.fill" : "play.fill"}
          color="#FFFFFF"
        />
        <ThemedText style={styles.buttonText}>
          {isSpeaking ? 'Stop' : 'Speak'}
        </ThemedText>
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
  textHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  navigationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  navigationButtons: {
    flexDirection: 'row',
  },
  navButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#E0E0E0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sentenceCounter: {
    paddingHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  counterText: {
    fontSize: 14,
    fontWeight: '500',
  },
  textBox: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 12,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
  },
  controlsContainer: {
    marginBottom: 16,
  },
  sliderContainer: {
    marginBottom: 16,
  },
  sliderLabelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  sliderLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
  sliderValue: {
    fontSize: 14,
    opacity: 0.7,
  },
  slider: {
    height: 40,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
    marginLeft: 8,
  },
});