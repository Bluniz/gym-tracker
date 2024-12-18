import clsx from 'clsx';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  ViewProps,
} from 'react-native';

interface KeyboardViewProps extends Pick<ViewProps, 'className' | 'children'> {}

export function KeyboardView({ className, children }: KeyboardViewProps) {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className={clsx('flex-1', className)}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <>{children}</>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
