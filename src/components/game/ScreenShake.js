import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet } from 'react-native';

export default function ScreenShake({ trigger, children, style }) {
  const shakeX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!trigger) return;
    shakeX.setValue(0);
    Animated.sequence([
      Animated.timing(shakeX, { toValue: 12, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeX, { toValue: -10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeX, { toValue: 8, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeX, { toValue: -6, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeX, { toValue: 0, duration: 50, useNativeDriver: true }),
    ]).start();
  }, [trigger, shakeX]);

  return (
    <Animated.View style={[style, { transform: [{ translateX: shakeX }] }]}>
      {children}
    </Animated.View>
  );
}
