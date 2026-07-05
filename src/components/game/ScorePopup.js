import React, { useEffect, useRef } from 'react';
import { Animated, Text, StyleSheet } from 'react-native';
import { Colors, Fonts } from '../../constants/theme';

export default function ScorePopup({ gain, onComplete }) {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!gain) return;
    opacity.setValue(1);
    translateY.setValue(0);

    Animated.parallel([
      Animated.timing(translateY, { toValue: -50, duration: 800, useNativeDriver: true }),
      Animated.timing(opacity, { toValue: 0, duration: 800, useNativeDriver: true }),
    ]).start(() => onComplete?.());
  }, [gain, opacity, translateY, onComplete]);

  if (!gain) return null;

  return (
    <Animated.View style={[styles.popup, { opacity, transform: [{ translateY }] }]}>
      <Text style={styles.text}>+1</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  popup: {
    position: 'absolute',
    top: '35%',
    alignSelf: 'center',
    zIndex: 20,
  },
  text: {
    fontFamily: Fonts.heading,
    fontSize: 28,
    color: Colors.success,
    textShadowColor: Colors.success,
    textShadowRadius: 12,
  },
});
