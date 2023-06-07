import { Navigate, Route, Routes } from 'react-router-native';
import { Cadastro } from '../../pages/Cadastro';
import { Group } from '../../pages/Group';
import { Groups } from '../../pages/Groups';
import { List } from '../../pages/List/List';
import { Login } from '../../pages/Login';
import { NotFound } from '../../pages/NotFound';
import { RecuperarSenha } from '../../pages/RecuperarSenha';
import { RequireAuth } from '../RequireAuth';

export function AllRoutes() {
	return (
		<Routes>
			<Route path='/' element={<Navigate to='/groups' />} />

			<Route element={<RequireAuth />}>
				<Route path='/groups'>
					<Route index element={<Groups />} />
					<Route path='group/:groupId'>
						<Route index element={<Group />} />
						<Route path='list/:listId' element={<List />} />
					</Route>
				</Route>
			</Route>

			<Route path='/recuperar-senha' element={<RecuperarSenha />} />
			<Route path='/cadastro' element={<Cadastro />} />
			<Route path='/login' element={<Login />} />

			<Route path='*' element={<NotFound />} />
		</Routes>
	);
}
