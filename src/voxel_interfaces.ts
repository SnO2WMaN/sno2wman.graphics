interface VoxelData {
	date: {
		year: number;
		month: number;
		day: number;
		hour: number;
		minute: number;
		second: number;
	};
	name: string;
	tags: [string];
	size: number;
}

interface FormedVoxelData extends VoxelData {
	src: string;
}

export { VoxelData, FormedVoxelData };
