import { useState } from 'react';
import { FlatList, View } from 'react-native';
import { Divider, HelperText, IconButton, Text, TextInput } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import { useNavigate } from 'react-router-native';
import { GroupType } from '../../../@types';
import { apiOwListy } from '../../../api/apiOwListy';
import { Button } from '../../../components/Button';
import { Modal } from '../../../components/Modal';
import { Row } from '../../../components/Row';
import { Stack } from '../../../components/Stack';
import { useAuth } from '../../../context/Auth';
import { useAppTheme } from '../../../context/Theme';
import { errorToast } from '../../../utils/errorToast';
import { isEmailValid } from '../../../utils/isEmailValid';
import { Member } from './Member';

interface EditGroupModalProps {
	open: boolean;
	closeModal: () => void;
	getLists: () => void;
	group: GroupType;
}

export function EditGroupModal({ open, closeModal, getLists, group }: EditGroupModalProps) {
	const navigate = useNavigate();
	const { user } = useAuth();
	const { colors } = useAppTheme();

	const [formData, setFormData] = useState({ name: group.name || '' });
	const [memberEmail, setMemberEmail] = useState('');
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
			closeModal();
			getLists();
			Toast.show({
				type: 'success',
				text1: 'Grupo editado!',
			});
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
			closeModal();
			navigate(-1);
			Toast.show({
				type: 'success',
				text1: 'Grupo deletado!',
			});
		} catch (error) {
			console.log(error);
			errorToast(error);
		} finally {
			setLoading(false);
		}
	}

	async function addMember() {
		setLoading(true);
		try {
			let payload = {
				groupId: group.id,
				userEmail: memberEmail,
			};

			await apiOwListy.post('/api/groups/members/add', payload);

			getLists();

			Toast.show({
				type: 'success',
				text1: 'Membro adicionado!',
			});
		} catch (error) {
			console.log(error);
			errorToast(error);
		} finally {
			setLoading(false);
		}
	}

	async function removeMember(member: GroupType['members'][0]) {
		setLoading(true);
		try {
			let payload = {
				memberId: member.id,
			};

			await apiOwListy.delete('/api/groups/members/remove', { data: payload });

			if (member.userId.toString() === user.id) {
				closeModal();
				navigate(-1);
			} else {
				getLists();
			}

			Toast.show({
				type: 'success',
				text1: 'Membro removido!',
			});
		} catch (error) {
			console.log(error);
			errorToast(error);
		} finally {
			setLoading(false);
		}
	}

	return (
		<Modal visible={open} contentContainerStyle={{ flex: 1 }} onDismiss={closeModal}>
			<Stack spacing={5} style={{ flex: 1 }}>
				<Text variant='headlineSmall' style={{ color: colors.primary }}>
					Editar Grupo
				</Text>

				<TextInput
					label='Nome do grupo'
					placeholder='Nome do grupo'
					mode='outlined'
					value={formData.name}
					onChangeText={(v) => setFormData((p) => ({ ...p, name: v }))}
				/>

				<Row style={{ alignItems: 'center' }}>
					{group.creatorId.toString() === user.id && (
						<IconButton
							icon={deleteMode ? 'close' : 'trash-can'}
							iconColor={deleteMode ? colors.outline : colors.error}
							onPress={() => setDeleteMode((p) => !p)}
						/>
					)}
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

				<Divider />

				<Text variant='headlineSmall' style={{ color: colors.primary }}>
					Membros do Grupo
				</Text>

				<View style={{ marginBottom: -5 }}>
					<TextInput
						label='Email'
						placeholder='emaildousuario@email.com'
						mode='outlined'
						keyboardType='email-address'
						autoComplete='email'
						value={memberEmail}
						onChangeText={(v) => setMemberEmail(v)}
						error={!!memberEmail && !isEmailValid(memberEmail)}
					/>
					<HelperText type='error' visible={!!memberEmail && !isEmailValid(memberEmail)}>
						Digite um endereço de email inválido!
					</HelperText>
				</View>

				<Row>
					<Button
						size='small'
						mode='outlined'
						onPress={addMember}
						style={{ flexGrow: 1 }}
						loading={loading}
					>
						Adicionar membro
					</Button>
				</Row>

				<Divider style={{ marginTop: 10 }} />

				<FlatList
					renderItem={({ item }) => (
						<Member group={group} member={item} removeMember={removeMember} loading={loading} />
					)}
					data={group.members}
				/>
			</Stack>
		</Modal>
	);
}
