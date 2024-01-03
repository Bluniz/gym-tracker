import {Appearance} from 'react-native';

export const systemColorScheme = Appearance.getColorScheme();
console.log('systemColorScheme', systemColorScheme);

export const isDarkTheme = systemColorScheme === 'dark';
export const isLightTheme = systemColorScheme === 'light';
