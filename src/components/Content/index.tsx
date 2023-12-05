import {SafeAreaView} from 'react-native';
import { ContentProps } from './types';
import { styles } from './styles';


export const Content = ({children, ...rest}: ContentProps) => {

  return (
    <SafeAreaView {...rest} style={styles.content}>
      {children}
    </SafeAreaView>
  );
};