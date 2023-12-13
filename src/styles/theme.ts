import {systemColorScheme} from '../utils';

const commonColors = {
  black500: '#121214',
  black50: 'rgba(18,18,20,0.2)',
  white: '#FFFF',
  primary: '#B80C09',
  primaryLight: 'rgba(184, 12, 9, 0.70)',
};

export const Theme = {
  dark: {
    colors: {
      background: '#202024',
      backgroundMedium: '#323238',
      backgroundLight: '#7C7C8A',
      text: '#f2f2f2',
      ...commonColors,
    },
  },
  light: {
    colors: {
      background: '#FFFF',
      text: '#202024',
      backgroundMedium: '#f2f2f2',
      backgroundLight: '#7C7C8A',
      ...commonColors,
    },
  },
};

export const currentTheme = Theme[systemColorScheme || 'dark'];
