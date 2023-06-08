import { useState } from 'react';
import { Text, TextInput } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import { apiOwListy } from '../../../api/apiOwListy';
import { Button } from '../../../components/Button';
import { Modal } from '../../../components/Modal';
import { Stack } from '../../../components/Stack';
import { useAppTheme } from '../../../context/Theme';
import { errorToast } from '../../../utils/errorToast';

interface AddListModalProps {
	open: boolean;
	closeModal: () => void;
	getLists: () => void;
	groupId: string;
}

export function AddListModal({ open, closeModal, getLists, groupId }: AddListModalProps) {
	const { colors } = useAppTheme();
	const [formData, setFormData] = useState({ title: '', color: '' });
	const [loading, setLoading] = useState(false);

	async function createList() {
		setLoading(true);
		try {
			let payload = {
				title: formData.title,
				color: null,
				groupId: groupId,
			};
			await apiOwListy.post('/api/lists/create', payload);
			Toast.show({
				type: 'success',
				text1: 'Lista criada!',
			});
			setFormData({ title: '', color: '' });
			closeModal();
			getLists();
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
					Criar Lista
				</Text>

				<TextInput
					placeholder='Título da Lista'
					mode='outlined'
					value={formData.title}
					onChangeText={(v) => setFormData((p) => ({ ...p, title: v }))}
				/>

				<Button
					size='small'
					mode='contained'
					onPress={createList}
					loading={loading}
					disabled={!formData.title}
				>
					Criar
				</Button>
			</Stack>
		</Modal>
	);
}
