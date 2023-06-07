import { FlashList } from '@shopify/flash-list';
import { useEffect, useState } from 'react';
import { RefreshControl, View } from 'react-native';
import { Appbar } from 'react-native-paper';
import { useNavigate, useParams } from 'react-router-native';
import { ListItemType, ListType } from '../../@types';
import { apiOwListy } from '../../api/apiOwListy';
import { Container } from '../../components/Container';
import { LettersAvatar } from '../../components/LettersAvatar';
import { LoadingPage } from '../../components/LoadingPage';
import { Navbar } from '../../components/Navbar/Navbar';
import { useAuth } from '../../context/Auth';
import { useAppTheme } from '../../context/Theme';
import { errorToast } from '../../utils/errorToast';
import { getContrastColor } from '../../utils/getContrastColor';
import { ListItem } from './ListItem';

export function List() {
	const { listId } = useParams();
	const { user } = useAuth();
	const { colors } = useAppTheme();
	const navigate = useNavigate();

	const [loading, setLoading] = useState(true);
	const [list, setList] = useState<ListType | null>(null);
	const [listsItems, setListItems] = useState<ListItemType[]>([]);

	const listColor = list?.color || colors.primary;

	async function getListItems(firstRender?: boolean) {
		firstRender && setLoading(true);

		try {
			const listData = (await apiOwListy.get<ListType>(`/api/lists/${listId}`)).data;
			setList(listData);

			const listItemsData = (await apiOwListy.get<ListItemType[]>(`/api/lists/items/${listId}`))
				.data;
			setListItems(listItemsData);
		} catch (error) {
			console.log(error);
			errorToast(error);
		} finally {
			setLoading(false);
		}
	}

	useEffect(() => {
		getListItems(true);
	}, []);

	if (loading) return <LoadingPage />;

	return (
		<Container>
			<Navbar style={{ backgroundColor: listColor }}>
				<Appbar.BackAction color={getContrastColor(listColor)} onPress={() => navigate(-1)} />
				<Appbar.Content color={getContrastColor(listColor)} title={list.title} />
				<LettersAvatar
					label={user.name}
					size={35}
					color={listColor}
					style={{ marginHorizontal: 10 }}
				/>
			</Navbar>
			<View style={{ flex: 1 }}>
				<FlashList
					refreshControl={<RefreshControl refreshing={loading} onRefresh={getListItems} />}
					renderItem={({ item }) => <ListItem key={item.id} item={item} />}
					estimatedItemSize={99}
					data={listsItems}
				/>
			</View>
		</Container>
	);
}
