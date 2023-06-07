import { TouchableOpacity, View } from 'react-native';
import { Avatar, Text } from 'react-native-paper';
import { ListItemType } from '../../../@types';
import { Row } from '../../../components/Row';
import { useAppTheme } from '../../../context/Theme';

interface ListItemProps {
	item: ListItemType;
}

export function ListItem({ item }: ListItemProps) {
	const { colors } = useAppTheme();

	return (
		<TouchableOpacity style={{ borderRadius: 5 }} onPress={() => {}}>
			<View
				style={{
					padding: 10,
					borderBottomColor: colors.outlineVariant,
					borderBottomWidth: 1,
				}}
			>
				<Row
					style={{
						justifyContent: 'space-between',
						alignItems: 'center',
						opacity: item.completed ? 0.5 : 1,
					}}
				>
					<Text
						variant='titleLarge'
						style={{
							flexShrink: 1,
							textDecorationLine: item.completed ? 'line-through' : 'none',
						}}
					>
						{item.content}
					</Text>
					<Avatar.Icon
						icon='check'
						size={40}
						color={colors.onBackground}
						style={{ backgroundColor: 'transparent', opacity: item.completed ? 1 : 0 }}
					/>
				</Row>
			</View>
		</TouchableOpacity>
	);
}
