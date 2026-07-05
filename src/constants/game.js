import { Dimensions } from 'react-native';

export const SCREEN_WIDTH = Dimensions.get('window').width;
export const SCREEN_HEIGHT = Dimensions.get('window').height;

// Gameplay constants — do not change for UI work
export const SHIP_WIDTH = 60;
export const SHIP_HEIGHT = 70;
export const MOVE_STEP = 30;
export const ASTEROID_SIZE = 50;
export const FALL_SPEED = 6;
export const SHIP_BOTTOM = 110;
export const HIGH_SCORE_KEY = 'spaceEscapeHighScore';

export const getRank = (score) => {
  if (score >= 50) return { label: 'LEGEND', color: '#FFD600' };
  if (score >= 25) return { label: 'GOLD', color: '#FF7A18' };
  if (score >= 10) return { label: 'SILVER', color: '#00E5FF' };
  return { label: 'BRONZE', color: '#CD7F32' };
};

export const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};
