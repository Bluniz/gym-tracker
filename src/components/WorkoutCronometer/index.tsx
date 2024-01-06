import {View, Text, Alert} from 'react-native';

import notifee, {AndroidImportance, EventType} from '@notifee/react-native';

import {styles} from './styles';
import {useEffect} from 'react';
import {IconButton} from '../IconButton';
import {convertTime} from '../../utils';
import {useStore} from '../../stores';
import {useShallow} from 'zustand/react/shallow';
import {WorkoutCronometerProps} from './types';
import reactotron from 'reactotron-react-native';

export const WorkoutCronometer = ({workoutId}: WorkoutCronometerProps) => {
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

  const {minutes, hours, seconds} = convertTime(time);

  async function displayNotification(title: string, body: string, id: string) {
    //! Required for IOS
    await notifee.requestPermission();

    //! Required for Android
    const channelId = await notifee.createChannel({
      id,
      name: title,
      vibration: true,
      importance: AndroidImportance.HIGH,
    });

    notifee.displayNotification({
      title,
      body,
      android: {
        channelId,
      },
      ios: {
        interruptionLevel: 'passive',
      },
    });
  }

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
          displayNotification(
            'Workout Finished!',
            'You have finished your workout, congrats!',
            'cronometer-finish'
          );
          handleReset();
        },
      },
    ]);

  //! Estrutura para lidar em foreground
  useEffect(() => {
    return notifee.onForegroundEvent(({type, detail}) => {
      reactotron.log('foreground', {type, detail});
      switch (type) {
        case EventType.DISMISSED:
          reactotron.log('Foreground - Descartou');
          console.log('Foreground - Descartou');
          break;
        case EventType.ACTION_PRESS:
          reactotron.log(
            'Foreground - Action Press on notification',
            detail.notification
          );
          console.log(
            'Foreground - Action Press on notification',
            detail.notification
          );
          break;

        case EventType.PRESS:
          reactotron.log(
            'Foreground - Press on notification',
            detail.notification
          );
          break;
      }
    });
  }, []);

  useEffect(() => {
    return notifee.onBackgroundEvent(async ({type, detail}) => {
      reactotron.log('background', {type, detail});
      console.log('background', {type, detail});

      if (type === EventType.PRESS) {
        reactotron.log('Press Background', detail.notification);
        console.log('Press Background', detail.notification);
      }
    });
  }, []);

  useEffect(() => {
    let interval: string | number | NodeJS.Timeout | undefined;

    if (isStarted) {
      interval = setInterval(() => {
        increaseCount();
      }, 1000);
    }

    return () => clearTimeout(interval);
  }, [isStarted, time, increaseCount]);

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
              onPress={() => {
                handleStart();
                displayNotification(
                  'Workout Started!',
                  'Your workout is starting now',
                  'cronometer-start'
                );
              }}
              color="white"
              style={styles.actionBtn}
            />
          )}
        </View>
      </View>
    </View>
  );
};
