import { KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView, SafeAreaViewProps } from 'react-native-safe-area-context';
import { useAppTheme } from '../../context/Theme';

export function Container({ style, children, ...props }: SafeAreaViewProps) {
	const { colors } = useAppTheme();
	const containerStyle = { flex: 1, backgroundColor: colors.background };
	return (
		<SafeAreaView style={containerStyle} {...props}>
			<KeyboardAvoidingView
				behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
				style={[containerStyle, style]}
			>
				{children}
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
}
