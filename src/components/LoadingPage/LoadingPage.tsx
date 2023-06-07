import { View } from 'react-native';
import { ActivityIndicator, Portal } from 'react-native-paper';
import { useAppTheme } from '../../context/Theme';

export function LoadingPage() {
	const { colors } = useAppTheme();
	return (
		<Portal>
			<View
				style={{
					flex: 1,
					alignItems: 'center',
					justifyContent: 'center',
					backgroundColor: colors.background,
				}}
			>
				<ActivityIndicator size={50} color={colors.primary} />
			</View>
		</Portal>
	);
}
