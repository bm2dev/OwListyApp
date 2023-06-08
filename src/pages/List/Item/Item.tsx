import { useState } from 'react';
import { TextInput, TouchableOpacity, View } from 'react-native';
import { Avatar, Divider, Menu, Text } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import { ListItemType } from '../../../@types';
import { apiOwListy } from '../../../api/apiOwListy';
import { Row } from '../../../components/Row';
import { useAppTheme } from '../../../context/Theme';
import { errorToast } from '../../../utils/errorToast';

interface ItemProps {
	item: ListItemType;
	listItems: ListItemType[];
	setListItems: React.Dispatch<React.SetStateAction<ListItemType[]>>;
	getListItems: () => void;
}

export function Item({ item, listItems, setListItems, getListItems }: ItemProps) {
	const { colors } = useAppTheme();
	const [visible, setVisible] = useState(false);

	const [content, setContent] = useState(item.content);
	const [editMode, setEditMode] = useState(false);

	async function toggleItemCompleted() {
		const originalListItems = listItems;

		try {
			const updatedListItems = listItems.map((listItem) =>
				listItem.id === item.id ? { ...listItem, completed: !listItem.completed } : listItem
			);
			setListItems(updatedListItems);

			let payload = {
				id: item.id,
				content: item.content,
				completed: !item.completed,
			};

			await apiOwListy.put('/api/lists/items/update', payload);
		} catch (error) {
			console.log(error);
			setListItems(originalListItems);
			errorToast(error);
		}
	}

	async function editItem() {
		if (!content || item.content === content) return;

		try {
			let payload = {
				id: item.id,
				content: content,
				completed: item.completed,
			};

			await apiOwListy.put('/api/lists/items/update', payload);
			Toast.show({
				type: 'success',
				text1: 'Item editado!',
			});
			getListItems();
		} catch (error) {
			console.log(error);
			errorToast(error);
			setContent(item.content);
		}
	}

	async function deleteItem() {
		const originalListItems = listItems;

		try {
			const updatedListItems = listItems.filter((listItem) => listItem.id !== item.id);
			setListItems(updatedListItems);

			await apiOwListy.delete('/api/lists/items/delete', { data: { listItemId: item.id } });
		} catch (error) {
			console.log(error);
			setListItems(originalListItems);
			errorToast(error);
		}
	}

	const openMenu = () => setVisible(true);
	const closeMenu = () => setVisible(false);

	return (
		<Menu
			visible={visible}
			onDismiss={closeMenu}
			anchorPosition='bottom'
			anchor={
				<View>
					{!editMode ? (
						<TouchableOpacity onPress={toggleItemCompleted} onLongPress={openMenu}>
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
										{content}
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
					) : (
						<View
							style={{
								padding: 10,
								borderBottomColor: colors.outlineVariant,
								borderBottomWidth: 1,
								borderStyle: 'dashed',
							}}
						>
							<Row
								style={{
									justifyContent: 'space-between',
									alignItems: 'center',
								}}
							>
								<TextInput
									autoFocus
									onChangeText={(v) => setContent(v)}
									value={content}
									style={{
										fontSize: 22,
										color: colors.onBackground,
										backgroundColor: colors.surface,
										flexGrow: 1,
										flexShrink: 1,
										borderRadius: 5,
									}}
									onBlur={() => {
										setEditMode(false);
										editItem();
									}}
									multiline
								/>
								<Avatar.Icon
									icon='check'
									size={40}
									color={colors.onBackground}
									style={{ backgroundColor: 'transparent', opacity: item.completed ? 1 : 0 }}
								/>
							</Row>
						</View>
					)}
				</View>
			}
		>
			<Menu.Item
				leadingIcon='pencil'
				title='Editar'
				onPress={() => {
					closeMenu();
					setEditMode(true);
				}}
			/>
			<Divider />
			<Menu.Item
				leadingIcon='trash-can'
				title='Excluir'
				onPress={() => {
					closeMenu();
					deleteItem();
				}}
			/>
		</Menu>
	);
}
