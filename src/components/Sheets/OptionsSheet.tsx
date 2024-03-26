import {Text, TouchableOpacity, View} from 'react-native';
import ActionSheet, {
  SheetManager,
  SheetProps,
} from 'react-native-actions-sheet';
import {styles} from './styles';

export interface OptionsSheetsItemProps {
  title: string;
  onPress: () => void;
  variant?: 'default' | 'destructive';
}
//! Ajustar propriedade de titulo
//! Ajustar propriedade de variante por botão.
export interface OptionsSheetsProps {
  options: OptionsSheetsItemProps[];
  title?: string;
}

export const OptionsSheet = ({payload}: SheetProps<'options-sheet'>) => {
  return (
    <ActionSheet containerStyle={styles.wrapper}>
      <View style={styles.container}>
        {payload?.options.map((option, index) => {
          return (
            <TouchableOpacity
              key={option.title}
              style={[
                styles.optionContainer,
                payload?.options[index + 1] && styles.borderBottom,
              ]}
              onPress={() => {
                option.onPress();
                SheetManager.hide('options-sheet');
              }}>
              <Text
                style={[
                  styles.optionsTitle,
                  option.variant === 'destructive'
                    ? styles.destructive
                    : styles.default,
                ]}>
                {option.title}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </ActionSheet>
  );
};
