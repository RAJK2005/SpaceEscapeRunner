import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Share, Easing } from 'react-native';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import GlassCard from '../ui/GlassCard';
import GradientButton from '../ui/GradientButton';
import ParticleExplosion from '../game/ParticleExplosion';
import { Colors, Fonts, Spacing, Radius } from '../../constants/theme';
import { getRank, formatTime } from '../../constants/game';

function StatItem({ icon, label, value, color = Colors.white }) {
  return (
    <GlassCard style={styles.statItem}>
      <View style={styles.statHeader}>
        <Ionicons name={icon} size={14} color={Colors.secondary} />
        <Text style={styles.statLabel}>{label}</Text>
      </View>
      <Text style={[styles.statValue, { color }]}>{value}</Text>
    </GlassCard>
  );
}

export default function GameOverScreen({
  score,
  highScore,
  coins,
  elapsedTime,
  onPlayAgain,
  onHome,
}) {
  const rank = getRank(score);
  const fadeIn = useRef(new Animated.Value(0)).current;
  const titleScale = useRef(new Animated.Value(0.8)).current;
  const slideUp = useRef(new Animated.Value(40)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeIn, { toValue: 1, duration: 600, useNativeDriver: true }),
      Animated.spring(titleScale, { toValue: 1, useNativeDriver: true, speed: 12, bounciness: 6 }),
      Animated.timing(slideUp, { toValue: 0, duration: 700, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
    ]).start();
  }, [fadeIn, titleScale, slideUp]);

  const handleShare = async () => {
    try {
      await Share.share({
        message: `I scored ${score} in Space Escape Runner! Rank: ${rank.label}. Can you beat me?`,
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Animated.View style={[styles.overlay, { opacity: fadeIn }]}>
      <BlurView intensity={40} tint="dark" style={StyleSheet.absoluteFill} />
      <View style={styles.darkTint} />

      <Animated.View style={[styles.content, { transform: [{ translateY: slideUp }] }]}>
        <View style={styles.titleBlock}>
          <ParticleExplosion active />
          <Animated.Text style={[styles.failTitle, { transform: [{ scale: titleScale }] }]}>
            MISSION FAILED
          </Animated.Text>
        </View>

        <View style={[styles.rankBadge, { borderColor: rank.color }]}>
          <Ionicons name="medal" size={16} color={rank.color} />
          <Text style={[styles.rankText, { color: rank.color }]}>{rank.label}</Text>
        </View>

        <View style={styles.statsGrid}>
          <StatItem icon="star" label="FINAL SCORE" value={score} color={Colors.success} />
          <StatItem icon="trophy" label="BEST SCORE" value={highScore} color={Colors.warning} />
          <StatItem icon="logo-bitcoin" label="COINS" value={coins} color={Colors.accent} />
          <StatItem icon="time" label="TIME SURVIVED" value={formatTime(elapsedTime)} />
        </View>

        <View style={styles.actions}>
          <GradientButton
            label="PLAY AGAIN"
            onPress={onPlayAgain}
            icon={<Ionicons name="refresh" size={20} color={Colors.white} />}
          />
          <View style={styles.secondaryActions}>
            <GradientButton
              label="HOME"
              onPress={onHome}
              size="small"
              variant="accent"
              icon={<Ionicons name="home" size={16} color={Colors.white} />}
              style={styles.secondaryBtn}
            />
            <GradientButton
              label="SHARE"
              onPress={handleShare}
              size="small"
              icon={<Ionicons name="share-social" size={16} color={Colors.white} />}
              style={styles.secondaryBtn}
            />
          </View>
        </View>
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  darkTint: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(5,8,22,0.75)',
  },
  content: {
    width: '100%',
    paddingHorizontal: Spacing.lg,
    alignItems: 'center',
  },
  titleBlock: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 140,
    marginBottom: Spacing.md,
  },
  failTitle: {
    fontFamily: Fonts.heading,
    fontSize: 34,
    color: Colors.error,
    letterSpacing: 4,
    textAlign: 'center',
    textShadowColor: Colors.error,
    textShadowRadius: 20,
  },
  rankBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: Radius.round,
    borderWidth: 1.5,
    backgroundColor: 'rgba(255,255,255,0.06)',
    marginBottom: Spacing.lg,
  },
  rankText: {
    fontFamily: Fonts.headingMedium,
    fontSize: 14,
    letterSpacing: 3,
  },
  statsGrid: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    justifyContent: 'center',
    marginBottom: Spacing.xl,
  },
  statItem: {
    width: '47%',
    alignItems: 'center',
    paddingVertical: 14,
  },
  statHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginBottom: 6,
  },
  statLabel: {
    fontFamily: Fonts.bodySemi,
    fontSize: 9,
    color: Colors.textMuted,
    letterSpacing: 1.5,
  },
  statValue: {
    fontFamily: Fonts.heading,
    fontSize: 24,
  },
  actions: {
    width: '100%',
    alignItems: 'center',
    gap: 14,
  },
  secondaryActions: {
    flexDirection: 'row',
    gap: 12,
  },
  secondaryBtn: {
    flex: 1,
  },
});
