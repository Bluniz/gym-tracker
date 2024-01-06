import {Appearance} from 'react-native';

export const systemColorScheme = Appearance.getColorScheme();

export const isDarkTheme = systemColorScheme === 'dark';
export const isLightTheme = systemColorScheme === 'light';
