import { View, ViewProps } from 'react-native';

export function Row({ style, children, ...props }: ViewProps) {
	const rowStyle: ViewProps['style'] = { flexDirection: 'row' };
	return <View style={[rowStyle, style]}>{children}</View>;
}
