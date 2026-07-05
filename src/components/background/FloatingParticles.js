import React, { useEffect, useRef, useMemo } from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';
import { Colors } from '../../constants/theme';

const PARTICLE_COUNT = 24;

function Particle({ left, delay, color, size }) {
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.delay(delay),
        Animated.timing(progress, {
          toValue: 1,
          duration: 4000 + Math.random() * 3000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(progress, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [delay, progress]);

  const translateY = progress.interpolate({ inputRange: [0, 1], outputRange: [0, -120] });
  const opacity = progress.interpolate({ inputRange: [0, 0.2, 0.8, 1], outputRange: [0, 0.7, 0.5, 0] });

  return (
    <Animated.View
      style={[
        styles.particle,
        {
          left,
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: color,
          opacity,
          transform: [{ translateY }],
        },
      ]}
    />
  );
}

export default function FloatingParticles() {
  const particles = useMemo(
    () =>
      Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        delay: Math.random() * 3000,
        size: Math.random() * 3 + 2,
        color: [Colors.secondary, Colors.primary, Colors.accent][i % 3],
      })),
    []
  );

  return (
    <View style={styles.container} pointerEvents="none">
      {particles.map((p) => (
        <Particle key={p.id} {...p} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    bottom: 0,
    top: '40%',
  },
  particle: {
    position: 'absolute',
    bottom: 0,
    shadowColor: '#00E5FF',
    shadowOpacity: 0.9,
    shadowRadius: 6,
  },
});
