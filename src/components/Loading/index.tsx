import {ActivityIndicator, View} from 'react-native';
import {currentTheme} from '../../styles/theme';
import {LoadingProps} from './types';
import {styles} from './styles';

export const Loading = ({size = 'large', ...rest}: LoadingProps) => {
  return (
    <ActivityIndicator
      {...rest}
      size={size}
      color={currentTheme.colors.primary}
    />
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
