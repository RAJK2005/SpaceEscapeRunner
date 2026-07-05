import React from 'react';
import { View, StyleSheet } from 'react-native';
import StarfieldBackground from './StarfieldBackground';
import NebulaLayer from './NebulaLayer';
import FloatingParticles from './FloatingParticles';

export default function SpaceBackground({ showParticles = true }) {
  return (
    <View style={styles.container} pointerEvents="none">
      <StarfieldBackground />
      <NebulaLayer />
      {showParticles && <FloatingParticles />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
});
