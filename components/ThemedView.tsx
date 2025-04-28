import { View, type ViewProps } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  useSafeArea?: boolean;
  edges?: Array<'top' | 'right' | 'bottom' | 'left'> | 'all';
};

export function ThemedView({ 
  style, 
  lightColor, 
  darkColor, 
  useSafeArea = false,
  edges = 'all',
  ...otherProps 
}: ThemedViewProps) {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');
  const insets = useSafeAreaInsets();
  
  const safeAreaStyle = useSafeArea ? {
    paddingTop: edges === 'all' || edges.includes('top') ? insets.top : 0,
    paddingRight: edges === 'all' || edges.includes('right') ? insets.right : 0,
    paddingBottom: edges === 'all' || edges.includes('bottom') ? insets.bottom : 0,
    paddingLeft: edges === 'all' || edges.includes('left') ? insets.left : 0,
  } : {};

  return <View style={[{ backgroundColor }, safeAreaStyle, style]} {...otherProps} />;
}
