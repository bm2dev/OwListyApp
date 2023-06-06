import { useAppTheme } from '../../context/Theme';
//
import { Avatar, AvatarTextProps } from 'react-native-paper';

export function LettersAvatar({ label, color, size = 35, style, ...props }: AvatarTextProps) {
	const { colors } = useAppTheme();

	return (
		<Avatar.Text
			size={size}
			label={
				!!label
					? `${label.split(' ')[0][0].toUpperCase()}${label
							.split(' ')
							[label.split(' ').length - 1][0].toUpperCase()}`
					: '?'
			}
			color={color || colors.onPrimary}
			labelStyle={{ fontSize: size * 0.4 }}
			style={[
				{
					backgroundColor: colors.primary,
				},
				style,
			]}
			{...props}
		/>
	);
}
