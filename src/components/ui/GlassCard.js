import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Colors, Radius } from '../../constants/theme';

export default function GlassCard({ children, style, glowColor }) {
  return (
    <View
      style={[
        styles.card,
        glowColor && { shadowColor: glowColor },
        style,
      ]}
    >
      <View style={styles.innerHighlight} />
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.glass,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.glassBorder,
    paddingVertical: 12,
    paddingHorizontal: 18,
    shadowColor: '#6C63FF',
    shadowOpacity: 0.25,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    overflow: 'hidden',
  },
  innerHighlight: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: Colors.glassHighlight,
  },
});
