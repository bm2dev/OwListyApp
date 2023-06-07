import { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Divider, HelperText, Text, TextInput } from 'react-native-paper';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { useNavigate } from 'react-router-native';
import { apiOwListy } from '../../api/apiOwListy';
import { Button } from '../../components/Button';
import { Container } from '../../components/Container';
import { PasswordInput } from '../../components/PasswordInput';
import { Row } from '../../components/Row';
import { Stack } from '../../components/Stack';
import { useAppTheme } from '../../context/Theme';
import { errorToast } from '../../utils/errorToast';
import { isEmailValid } from '../../utils/isEmailValid';

export function RecuperarSenha() {
	const navigate = useNavigate();
	const { colors } = useAppTheme();

	const [loadingReset, setLoadingReset] = useState(false);
	const [loadingForgot, setLoadingForgot] = useState(false);
	const [formData, setFormData] = useState({
		validationCode: '',
		email: '',
		newPassword: '',
		confirmPassword: '',
	});

	async function forgotPassword() {
		setLoadingForgot(true);
		try {
			let payload = {
				email: formData.email,
			};
			await apiOwListy.post('/api/auth/password/forgot', payload);
			Toast.show({
				type: 'success',
				text1: 'Código enviado!',
			});
		} catch (error) {
			console.log(error);
			errorToast(error);
		} finally {
			setLoadingForgot(false);
		}
	}

	async function resetPassword() {
		setLoadingReset(true);
		try {
			let payload = {
				email: formData.email,
				newPassword: formData.newPassword,
				validationCode: formData.validationCode,
			};
			await apiOwListy.post('/api/auth/password/reset', payload);
			setFormData({
				validationCode: '',
				email: '',
				newPassword: '',
				confirmPassword: '',
			});
			Toast.show({
				type: 'success',
				text1: 'Senha redefinida!',
			});
		} catch (error) {
			console.log(error);
			errorToast(error);
		} finally {
			setLoadingReset(false);
		}
	}

	function validateForm() {
		return (
			!formData.validationCode ||
			!isEmailValid(formData.email) ||
			formData.newPassword.length < 6 ||
			formData.newPassword !== formData.confirmPassword
		);
	}

	return (
		<Container style={{ alignItems: 'center', justifyContent: 'center', padding: 20 }}>
			<Stack spacing={10}>
				<View style={{ alignItems: 'center' }}>
					<Text
						variant='displaySmall'
						style={{ fontWeight: 'bold', color: colors.primary, textAlign: 'center' }}
					>
						Recuperar senha
					</Text>
					<Text variant='bodyLarge' style={{ textAlign: 'center' }}>
						Confirme seu email para recuperar sua senha
					</Text>
				</View>
				<View style={{ marginBottom: -15 }}>
					<TextInput
						placeholder='Email'
						mode='outlined'
						keyboardType='email-address'
						autoComplete='email'
						value={formData.email}
						onChangeText={(v) => setFormData((p) => ({ ...p, email: v }))}
						error={!!formData.email && !isEmailValid(formData.email)}
					/>
					<HelperText type='error' visible={!!formData.email && !isEmailValid(formData.email)}>
						Digite um endereço de email inválido!
					</HelperText>
				</View>
				<Button
					size='small'
					mode='outlined'
					style={{ borderColor: !isEmailValid(formData.email) ? colors.outline : colors.primary }}
					onPress={forgotPassword}
					loading={loadingForgot}
					disabled={!isEmailValid(formData.email)}
				>
					Enviar Código
				</Button>
				<Divider />
				<View>
					<Text variant='labelLarge' style={{ marginBottom: 5 }}>
						Digite o código recebido por email e sua nova senha.
					</Text>
					<TextInput
						keyboardType='numeric'
						placeholder='Código'
						mode='outlined'
						value={formData.validationCode}
						onChangeText={(v) => setFormData((p) => ({ ...p, validationCode: v }))}
					/>
				</View>
				<View style={{ marginBottom: -25 }}>
					<PasswordInput
						placeholder='Senha'
						mode='outlined'
						secureTextEntry
						value={formData.newPassword}
						onChangeText={(v) => setFormData((p) => ({ ...p, newPassword: v }))}
					/>
					<HelperText type='info'>A senha deve conter pelo menos 6 caractéres</HelperText>
				</View>
				<View style={{ marginBottom: -25 }}>
					<PasswordInput
						placeholder='Confirmar Senha'
						mode='outlined'
						secureTextEntry
						value={formData.confirmPassword}
						onChangeText={(v) => setFormData((p) => ({ ...p, confirmPassword: v }))}
						error={!!formData.confirmPassword && formData.newPassword !== formData.confirmPassword}
					/>
					<HelperText
						type='error'
						visible={
							!!formData.confirmPassword && formData.newPassword !== formData.confirmPassword
						}
					>
						As senhas não coincidem
					</HelperText>
				</View>

				<Button
					size='small'
					mode='contained'
					onPress={resetPassword}
					loading={loadingReset}
					disabled={validateForm()}
				>
					Redefinir
				</Button>
				<Row style={{ justifyContent: 'center' }}>
					<TouchableOpacity onPress={() => navigate('/login')}>
						<Text style={{ color: colors.primary, textDecorationLine: 'underline' }}>Voltar</Text>
					</TouchableOpacity>
				</Row>
			</Stack>
		</Container>
	);
}
