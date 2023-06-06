import { Navigate, Route, Routes } from 'react-router-native';
import { Cadastro } from '../../pages/Cadastro';
import { Groups } from '../../pages/Groups';
import { Login } from '../../pages/Login';
import { NotFound } from '../../pages/NotFound';
import { RecuperarSenha } from '../../pages/RecuperarSenha';
import { RequireAuth } from '../RequireAuth';

export function AllRoutes() {
	return (
		<Routes>
			<Route path='/' element={<Navigate to='/groups' />} />

			<Route element={<RequireAuth />}>
				<Route path='/groups' element={<Groups />} />
			</Route>

			<Route path='/recuperar-senha' element={<RecuperarSenha />} />
			<Route path='/cadastro' element={<Cadastro />} />
			<Route path='/login' element={<Login />} />

			<Route path='*' element={<NotFound />} />
		</Routes>
	);
}
