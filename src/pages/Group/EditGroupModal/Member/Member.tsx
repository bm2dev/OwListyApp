import { useState } from 'react';
import { IconButton, Text } from 'react-native-paper';
import { GroupType } from '../../../../@types';
import { Button } from '../../../../components/Button';
import { LettersAvatar } from '../../../../components/LettersAvatar';
import { Row } from '../../../../components/Row';
import { useAppTheme } from '../../../../context/Theme';

interface MemberProps {
	group: GroupType;
	member: GroupType['members'][0];
	removeMember: (member: GroupType['members'][0]) => void;
	loading: boolean;
}

export function Member({ group, member, removeMember, loading }: MemberProps) {
	const { colors } = useAppTheme();
	const [removeMode, setRemoveMode] = useState(false);

	return (
		<Row style={{ alignItems: 'center', borderBottomColor: colors.outline, borderBottomWidth: 1 }}>
			{removeMode ? (
				<Button
					size='small'
					mode='outlined'
					color='error'
					onPress={() => removeMember(member)}
					style={{ flexGrow: 1 }}
					loading={loading}
				>
					Remover
				</Button>
			) : (
				<>
					<LettersAvatar label={member.name} size={35} color={group.color} inverseColors />
					<Text
						variant='titleMedium'
						style={{ paddingHorizontal: 10, flexGrow: 1, flexShrink: 1 }}
						numberOfLines={1}
						ellipsizeMode='tail'
					>
						{member.name}
					</Text>
				</>
			)}

			<IconButton
				icon='close'
				iconColor={removeMode ? colors.outline : colors.error}
				onPress={() => setRemoveMode((p) => !p)}
			/>
		</Row>
	);
}
