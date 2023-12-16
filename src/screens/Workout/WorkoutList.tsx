import {WorkoutListProps} from './types';
import {FlatList} from 'react-native-gesture-handler';
import {WorkoutItem} from './WorkoutItem';
import {memo} from 'react';
import {RefreshControl} from 'react-native';
import {useStore} from '../../stores';
import {useShallow} from 'zustand/react/shallow';
import {currentTheme} from '../../styles/theme';

const WorkoutListComponent = ({workouts}: WorkoutListProps) => {
  const {getWorkouts, isRefreshing} = useStore(
    useShallow(state => ({
      isRefreshing: state.isWorkoutsRefreshing,
      getWorkouts: state.getWorkouts,
    }))
  );

  return (
    <FlatList
      data={workouts}
      keyExtractor={(item, index) => `${item.name}__${index}`}
      renderItem={data => <WorkoutItem workout={data.item} />}
      refreshControl={
        <RefreshControl
          refreshing={isRefreshing}
          onRefresh={async () => {
            await getWorkouts('refresh');
          }}
          title={isRefreshing ? 'Refreshing' : 'Pull to Refresh'}
          tintColor={currentTheme.colors.primary}
          titleColor={currentTheme.colors.primary}
        />
      }
    />
  );
};

export const WorkoutList = memo(WorkoutListComponent);
