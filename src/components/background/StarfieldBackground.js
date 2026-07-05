import React, { useEffect, useRef, useMemo } from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Gradients } from '../../constants/theme';

const STAR_COUNT = 80;

function Star({ delay, size, left, top, duration }) {
  const opacity = useRef(new Animated.Value(0.2)).current;

  useEffect(() => {
    const anim = Animated.loop(
      Animated.sequence([
        Animated.delay(delay),
        Animated.timing(opacity, {
          toValue: 1,
          duration: duration / 2,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.2,
          duration: duration / 2,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ])
    );
    anim.start();
    return () => anim.stop();
  }, [delay, duration, opacity]);

  return (
    <Animated.View
      style={[
        styles.star,
        {
          width: size,
          height: size,
          left,
          top,
          opacity,
          borderRadius: size / 2,
        },
      ]}
    />
  );
}

export default function StarfieldBackground() {
  const stars = useMemo(
    () =>
      Array.from({ length: STAR_COUNT }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        size: Math.random() * 2.5 + 1,
        delay: Math.random() * 2000,
        duration: 1500 + Math.random() * 2500,
      })),
    []
  );

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      <LinearGradient colors={Gradients.background} style={StyleSheet.absoluteFill} />
      {stars.map((s) => (
        <Star key={s.id} {...s} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  star: {
    position: 'absolute',
    backgroundColor: '#FFFFFF',
    shadowColor: '#00E5FF',
    shadowOpacity: 0.8,
    shadowRadius: 4,
  },
});
