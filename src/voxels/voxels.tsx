import leftPad from "left-pad";
import React from "react";

import { render } from "react-dom";

import data from "./voxels.json";
import Masonry from "react-masonry-component";

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
	size?: number;
	jpg?: boolean;
}

interface FormedVoxelData extends VoxelData {
	src: string;
}

const voxels: VoxelData[] = [];

Object.keys(data).forEach(year =>
	Object.keys(data[year]).forEach(month =>
		Object.keys(data[year][month]).forEach(day =>
			Object.keys(data[year][month][day]).forEach(date => {
				const d = data[year][month][day][date];
				voxels.push({
					date: {
						year: Number(year),
						month: Number(month),
						day: Number(day),
						hour: Number(date.substr(0, 2)),
						minute: Number(date.substr(2, 2)),
						second: Number(date.substr(4, 2))
					},
					name: d.name,
					tags: d.tags,
					size: d.size || 1,
					jpg: d.jpg || false
				});
			})
		)
	)
);

class Card extends React.Component<{ data: FormedVoxelData }, any> {
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
						<p className="title">{this.props.data.name}</p>
					</div>
					<div className="date-wrap">
						<p className="date">{this.displayDate()}</p>
					</div>
					<ul className="tags-wrap">
						{(() => {
							return this.props.data.tags.map((tag, i) => {
								return (
									<li key={`tag${i}`}>
										<p>{tag.toUpperCase()}</p>
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

class List extends React.Component<
	{
		voxels: VoxelData[];
	},
	{ voxels: FormedVoxelData[]; added: number }
> {
	constructor(props, state) {
		super(props, state);

		this.state = {
			voxels: [],
			added: 1
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
		this.add(this.props.voxels.length);
	}

	add(n: number) {
		if (n <= 0 || this.props.voxels.length < this.state.added) return;
		const voxel = this.props.voxels[this.state.added - 1];
		import(`./snap${voxel.date.year}-${leftPad(
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
		)}.${voxel.jpg ? "jpg" : "png"}`).then(l => {
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
		const style = getComputedStyle(document.documentElement);
		return (
			<Masonry
				className={"cards"}
				elementType={"ul"}
				options={{
					columnWidth: ".wrap-sizer",
					gutter: Number(
						style
							.getPropertyValue("--voxel-card-margin")
							.slice(0, -2)
					),
					transitionDuration: 0
				}}
			>
				<li className="voxel x1 wrap-sizer" />
				{(() => {
					return this.state.voxels.map((s, index) => {
						return <Card key={index} data={s} />;
					});
				})()}
			</Masonry>
		);
	}
}

export default {
	loaded() {
		render(
			<List voxels={voxels} />,
			document.querySelector("#voxels .cards-wrap")
		);
	}
};
