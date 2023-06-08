import { Modal as ModalPaper, ModalProps, Portal } from 'react-native-paper';
import { useAppTheme } from '../../context/Theme';

export function Modal({ children, contentContainerStyle, ...props }: ModalProps) {
	const { colors } = useAppTheme();

	return (
		<Portal>
			<ModalPaper
				contentContainerStyle={[
					{
						padding: 20,
						marginVertical: 50,
						marginHorizontal: 20,
						borderRadius: 5,
						backgroundColor: colors.surface,
					},
					contentContainerStyle,
				]}
				{...props}
			>
				{children}
			</ModalPaper>
		</Portal>
	);
}
