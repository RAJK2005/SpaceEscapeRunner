import React, { useEffect, useRef, useMemo } from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';
import { Colors } from '../../constants/theme';

const COUNT = 18;

function ExplosionParticle({ angle, delay, color }) {
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(progress, {
      toValue: 1,
      duration: 900,
      delay,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  }, [progress, delay]);

  const distance = 80 + Math.random() * 60;
  const translateX = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [0, Math.cos(angle) * distance],
  });
  const translateY = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [0, Math.sin(angle) * distance],
  });
  const opacity = progress.interpolate({ inputRange: [0, 0.3, 1], outputRange: [1, 0.8, 0] });
  const scale = progress.interpolate({ inputRange: [0, 1], outputRange: [1, 0.2] });

  return (
    <Animated.View
      style={[
        styles.particle,
        {
          backgroundColor: color,
          opacity,
          transform: [{ translateX }, { translateY }, { scale }],
        },
      ]}
    />
  );
}

export default function ParticleExplosion({ active }) {
  const particles = useMemo(
    () =>
      Array.from({ length: COUNT }, (_, i) => ({
        id: i,
        angle: (i / COUNT) * Math.PI * 2,
        delay: Math.random() * 200,
        color: [Colors.accent, Colors.error, Colors.warning, Colors.secondary][i % 4],
      })),
    []
  );

  if (!active) return null;

  return (
    <View style={styles.container} pointerEvents="none">
      {particles.map((p) => (
        <ExplosionParticle key={p.id} {...p} />
      ))}
      <View style={styles.flash} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    width: 200,
    height: 200,
  },
  particle: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: 4,
    shadowColor: Colors.accent,
    shadowOpacity: 1,
    shadowRadius: 6,
  },
  flash: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255,122,24,0.25)',
    shadowColor: Colors.accent,
    shadowOpacity: 0.8,
    shadowRadius: 30,
  },
});
