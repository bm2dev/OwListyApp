import moment from 'moment';
import { TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-paper';
import { useNavigate } from 'react-router-native';
import { ListType } from '../../../@types';
import { Row } from '../../../components/Row';
import { useAppTheme } from '../../../context/Theme';

interface ItemProps {
	item: ListType;
}

export function Item({ item }: ItemProps) {
	const { colors } = useAppTheme();
	const navigate = useNavigate();

	return (
		<TouchableOpacity
			style={{
				borderRadius: 5,
				marginVertical: 5,
			}}
			onPress={() => navigate(`list/${item.id}`)}
		>
			<View
				style={{
					padding: 10,
					borderLeftWidth: 5,
					borderLeftColor: item.color || colors.primary,
					borderRadius: 5,
					backgroundColor: colors.surface,
					marginVertical: 5,
				}}
			>
				<Text
					variant='headlineSmall'
					style={{ fontWeight: 'bold', color: item.color || colors.primary }}
					numberOfLines={1}
					ellipsizeMode='tail'
				>
					{item.title}
				</Text>
				<View
					style={{
						marginTop: 10,
						padding: 5,
						borderRadius: 5,
						backgroundColor: colors.background,
					}}
				>
					{!!item.lastItems.length ? (
						item.lastItems.map((i) => (
							<Text
								key={i.id}
								variant='labelLarge'
								style={{
									textDecorationLine: i.completed ? 'line-through' : 'none',
									opacity: i.completed ? 0.5 : 1,
								}}
								numberOfLines={1}
								ellipsizeMode='tail'
							>
								• {i.content}
							</Text>
						))
					) : (
						<Text variant='labelLarge'>Sem itens...</Text>
					)}
				</View>
				<Row style={{ justifyContent: 'space-between', marginTop: 10 }}>
					<Text variant='bodySmall' style={{ color: colors.outlineVariant, fontWeight: 'bold' }}>
						{moment(item.createdAt).format('L')}
					</Text>
					<Text variant='bodySmall' style={{ color: colors.outlineVariant, fontWeight: 'bold' }}>
						{moment(item.updatedAt).calendar()}
					</Text>
				</Row>
			</View>
		</TouchableOpacity>
	);
}
