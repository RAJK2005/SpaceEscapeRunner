import React, { useCallback, useState, useEffect } from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { useFonts, Orbitron_500Medium, Orbitron_700Bold } from '@expo-google-fonts/orbitron';
import { Exo2_400Regular, Exo2_600SemiBold, Exo2_700Bold } from '@expo-google-fonts/exo-2';
import * as SplashScreen from 'expo-splash-screen';

import { useGame } from './src/hooks/useGame';
import SpaceBackground from './src/components/background/SpaceBackground';
import HomeScreen from './src/components/screens/HomeScreen';
import GameOverScreen from './src/components/screens/GameOverScreen';
import PauseOverlay from './src/components/screens/PauseOverlay';
import GameHUD from './src/components/game/GameHUD';
import RocketShip from './src/components/game/RocketShip';
import Asteroid from './src/components/game/Asteroid';
import ControlPad from './src/components/game/ControlPad';
import ScorePopup from './src/components/game/ScorePopup';
import ScreenShake from './src/components/game/ScreenShake';
import { SCREEN_WIDTH, SHIP_WIDTH } from './src/constants/game';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    Orbitron_500Medium,
    Orbitron_700Bold,
    Exo2_400Regular,
    Exo2_600SemiBold,
    Exo2_700Bold,
  });

  const game = useGame();
  const [shakeKey, setShakeKey] = useState(0);

  useEffect(() => {
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded]);

  useEffect(() => {
    if (game.gameOver) setShakeKey(game.shakeTrigger);
  }, [game.gameOver, game.shakeTrigger]);

  const onFontsLoaded = useCallback(async () => {
    if (fontsLoaded) await SplashScreen.hideAsync();
  }, [fontsLoaded]);

  useEffect(() => {
    onFontsLoaded();
  }, [onFontsLoaded]);

  if (!fontsLoaded) return null;

  const showHome = !game.isPlaying && !game.gameOver;
  const showGame = game.isPlaying || game.gameOver;
  const previewShipX = SCREEN_WIDTH / 2 - SHIP_WIDTH / 2;

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <SpaceBackground showParticles={showHome || game.isPlaying} />

      <ScreenShake trigger={shakeKey} style={styles.gameArea}>
        {showHome && (
          <HomeScreen
            highScore={game.highScore}
            shipX={previewShipX}
            flame={game.flame}
            floatY={game.floatY}
            onStart={game.startGame}
          />
        )}

        {showGame && (
          <>
            {game.isPlaying && (
              <>
                <GameHUD
                  score={game.score}
                  highScore={game.highScore}
                  levelProgress={game.levelProgress}
                  distance={game.distance}
                  elapsedTime={game.elapsedTime}
                  soundEnabled={game.soundEnabled}
                  isPaused={game.isPaused}
                  onToggleSound={game.toggleSound}
                  onTogglePause={game.togglePause}
                />
                {!game.isPaused && (
                  <Asteroid
                    asteroidX={game.asteroidX}
                    asteroidY={game.asteroidY}
                    spinDeg={game.spinDeg}
                  />
                )}
                <ScorePopup gain={game.lastScoreGain} onComplete={game.clearScoreGain} />
                {!game.isPaused && (
                  <ControlPad onMoveLeft={game.moveLeft} onMoveRight={game.moveRight} />
                )}
              </>
            )}

            {(game.isPlaying || game.gameOver) && (
              <RocketShip
                shipX={game.shipX}
                flame={game.flame}
                floatY={game.floatY}
              />
            )}
          </>
        )}
      </ScreenShake>

      <PauseOverlay
        visible={game.isPlaying && game.isPaused && !game.gameOver}
        onResume={game.togglePause}
        onHome={game.goHome}
      />

      {game.gameOver && (
        <GameOverScreen
          score={game.score}
          highScore={game.highScore}
          coins={game.coins}
          elapsedTime={game.elapsedTime}
          onPlayAgain={game.startGame}
          onHome={game.goHome}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#050816',
  },
  gameArea: {
    flex: 1,
  },
});
