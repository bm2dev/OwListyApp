import { useAppTheme } from '../../context/Theme';
//
import { Avatar, AvatarTextProps } from 'react-native-paper';
import { getContrastColor } from '../../utils/getContrastColor';

interface LettersAvatarProps extends AvatarTextProps {
	inverseColors?: boolean;
}

export function LettersAvatar({
	label,
	color,
	size = 35,
	style,
	inverseColors,
	...props
}: LettersAvatarProps) {
	const { colors } = useAppTheme();

	const textColor =
		!inverseColors && !!color
			? color
			: inverseColors && !!color
			? getContrastColor(color)
			: colors.onPrimary;

	const backgroundColor =
		!inverseColors && !!color
			? getContrastColor(color)
			: inverseColors && !!color
			? color
			: colors.primary;

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
			color={textColor}
			labelStyle={{ fontSize: size * 0.4 }}
			style={[
				{
					backgroundColor: backgroundColor,
				},
				style,
			]}
			{...props}
		/>
	);
}
