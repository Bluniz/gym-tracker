import {View, Modal as RnModal, Pressable, Animated} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {useEffect, useRef} from 'react';
import {styles} from './styles';
import {CustomModalProps} from './types';
import reactotron from 'reactotron-react-native';

export const Modal = ({
  visible,
  onRequestClose,
  children,
  isLoading,
}: CustomModalProps) => {
  const fadeInAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeInAnimation, {
      toValue: 0.6,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [fadeInAnimation]);

  if (!visible) {
    return <></>;
  }

  return (
    <Animated.View style={[styles.backdrop, {opacity: fadeInAnimation}]}>
      <RnModal
        animationType="slide"
        transparent
        visible={visible}
        onRequestClose={!isLoading ? onRequestClose : () => {}}>
        <Pressable onPress={onRequestClose} style={{flex: 1}}>
          <View style={styles.container}>
            <View
              style={styles.content}
              onStartShouldSetResponder={() => true}
              onTouchEnd={event => event.stopPropagation()}>
              <View style={styles.header}>
                <Pressable onPress={onRequestClose}>
                  <View style={styles.closeButton}>
                    <Ionicons name="close" size={18} />
                  </View>
                </Pressable>
              </View>
              <View style={styles.body}>{children}</View>
            </View>
          </View>
        </Pressable>
      </RnModal>
    </Animated.View>
  );
};
