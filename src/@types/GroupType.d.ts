export type GroupType = {
	id: number;
	name: string;
	color?: string;
	creatorId: number;
	createdAt: Date;
	updatedAt: Date;
	members: {
		id: number;
		userId: number;
		name: string;
	}[];
};
