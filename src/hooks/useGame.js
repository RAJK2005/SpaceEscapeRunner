import { useState, useRef, useEffect, useCallback } from 'react';
import { Animated, Easing } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
  SHIP_WIDTH,
  SHIP_HEIGHT,
  MOVE_STEP,
  ASTEROID_SIZE,
  FALL_SPEED,
  SHIP_BOTTOM,
  HIGH_SCORE_KEY,
} from '../constants/game';

/**
 * Core game logic hook — collision, scoring, movement, and loop unchanged.
 * UI-only additions: pause, elapsed time, sound toggle, goHome.
 */
export function useGame() {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [lastScoreGain, setLastScoreGain] = useState(null);

  const [shipX, setShipX] = useState(SCREEN_WIDTH / 2 - SHIP_WIDTH / 2);
  const [asteroidX, setAsteroidX] = useState(0);
  const [asteroidY, setAsteroidY] = useState(0);

  const loopRef = useRef(null);
  const timeRef = useRef(null);
  const prevScoreRef = useRef(0);
  const shakeTrigger = useRef(0);

  const spin = useRef(new Animated.Value(0)).current;
  const flame = useRef(new Animated.Value(1)).current;
  const shipFloat = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    loadHighScore();
  }, []);

  useEffect(() => {
    Animated.loop(
      Animated.timing(spin, {
        toValue: 1,
        duration: 1200,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(flame, { toValue: 0.4, duration: 280, useNativeDriver: true }),
        Animated.timing(flame, { toValue: 1, duration: 220, useNativeDriver: true }),
      ])
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(shipFloat, { toValue: 1, duration: 1800, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
        Animated.timing(shipFloat, { toValue: 0, duration: 1800, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
      ])
    ).start();
  }, []);

  const spinDeg = spin.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] });
  const floatY = shipFloat.interpolate({ inputRange: [0, 1], outputRange: [0, -8] });

  const loadHighScore = async () => {
    try {
      const saved = await AsyncStorage.getItem(HIGH_SCORE_KEY);
      if (saved !== null) setHighScore(Number(saved));
    } catch (e) {
      console.log(e);
    }
  };

  const saveHighScore = async (v) => {
    try {
      await AsyncStorage.setItem(HIGH_SCORE_KEY, String(v));
    } catch (e) {
      console.log(e);
    }
  };

  const spawnAsteroid = useCallback(() => {
    setAsteroidX(Math.random() * (SCREEN_WIDTH - ASTEROID_SIZE));
    setAsteroidY(0);
  }, []);

  const startGame = useCallback(() => {
    setScore(0);
    prevScoreRef.current = 0;
    setGameOver(false);
    setIsPaused(false);
    setElapsedTime(0);
    setLastScoreGain(null);
    setShipX(SCREEN_WIDTH / 2 - SHIP_WIDTH / 2);
    spawnAsteroid();
    setIsPlaying(true);
  }, [spawnAsteroid]);

  const goHome = useCallback(() => {
    setIsPlaying(false);
    setGameOver(false);
    setIsPaused(false);
    setElapsedTime(0);
    setLastScoreGain(null);
  }, []);

  const moveLeft = useCallback(
    () => setShipX((x) => Math.max(0, x - MOVE_STEP)),
    []
  );
  const moveRight = useCallback(
    () => setShipX((x) => Math.min(SCREEN_WIDTH - SHIP_WIDTH, x + MOVE_STEP)),
    []
  );

  const togglePause = useCallback(() => {
    if (isPlaying && !gameOver) setIsPaused((p) => !p);
  }, [isPlaying, gameOver]);

  const toggleSound = useCallback(() => setSoundEnabled((s) => !s), []);

  // Game loop — unchanged mechanics
  useEffect(() => {
    if (!isPlaying || isPaused) return;
    loopRef.current = setInterval(() => {
      setAsteroidY((prevY) => {
        const nextY = prevY + FALL_SPEED;
        if (nextY > SCREEN_HEIGHT) {
          setScore((s) => s + 1);
          spawnAsteroid();
          return 0;
        }
        return nextY;
      });
    }, 30);
    return () => clearInterval(loopRef.current);
  }, [isPlaying, isPaused, spawnAsteroid]);

  // Elapsed time tracker (display only)
  useEffect(() => {
    if (!isPlaying || isPaused || gameOver) return;
    timeRef.current = setInterval(() => setElapsedTime((t) => t + 1), 1000);
    return () => clearInterval(timeRef.current);
  }, [isPlaying, isPaused, gameOver]);

  // Score popup trigger (visual only)
  useEffect(() => {
    if (score > prevScoreRef.current && isPlaying) {
      setLastScoreGain({ id: Date.now(), value: score });
    }
    prevScoreRef.current = score;
  }, [score, isPlaying]);

  // Collision detection — unchanged
  useEffect(() => {
    if (!isPlaying || isPaused) return;
    const shipTop = SCREEN_HEIGHT - SHIP_BOTTOM - SHIP_HEIGHT;
    const overlapX = asteroidX + ASTEROID_SIZE > shipX && asteroidX < shipX + SHIP_WIDTH;
    const overlapY = asteroidY + ASTEROID_SIZE > shipTop && asteroidY < SCREEN_HEIGHT - SHIP_BOTTOM;
    if (overlapX && overlapY) {
      setIsPlaying(false);
      setGameOver(true);
      shakeTrigger.current += 1;
      if (score > highScore) {
        setHighScore(score);
        saveHighScore(score);
      }
    }
  }, [asteroidY, asteroidX, shipX, isPlaying, isPaused, score, highScore]);

  const levelProgress = (score % 10) / 10;
  const distance = score * 120;
  const coins = Math.floor(score / 2);

  return {
    score,
    highScore,
    isPlaying,
    gameOver,
    isPaused,
    soundEnabled,
    elapsedTime,
    lastScoreGain,
    shipX,
    asteroidX,
    asteroidY,
    spinDeg,
    flame,
    floatY,
    shakeTrigger: shakeTrigger.current,
    levelProgress,
    distance,
    coins,
    startGame,
    goHome,
    moveLeft,
    moveRight,
    togglePause,
    toggleSound,
    clearScoreGain: () => setLastScoreGain(null),
  };
}
