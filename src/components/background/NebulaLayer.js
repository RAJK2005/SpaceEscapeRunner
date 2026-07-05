import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../../constants/game';

function Planet({ size, color, top, left, duration, opacity = 0.35 }) {
  const drift = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(drift, {
          toValue: 1,
          duration,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(drift, {
          toValue: 0,
          duration,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [drift, duration]);

  const translateY = drift.interpolate({ inputRange: [0, 1], outputRange: [0, 18] });
  const translateX = drift.interpolate({ inputRange: [0, 1], outputRange: [0, 8] });

  return (
    <Animated.View
      style={[
        styles.planet,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          top,
          left,
          opacity,
          backgroundColor: color,
          transform: [{ translateY }, { translateX }],
        },
      ]}
    >
      <View style={[styles.planetRing, { width: size * 1.6, borderRadius: size }]} />
    </Animated.View>
  );
}

export default function NebulaLayer() {
  return (
    <View style={styles.container} pointerEvents="none">
      <LinearGradient
        colors={['rgba(108,99,255,0.18)', 'transparent']}
        style={[styles.nebula, { top: '8%', left: '-10%', width: SCREEN_WIDTH * 0.7, height: SCREEN_HEIGHT * 0.35 }]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
      <LinearGradient
        colors={['rgba(0,229,255,0.12)', 'transparent']}
        style={[styles.nebula, { bottom: '15%', right: '-15%', width: SCREEN_WIDTH * 0.8, height: SCREEN_HEIGHT * 0.4 }]}
        start={{ x: 1, y: 1 }}
        end={{ x: 0, y: 0 }}
      />
      <LinearGradient
        colors={['rgba(255,122,24,0.08)', 'transparent']}
        style={[styles.nebula, { top: '40%', left: '20%', width: SCREEN_WIDTH * 0.5, height: SCREEN_HEIGHT * 0.25 }]}
      />
      <Planet size={90} color="#1B2458" top="12%" left="65%" duration={8000} />
      <Planet size={55} color="#2A1B58" top="55%" left="8%" duration={6000} opacity={0.5} />
      <Planet size={38} color="#0E3A5A" top="28%" left="15%" duration={7000} opacity={0.45} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  nebula: {
    position: 'absolute',
    borderRadius: 999,
  },
  planet: {
    position: 'absolute',
    shadowColor: '#6C63FF',
    shadowOpacity: 0.6,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 0 },
  },
  planetRing: {
    position: 'absolute',
    top: '45%',
    left: '-30%',
    height: 8,
    borderWidth: 1.5,
    borderColor: 'rgba(0,229,255,0.25)',
    transform: [{ rotate: '-20deg' }],
  },
});
