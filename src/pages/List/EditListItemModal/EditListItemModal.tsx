import { useState } from 'react';
import { Text, TextInput } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import { ListItemType } from '../../../@types';
import { apiOwListy } from '../../../api/apiOwListy';
import { Button } from '../../../components/Button';
import { Modal } from '../../../components/Modal';
import { Stack } from '../../../components/Stack';
import { useAppTheme } from '../../../context/Theme';
import { errorToast } from '../../../utils/errorToast';

interface EditListItemModalProps {
	open: boolean;
	closeModal: () => void;
	getListItems: () => void;
	item: ListItemType;
}

export function EditListItemModal({
	open,
	closeModal,
	getListItems,
	item,
}: EditListItemModalProps) {
	const { colors } = useAppTheme();
	const [formData, setFormData] = useState({ content: item.content || '' });
	const [loading, setLoading] = useState(false);

	async function editItem() {
		setLoading(true);
		try {
			let payload = {
				id: item.id,
				content: formData.content,
				completed: item.completed,
			};

			await apiOwListy.put('/api/lists/items/update', payload);
			Toast.show({
				type: 'success',
				text1: 'Item editado!',
			});
			setFormData({ content: '' });
			closeModal();
			getListItems();
		} catch (error) {
			console.log(error);
			errorToast(error);
		} finally {
			setLoading(false);
		}
	}

	return (
		<Modal visible={open} onDismiss={closeModal}>
			<Stack spacing={5} style={{ paddingHorizontal: 20 }}>
				<Text variant='headlineLarge' style={{ color: colors.primary, textAlign: 'center' }}>
					Editar Item
				</Text>

				<TextInput
					placeholder='Conteúdo do item...'
					mode='outlined'
					value={formData.content}
					onChangeText={(v) => setFormData((p) => ({ ...p, content: v }))}
					multiline
				/>

				<Button
					size='small'
					mode='contained'
					onPress={editItem}
					loading={loading}
					disabled={!formData.content}
				>
					Editar
				</Button>
			</Stack>
		</Modal>
	);
}
