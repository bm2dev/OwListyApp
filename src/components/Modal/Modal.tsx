import { Modal as ModalPaper, ModalProps, Portal } from 'react-native-paper';
import { useAppTheme } from '../../context/Theme';

export function Modal({ children, contentContainerStyle, ...props }: ModalProps) {
	const { colors } = useAppTheme();

	return (
		<Portal>
			<ModalPaper
				contentContainerStyle={{
					flex: 1,
					marginVertical: 50,
					marginHorizontal: 20,
					borderRadius: 5,
					backgroundColor: colors.surface,
				}}
				{...props}
			>
				{children}
			</ModalPaper>
		</Portal>
	);
}
