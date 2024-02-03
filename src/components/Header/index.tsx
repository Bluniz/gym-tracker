import {Text, View} from 'react-native';
import {IconButton} from '../IconButton';

import {styles} from './styles';
import {HeaderProps} from './types';

export const Header = ({
  title,
  subTitle,
  enableGoBack,
  onGoBackPress,
}: HeaderProps) => {
  return (
    <View style={styles.container}>
      {enableGoBack && (
        <IconButton
          icon="arrow-back"
          style={styles.iconBtn}
          color="text"
          onPress={onGoBackPress}
          
        />
      )}

      <View style={styles.header}>
        <Text style={styles.headerTitle}>{title}</Text>
        <Text style={styles.headerSubtitle}>{subTitle}</Text>
      </View>
    </View>
  );
};
