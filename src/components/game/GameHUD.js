import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import GlassCard from '../ui/GlassCard';
import IconButton from '../ui/IconButton';
import { Colors, Fonts, Spacing } from '../../constants/theme';
import { formatTime } from '../../constants/game';

export default function GameHUD({
  score,
  highScore,
  levelProgress,
  distance,
  elapsedTime,
  soundEnabled,
  isPaused,
  onToggleSound,
  onTogglePause,
}) {
  return (
    <View style={styles.container} pointerEvents="box-none">
      <View style={styles.topRow}>
        <IconButton
          icon={
            <Ionicons
              name={soundEnabled ? 'volume-high' : 'volume-mute'}
              size={20}
              color={Colors.secondary}
            />
          }
          onPress={onToggleSound}
          active={soundEnabled}
        />
        <IconButton
          icon={<Ionicons name={isPaused ? 'play' : 'pause'} size={20} color={Colors.white} />}
          onPress={onTogglePause}
          active={isPaused}
        />
      </View>

      <View style={styles.statsRow}>
        <GlassCard style={styles.statCard} glowColor={Colors.success}>
          <Text style={styles.statLabel}>SCORE</Text>
          <Text style={styles.scoreValue}>{score}</Text>
        </GlassCard>
        <GlassCard style={styles.statCard} glowColor={Colors.warning}>
          <View style={styles.bestRow}>
            <Ionicons name="trophy" size={14} color={Colors.warning} />
            <Text style={styles.statLabel}>BEST</Text>
          </View>
          <Text style={styles.bestValue}>{highScore}</Text>
        </GlassCard>
      </View>

      <View style={styles.progressSection}>
        <View style={styles.progressHeader}>
          <Text style={styles.progressLabel}>LEVEL</Text>
          <Text style={styles.progressValue}>{Math.floor(score / 10) + 1}</Text>
        </View>
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${levelProgress * 100}%` }]} />
        </View>
      </View>

      <View style={styles.indicators}>
        <GlassCard style={styles.indicator}>
          <Ionicons name="navigate" size={12} color={Colors.secondary} />
          <Text style={styles.indicatorText}>{distance.toLocaleString()} m</Text>
        </GlassCard>
        <GlassCard style={styles.indicator}>
          <Ionicons name="time-outline" size={12} color={Colors.secondary} />
          <Text style={styles.indicatorText}>{formatTime(elapsedTime)}</Text>
        </GlassCard>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    paddingTop: 52,
    paddingHorizontal: Spacing.md,
    zIndex: 10,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.md,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'center',
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    maxWidth: 160,
  },
  statLabel: {
    fontFamily: Fonts.bodySemi,
    fontSize: 10,
    color: Colors.textMuted,
    letterSpacing: 2,
    marginBottom: 4,
  },
  bestRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 4,
  },
  scoreValue: {
    fontFamily: Fonts.heading,
    fontSize: 32,
    color: Colors.success,
    textShadowColor: Colors.success,
    textShadowRadius: 10,
  },
  bestValue: {
    fontFamily: Fonts.heading,
    fontSize: 28,
    color: Colors.warning,
    textShadowColor: Colors.warning,
    textShadowRadius: 8,
  },
  progressSection: {
    marginTop: Spacing.md,
    paddingHorizontal: Spacing.sm,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  progressLabel: {
    fontFamily: Fonts.bodySemi,
    fontSize: 10,
    color: Colors.textMuted,
    letterSpacing: 1.5,
  },
  progressValue: {
    fontFamily: Fonts.headingMedium,
    fontSize: 12,
    color: Colors.secondary,
  },
  progressTrack: {
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(255,255,255,0.1)',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
    backgroundColor: Colors.primary,
    shadowColor: Colors.primary,
    shadowOpacity: 0.8,
    shadowRadius: 6,
  },
  indicators: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    marginTop: Spacing.sm,
  },
  indicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  indicatorText: {
    fontFamily: Fonts.bodySemi,
    fontSize: 11,
    color: Colors.white,
    letterSpacing: 0.5,
  },
});
