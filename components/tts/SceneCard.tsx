import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { Scene } from '@/types';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';

interface SceneCardProps {
  scene: Scene;
  isSelected?: boolean;
  currentLanguage: string;
  onPress: () => void;
}

const SceneCard: React.FC<SceneCardProps> = ({ scene, isSelected = false, currentLanguage, onPress }) => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  
  // Check if the scene supports the current language
  const languageSupported = scene.sentences && 
                            scene.sentences[currentLanguage] && 
                            scene.sentences[currentLanguage].length > 0;

  return (
    <TouchableOpacity
      style={[
        styles.card,
        {
          backgroundColor: isSelected ? colors.tint + '20' : '#F5F5F7',
          borderColor: isSelected ? colors.tint : '#E5E5E7',
          opacity: languageSupported ? 1 : 0.7,
        },
      ]}
      activeOpacity={languageSupported ? 0.7 : 1}
      onPress={languageSupported ? onPress : undefined}
      disabled={!languageSupported}
    >
      <View style={styles.header}>
        <ThemedText style={[
          styles.title, 
          { color: isSelected ? colors.tint : colors.text }
        ]}>
          {scene.title}
        </ThemedText>
        {scene.tags && scene.tags.length > 0 && (
          <View style={styles.tagContainer}>
            {scene.tags.map((tag) => (
              <View
                key={tag}
                style={[styles.tag, { backgroundColor: isSelected ? colors.tint + '40' : '#E0E0E5' }]}
              >
                <ThemedText style={[styles.tagText, { color: isSelected ? colors.tint : '#555' }]}>
                  {tag}
                </ThemedText>
              </View>
            ))}
          </View>
        )}
      </View>

      {scene.description && (
        <ThemedText style={styles.description}>{scene.description}</ThemedText>
      )}

      <View style={styles.languagesContainer}>
        {!languageSupported ? (
          <ThemedText style={[styles.unavailableLanguage, { color: '#FF6B6B' }]}>
            Selected language is not available in this scene
          </ThemedText>
        ) : (
          Object.keys(scene.sentences).length > 0 && (
            <ThemedText style={styles.languagesLabel}>
              Available in {Object.keys(scene.sentences).length} languages
            </ThemedText>
          )
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 16,
    marginVertical: 8,
    borderWidth: 1,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
  },
  description: {
    fontSize: 14,
    opacity: 0.7,
    marginBottom: 12,
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginLeft: 6,
  },
  tagText: {
    fontSize: 12,
  },
  languagesContainer: {
    marginTop: 8,
  },
  languagesLabel: {
    fontSize: 12,
    opacity: 0.6,
  },
  unavailableLanguage: {
    fontSize: 12,
    fontWeight: '500',
  }
});

export default SceneCard;