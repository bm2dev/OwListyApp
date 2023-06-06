import { Button as ButtonPapaer, ButtonProps } from 'react-native-paper';
import { useAppTheme } from '../../context/Theme';

type ButtonpaperProps = {
	color?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info';
	size?: 'small' | 'large' | 'default';
	rightIcon?: boolean;
} & ButtonProps;

export function Button({
	color = 'primary',
	mode = 'contained',
	rightIcon,
	children,
	disabled,
	loading,
	style,
	size,
	...props
}: ButtonpaperProps) {
	const { colors } = useAppTheme();

	const buttonColors = {
		text: {
			primary: {
				textColor: colors.primary,
				buttonColor: undefined,
			},
			secondary: {
				textColor: colors.secondary,
				buttonColor: undefined,
			},
			success: {
				textColor: colors.success,
				buttonColor: undefined,
			},
			error: {
				textColor: colors.error,
				buttonColor: undefined,
			},
			warning: {
				textColor: colors.warning,
				buttonColor: undefined,
			},
			info: {
				textColor: colors.info,
				buttonColor: undefined,
			},
		},
		contained: {
			primary: {
				textColor: colors.onPrimary,
				buttonColor: colors.primary,
			},
			secondary: {
				textColor: colors.onSecondary,
				buttonColor: colors.secondary,
			},
			success: {
				textColor: colors.onSuccess,
				buttonColor: colors.success,
			},
			error: {
				textColor: colors.onError,
				buttonColor: colors.error,
			},
			warning: {
				textColor: colors.onWarning,
				buttonColor: colors.warning,
			},
			info: {
				textColor: colors.onInfo,
				buttonColor: colors.info,
			},
		},
		outlined: {
			primary: {
				textColor: colors.primary,
				buttonColor: undefined,
			},
			secondary: {
				textColor: colors.secondary,
				buttonColor: undefined,
			},
			success: {
				textColor: colors.success,
				buttonColor: undefined,
			},
			error: {
				textColor: colors.error,
				buttonColor: undefined,
			},
			warning: {
				textColor: colors.warning,
				buttonColor: undefined,
			},
			info: {
				textColor: colors.info,
				buttonColor: undefined,
			},
		},
		elevated: {
			primary: {
				textColor: colors.onPrimary,
				buttonColor: colors.primary,
			},
			secondary: {
				textColor: colors.onSecondary,
				buttonColor: colors.secondary,
			},
			success: {
				textColor: colors.onSuccess,
				buttonColor: colors.success,
			},
			error: {
				textColor: colors.onError,
				buttonColor: colors.error,
			},
			warning: {
				textColor: colors.onWarning,
				buttonColor: colors.warning,
			},
			info: {
				textColor: colors.onInfo,
				buttonColor: colors.info,
			},
		},
		'contained-tonal': {
			primary: {
				textColor: colors.onPrimary,
				buttonColor: colors.primary,
			},
			secondary: {
				textColor: colors.onSecondary,
				buttonColor: colors.secondary,
			},
			success: {
				textColor: colors.onSuccess,
				buttonColor: colors.success,
			},
			error: {
				textColor: colors.onError,
				buttonColor: colors.error,
			},
			warning: {
				textColor: colors.onWarning,
				buttonColor: colors.warning,
			},
			info: {
				textColor: colors.onInfo,
				buttonColor: colors.info,
			},
		},
	};

	return (
		<ButtonPapaer
			mode={mode}
			uppercase
			style={[{ borderColor: buttonColors['outlined'][color].textColor }, style]}
			contentStyle={[
				{
					paddingVertical: !!size && size === 'large' ? 5 : !!size && size === 'small' ? 0 : 3,
					flexDirection: !!rightIcon ? 'row-reverse' : 'row',
				},
			]}
			theme={{ roundness: 1 }}
			textColor={buttonColors[mode][color].textColor}
			buttonColor={buttonColors[mode][color].buttonColor}
			loading={loading}
			disabled={loading || disabled}
			{...props}
		>
			{children}
		</ButtonPapaer>
	);
}
