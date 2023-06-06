import { useState } from 'react';
import { TextInput, TextInputProps } from 'react-native-paper';

export function PasswordInput({ ...props }: TextInputProps) {
	const [showPassword, setShowPassword] = useState(false);

	return (
		<TextInput
			{...props}
			secureTextEntry={!showPassword}
			right={
				showPassword ? (
					<TextInput.Icon
						icon='eye-off'
						onPress={() => setShowPassword(false)}
						forceTextInputFocus={false}
					/>
				) : (
					<TextInput.Icon
						icon='eye'
						onPress={() => setShowPassword(true)}
						forceTextInputFocus={false}
					/>
				)
			}
		/>
	);
}
