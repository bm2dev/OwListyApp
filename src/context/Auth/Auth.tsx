import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SplashScreen from 'expo-splash-screen';
import jwtDecode from 'jwt-decode';
import moment from 'moment';
import { createContext, useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-native';
import { JwtContentType } from '../../@types';
import { apiOwListy } from '../../api/apiOwListy';

type AuthContextTypes = {
	user: JwtContentType | null;
	loadingAuth: boolean;
	login: (email: string, password: string) => void;
	register: (formData: any) => void;
	signOut: () => void;
};

export const AuthContext = createContext<AuthContextTypes>({} as AuthContextTypes);
export const useAuth = () => useContext(AuthContext);

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export function AuthProvider({ children }) {
	const navigate = useNavigate();
	const location = useLocation();
	const from: string | undefined = location.state?.from?.pathname;

	const [user, setUser] = useState<JwtContentType | null>(null);
	const [loadingSystem, setLoadingSystem] = useState(true);
	const [loadingAuth, setLoadingAuth] = useState(false);

	async function login(email: string, password: string) {
		setLoadingAuth(true);
		try {
			const payload = { email: email, password: password };
			const data = (await apiOwListy.post('api/auth/login', payload)).data;
			setUser(jwtDecode(data.token));
			await AsyncStorage.setItem('jwt', data.token);
			apiOwListy.defaults.headers.common.Authorization = `Bearer ${data.token}`;
			navigate(from || '/', { replace: true });
		} catch (error) {
			console.log('error', error);
			console.log('error', error.response.data.message);
		} finally {
			setLoadingAuth(false);
		}
	}

	async function register(formData: any) {
		setLoadingAuth(true);
		try {
			const payload = {
				name: formData.name,
				email: formData.email,
				password: formData.password,
			};
			await apiOwListy.post('api/auth/register', payload);
			login(formData.email, formData.password);
		} catch (error) {
			console.log('error', error);
			console.log('error', error.response.data.message);
		} finally {
			setLoadingAuth(false);
		}
	}

	async function signOut() {
		navigate('/login');
		await AsyncStorage.removeItem('jwt');
		apiOwListy.defaults.headers.common.Authorization = undefined;
		setUser(null);
	}

	async function checkLogin() {
		setLoadingSystem(true);
		const jwt = await AsyncStorage.getItem('jwt');
		if (!jwt) return setLoadingSystem(false);

		const jwtContent = jwtDecode<JwtContentType>(jwt);
		const jwtExpDate = new Date(jwtContent.exp * 1000);
		if (moment(jwtExpDate).isBefore(new Date())) return signOut();

		apiOwListy.defaults.headers.common.Authorization = `Bearer ${jwt}`;

		setUser(jwtContent);
		setLoadingSystem(false);
	}

	useEffect(() => {
		checkLogin();
	}, []);

	useEffect(() => {
		if (loadingSystem) return;
		const hideSplash = () => setTimeout(async () => await SplashScreen.hideAsync(), 500);
		hideSplash();
	}, [loadingSystem]);

	if (loadingSystem) return null;

	return (
		<AuthContext.Provider
			value={{
				login,
				register,
				signOut,
				loadingAuth,
				user,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}
