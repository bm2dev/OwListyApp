import { useState } from 'react';
import { IconButton, Text, TextInput } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import { useNavigate } from 'react-router-native';
import { ListType } from '../../../@types';
import { apiOwListy } from '../../../api/apiOwListy';
import { Button } from '../../../components/Button';
import { Modal } from '../../../components/Modal';
import { Row } from '../../../components/Row';
import { Stack } from '../../../components/Stack';
import { useAppTheme } from '../../../context/Theme';
import { errorToast } from '../../../utils/errorToast';

interface EditListModalProps {
	open: boolean;
	closeModal: () => void;
	getListItems: () => void;
	list: ListType;
}

export function EditListModal({ open, closeModal, getListItems, list }: EditListModalProps) {
	const navigate = useNavigate();
	const { colors } = useAppTheme();
	const [formData, setFormData] = useState({ title: list.title || '' });
	const [loading, setLoading] = useState(false);
	const [deleteMode, setDeleteMode] = useState(false);

	async function editList() {
		setLoading(true);
		try {
			let payload = {
				id: list.id,
				title: formData.title,
				color: list.color,
			};

			await apiOwListy.put('/api/lists/update', payload);
			Toast.show({
				type: 'success',
				text1: 'Item editado!',
			});
			closeModal();
			getListItems();
		} catch (error) {
			console.log(error);
			errorToast(error);
		} finally {
			setLoading(false);
		}
	}

	async function deleteList() {
		setLoading(true);
		try {
			let payload = {
				listId: list.id,
			};

			await apiOwListy.delete('/api/lists/delete', { data: payload });
			Toast.show({
				type: 'success',
				text1: 'Item editado!',
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
					Editar Lista
				</Text>

				<TextInput
					placeholder='Nome da Lista'
					mode='outlined'
					value={formData.title}
					onChangeText={(v) => setFormData((p) => ({ ...p, title: v }))}
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
						onPress={deleteMode ? deleteList : editList}
						loading={loading}
						disabled={!formData.title}
						style={{ flexGrow: 1 }}
					>
						{deleteMode ? 'Excluir' : 'Editar'}
					</Button>
				</Row>
			</Stack>
		</Modal>
	);
}
