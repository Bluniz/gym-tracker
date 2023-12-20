import {View, Text, Alert} from 'react-native';

import {styles} from './styles';
import {useEffect} from 'react';
import {IconButton} from '../IconButton';
import {convertTime} from '../../utils';
import {useStore} from '../../stores';
import {useShallow} from 'zustand/react/shallow';
import {CronometerProps} from './types';

export const Cronometer = ({workoutId}: CronometerProps) => {
  const {
    time,
    onCompleteWorkout,
    handleReset,
    handleStart,
    handleStop,
    isStarted,
    increaseCount,
  } = useStore(
    useShallow(state => ({
      isStarted: state.isCronometerStarted,
      handleStart: state.startCount,
      handleStop: state.stopCount,
      handleReset: state.resetCount,
      increaseCount: state.increaseCount,
      time: state.time,
      onCompleteWorkout: state.completeWorkout,
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

  const confirmAlert = () =>
    Alert.alert('Do you want to complete this training?', '', [
      {
        text: 'Cancel Training!',
        style: 'destructive',
        onPress: handleReset,
      },
      {
        text: "No, don't complete",
        style: 'cancel',
      },
      {
        text: 'Yes, complete!',
        onPress: () => {
          onCompleteWorkout(workoutId, time);
          handleReset();
        },
      },
    ]);

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
            onPress={confirmAlert}
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
