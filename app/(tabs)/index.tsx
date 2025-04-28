import React, { useState, useEffect, useMemo } from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import TTSPlayer from '@/components/tts/TTSPlayer';
import { useTTS } from '@/contexts/TTSContext';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Voice } from '@/app/types';

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const { settings, updateSettings, availableLanguages, availableVoices, setCurrentText, availableScenes } = useTTS();
  const [expandedSection, setExpandedSection] = useState<'language' | 'voice' | null>(null);
  const [showQualityInfo, setShowQualityInfo] = useState(false);
  
  // Get voices for the currently selected language
  const currentLanguageVoices = availableVoices.filter(
    voice => voice.language === settings.language
  );
  
  const currentLanguage = availableLanguages.find(lang => lang.code === settings.language);

  // Get the default scene
  const defaultScene = availableScenes.find(scene => scene.id === 'default');
  
  // Determine the current voice or first available voice
  const currentVoice = useMemo(() => {
    if (settings.voice) {
      return availableVoices.find(v => v.identifier === settings.voice);
    } else if (currentLanguageVoices.length > 0) {
      return currentLanguageVoices[0];
    }
    return null;
  }, [settings.voice, availableVoices, currentLanguageVoices]);
  
  const handleLanguageChange = (langCode: string) => {
    updateSettings({ language: langCode, voice: null });
    
    // Set sample text based on language from the default scene
    if (defaultScene && defaultScene.sentences[langCode] && defaultScene.sentences[langCode].length > 0) {
      setCurrentText(defaultScene.sentences[langCode][0]);
    }
    
    // Auto-expand voice section when language is selected
    setExpandedSection('voice');
  };
  
  const toggleSection = (section: 'language' | 'voice') => {
    setExpandedSection(expandedSection === section ? null : section);
  };
  
  // Set initial text from default scene on component mount
  useEffect(() => {
    if (defaultScene && settings.language) {
      const sentences = defaultScene.sentences[settings.language];
      if (sentences && sentences.length > 0) {
        setCurrentText(sentences[0]);
      }
    }
  }, []);

  // Auto-select first voice if none is selected and voices are available
  useEffect(() => {
    if (!settings.voice && currentLanguageVoices.length > 0) {
      const firstVoice = currentLanguageVoices[0];
      updateSettings({ voice: firstVoice.identifier });
    }
  }, [settings.language, settings.voice, currentLanguageVoices]);
  
  const renderVoiceItem = ({ item }: { item: Voice }) => (
    <TouchableOpacity
      style={[
        styles.voiceItem,
        {
          backgroundColor: settings.voice === item.identifier ? colors.tint + '20' : '#f5f5f7',
          borderColor: settings.voice === item.identifier ? colors.tint : 'transparent',
        },
      ]}
      onPress={() => updateSettings({ voice: item.identifier })}
    >
      <View style={styles.voiceItemContent}>
        <ThemedText style={styles.voiceName}>{item.name}</ThemedText>
        {/* {item.quality && (
          <View style={[styles.qualityBadge, { backgroundColor: colors.tint + '40' }]}>
            <ThemedText style={styles.qualityText}>{item.quality}</ThemedText>
          </View>
        )} */}
      </View>
      {settings.voice === item.identifier && (
        <IconSymbol size={20} name="checkmark.circle.fill" color={colors.tint} />
      )}
    </TouchableOpacity>
  );
  
  return (
    <ThemedView style={styles.container} useSafeArea edges={['top', 'right', 'left', 'bottom']}>     
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Collapsible Language Selection Section */}
        <TouchableOpacity 
          style={[styles.sectionHeader, expandedSection === 'language' && styles.activeSectionHeader]} 
          onPress={() => toggleSection('language')}
        >
          <View style={styles.sectionHeaderContent}>
            <ThemedText style={styles.sectionTitle}>Language Selection</ThemedText>
            <ThemedText style={styles.sectionSubtitle}>
              {currentLanguage?.name || settings.language}
            </ThemedText>
          </View>
          <IconSymbol 
            size={20} 
            name={expandedSection === 'language' ? "chevron.up" : "chevron.down"} 
            color={colors.text} 
          />
        </TouchableOpacity>
        
        {expandedSection === 'language' && (
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.languageList}
          >
            {availableLanguages.map((language) => (
              <TouchableOpacity
                key={language.code}
                style={[
                  styles.languageItem,
                  {
                    backgroundColor: language.code === settings.language 
                      ? colors.tint + '20' 
                      : colorScheme === 'dark' ? '#27292a' : '#f0f0f5',
                    borderColor: language.code === settings.language ? colors.tint : 'transparent',
                  }
                ]}
                onPress={() => handleLanguageChange(language.code)}
              >
                <ThemedText style={[
                  styles.languageName,
                  { color: language.code === settings.language ? colors.tint : undefined }
                ]}>
                  {language.name}
                </ThemedText>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
        
        {/* Collapsible Voice Selection Section */}
        <TouchableOpacity 
          style={[styles.sectionHeader, expandedSection === 'voice' && styles.activeSectionHeader]} 
          onPress={() => toggleSection('voice')}
        >
          <View style={styles.sectionHeaderContent}>
            <ThemedText style={styles.sectionTitle}>Voice Selection</ThemedText>
            <ThemedText style={styles.sectionSubtitle}>
              {currentVoice ? currentVoice.name : (currentLanguageVoices.length > 0 ? 'Select a voice' : 'No voices available')}
            </ThemedText>
          </View>
          <IconSymbol 
            size={20} 
            name={expandedSection === 'voice' ? "chevron.up" : "chevron.down"} 
            color={colors.text} 
          />
        </TouchableOpacity>
        
        {expandedSection === 'voice' && (
          <View style={styles.voiceSelectionContainer}>
            {currentLanguageVoices.length > 0 ? (
              <FlatList
                data={currentLanguageVoices}
                renderItem={renderVoiceItem}
                keyExtractor={(item) => item.identifier}
                style={styles.voiceList}
                scrollEnabled={false}
              />
            ) : (
              <View style={styles.emptyState}>
                <IconSymbol size={32} name="speaker.slash" color={colors.text} />
                <ThemedText style={styles.emptyText}>
                  No voices found for the selected language. Voice options may be limited depending on the platform.
                </ThemedText>
              </View>
            )}
          </View>
        )}

        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Speech</ThemedText>
          <TTSPlayer />
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 24,
    paddingBottom: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.7,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 24,
    paddingTop: 20, // Add consistent top padding
  },
  section: {
    marginTop: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  activeSectionHeader: {
    borderBottomColor: '#ccc',
  },
  sectionHeaderContent: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    opacity: 0.6,
  },
  languageList: {
    paddingVertical: 16,
  },
  languageItem: {
    height: 80,
    width: 100,
    marginRight: 12,
    borderRadius: 16,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
  },
  languageFlag: {
    fontSize: 24,
    marginBottom: 8,
  },
  languageName: {
    fontSize: 12,
    textAlign: 'center',
  },
  voiceSelectionContainer: {
    paddingTop: 8,
    paddingBottom: 16,
  },
  voiceSelectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  voiceSelectionTitle: {
    fontSize: 14,
    fontWeight: '500',
    opacity: 0.7,
  },
  infoButton: {
    padding: 5,
  },
  voiceList: {
    marginTop: 8,
  },
  voiceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  voiceItemContent: {
    flex: 1,
  },
  voiceName: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  qualityBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    marginTop: 4,
  },
  qualityText: {
    fontSize: 12,
    fontWeight: '500',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#f5f5f7',
    borderRadius: 12,
  },
  emptyText: {
    marginTop: 12,
    textAlign: 'center',
    opacity: 0.7,
  },
  infoCard: {
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    padding: 16,
    marginTop: 8,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderLeftWidth: 4,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  infoText: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 8,
  },
});
