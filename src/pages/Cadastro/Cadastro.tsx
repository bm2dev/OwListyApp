import { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { HelperText, Text, TextInput } from 'react-native-paper';
import { useNavigate } from 'react-router-native';
import { Button } from '../../components/Button';
import { Container } from '../../components/Container';
import { PasswordInput } from '../../components/PasswordInput';
import { Row } from '../../components/Row';
import { Stack } from '../../components/Stack';
import { useAuth } from '../../context/Auth';
import { useAppTheme } from '../../context/Theme';
import { isEmailValid } from '../../utils/isEmailValid';

export function Cadastro() {
	const navigate = useNavigate();
	const { register, loadingAuth } = useAuth();
	const { colors } = useAppTheme();

	const [formData, setFormData] = useState({
		title: '',
		email: '',
		password: '',
		confirmPassword: '',
	});

	const handleRegister = () => register(formData);

	function validateForm() {
		return (
			!formData.name ||
			!isEmailValid(formData.email) ||
			formData.password.length < 6 ||
			formData.password !== formData.confirmPassword
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
						Cadastro
					</Text>
					<Text variant='bodyLarge' style={{ textAlign: 'center' }}>
						Insira as informações abaixo para se cadastrar
					</Text>
				</View>
				<TextInput
					placeholder='Nome'
					mode='outlined'
					value={formData.name}
					onChangeText={(v) => setFormData((p) => ({ ...p, name: v }))}
				/>
				<View style={{ marginBottom: -25 }}>
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
				<View style={{ marginBottom: -25 }}>
					<PasswordInput
						placeholder='Senha'
						mode='outlined'
						secureTextEntry
						value={formData.password}
						onChangeText={(v) => setFormData((p) => ({ ...p, password: v }))}
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
						error={!!formData.confirmPassword && formData.password !== formData.confirmPassword}
					/>
					<HelperText
						type='error'
						visible={!!formData.confirmPassword && formData.password !== formData.confirmPassword}
					>
						As senhas não coincidem
					</HelperText>
				</View>

				<Button
					size='small'
					mode='contained'
					onPress={handleRegister}
					loading={loadingAuth}
					disabled={validateForm()}
				>
					Cadastrar
				</Button>
				<Row style={{ justifyContent: 'center' }}>
					<Text>Já possui conta? </Text>
					<TouchableOpacity onPress={() => navigate('/login')}>
						<Text style={{ color: colors.primary, textDecorationLine: 'underline' }}>Entre</Text>
					</TouchableOpacity>
				</Row>
			</Stack>
		</Container>
	);
}
