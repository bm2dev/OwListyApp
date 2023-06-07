import { useAppTheme } from '../../context/Theme';
//
import { Avatar, AvatarTextProps } from 'react-native-paper';
import { getContrastColor } from '../../utils/getContrastColor';

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
					backgroundColor: color ? getContrastColor(color) : colors.primary,
				},
				style,
			]}
			{...props}
		/>
	);
}
