import { useState } from 'react';
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Text, TextInput } from 'react-native-paper';
import { useNavigate } from 'react-router-native';
import { Button } from '../../components/Button';
import { Container } from '../../components/Container';
import { PasswordInput } from '../../components/PasswordInput';
import { Row } from '../../components/Row';
import { Stack } from '../../components/Stack';
import { useAuth } from '../../context/Auth';
import { useAppTheme } from '../../context/Theme';
import { isEmailValid } from '../../utils/isEmailValid';

export function Login() {
	const navigate = useNavigate();
	const { login, loadingAuth } = useAuth();
	const { colors } = useAppTheme();

	const [formData, setFormData] = useState({ email: '', password: '' });

	const handleLogin = () => login(formData.email, formData.password);

	return (
		<Container style={{ alignItems: 'center', justifyContent: 'center', padding: 20 }}>
			<Stack spacing={10}>
				<View style={{ alignItems: 'center' }}>
					<Text
						variant='displaySmall'
						style={{ fontWeight: 'bold', color: colors.primary, textAlign: 'center' }}
					>
						Bem vindo!
					</Text>
					<Text variant='bodyLarge' style={{ textAlign: 'center' }}>
						Entre em sua conta para continuar
					</Text>
				</View>
				<TextInput
					placeholder='Email'
					mode='outlined'
					keyboardType='email-address'
					autoComplete='email'
					value={formData.email}
					onChangeText={(v) => setFormData((p) => ({ ...p, email: v }))}
				/>
				<View>
					<PasswordInput
						placeholder='Senha'
						mode='outlined'
						secureTextEntry
						value={formData.password}
						onChangeText={(v) => setFormData((p) => ({ ...p, password: v }))}
						style={{ marginBottom: 5 }}
					/>
					<Row>
						<TouchableOpacity onPress={() => navigate('/recuperar-senha')}>
							<Text
								style={{
									color: colors.primary,
									textDecorationLine: 'underline',
								}}
							>
								Esqueceu a senha?
							</Text>
						</TouchableOpacity>
					</Row>
				</View>
				<Button
					size='small'
					mode='contained'
					onPress={handleLogin}
					loading={loadingAuth}
					disabled={!isEmailValid(formData.email) || formData.password.length < 6}
				>
					Entrar
				</Button>
				<Row style={{ justifyContent: 'center' }}>
					<Text>Não possui conta? </Text>
					<TouchableOpacity onPress={() => navigate('/cadastro')}>
						<Text style={{ color: colors.primary, textDecorationLine: 'underline' }}>
							Cadastre-se
						</Text>
					</TouchableOpacity>
				</Row>
			</Stack>
		</Container>
	);
}
