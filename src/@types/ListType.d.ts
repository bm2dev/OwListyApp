export type ListType = {
	id: number;
	title: string;
	color?: string;
	groupId: number;
	createdAt: string;
	updatedAt: string;
	lastItems: {
		id: number;
		content: string;
		completed: boolean;
	}[];
};
