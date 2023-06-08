import { FlashList } from '@shopify/flash-list';
import { useEffect, useState } from 'react';
import { RefreshControl, View } from 'react-native';
import { Appbar, FAB, Text } from 'react-native-paper';
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
import { AddGroupModal } from './AddGroupModal';
import { Item } from './Item';

export function Groups() {
	const { user, signOut } = useAuth();
	const { colors } = useAppTheme();

	const [loading, setLoading] = useState(true);
	const [groups, setGroups] = useState<GroupType[]>([]);
	const [modalOpen, setModalOpen] = useState(false);

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

	const openModal = () => setModalOpen(true);
	const closeModal = () => setModalOpen(false);

	useEffect(() => {
		getGroups(true);
	}, []);

	if (loading) return <LoadingPage />;

	return (
		<Container>
			<AddGroupModal open={modalOpen} getGroups={getGroups} closeModal={closeModal} />

			<Navbar>
				<Appbar.Content color={colors.primary} title='Grupos' />
				<LettersAvatar label={user.name} size={35} style={{ marginHorizontal: 10 }} />
			</Navbar>
			<View style={{ padding: 10, flex: 1 }}>
				<FlashList
					ListEmptyComponent={
						<Text variant='titleMedium' style={{ marginTop: 10, textAlign: 'center' }}>
							Parece que você não está em nenhum grupo.{'\n'}Crie um novo grupo apertando no botão
							"+"
						</Text>
					}
					refreshControl={<RefreshControl refreshing={loading} onRefresh={getGroups} />}
					renderItem={({ item }) => <Item key={item.id} item={item} />}
					estimatedItemSize={103}
					data={groups}
				/>
				<View style={{ flexDirection: 'row', justifyContent: 'center' }}>
					<Button color='error' mode='contained' onPress={signOut}>
						Sair
					</Button>
				</View>
			</View>
			<FAB
				mode='flat'
				icon='plus'
				color={colors.onPrimary}
				style={{
					position: 'absolute',
					margin: 16,
					right: 0,
					bottom: 0,
					zIndex: 2,
					backgroundColor: colors.primary,
				}}
				onPress={openModal}
			/>
		</Container>
	);
}
