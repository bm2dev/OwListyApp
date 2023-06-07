import { FlashList } from '@shopify/flash-list';
import { useEffect, useState } from 'react';
import { RefreshControl, View } from 'react-native';
import { Appbar } from 'react-native-paper';
import { GroupType } from '../../@types';
import { apiOwListy } from '../../api/apiOwListy';
import { Button } from '../../components/Button';
import { Container } from '../../components/Container';
import { LettersAvatar } from '../../components/LettersAvatar';
import { LoadingPage } from '../../components/LoadingPage';
import { Navbar } from '../../components/Navbar/Navbar';
import { useAuth } from '../../context/Auth';
import { useAppTheme } from '../../context/Theme';
import { errorToast } from '../../utils/errorToast';
import { ListItem } from './ListItem';

export function Groups() {
	const { user, signOut } = useAuth();
	const { colors } = useAppTheme();

	const [loading, setLoading] = useState(true);
	const [groups, setGroups] = useState<GroupType[]>([]);

	async function getGroups(firstRender?: boolean) {
		firstRender && setLoading(true);

		try {
			const data = (await apiOwListy.get<GroupType[]>('/api/groups')).data;
			setGroups(data);
		} catch (error) {
			console.log(error);
			errorToast(error);
		} finally {
			setLoading(false);
		}
	}

	useEffect(() => {
		getGroups(true);
	}, []);

	if (loading) return <LoadingPage />;

	return (
		<Container>
			<Navbar>
				<Appbar.Content color={colors.primary} title='Grupos' />
				<LettersAvatar label={user.name} size={35} style={{ marginHorizontal: 10 }} />
			</Navbar>
			<View style={{ padding: 10, flex: 1 }}>
				<FlashList
					refreshControl={<RefreshControl refreshing={loading} onRefresh={getGroups} />}
					renderItem={({ item }) => <ListItem key={item.id} item={item} />}
					estimatedItemSize={103}
					data={groups}
				/>

				<View style={{ flexDirection: 'row', justifyContent: 'center' }}>
					<Button color='error' mode='contained' onPress={signOut}>
						Sair
					</Button>
				</View>
			</View>
		</Container>
	);
}
