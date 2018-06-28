import React from "react";
import Card from "./voxels_card";

import leftPad from "left-pad";
import Masonry from "react-masonry-component";

import { VoxelData, FormedVoxelData } from "./voxel_interfaces";

export default class List extends React.Component<
	{
		voxels: VoxelData[];
	},
	{ voxels: FormedVoxelData[] }
> {
	constructor(props, state) {
		super(props, state);

		this.state = {
			voxels: []
		};
		this.props.voxels
			.sort((a, b) => {
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
			})
			.forEach(voxel => {
				const date = voxel.date;
				import(`../voxels/snap${date.year}-${leftPad(
					date.month,
					2,
					0
				)}-${leftPad(date.day, 2, 0)}-${leftPad(
					date.hour,
					2,
					0
				)}-${leftPad(date.minute, 2, 0)}-${leftPad(
					date.second,
					2,
					0
				)}.png`).then(l => {
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
