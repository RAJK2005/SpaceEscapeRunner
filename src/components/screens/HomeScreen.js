import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import GlassCard from '../ui/GlassCard';
import GradientButton from '../ui/GradientButton';
import RocketShip from '../game/RocketShip';
import { Colors, Fonts, Spacing } from '../../constants/theme';

function AnimatedTitle() {
  const glow = useRef(new Animated.Value(0.4)).current;
  const slide = useRef(new Animated.Value(20)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, { toValue: 1, duration: 800, useNativeDriver: true }),
      Animated.timing(slide, { toValue: 0, duration: 800, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
    ]).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(glow, { toValue: 1, duration: 2000, useNativeDriver: true }),
        Animated.timing(glow, { toValue: 0.4, duration: 2000, useNativeDriver: true }),
      ])
    ).start();
  }, [glow, slide, opacity]);

  return (
    <Animated.View style={{ opacity, transform: [{ translateY: slide }] }}>
      <Animated.View style={[styles.titleGlow, { opacity: glow }]} />
      <Text style={styles.titleMain}>SPACE</Text>
      <Text style={styles.titleSub}>ESCAPE RUNNER</Text>
      <Text style={styles.tagline}>Navigate the cosmic void</Text>
    </Animated.View>
  );
}

export default function HomeScreen({ highScore, shipX, flame, floatY, onStart }) {
  return (
    <View style={styles.container}>
      <AnimatedTitle />

      <View style={styles.statsRow}>
        <GlassCard style={styles.statCard} glowColor={Colors.warning}>
          <View style={styles.bestHeader}>
            <Ionicons name="trophy" size={16} color={Colors.warning} />
            <Text style={styles.statLabel}>BEST SCORE</Text>
          </View>
          <Text style={styles.bestValue}>{highScore}</Text>
        </GlassCard>
      </View>

      <View style={styles.shipPreview}>
        <RocketShip shipX={shipX} flame={flame} floatY={floatY} idle preview />
      </View>

      <View style={styles.cta}>
        <GradientButton
          label="LAUNCH MISSION"
          onPress={onStart}
          icon={<Ionicons name="rocket" size={20} color={Colors.white} />}
        />
        <Text style={styles.hint}>Dodge asteroids • Survive • Score</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 80,
    paddingHorizontal: Spacing.lg,
  },
  titleGlow: {
    position: 'absolute',
    top: 10,
    alignSelf: 'center',
    width: 200,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primary,
    shadowColor: Colors.primary,
    shadowOpacity: 0.8,
    shadowRadius: 24,
  },
  titleMain: {
    fontFamily: Fonts.heading,
    fontSize: 42,
    color: Colors.white,
    letterSpacing: 6,
    textAlign: 'center',
    textShadowColor: Colors.primary,
    textShadowRadius: 16,
  },
  titleSub: {
    fontFamily: Fonts.headingMedium,
    fontSize: 18,
    color: Colors.secondary,
    letterSpacing: 8,
    textAlign: 'center',
    marginTop: 4,
  },
  tagline: {
    fontFamily: Fonts.body,
    fontSize: 13,
    color: Colors.textMuted,
    textAlign: 'center',
    marginTop: 10,
    letterSpacing: 1,
  },
  statsRow: {
    marginTop: Spacing.xl,
    width: '100%',
    alignItems: 'center',
  },
  statCard: {
    alignItems: 'center',
    minWidth: 180,
    paddingVertical: 16,
  },
  bestHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 6,
  },
  statLabel: {
    fontFamily: Fonts.bodySemi,
    fontSize: 10,
    color: Colors.textMuted,
    letterSpacing: 2,
  },
  bestValue: {
    fontFamily: Fonts.heading,
    fontSize: 36,
    color: Colors.warning,
    textShadowColor: Colors.warning,
    textShadowRadius: 10,
  },
  shipPreview: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cta: {
    alignItems: 'center',
    paddingBottom: 48,
    gap: 14,
  },
  hint: {
    fontFamily: Fonts.body,
    fontSize: 11,
    color: Colors.textMuted,
    letterSpacing: 1.5,
  },
});
