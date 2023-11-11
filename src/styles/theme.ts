import {systemColorScheme} from '../utils';

export const Theme = {
  dark: {
    colors: {
      background: '#202024',
      primary: '#B80C09',
      primaryLight: 'rgba(184, 12, 9, 0.70)',
      text: '#f2f2f2',
      backgroundMedium: '#323238',
      backgroundLight: '#7C7C8A',
      black500: '#121214',
      white: '#FFFF',
    },
  },
  light: {
    colors: {
      background: '#FFFF',
      primary: '#B80C09',
      primaryLight: 'rgba(184, 12, 9, 0.70)',
      text: '#202024',
      backgroundMedium: '#f2f2f2',
      backgroundLight: '#7C7C8A',
      black500: '#121214',
      white: '#FFFF',
    },
  },
};

export const currentTheme = Theme[systemColorScheme || 'dark'];
