import {View, Text} from 'react-native';

import {styles} from './styles';
import {useEffect} from 'react';
import {IconButton} from '../IconButton';
import {convertTime} from '../../utils';
import {useStore} from '../../stores';
import {useShallow} from 'zustand/react/shallow';

export const Cronometer = () => {
  const {time, handleReset, handleStart, handleStop, isStarted, increaseCount} =
    useStore(
      useShallow(state => ({
        isStarted: state.isCronometerStarted,
        handleStart: state.startCount,
        handleStop: state.stopCount,
        handleReset: state.resetCount,
        increaseCount: state.increaseCount,
        time: state.time,
      }))
    );

  useEffect(() => {
    let interval: string | number | NodeJS.Timeout | undefined;

    if (isStarted) {
      interval = setInterval(() => {
        increaseCount();
      }, 1000);
    }

    return () => clearTimeout(interval);
  }, [isStarted, time, increaseCount]);

  const {minutes, hours, seconds} = convertTime(time);

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={[styles.whiteText]}>
          {hours.toString().padStart(2, '0')}:
          {minutes.toString().padStart(2, '0')}:
          {seconds.toString().padStart(2, '0')}
        </Text>
        <View style={styles.counterActionsContainer}>
          <IconButton
            icon="stop"
            disabled={!isStarted && time <= 0}
            color="white"
            onPress={handleReset}
            style={[
              styles.actionBtn,
              !isStarted && time <= 0 && styles.actionBtnDisabled,
            ]}
          />

          {isStarted ? (
            <IconButton
              icon="pause"
              onPress={handleStop}
              color="white"
              style={styles.actionBtn}
            />
          ) : (
            <IconButton
              icon="play"
              onPress={handleStart}
              color="white"
              style={styles.actionBtn}
            />
          )}
        </View>
      </View>
    </View>
  );
};
