import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SHIP_WIDTH, SHIP_HEIGHT, SHIP_BOTTOM } from '../../constants/game';
import { Colors } from '../../constants/theme';

export default function RocketShip({ shipX, flame, floatY, idle = false, preview = false }) {
  const glowPulse = useRef(new Animated.Value(0.6)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(glowPulse, { toValue: 1, duration: 1200, useNativeDriver: true }),
        Animated.timing(glowPulse, { toValue: 0.6, duration: 1200, useNativeDriver: true }),
      ])
    ).start();
  }, [glowPulse]);

  return (
    <Animated.View
      style={[
        preview ? styles.previewContainer : styles.shipContainer,
        !preview && { left: shipX },
        idle && { transform: [{ translateY: floatY }] },
      ]}
    >
      <Animated.View style={[styles.glowAura, { opacity: glowPulse }]} />

      <View style={styles.ship}>
        <View style={styles.nose} />
        <LinearGradient colors={['#00B8D4', '#0088A3']} style={styles.body}>
          <View style={styles.cockpitOuter}>
            <View style={styles.cockpitInner} />
          </View>
          <View style={styles.bodyStripe} />
        </LinearGradient>
        <View style={styles.wingsRow}>
          <View style={styles.wingLeft} />
          <View style={styles.wingRight} />
        </View>
        <View style={styles.engine}>
          <Animated.View
            style={[
              styles.flameOuter,
              { opacity: flame, transform: [{ scaleY: flame }, { scaleX: flame }] },
            ]}
          >
            <LinearGradient colors={['#FF7A18', '#FF5252', 'transparent']} style={styles.flameInner} />
          </Animated.View>
          <Animated.View
            style={[
              styles.flameCore,
              {
                opacity: flame.interpolate({ inputRange: [0.4, 1], outputRange: [0.5, 1] }),
                transform: [{ scaleY: flame }],
              },
            ]}
          />
        </View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  shipContainer: {
    position: 'absolute',
    bottom: SHIP_BOTTOM,
    width: SHIP_WIDTH,
    alignItems: 'center',
  },
  previewContainer: {
    alignSelf: 'center',
    width: SHIP_WIDTH,
    alignItems: 'center',
  },
  glowAura: {
    position: 'absolute',
    width: SHIP_WIDTH + 30,
    height: SHIP_HEIGHT + 30,
    borderRadius: 999,
    backgroundColor: 'rgba(0,229,255,0.15)',
    top: -10,
    shadowColor: Colors.secondary,
    shadowOpacity: 0.9,
    shadowRadius: 20,
  },
  ship: {
    width: SHIP_WIDTH,
    alignItems: 'center',
  },
  nose: {
    width: 0,
    height: 0,
    borderLeftWidth: 16,
    borderRightWidth: 16,
    borderBottomWidth: 22,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#00E5FF',
    shadowColor: '#00E5FF',
    shadowOpacity: 0.9,
    shadowRadius: 8,
  },
  body: {
    width: 42,
    height: 30,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.secondary,
    shadowOpacity: 0.8,
    shadowRadius: 10,
  },
  cockpitOuter: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.5)',
  },
  cockpitInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#B3F0FF',
    shadowColor: Colors.secondary,
    shadowOpacity: 1,
    shadowRadius: 6,
  },
  bodyStripe: {
    position: 'absolute',
    bottom: 4,
    width: 30,
    height: 3,
    borderRadius: 2,
    backgroundColor: 'rgba(255,255,255,0.25)',
  },
  wingsRow: {
    flexDirection: 'row',
    width: 58,
    justifyContent: 'space-between',
    marginTop: -6,
  },
  wingLeft: {
    width: 0,
    height: 0,
    borderTopWidth: 14,
    borderRightWidth: 11,
    borderTopColor: '#6C63FF',
    borderRightColor: 'transparent',
  },
  wingRight: {
    width: 0,
    height: 0,
    borderTopWidth: 14,
    borderLeftWidth: 11,
    borderTopColor: '#6C63FF',
    borderLeftColor: 'transparent',
  },
  engine: {
    alignItems: 'center',
    marginTop: 2,
  },
  flameOuter: {
    width: 18,
    height: 24,
    borderRadius: 9,
    overflow: 'hidden',
  },
  flameInner: {
    flex: 1,
    borderRadius: 9,
  },
  flameCore: {
    position: 'absolute',
    top: 4,
    width: 8,
    height: 14,
    borderRadius: 4,
    backgroundColor: '#FFD600',
    shadowColor: Colors.warning,
    shadowOpacity: 1,
    shadowRadius: 8,
  },
});
