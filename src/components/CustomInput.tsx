import { IInputFieldProps, Input, InputField, UIInput } from './ui/input';
import { VStack } from './ui/vstack';
import { Text } from './ui/text';
import { forwardRef } from 'react';
import { View } from 'react-native';
import { Box } from './ui/box';

interface CustomInputProps extends IInputFieldProps {
  label: string;
}

export const CustomInput = forwardRef<React.ElementRef<typeof UIInput.Input>, CustomInputProps>(
  ({ label, ...rest }, ref) => {
    return (
      <VStack className="gap-2">
        <Input
          size="xl"
          className="h-14 rounded-xl border-2 border-transparent bg-gray-700 px-4 focus:border-2 focus:border-white"
        >
          <Text className="text-bold text-lg text-white">{label}</Text>
          <InputField {...rest} ref={ref} />
        </Input>
      </VStack>
    );
  },
);
