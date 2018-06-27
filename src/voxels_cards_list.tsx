import React from "react";
import Card from "./voxels_card";

import leftPad from "left-pad";

import { VoxelData, FormedVoxelData } from "./voxel_interfaces";
export default class List extends React.Component<
	{
		voxels: VoxelData[];
	},
	{ voxels: FormedVoxelData[] }
> {
	constructor(props, state) {
		super(props, state);

		this.state = { voxels: [] };

		this.props.voxels.forEach(voxel => {
			const date = voxel.date;
			import(`../voxels/snap${date.year}-${leftPad(
				date.month,
				2,
				0
			)}-${leftPad(date.day, 2, 0)}-${leftPad(date.hour, 2, 0)}-${leftPad(
				date.minute,
				2,
				0
			)}-${leftPad(date.second, 2, 0)}.png`).then(l => {
				this.add(l.default, voxel);
			});
		});
	}

	add(src: string, data: VoxelData) {
		const ap = Object.assign(data, { src }) as FormedVoxelData;
		this.setState({
			voxels: this.state.voxels.concat(ap)
		});
	}

	render() {
		return (
			<ul>
				{(() => {
					return this.state.voxels.map((s, index) => {
						return <Card key={index} data={s} />;
					});
				})()}
			</ul>
		);
	}
}
