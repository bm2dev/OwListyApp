import { ReactNode, createContext, useContext, useState } from 'react';
import { Appearance } from 'react-native';
//
import { StatusBar } from 'expo-status-bar';
import {
	MD3DarkTheme,
	MD3LightTheme,
	MD3Theme,
	Provider as PaperProvider,
	useTheme as usePaperTheme,
} from 'react-native-paper';
import { colors } from './colors';

const baseTheme = { ...MD3LightTheme, colors: colors.light };
export type AppTheme = typeof baseTheme & MD3Theme;
export const useAppTheme = () => usePaperTheme<AppTheme>();

type ThemeContextTypes = {
	darkMode: boolean;
};

export const ThemeContext = createContext<ThemeContextTypes>({} as ThemeContextTypes);
export const useTheme = () => useContext(ThemeContext);

export function ThemeProvider({ children }: { children: ReactNode }) {
	const startInDarkTheme = Appearance.getColorScheme() === 'dark' ? true : false;

	const [darkMode, setDarkMode] = useState(startInDarkTheme);

	Appearance.addChangeListener((scheme) => {
		scheme.colorScheme === 'dark' ? setDarkMode(true) : setDarkMode(false);
	});

	const paperTheme = darkMode
		? { ...MD3DarkTheme, colors: colors.dark }
		: { ...MD3LightTheme, colors: colors.light };

	return (
		<ThemeContext.Provider value={{ darkMode }}>
			<StatusBar style={darkMode ? 'light' : 'dark'} backgroundColor='transparent' />
			<PaperProvider theme={paperTheme}>{children}</PaperProvider>
		</ThemeContext.Provider>
	);
}
