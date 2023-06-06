import { NativeRouter } from 'react-router-native';
import { AuthProvider } from './src/context/Auth';
import { ThemeProvider } from './src/context/Theme';
import { AllRoutes } from './src/routes/AllRoutes';

export default function App() {
	return (
		<NativeRouter>
			<AuthProvider>
				<ThemeProvider>
					<AllRoutes />
				</ThemeProvider>
			</AuthProvider>
		</NativeRouter>
	);
}
