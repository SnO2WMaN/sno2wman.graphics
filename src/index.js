import "./index.scss";

// FontAwesome
import fontawesome from "@fortawesome/fontawesome";
import {
	faTwitter,
	faGithub,
	faSteam,
	faDiscord,
	faAmazon
} from "@fortawesome/fontawesome-free-brands";
import { faRss } from "@fortawesome/fontawesome-free-solid";

fontawesome.library.add(
	faTwitter,
	faGithub,
	faSteam,
	faDiscord,
	faAmazon,
	faRss
);

// SVG
Array.from(document.querySelectorAll("svg,svg *")).forEach($svg => {
	$svg.removeAttribute("style");
});
