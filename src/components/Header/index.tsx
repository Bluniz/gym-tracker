import {StyleSheet, Text, View} from 'react-native';
import {IconButton} from '../IconButton';

import {currentTheme} from '../../styles/theme';

export interface HeaderProps {
  title: string;
  subTitle?: string;
  enableGoBack?: boolean;
  onGoBackPress?: () => void;
}

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

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 36,
    position: 'relative',
    marginTop: 16
  },
  iconBtn: {
    position: 'absolute',
    top: 20,
    left: 26,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  headerTitle: {
    color: currentTheme.colors.text,
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    color: currentTheme.colors.primary,
    fontSize: 12,
  },
});
