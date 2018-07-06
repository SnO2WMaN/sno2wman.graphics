import html5 from "./html5.svg";
import css3 from "./css3.svg";
import javascript from "./javascript.svg";
import sass from "./sass.svg";
import webpack from "./webpack.svg";
import prettier from "./prettier.svg";
import eslint from "./eslint.svg";
import stylelint from "./stylelint.svg";
import react from "./react.svg";
import vue from "./vue.svg";
import pug from "./pug.svg";
import typescript from "./typescript.svg";
import yarn from "./yarn.svg";
import git from "./git.svg";
import netlify from "./netlify.svg";
import vscode from "./vscode.svg";
import animejs from "./animejs.svg";
import nodejs from "./nodejs.svg";
import babel from "./babel.svg";
import fontawesome from "./fontawesome.svg";
import gitkraken from "./gitkraken.svg";

Array.from(document.querySelectorAll("i.brand")).forEach($icon => {
	Object.entries({
		html5,
		css3,
		javascript,
		sass,
		webpack,
		prettier,
		eslint,
		stylelint,
		react,
		vue,
		pug,
		typescript,
		yarn,
		git,
		netlify,
		vscode,
		animejs,
		nodejs,
		babel,
		fontawesome,
		gitkraken
	}).forEach(entry => {
		if ($icon.classList.contains(entry[0]))
			$icon.insertAdjacentHTML("afterend", entry[1]);
	});
	$icon.remove();
});
