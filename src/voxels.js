import leftPad from "left-pad";

import React from "react";
import { render } from "react-dom";

import data from "../voxels/data.json";

import List from "./voxels_cards_list.tsx";

const $voxel = document.querySelector("#voxel");
const $listWrap = $voxel.querySelector(".cards-wrap");

const voxels = [];

Object.keys(data).forEach(year =>
	Object.keys(data[year]).forEach(month =>
		Object.keys(data[year][month]).forEach(day =>
			Object.keys(data[year][month][day]).forEach(date =>
				voxels.push(
					Object.assign(
						{
							date: {
								year: Number(year),
								month: Number(month),
								day: Number(day),
								hour: Number(date.substr(0, 2)),
								minute: Number(date.substr(2, 2)),
								second: Number(date.substr(4, 2))
							}
						},
						data[year][month][day][date]
					)
				)
			)
		)
	)
);

Promise.all([
	new Promise(resolve =>
		window.addEventListener("load", () => {
			resolve();
		})
	)
]).then(() => {
	render(<List voxels={voxels} />, $listWrap);
});
