import { escapeHtml } from "./domUtils.js";

//some code from from https://stackoverflow.com/a/68640371

const RX_URL =
	"^([a-zA-Z]+:\\/\\/)?" + // protocol
	"((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
	"((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
	"(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
	"(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
	"(\\#[-a-z\\d_]*)?";

const attributesToStr = (attributes) =>
	Object.entries(attributes).reduce(
		(acc, curr) => `${acc} ${curr[0]}"="${escapeHtml(curr[1])}"`,
		"",
	);

export const urlify = (txt, attributes) => {
	let attributesString = `target="_blank" rel="nofollow noopener noreferrer"`;

	if (
		typeof attributes === "object" &&
		!Array.isArray(attributes) &&
		attributes !== null
	)
		attributesString = attributesToStr(attributes);

	const tmpl = `<a ${attributesString} href="$&">$&</a>`;

	return txt.replaceAll(new RegExp(RX_URL, "gim"), tmpl);
};
