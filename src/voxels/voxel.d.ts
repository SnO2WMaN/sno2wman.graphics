declare module "*/voxels.json" {
	const value: {
		[year: string]: {
			[month: string]: {
				[day: string]: {
					[date: string]: {
						name: string;
						tags: [string];
						size?: number;
					};
				};
			};
		};
	};
	export = value;
}
