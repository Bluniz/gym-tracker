import {
  View,
  Modal as RnModal,
  StyleSheet,
  ModalProps,
  Pressable,
} from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import {currentTheme} from '../../styles/theme';

interface CustomModalProps extends ModalProps {}

export const Modal = ({
  visible,
  onRequestClose,
  children,
}: CustomModalProps) => {
  return (
    <RnModal
      animationType="slide"
      transparent
      visible={visible}
      onRequestClose={onRequestClose}>
      <Pressable onPress={onRequestClose} style={{flex: 1}}>
        <View style={styles.container}>
          <View
            style={styles.content}
            onStartShouldSetResponder={() => true}
            onTouchEnd={event => event.stopPropagation()}>
            <View style={styles.header}>
              <FontAwesome.Button
                name="close"
                onPress={onRequestClose}
                backgroundColor="white"
                color="black"
              />
            </View>
            <View style={styles.body}>{children}</View>
          </View>
        </View>
      </Pressable>
    </RnModal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  content: {
    backgroundColor: currentTheme.colors.background,
    width: '80%',
    height: '30%',
    borderRadius: 8,
  },
  header: {
    alignItems: 'flex-end',
  },
  body: {
    flex: 1,
  },
});
