import { useEffect, useState } from 'react';
import { FlatList, RefreshControl, View } from 'react-native';
import { Appbar, FAB, IconButton, Text } from 'react-native-paper';
import { useNavigate, useParams } from 'react-router-native';
import { GroupType, ListType } from '../../@types';
import { apiOwListy } from '../../api/apiOwListy';
import { Container } from '../../components/Container';
import { LettersAvatar } from '../../components/LettersAvatar';
import { LoadingPage } from '../../components/LoadingPage';
import { Navbar } from '../../components/Navbar/Navbar';
import { useAuth } from '../../context/Auth';
import { useAppTheme } from '../../context/Theme';
import { errorToast } from '../../utils/errorToast';
import { getContrastColor } from '../../utils/getContrastColor';
import { AddListModal } from './AddListModal';
import { EditGroupModal } from './EditGroupModal';
import { Item } from './Item';

export function Group() {
	const { groupId } = useParams();
	const { user } = useAuth();
	const { colors } = useAppTheme();
	const navigate = useNavigate();

	const [loading, setLoading] = useState(true);
	const [group, setGroup] = useState<GroupType | null>(null);
	const [lists, setLists] = useState<ListType[]>([]);
	const [modalAddOpen, setModalAddOpen] = useState(false);
	const [modalEditOpen, setModalEditOpen] = useState(false);

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
		getLists(true);
	}, []);

	if (loading) return <LoadingPage />;

	return (
		<Container>
			<AddListModal
				open={modalAddOpen}
				getLists={getLists}
				closeModal={closeAddModal}
				groupId={groupId}
			/>

			<EditGroupModal
				open={modalEditOpen}
				getLists={getLists}
				closeModal={closeEditModal}
				group={group}
			/>

			<Navbar style={{ backgroundColor: groupColor }}>
				<Appbar.BackAction color={getContrastColor(groupColor)} onPress={() => navigate(-1)} />
				<Appbar.Content color={getContrastColor(groupColor)} title={group.name} />
				<IconButton
					icon='pencil'
					iconColor={getContrastColor(groupColor)}
					onPress={openEditModal}
				/>
				<LettersAvatar
					label={user.name}
					size={35}
					color={groupColor}
					style={{ marginHorizontal: 10 }}
				/>
			</Navbar>
			<View style={{ padding: 10, flex: 1 }}>
				<FlatList
					ListEmptyComponent={
						<Text variant='titleMedium' style={{ marginTop: 10, textAlign: 'center' }}>
							Parece que este grupo não possui nenhuma lista.{'\n'}Crie uma nova lista apertando no
							botão "+"
						</Text>
					}
					refreshControl={<RefreshControl refreshing={loading} onRefresh={getLists} />}
					renderItem={({ item }) => <Item key={item.id} item={item} />}
					data={lists}
				/>
			</View>
			<FAB
				mode='flat'
				icon='plus'
				color={getContrastColor(groupColor)}
				style={{
					position: 'absolute',
					margin: 16,
					right: 0,
					bottom: 0,
					zIndex: 2,
					backgroundColor: groupColor,
				}}
				onPress={openAddModal}
			/>
		</Container>
	);
}
