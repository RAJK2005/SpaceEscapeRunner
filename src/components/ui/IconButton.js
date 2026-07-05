import React, { useRef } from 'react';
import { TouchableOpacity, StyleSheet, Animated, View } from 'react-native';
import { Colors, Radius } from '../../constants/theme';

export default function IconButton({ icon, onPress, size = 44, active = false }) {
  const scale = useRef(new Animated.Value(1)).current;
  const ripple = useRef(new Animated.Value(0)).current;

  const handlePressIn = () => {
    Animated.parallel([
      Animated.spring(scale, { toValue: 0.9, useNativeDriver: true, speed: 60 }),
      Animated.timing(ripple, { toValue: 1, duration: 300, useNativeDriver: true }),
    ]).start();
  };

  const handlePressOut = () => {
    Animated.parallel([
      Animated.spring(scale, { toValue: 1, useNativeDriver: true, speed: 60 }),
      Animated.timing(ripple, { toValue: 0, duration: 200, useNativeDriver: true }),
    ]).start();
  };

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <TouchableOpacity
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={1}
        style={[styles.button, { width: size, height: size, borderRadius: size / 2 }]}
      >
        <Animated.View
          style={[
            styles.ripple,
            {
              borderRadius: size / 2,
              opacity: ripple.interpolate({ inputRange: [0, 1], outputRange: [0, 0.35] }),
              transform: [
                {
                  scale: ripple.interpolate({ inputRange: [0, 1], outputRange: [0.5, 1.4] }),
                },
              ],
            },
          ]}
        />
        <View style={[styles.glass, active && styles.glassActive]}>{icon}</View>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  glass: {
    width: '100%',
    height: '100%',
    borderRadius: 999,
    backgroundColor: Colors.glass,
    borderWidth: 1,
    borderColor: Colors.glassBorder,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#6C63FF',
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  glassActive: {
    borderColor: Colors.secondary,
    shadowColor: Colors.secondary,
    shadowOpacity: 0.6,
  },
  ripple: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.secondary,
  },
});
