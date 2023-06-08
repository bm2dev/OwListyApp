import { useState } from 'react';
import { Text, TextInput } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import { apiOwListy } from '../../../api/apiOwListy';
import { Button } from '../../../components/Button';
import { Modal } from '../../../components/Modal';
import { Stack } from '../../../components/Stack';
import { useAppTheme } from '../../../context/Theme';
import { errorToast } from '../../../utils/errorToast';

interface AddListItemModalProps {
	open: boolean;
	closeModal: () => void;
	getListItems: () => void;
	listId: string;
}

export function AddListItemModal({
	open,
	closeModal,
	getListItems,
	listId,
}: AddListItemModalProps) {
	const { colors } = useAppTheme();
	const [formData, setFormData] = useState({ content: '' });
	const [loading, setLoading] = useState(false);

	async function createListItem() {
		setLoading(true);
		try {
			let payload = {
				listId: listId,
				content: formData.content,
				completed: false,
			};
			await apiOwListy.post('/api/lists/items/create', payload);
			Toast.show({
				type: 'success',
				text1: 'Item criado!',
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
					Criar Item
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
					onPress={createListItem}
					loading={loading}
					disabled={!formData.content}
				>
					Criar
				</Button>
			</Stack>
		</Modal>
	);
}
