import { FlashList } from '@shopify/flash-list';
import { useEffect, useState } from 'react';
import { RefreshControl, View } from 'react-native';
import { Appbar } from 'react-native-paper';
import { useNavigate, useParams } from 'react-router-native';
import { GroupType, ListType } from '../../@types';
import { apiOwListy } from '../../api/apiOwListy';
import { Container } from '../../components/Container';
import { LettersAvatar } from '../../components/LettersAvatar';
import { LoadingPage } from '../../components/LoadingPage';
import { Navbar } from '../../components/Navbar/Navbar';
import { useAuth } from '../../context/Auth';
import { useAppTheme } from '../../context/Theme';
import { getContrastColor } from '../../utils/getContrastColor';
import { ListItem } from './ListItem';

export function Group() {
	const { groupId } = useParams();
	const { user } = useAuth();
	const { colors } = useAppTheme();
	const navigate = useNavigate();

	const [loading, setLoading] = useState(true);
	const [group, setGroup] = useState<GroupType | null>(null);
	const [lists, setLists] = useState<ListType[]>([]);

	const groupColor = group?.color || colors.primary;

	async function getLists(firstRender?: boolean) {
		firstRender && setLoading(true);

		try {
			const groupData = (await apiOwListy.get<GroupType>(`/api/groups/${groupId}`)).data;
			setGroup(groupData);

			const listsData = (await apiOwListy.get<ListType[]>(`/api/lists/${groupId}/lists`)).data;
			setLists(listsData);
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	}

	useEffect(() => {
		getLists(true);
	}, []);

	if (loading) return <LoadingPage />;

	return (
		<Container>
			<Navbar style={{ backgroundColor: groupColor }}>
				<Appbar.BackAction color={getContrastColor(groupColor)} onPress={() => navigate(-1)} />
				<Appbar.Content color={getContrastColor(groupColor)} title={group.name} />
				<LettersAvatar
					label={user.name}
					size={35}
					color={groupColor}
					style={{ marginHorizontal: 10 }}
				/>
			</Navbar>
			<View style={{ padding: 10, flex: 1 }}>
				<FlashList
					refreshControl={<RefreshControl refreshing={loading} onRefresh={getLists} />}
					renderItem={({ item }) => <ListItem key={item.id} item={item} />}
					estimatedItemSize={99}
					data={lists}
				/>
			</View>
		</Container>
	);
}
