import React from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ASTEROID_SIZE } from '../../constants/game';

export default function Asteroid({ asteroidX, asteroidY, spinDeg }) {
  return (
    <Animated.View
      style={[
        styles.asteroid,
        {
          left: asteroidX,
          top: asteroidY,
          transform: [{ rotate: spinDeg }],
        },
      ]}
    >
      <LinearGradient
        colors={['#8B7355', '#5C4E42', '#3D342C']}
        style={styles.surface}
        start={{ x: 0.2, y: 0 }}
        end={{ x: 0.8, y: 1 }}
      >
        <View style={styles.crater1}>
          <View style={styles.craterInner} />
        </View>
        <View style={styles.crater2} />
        <View style={styles.crater3} />
        <View style={styles.highlight} />
      </LinearGradient>
      <View style={styles.shadowRing} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  asteroid: {
    position: 'absolute',
    width: ASTEROID_SIZE,
    height: ASTEROID_SIZE,
  },
  surface: {
    width: ASTEROID_SIZE,
    height: ASTEROID_SIZE,
    borderRadius: ASTEROID_SIZE / 2,
    borderWidth: 2,
    borderColor: 'rgba(155,135,120,0.6)',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.7,
    shadowRadius: 10,
    shadowOffset: { width: 3, height: 4 },
  },
  shadowRing: {
    position: 'absolute',
    bottom: -4,
    left: 6,
    width: ASTEROID_SIZE - 12,
    height: 8,
    borderRadius: 999,
    backgroundColor: 'rgba(0,0,0,0.35)',
  },
  crater1: {
    position: 'absolute',
    top: 8,
    left: 10,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#4A3F36',
    alignItems: 'center',
    justifyContent: 'center',
  },
  craterInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#2E2720',
  },
  crater2: {
    position: 'absolute',
    bottom: 10,
    right: 8,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#4A3F36',
  },
  crater3: {
    position: 'absolute',
    top: 22,
    right: 12,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#3D342C',
  },
  highlight: {
    position: 'absolute',
    top: 6,
    left: 6,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.12)',
  },
});
