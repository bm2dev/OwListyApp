import { Appbar, AppbarHeaderProps } from 'react-native-paper';
import { useAppTheme } from '../../context/Theme';

export function Navbar({ children, ...props }: AppbarHeaderProps) {
	const { colors } = useAppTheme();
	return (
		<Appbar.Header statusBarHeight={0} style={{ backgroundColor: colors.surface }} {...props}>
			{children}
		</Appbar.Header>
	);
}
