import { useState } from 'react';
import { IconButton, Text, TextInput } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import { useNavigate } from 'react-router-native';
import { GroupType } from '../../../@types';
import { apiOwListy } from '../../../api/apiOwListy';
import { Button } from '../../../components/Button';
import { Modal } from '../../../components/Modal';
import { Row } from '../../../components/Row';
import { Stack } from '../../../components/Stack';
import { useAppTheme } from '../../../context/Theme';
import { errorToast } from '../../../utils/errorToast';

interface EditGroupModalProps {
	open: boolean;
	closeModal: () => void;
	getLists: () => void;
	group: GroupType;
}

export function EditGroupModal({ open, closeModal, getLists, group }: EditGroupModalProps) {
	const navigate = useNavigate();
	const { colors } = useAppTheme();
	const [formData, setFormData] = useState({ name: group.name || '' });
	const [loading, setLoading] = useState(false);
	const [deleteMode, setDeleteMode] = useState(false);

	async function editGroup() {
		setLoading(true);
		try {
			let payload = {
				groupId: group.id,
				name: formData.name,
				color: group.color,
			};

			await apiOwListy.put('/api/groups/update', payload);
			Toast.show({
				type: 'success',
				text1: 'Grupo editado!',
			});
			closeModal();
			getLists();
		} catch (error) {
			console.log(error);
			errorToast(error);
		} finally {
			setLoading(false);
		}
	}

	async function deleteGroup() {
		setLoading(true);
		try {
			let payload = {
				groupId: group.id,
			};

			await apiOwListy.delete('/api/groups/delete', { data: payload });
			Toast.show({
				type: 'success',
				text1: 'Grupo deletado!',
			});
			closeModal();
			navigate(-1);
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
					Editar Grupo
				</Text>

				<TextInput
					placeholder='Nome do grupo'
					mode='outlined'
					value={formData.name}
					onChangeText={(v) => setFormData((p) => ({ ...p, name: v }))}
				/>

				<Row style={{ alignItems: 'center' }}>
					<IconButton
						icon={deleteMode ? 'close' : 'trash-can'}
						iconColor={deleteMode ? colors.outline : colors.error}
						onPress={() => setDeleteMode((p) => !p)}
					/>
					<Button
						size='small'
						mode='contained'
						color={deleteMode ? 'error' : 'primary'}
						onPress={deleteMode ? deleteGroup : editGroup}
						loading={loading}
						disabled={!formData.name}
						style={{ flexGrow: 1 }}
					>
						{deleteMode ? 'Excluir' : 'Editar'}
					</Button>
				</Row>
			</Stack>
		</Modal>
	);
}
