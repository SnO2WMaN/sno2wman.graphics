declare module "*/data.json" {
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
