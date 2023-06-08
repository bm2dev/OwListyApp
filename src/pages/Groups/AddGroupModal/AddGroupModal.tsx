import { useState } from 'react';
import { Text, TextInput } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import { apiOwListy } from '../../../api/apiOwListy';
import { Button } from '../../../components/Button';
import { Modal } from '../../../components/Modal';
import { Stack } from '../../../components/Stack';
import { useAppTheme } from '../../../context/Theme';
import { errorToast } from '../../../utils/errorToast';

interface AddGroupModalProps {
	open: boolean;
	closeModal: () => void;
	getGroups: () => void;
}

export function AddGroupModal({ open, closeModal, getGroups }: AddGroupModalProps) {
	const { colors } = useAppTheme();
	const [formData, setFormData] = useState({ name: '', color: '' });
	const [loading, setLoading] = useState(false);

	async function createGroup() {
		setLoading(true);
		try {
			let payload = {
				name: formData.name,
				color: null,
			};
			await apiOwListy.post('/api/groups/create', payload);
			Toast.show({
				type: 'success',
				text1: 'Grupo criado!',
			});
			setFormData({ name: '', color: '' });
			closeModal();
			getGroups();
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
					Criar Grupo
				</Text>

				<TextInput
					placeholder='Nome do Grupo'
					mode='outlined'
					value={formData.name}
					onChangeText={(v) => setFormData((p) => ({ ...p, name: v }))}
				/>

				<Button
					size='small'
					mode='contained'
					onPress={createGroup}
					loading={loading}
					disabled={!formData.name}
				>
					Criar
				</Button>
			</Stack>
		</Modal>
	);
}
