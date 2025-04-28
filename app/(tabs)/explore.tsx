import React from 'react';
import { StyleSheet, View, ScrollView, Platform } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useTTS } from '@/contexts/TTSContext';
import { IconSymbol } from '@/components/ui/IconSymbol';
import Constants from 'expo-constants';

export default function SettingsScreen() {
  const { availableVoices, availableLanguages, availableTTSLanguages, providerVersion } = useTTS();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  
  // Get app version from app.json via Constants
  const appVersion = Constants.expoConfig?.version || '1.0.0';

  return (
    <ThemedView style={styles.container} useSafeArea edges={['top', 'right', 'left', 'bottom']}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* TTS Provider Information */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>TTS Provider Details</ThemedText>
          <View style={styles.card}>
            <View style={styles.infoRow}>
              <ThemedText style={styles.infoLabel}>Provider</ThemedText>
              <ThemedText style={styles.infoValue}>Expo Speech</ThemedText>
            </View>
            <View style={styles.infoRow}>
              <ThemedText style={styles.infoLabel}>Version</ThemedText>
              <ThemedText style={styles.infoValue}>{providerVersion}</ThemedText>
            </View>
            <View style={styles.infoRowLast}>
              <ThemedText style={styles.infoLabel}>Platform</ThemedText>
              <ThemedText style={styles.infoValue}>
                {Platform.OS === 'web' ? 'Web' : Platform.OS === 'ios' ? 'iOS' : 'Android'}
              </ThemedText>
            </View>
          </View>
        </View>

        {/* Voice Stats */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Voice Statistics</ThemedText>
          <View style={styles.card}>
            <View style={styles.infoRow}>
              <ThemedText style={styles.infoLabel}>Available Voices</ThemedText>
              <View style={[styles.badge, { backgroundColor: colors.tint }]}>
                <ThemedText style={styles.badgeText}>{availableVoices.length}</ThemedText>
              </View>
            </View>
            <View style={styles.infoRow}>
              <ThemedText style={styles.infoLabel}>Supported Languages</ThemedText>
              <View style={[styles.badge, { backgroundColor: colors.tint }]}>
                <ThemedText style={styles.badgeText}>{availableTTSLanguages.length}</ThemedText>
              </View>
            </View>
            <View style={styles.infoRowLast}>
              <ThemedText style={styles.infoLabel}>Configured Languages</ThemedText>
              <View style={[styles.badge, { backgroundColor: colors.tint }]}>
                <ThemedText style={styles.badgeText}>{availableLanguages.length}</ThemedText>
              </View>
            </View>
          </View>
        </View>

        {/* Language Coverage */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Language Coverage</ThemedText>
          <View style={styles.card}>
            <View style={styles.languageGrid}>
              {availableLanguages.map(lang => (
                <View key={lang.code} style={styles.languageCapsule}>
                  <ThemedText style={styles.languageName}>{lang.name}</ThemedText>
                  <ThemedText style={styles.voiceCount}>
                    {availableVoices.filter(v => v.language === lang.code).length} voices
                  </ThemedText>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Credits */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Credits</ThemedText>
          <View style={styles.card}>
            <ThemedText style={styles.creditText}>
              Built with Expo SDK {Constants.expoConfig?.sdkVersion} and React Native.
            </ThemedText>
            <View style={styles.versionRow}>
              <ThemedText style={styles.versionText}>App Version: {appVersion}</ThemedText>
            </View>
          </View>
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
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 20, // Add consistent top padding
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  card: {
    backgroundColor: '#f5f5f7',
    borderRadius: 12,
    padding: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  infoRowLast: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  infoLabel: {
    fontSize: 15,
    opacity: 0.7,
  },
  infoValue: {
    fontSize: 15,
    fontWeight: '500',
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
  languageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  languageCapsule: {
    width: '48%',
    backgroundColor: 'rgba(0,0,0,0.03)',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    alignItems: 'center',
  },
  languageFlag: {
    fontSize: 24,
    marginBottom: 8,
  },
  languageName: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
  },
  voiceCount: {
    fontSize: 12,
    opacity: 0.6,
  },
  infoCard: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f5',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  infoText: {
    fontSize: 14,
    marginLeft: 12,
    flex: 1,
    lineHeight: 20,
  },
  creditText: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 8,
  },
  versionRow: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.05)',
  },
  versionText: {
    fontSize: 12,
    opacity: 0.6,
    textAlign: 'center',
  },
});
