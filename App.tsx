import moment from 'moment';
import 'moment/locale/pt-br';
import { useEffect } from 'react';
import Toast from 'react-native-toast-message';
import { NativeRouter } from 'react-router-native';
import { AuthProvider } from './src/context/Auth';
import { ThemeProvider } from './src/context/Theme';
import { AllRoutes } from './src/routes/AllRoutes';

export default function App() {
	useEffect(() => {
		moment.locale('pt-br');
	}, []);

	return (
		<NativeRouter>
			<AuthProvider>
				<ThemeProvider>
					<AllRoutes />
					<Toast />
				</ThemeProvider>
			</AuthProvider>
		</NativeRouter>
	);
}
