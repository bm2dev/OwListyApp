import { Fragment, isValidElement } from 'react';
//
import { View, ViewProps } from 'react-native';
import { Divider } from 'react-native-paper';

interface StackProps extends ViewProps {
	direction?: 'row' | 'column';
	spacing?: number;
	divider?: boolean;
}

export function Stack({ spacing, direction, style, divider, children, ...props }: StackProps) {
	const isChildrenArray = Array.isArray(children);
	return (
		<View
			style={[
				{
					flex: direction === 'row' ? 1 : 0,
					flexDirection: direction || 'column',
					width: direction === 'row' ? undefined : '100%',
				},
				style,
			]}
			{...props}
		>
			{isChildrenArray
				? children
						?.filter((item) => isValidElement(item))
						.map((child, index) => {
							return (
								<Fragment key={index}>
									{index !== 0 && (
										<View
											style={
												direction === 'row' ? { marginRight: spacing } : { marginTop: spacing }
											}
										/>
									)}
									{child}
									{index !== children.length - 1 && (
										<>
											{direction !== 'row' && divider && (
												<Divider style={{ marginTop: spacing ? spacing * 2 : undefined }} />
											)}
											<View
												style={
													direction === 'row' ? { marginLeft: spacing } : { marginBottom: spacing }
												}
											/>
										</>
									)}
								</Fragment>
							);
						})
				: children}
		</View>
	);
}
