import {SheetDefinition, registerSheet} from 'react-native-actions-sheet';

import {OptionsSheet, OptionsSheetsProps} from '../components';

registerSheet('options-sheet', OptionsSheet);

declare module 'react-native-actions-sheet' {
  interface Sheets {
    'options-sheet': SheetDefinition<{payload: OptionsSheetsProps}>;
  }
}

export {};
