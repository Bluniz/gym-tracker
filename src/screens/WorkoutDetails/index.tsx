import {Alert, FlatList, Text, View} from 'react-native';
import {useEffect, useRef} from 'react';
import {useShallow} from 'zustand/react/shallow';

import {useNavigation, useRoute} from '@react-navigation/native';

import {WorkoutScreenRouteProp} from '../../types/workout';
import ActionSheet, {
  ActionSheetRef,
  SheetManager,
} from 'react-native-actions-sheet';

import {
  Loading,
  Content,
  ExerciseItem,
  Container,
  Header,
  WorkoutCronometer,
  IconButton,
} from '../../components';
import {useStore} from '../../stores';
import {styles} from './styles';
import {useWorkoutStackNavigation} from '../../hooks';

export const WorkoutDetailsScreen = () => {
  const {params} = useRoute<WorkoutScreenRouteProp>();
  const navigation = useWorkoutStackNavigation();

  const {
    deleteWorkout,
    getWorkout,
    isLoading,
    workout,
    resetCronometer,
    isCronometerStarted,
  } = useStore(
    useShallow(state => ({
      workout: state.workout,
      isLoading: state.isWorkoutDetailsLoading,
      getWorkout: state.getWorkout,
      resetCronometer: state.resetCount,
      isCronometerStarted: state.isCronometerStarted,
      deleteWorkout: state.deleteWorkout,
    }))
  );

  const handleEdit = () => {
    navigation.navigate('addWorkout', workout as never);
  };

  const handleDelete = () => {
    Alert.alert('Tem certeza?', '', [
      {
        text: 'Cancelar',
        style: 'cancel',
      },
      {
        text: 'Deletar',
        onPress: async () => {
          try {
            await deleteWorkout(workout?.id!);
            navigation.navigate('workouts' as never);
          } catch (error) {
            console.log('error', error);
          }
        },
      },
    ]);
  };

  const handleOpenSettings = () => {
    SheetManager.show('options-sheet', {
      payload: {
        options: [
          {
            title: 'Editar',
            onPress: handleEdit,
          },
          {
            title: 'Apagar',
            onPress: handleDelete,
            variant: 'destructive',
          },
        ],
      },
    });
  };

  useEffect(() => {
    (async () => {
      await getWorkout(params!.id);
    })();
  }, [params, getWorkout]);

  useEffect(() => {
    return () => {
      resetCronometer();
    };
  }, [resetCronometer]);

  return (
    <Container>
      <Header
        title={isLoading ? '' : workout?.name || ''}
        subTitle={
          isLoading ? '' : `Complete: ${workout?.complete_qtd || 0} time`
        }
        enableGoBack
        isLoading={isLoading}
        onGoBackPress={navigation.goBack}
        onBackAreDisabled={isCronometerStarted}
        rightComponent={
          <IconButton
            icon="settings"
            style={[
              styles.settingsBtn,
              isCronometerStarted && styles.settingsDisabled,
            ]}
            color="white"
            disabled={isCronometerStarted}
            onPress={handleOpenSettings}
          />
        }
        // rightComponent={<76Ionicons name="settings" size={24} color="white" />}
      />

      <Content>
        {isLoading ? (
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Loading />
          </View>
        ) : (
          <>
            <FlatList
              data={workout?.exercices}
              keyExtractor={(item, index) => `${item.name}__${index}`}
              contentContainerStyle={{gap: 8}}
              renderItem={item => <ExerciseItem data={item} />}
            />
            <WorkoutCronometer workoutId={workout?.id} />
          </>
        )}
      </Content>
    </Container>
  );
};
