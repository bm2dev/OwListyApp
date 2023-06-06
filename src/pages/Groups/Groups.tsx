import { FlashList } from '@shopify/flash-list';
import { useEffect, useState } from 'react';
import { RefreshControl, TouchableOpacity, View } from 'react-native';
import { Appbar, Text } from 'react-native-paper';
import { useNavigate } from 'react-router-native';
import { GroupType } from '../../@types';
import { apiOwListy } from '../../api/apiOwListy';
import { Button } from '../../components/Button';
import { Container } from '../../components/Container';
import { LettersAvatar } from '../../components/LettersAvatar';
import { Navbar } from '../../components/Navbar/Navbar';
import { Row } from '../../components/Row';
import { useAuth } from '../../context/Auth';
import { useAppTheme } from '../../context/Theme';

export function Groups() {
	const { user, signOut } = useAuth();
	const { colors } = useAppTheme();

	const [loading, setLoading] = useState(true);
	const [groups, setGroups] = useState<GroupType[]>([]);

	async function getGroups() {
		setLoading(true);

		try {
			const data = (await apiOwListy.get<GroupType[]>('/api/groups')).data;
			setGroups(data);
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	}

	useEffect(() => {
		getGroups();
	}, []);

	return (
		<Container>
			<Navbar>
				<Appbar.Content color={colors.primary} title='Grupos' />
				<LettersAvatar label={user.name} size={35} style={{ marginHorizontal: 10 }} />
			</Navbar>
			<View style={{ padding: 10, flex: 1 }}>
				<FlashList
					refreshControl={<RefreshControl refreshing={loading} onRefresh={getGroups} />}
					renderItem={({ item, index }) => <ListItem item={item} />}
					estimatedItemSize={96}
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

function ListItem({ item }: { item: GroupType }) {
	const { colors } = useAppTheme();
	const navigate = useNavigate();

	const avatarColors = [
		{ color: colors.primaryContainer, onColor: colors.onPrimary },
		{ color: colors.primary, onColor: colors.onPrimary },
		{ color: colors.onPrimaryContainer, onColor: colors.onPrimary },
	];

	return (
		<TouchableOpacity
			key={item.id}
			style={{
				borderRadius: 5,
				marginVertical: 5,
			}}
			onPress={() => navigate(`group/${item.id}`)}
		>
			<View
				style={{
					padding: 10,
					borderLeftWidth: 5,
					borderLeftColor: item.color || colors.primary,
					borderRadius: 5,
					backgroundColor: colors.surface,
				}}
			>
				<Text
					variant='headlineMedium'
					style={{ fontWeight: 'bold', color: item.color || colors.primary }}
				>
					{item.name.slice(0, 18)}
					{item.name.length > 18 && '...'}
				</Text>
				<Row style={{ marginTop: 10, alignItems: 'center' }}>
					{item.members.slice(0, 3).map((i, index) => (
						<LettersAvatar
							key={i.id}
							label={i.name}
							color={avatarColors[index].onColor}
							style={{
								marginLeft: index > 0 ? -10 : 0,
								backgroundColor: avatarColors[index].color,
							}}
							size={30}
						/>
					))}
					{item.members.length > 3 && (
						<Text variant='titleMedium' style={{ marginLeft: 5 }}>
							+ {item.members.length - 3}
						</Text>
					)}
				</Row>
			</View>
		</TouchableOpacity>
	);
}
