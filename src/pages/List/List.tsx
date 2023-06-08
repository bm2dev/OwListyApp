import { FlashList } from '@shopify/flash-list';
import { useEffect, useState } from 'react';
import { RefreshControl, View } from 'react-native';
import { Appbar, FAB, Text } from 'react-native-paper';
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
import { AddListItemModal } from './AddListItemModal';
import { ListItem } from './ListItem';

export function List() {
	const { listId } = useParams();
	const { user } = useAuth();
	const { colors } = useAppTheme();
	const navigate = useNavigate();

	const [loading, setLoading] = useState(true);
	const [list, setList] = useState<ListType | null>(null);
	const [listsItems, setListItems] = useState<ListItemType[]>([]);
	const [modalOpen, setModalOpen] = useState(false);

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

	const openModal = () => setModalOpen(true);
	const closeModal = () => setModalOpen(false);

	useEffect(() => {
		getListItems(true);
	}, []);

	if (loading) return <LoadingPage />;

	return (
		<Container>
			<AddListItemModal
				open={modalOpen}
				getListItems={getListItems}
				closeModal={closeModal}
				listId={listId}
			/>

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
					ListEmptyComponent={
						<Text variant='titleMedium' style={{ marginTop: 10, textAlign: 'center' }}>
							Parece que esta lista não possui nenhum item.{'\n'}Crie um novo item apertando no
							botão "+"
						</Text>
					}
					refreshControl={<RefreshControl refreshing={loading} onRefresh={getListItems} />}
					renderItem={({ item }) => <ListItem key={item.id} item={item} />}
					estimatedItemSize={99}
					data={listsItems}
				/>
			</View>
			<FAB
				mode='flat'
				icon='plus'
				color={getContrastColor(listColor)}
				style={{
					position: 'absolute',
					margin: 16,
					right: 0,
					bottom: 0,
					zIndex: 2,
					backgroundColor: listColor,
				}}
				onPress={openModal}
			/>
		</Container>
	);
}
