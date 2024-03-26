import {View, Text, Alert, AppState, AppStateStatus} from 'react-native';

import notifee, {AndroidImportance, EventType} from '@notifee/react-native';

import {styles} from './styles';
import {useEffect, useRef} from 'react';
import {IconButton} from '../IconButton';
import {convertTime} from '../../utils';
import {useStore} from '../../stores';
import {useShallow} from 'zustand/react/shallow';
import {WorkoutCronometerProps} from './types';
import reactotron from 'reactotron-react-native';
import {differenceInSeconds} from 'date-fns';
import {storage} from '../../services/storage';
import {SheetManager} from 'react-native-actions-sheet';

export const WorkoutCronometer = ({workoutId}: WorkoutCronometerProps) => {
  const {
    time,
    onCompleteWorkout,
    handleReset,
    handleStart,
    handleStop,
    isStarted,
    increaseCount,
    setCount,
  } = useStore(
    useShallow(state => ({
      isStarted: state.isCronometerStarted,
      handleStart: state.startCount,
      handleStop: state.stopCount,
      handleReset: state.resetCount,
      increaseCount: state.increaseCount,
      time: state.time,
      onCompleteWorkout: state.completeWorkout,
      setCount: state.setCount,
    }))
  );

  const {minutes, hours, seconds} = convertTime(time);

  const appState = useRef(AppState.currentState);

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
  const confirmAlert = () => {
    SheetManager.show('options-sheet', {
      payload: {
        options: [
          {
            title: 'Cancelar Treino',
            onPress: handleReset,
            variant: 'destructive',
          },
          {
            title: 'Não, não completar',
            onPress: () => null,
          },
          {
            title: 'Sim, completar',
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
        ],
        title: 'Do you want to complete this training?',
      },
    });
  };

  const saveStartElapsedTime = () => {
    try {
      const now = new Date();
      storage.set('@cronometer_time', now.toISOString());
    } catch (err) {
      console.log(err);
    }
  };

  const getElapsedTime = () => {
    try {
      const startTime = storage.getString('@cronometer_time');
      const now = new Date();

      return differenceInSeconds(now, Date.parse(startTime!));
    } catch (error) {
      console.log(error);
    }
  };

  const handleAppStateChange = async (nextState: AppStateStatus) => {
    reactotron.log(nextState);

    if (nextState.match(/inactive|background/)) {
      saveStartElapsedTime();
    }
    if (
      appState.current.match(/inactive|background/) &&
      nextState === 'active' &&
      isStarted
    ) {
      const elapsedTime = getElapsedTime();
      reactotron.log('elapsedTime', elapsedTime);

      reactotron.log({time, elapsedTime});
      setCount(time + elapsedTime!);
    }

    appState.current = nextState;
  };
  useEffect(() => {
    const subscription = AppState.addEventListener(
      'change',
      handleAppStateChange
    );

    return () => subscription.remove();
  }, [isStarted, time]);

  //! Estrutura para lidar em foreground
  useEffect(() => {
    return notifee.onForegroundEvent(({type, detail}) => {
      reactotron.log('foreground -- notification', {type, detail});
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
