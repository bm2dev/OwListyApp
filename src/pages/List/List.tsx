import { FlashList } from '@shopify/flash-list';
import { useEffect, useState } from 'react';
import { RefreshControl, View } from 'react-native';
import { Appbar, FAB, IconButton, Text } from 'react-native-paper';
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
import { EditListModal } from './EditListModal';
import { Item } from './Item';

export function List() {
	const { listId } = useParams();
	const { user } = useAuth();
	const { colors } = useAppTheme();
	const navigate = useNavigate();

	const [loading, setLoading] = useState(true);
	const [list, setList] = useState<ListType | null>(null);
	const [listItems, setListItems] = useState<ListItemType[]>([]);
	const [modalAddOpen, setModalAddOpen] = useState(false);
	const [modalEditOpen, setModalEditOpen] = useState(false);

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

	const openAddModal = () => setModalAddOpen(true);
	const closeAddModal = () => setModalAddOpen(false);
	const openEditModal = () => setModalEditOpen(true);
	const closeEditModal = () => setModalEditOpen(false);

	useEffect(() => {
		getListItems(true);
	}, []);

	if (loading) return <LoadingPage />;

	return (
		<Container>
			<AddListItemModal
				open={modalAddOpen}
				getListItems={getListItems}
				closeModal={closeAddModal}
				listId={listId}
			/>

			<EditListModal
				open={modalEditOpen}
				getListItems={getListItems}
				closeModal={closeEditModal}
				list={list}
			/>

			<Navbar style={{ backgroundColor: listColor }}>
				<Appbar.BackAction color={getContrastColor(listColor)} onPress={() => navigate(-1)} />
				<Appbar.Content color={getContrastColor(listColor)} title={list.title} />
				<IconButton icon='pencil' iconColor={getContrastColor(listColor)} onPress={openEditModal} />
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
					renderItem={({ item }) => (
						<Item
							key={item.id}
							item={item}
							listItems={listItems}
							setListItems={setListItems}
							getListItems={getListItems}
						/>
					)}
					estimatedItemSize={99}
					data={listItems}
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
				onPress={openAddModal}
			/>
		</Container>
	);
}
