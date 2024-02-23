import {ActivityIndicator, View} from 'react-native';
import {currentTheme} from '../../styles/theme';
import {LoadingProps} from './types';
import {styles} from './styles';

export const Loading = ({
  size = 'large',
  containerFull,
  ...rest
}: LoadingProps) => {
  return (
    <View style={containerFull && styles.containerFull}>
      <ActivityIndicator
        {...rest}
        size={size}
        color={currentTheme.colors.primary}
      />
    </View>
  );
};

export const FullLoading = ({size = 'large', ...rest}: LoadingProps) => {
  return (
    <View style={styles.absoluteContainer}>
      <ActivityIndicator
        {...rest}
        size={size}
        color={currentTheme.colors.primary}
      />
    </View>
  );
};
