import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import IconButton from '../ui/IconButton';
import { Colors, Spacing } from '../../constants/theme';

export default function ControlPad({ onMoveLeft, onMoveRight }) {
  return (
    <View style={styles.container} pointerEvents="box-none">
      <IconButton
        icon={<Ionicons name="chevron-back" size={28} color={Colors.white} />}
        onPress={onMoveLeft}
        size={72}
      />
      <IconButton
        icon={<Ionicons name="chevron-forward" size={28} color={Colors.white} />}
        onPress={onMoveRight}
        size={72}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 28,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
  },
});
