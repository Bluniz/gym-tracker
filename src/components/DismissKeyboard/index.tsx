import { PropsWithChildren, ReactNode } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  KeyboardAvoidingViewProps,
  Platform,
} from 'react-native';

interface DismissKeyboardProps extends KeyboardAvoidingViewProps {
  children?: ReactNode;
}

export function DismissKeyboard({
  children,
  ...rest
}: PropsWithChildren<DismissKeyboardProps>) {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      {...rest}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        {children}
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
