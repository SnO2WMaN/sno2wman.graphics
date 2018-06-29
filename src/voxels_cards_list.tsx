import React from "react";
import Card from "./voxels_card";

import leftPad from "left-pad";
import Masonry from "react-masonry-component";

import { VoxelData, FormedVoxelData } from "./voxel_interfaces";

export default class List extends React.Component<
	{
		voxels: VoxelData[];
	},
	{ voxels: FormedVoxelData[]; added: number }
> {
	constructor(props, state) {
		super(props, state);

		this.state = {
			voxels: [],
			added: 0
		};
		this.props.voxels.sort((a, b) => {
			if (a.date.year === b.date.year) {
				if (a.date.month === b.date.month) {
					if (a.date.day === b.date.day) {
						if (a.date.hour === b.date.hour) {
							if (a.date.minute === b.date.minute) {
								return a.date.second - b.date.second;
							} else return a.date.minute - b.date.minute;
						} else return a.date.hour - b.date.hour;
					} else return b.date.day - a.date.day;
				} else return b.date.month - a.date.month;
			} else return b.date.year - a.date.year;
		});
	}

	componentDidMount() {
		this.add(5);
	}

	add(n: number) {
		if (n <= 0) return;
		const voxel = this.props.voxels[this.state.added];
		import(`../voxels/snap${voxel.date.year}-${leftPad(
			voxel.date.month,
			2,
			0
		)}-${leftPad(voxel.date.day, 2, 0)}-${leftPad(
			voxel.date.hour,
			2,
			0
		)}-${leftPad(voxel.date.minute, 2, 0)}-${leftPad(
			voxel.date.second,
			2,
			0
		)}.png`).then(l => {
			this.setState(
				prev => ({
					added: prev.added + 1,
					voxels: prev.voxels.concat(Object.assign(voxel, {
						src: l.default
					}) as FormedVoxelData)
				}),
				() => {
					this.add(n - 1);
				}
			);
		});
	}

	render() {
		const rootStyle = getComputedStyle(document.documentElement);
		return (
			<Masonry
				className={"cards"}
				elementType={"ul"}
				options={{
					columnWidth: Number(
						rootStyle
							.getPropertyValue("--voxel-card-width")
							.slice(0, -2)
					),
					gutter: Number(
						rootStyle
							.getPropertyValue("--voxel-card-margin")
							.slice(0, -2)
					),
					transitionDuration: 0
				}}
			>
				{(() => {
					return this.state.voxels.map((s, index) => {
						return <Card key={index} data={s} />;
					});
				})()}
			</Masonry>
		);
	}
}
