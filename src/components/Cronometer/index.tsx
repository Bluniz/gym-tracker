import {View, Text} from 'react-native';

import {styles} from './styles';
import { useEffect, useState } from 'react';
import { IconButton } from '../IconButton';
import { convertTime } from '../../utils';

//! Passar estados para zustand
export const Cronometer = () => {

  const [isStarted, setIsStarted] = useState(false);
  const [time, setTime] = useState(0);

  const handleStart = () => setIsStarted(true);
  const handleStop = () => setIsStarted(false);
  const handleResetTimer = () => {
    setTime(0);
    handleStop();
  };


  useEffect(() => {
    let interval: string | number | NodeJS.Timeout | undefined;

    if(isStarted) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    }

    return () => clearTimeout(interval);
  }, [isStarted, time]);


  const {minutes, hours, seconds} = convertTime(time);




  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={[styles.whiteText]}>{hours.toString().padStart(2, '0')}:{minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}</Text>
        <View style={styles.counterActionsContainer}>
          <IconButton icon="stop" disabled={!isStarted && time <= 0} color="white" onPress={handleResetTimer} style={[styles.actionBtn, !isStarted && time <= 0&&  styles.actionBtnDisabled]}/>

          
          {isStarted ? <IconButton icon="pause" onPress={handleStop} color="white" style={styles.actionBtn}/> : <IconButton icon="play" onPress={handleStart}  color="white" style={styles.actionBtn}/>}
      
        </View>
      </View>
    </View>
  );
};