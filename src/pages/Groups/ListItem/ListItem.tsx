import moment from 'moment';
import { TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-paper';
import { useNavigate } from 'react-router-native';
import { GroupType } from '../../../@types';
import { LettersAvatar } from '../../../components/LettersAvatar';
import { Row } from '../../../components/Row';
import { useAppTheme } from '../../../context/Theme';

interface ListItemProps {
	item: GroupType;
}

export function ListItem({ item }: ListItemProps) {
	const { colors } = useAppTheme();
	const navigate = useNavigate();

	const avatarColors = [
		{ color: colors.primaryContainer, onColor: colors.onPrimary },
		{ color: colors.primary, onColor: colors.onPrimary },
		{ color: colors.onPrimaryContainer, onColor: colors.onPrimary },
	];

	return (
		<TouchableOpacity
			style={{
				borderRadius: 5,
				marginVertical: 5,
			}}
			onPress={() => navigate(`group/${item.id}`)}
		>
			<View
				style={{
					padding: 10,
					paddingTop: 5,
					borderLeftWidth: 5,
					borderLeftColor: item.color || colors.primary,
					borderRadius: 5,
					backgroundColor: colors.surface,
				}}
			>
				<Row style={{ justifyContent: 'space-between' }}>
					<Text variant='bodySmall' style={{ color: colors.outlineVariant, fontWeight: 'bold' }}>
						{moment(item.createdAt).format('L')}
					</Text>
					<Text variant='bodySmall' style={{ color: colors.outlineVariant, fontWeight: 'bold' }}>
						{moment(item.updatedAt).calendar()}
					</Text>
				</Row>
				<Text
					variant='headlineSmall'
					style={{ fontWeight: 'bold', color: item.color || colors.primary }}
					numberOfLines={1}
					ellipsizeMode='tail'
				>
					{item.name}
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
