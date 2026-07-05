import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import GradientButton from '../ui/GradientButton';
import { Colors, Fonts, Spacing } from '../../constants/theme';

export default function PauseOverlay({ visible, onResume, onHome }) {
  if (!visible) return null;

  return (
    <View style={styles.overlay}>
      <BlurView intensity={30} tint="dark" style={StyleSheet.absoluteFill} />
      <View style={styles.tint} />
      <View style={styles.content}>
        <Ionicons name="pause-circle" size={48} color={Colors.secondary} />
        <Text style={styles.title}>PAUSED</Text>
        <Text style={styles.subtitle}>Mission on hold</Text>
        <GradientButton
          label="RESUME"
          onPress={onResume}
          icon={<Ionicons name="play" size={18} color={Colors.white} />}
          style={styles.btn}
        />
        <GradientButton
          label="HOME"
          onPress={onHome}
          variant="accent"
          size="small"
          icon={<Ionicons name="home" size={16} color={Colors.white} />}
          style={styles.btn}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tint: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(5,8,22,0.6)',
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
  },
  title: {
    fontFamily: Fonts.heading,
    fontSize: 32,
    color: Colors.white,
    letterSpacing: 4,
    marginTop: Spacing.md,
    textShadowColor: Colors.secondary,
    textShadowRadius: 12,
  },
  subtitle: {
    fontFamily: Fonts.body,
    fontSize: 14,
    color: Colors.textMuted,
    marginTop: 6,
    marginBottom: Spacing.xl,
  },
  btn: {
    marginTop: 12,
    width: 220,
  },
});
