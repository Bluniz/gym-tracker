import {ListRenderItemInfo} from 'react-native';
import {Exercise} from '../../types/exercises';

export interface WorkoutItemProps {
  data: ListRenderItemInfo<Exercise>;
  handleDelete?: (id: string) => void;
  handleEdit?: (data: Exercise) => void;

  onSelect?: () => void
  isSelected?: boolean
}
