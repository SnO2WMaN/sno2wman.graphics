import React from "react";
import { VoxelData, FormedVoxelData } from "./voxel_interfaces";

export default class Card extends React.Component<
	{ data: FormedVoxelData },
	any
> {
	render() {
		return (
			<li>
				<img src={this.props.data.src} />
				<div className="title-wrap">
					<p>{this.props.data.name}</p>
				</div>
			</li>
		);
	}
}
