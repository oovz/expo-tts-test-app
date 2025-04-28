import React, { useState } from 'react';
import { StyleSheet, View, FlatList, ScrollView } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import SceneCard from '@/components/tts/SceneCard';
import { SCENES } from '@/config/scenes';
import { Scene } from '@/app/types';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import { useTTS } from '@/contexts/TTSContext';
import { useRouter } from 'expo-router';

export default function ScenesScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const { settings, updateSettings } = useTTS();
  const router = useRouter();
  
  // Get unique tags from all scenes
  const allTags = Array.from(new Set(SCENES.flatMap((scene) => scene.tags || [])));

  // Filter scenes by selected tag or show all if no tag is selected
  const filteredScenes = selectedTag
    ? SCENES.filter((scene) => scene.tags?.includes(selectedTag))
    : SCENES;

  // Handle scene selection
  const handleSceneSelect = (scene: Scene) => {
    // Update the selected scene in the context
    updateSettings({ 
      selectedScene: scene.id,
      selectedSentenceIndex: 0 // Reset to first sentence when changing scenes
    }).then(() => {
      // Navigate back to home screen after selection
      router.push('/(tabs)');
    });
  };

  return (
    <ThemedView style={styles.container} useSafeArea edges={['top', 'right', 'left', 'bottom']}>
      <View style={styles.contentContainer}>
        <View style={styles.header}>
          <ThemedText style={styles.title}>Scenes</ThemedText>
          <ThemedText style={styles.subtitle}>Select a scene to test TTS</ThemedText>
        </View>
        
        {allTags.length > 0 && (
          <View style={styles.filterContainer}>
            <ScrollableChips
              items={allTags}
              selectedItem={selectedTag}
              onSelect={setSelectedTag}
              colors={colors}
            />
          </View>
        )}

        <FlatList
          data={filteredScenes}
          renderItem={({ item }) => (
            <SceneCard 
              scene={item} 
              isSelected={item.id === settings.selectedScene}
              currentLanguage={settings.language}
              onPress={() => handleSceneSelect(item)} 
            />
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <IconSymbol size={48} name="doc.text.magnifyingglass" color={colors.text} />
              <ThemedText style={styles.emptyText}>No scenes found</ThemedText>
            </View>
          }
        />
      </View>
    </ThemedView>
  );
}

// ScrollableChips component for filtering
function ScrollableChips({
  items,
  selectedItem,
  onSelect,
  colors,
}: {
  items: string[];
  selectedItem: string | null;
  onSelect: (item: string | null) => void;
  colors: any;
}) {
  return (
    <FlatList
      horizontal
      data={['All', ...items]}
      renderItem={({ item, index }) => {
        const isSelected = index === 0 ? selectedItem === null : item === selectedItem;
        const chipLabel = index === 0 ? 'All' : item;

        return (
          <ThemedText
            onPress={() => onSelect(index === 0 ? null : item)}
            style={[
              styles.chip,
              {
                backgroundColor: isSelected ? colors.tint : '#f5f5f7',
                color: isSelected ? '#fff' : colors.text,
              },
            ]}
          >
            {chipLabel}
          </ThemedText>
        );
      }}
      keyExtractor={(item, index) => (index === 0 ? 'all' : item)}
      contentContainerStyle={styles.chipList}
      showsHorizontalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    paddingTop: 20,
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
  filterContainer: {
    marginBottom: 16,
  },
  chipList: {
    paddingHorizontal: 24,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    marginRight: 8,
    fontSize: 14,
    fontWeight: '500',
    overflow: 'hidden',
  },
  listContent: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    marginTop: 16,
    fontSize: 16,
    opacity: 0.7,
  },
});