import React, { useRef } from 'react';
import { TouchableOpacity, Text, StyleSheet, Animated, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Fonts, Gradients, Radius } from '../../constants/theme';

export default function GradientButton({
  label,
  onPress,
  icon,
  variant = 'primary',
  style,
  textStyle,
  size = 'large',
}) {
  const scale = useRef(new Animated.Value(1)).current;
  const glow = useRef(new Animated.Value(0)).current;

  const handlePressIn = () => {
    Animated.parallel([
      Animated.spring(scale, { toValue: 0.96, useNativeDriver: true, speed: 50, bounciness: 4 }),
      Animated.timing(glow, { toValue: 1, duration: 150, useNativeDriver: true }),
    ]).start();
  };

  const handlePressOut = () => {
    Animated.parallel([
      Animated.spring(scale, { toValue: 1, useNativeDriver: true, speed: 50, bounciness: 4 }),
      Animated.timing(glow, { toValue: 0, duration: 200, useNativeDriver: true }),
    ]).start();
  };

  const colors = variant === 'accent' ? Gradients.buttonAccent : Gradients.button;
  const padding = size === 'large' ? styles.largeInner : styles.smallInner;

  return (
    <Animated.View style={[{ transform: [{ scale }] }, style]}>
      <Animated.View
        style={[
          styles.glowRing,
          {
            opacity: glow.interpolate({ inputRange: [0, 1], outputRange: [0, 0.6] }),
          },
        ]}
      />
      <TouchableOpacity
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={1}
        style={styles.touchable}
      >
        <LinearGradient colors={colors} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={[styles.gradient, padding]}>
          {icon && <View style={styles.iconWrap}>{icon}</View>}
          <Text style={[styles.label, textStyle]}>{label}</Text>
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  touchable: {
    borderRadius: Radius.xl,
    overflow: 'hidden',
  },
  gradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Radius.xl,
  },
  largeInner: {
    paddingVertical: 16,
    paddingHorizontal: 36,
    minWidth: 220,
  },
  smallInner: {
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  label: {
    fontFamily: Fonts.headingMedium,
    fontSize: 15,
    color: Colors.white,
    letterSpacing: 2,
  },
  iconWrap: {
    marginRight: 10,
  },
  glowRing: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: Radius.xl,
    backgroundColor: Colors.accent,
    transform: [{ scale: 1.08 }],
  },
});
