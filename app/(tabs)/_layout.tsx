import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
            height: 49 + insets.bottom, // Standard tab bar height + bottom inset
            paddingBottom: insets.bottom, // Add padding for the bottom safe area
          },
          android: {
            height: 56 + insets.bottom, // Standard Android tab bar height + bottom inset
            paddingBottom: insets.bottom, // Add padding for the bottom safe area
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Speech',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="waveform" color={color} />,
        }}
      />
      <Tabs.Screen
        name="scenes"
        options={{
          title: 'Scenes',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="text.bubble" color={color} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="slider.horizontal.3" color={color} />,
        }}
      />
    </Tabs>
  );
}
