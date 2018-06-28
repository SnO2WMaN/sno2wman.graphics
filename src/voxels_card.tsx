import leftPad from "left-pad";
import React from "react";
import { FormedVoxelData } from "./voxel_interfaces";

export default class Card extends React.Component<
	{ data: FormedVoxelData },
	any
> {
	displayDate() {
		return `${this.props.data.date.year}.${leftPad(
			this.props.data.date.month,
			2,
			0
		)}.${leftPad(this.props.data.date.day, 2, 0)}`;
	}

	render() {
		return (
			<li className={`x${this.props.data.size || 1} voxel`}>
				<div className="image-wrap">
					<img src={this.props.data.src} />
				</div>
				<div className="info-wrap">
					<div className="title-wrap">
						<p>{this.props.data.name}</p>
					</div>
					<div className="date-wrap">
						<p>{this.displayDate()}</p>
					</div>
					<ul className="tags-wrap">
						{(() => {
							return this.props.data.tags.map((tag, i) => {
								return (
									<li key={`tag${i}`}>
										<p>
											{tag.substr(0, 1).toUpperCase() +
												tag.substr(1)}
										</p>
									</li>
								);
							});
						})()}
					</ul>
				</div>
			</li>
		);
	}
}
