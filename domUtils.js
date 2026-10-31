/*-----------------------------------------------------------------------------------------------*/

export const escapeHtml = (html) => {
	const text = document.createTextNode(html);
	const p = document.createElement("p");
	p.appendChild(text);
	return p.innerHTML.replace(/"/g, "&quot;");
};

/*-----------------------------------------------------------------------------------------------*/

export const unescapeHtml = (html) => {
	const doc = new DOMParser().parseFromString(html, "text/html");
	return doc.documentElement.textContent;
};

/*-----------------------------------------------------------------------------------------------*/

export const index = (element) =>
	Array.from(element.parentElement.children).indexOf(element);

/*-----------------------------------------------------------------------------------------------*/

export const getCSSVariable = (name, context) =>
	typeof window !== "undefined" &&
	window
		.getComputedStyle(context || document.documentElement)
		?.getPropertyValue(name);

/*----------------------------------------------------------------*/

export function getLang(dflt) {
	let lang = document.querySelector("html").getAttribute("lang");

	if (!lang && navigator.language) {
		const locale = new Intl.Locale(navigator.language);
		lang = locale.language;
	}

	if (lang) return lang.toLowerCase().split("-")[0];
	else return dflt;
}

/*----------------------------------------------------------------*/

export function getBase() {
	return document.querySelector("base")?.getAttribute("href");
}

/*-----------------------------------------------------------------------------------------------*/
/* vibe-coded with  Claude */
/**
 * @param {Element} el - The starting DOM element
 * @param {boolean} isNext - true for next siblings, false for previous
 * @param {number} [nr] - Optional: limit the number of siblings returned
 * @param {string} [selector] - Optional: only count/return siblings matching this selector
 * @returns {Element[]} Array of sibling elements, nearest first
 */
export function getSiblings(
	el,
	isNext,
	nr = Number.POSITIVE_INFINITY,
	selector,
) {
	const siblings = [];
	let current = isNext ? el.nextElementSibling : el.previousElementSibling;

	while (current && siblings.length < nr) {
		if (!selector || current.matches(selector)) {
			siblings.push(current);
		}
		current = isNext
			? current.nextElementSibling
			: current.previousElementSibling;
	}

	return siblings;
}

/*-----------------------------------------------------------------------------------------------*/

export const isScrollable = (element) => {
	const scrollLeft = element.scrollLeft;
	const scrollTop = element.scrollTop;
	const scrollWidth = element.scrollWidth;
	const scrollHeight = element.scrollHeight;
	const clientWidth = element.clientWidth;
	const clientHeight = element.clientHeight;

	const overflowY = window.getComputedStyle(element)["overflow-y"];
	const overflowX = window.getComputedStyle(element)["overflow-x"];

	const _hasV =
		(overflowY === "scroll" || overflowY === "auto") &&
		scrollHeight > clientHeight;
	const _hasH =
		(overflowX === "scroll" || overflowX === "auto") &&
		scrollWidth > clientWidth;
	const _canScrollLeft = scrollLeft > 0;
	const _canScrollRight = scrollLeft < scrollWidth - clientWidth;
	const _canScrollTop = scrollTop > 0;
	const _canScrollDown = scrollTop < scrollHeight - clientHeight;

	return {
		vertical: _hasV,
		horizontal: _hasH,
		both: _hasV && _hasH,
		up: _canScrollTop,
		down: _canScrollDown,
		left: _canScrollLeft,
		right: _canScrollRight,
	};
};

/*---------------------------------------------------------------------------------------*/
/* vibe-coded with  Claude */
/**
 * Strips HTML tags using DOMParser, with optional whitelist of tags to preserve.
 *
 * @param {string} html - The HTML string to process.
 * @param {string[]} [allowedTags=[]] - Tags to preserve (e.g. ['a', 'strong']).
 * @param {string[]} [allowedAttributes=[]] - Attributes to preserve (e.g. ['class', 'data']).
 * @returns {string} - The cleaned string.
 */
export const stripHtmlTags = (
	html,
	allowedTags,
	allowedAttributes = [],
	externalAnchors = false,
) => {
	if (!html) {
		return "";
	}

	const whitelists = {
		minimal: [
			"strong",
			"em",
			"b",
			"i",
			"u",
			"q",
			"br",
			"a",
			"ol",
			"ul",
			"li",
			"dl",
			"dt",
			"dd",
			"dfn",
			"cite",
			"blockquote",
			"address",
			"acronym",
			"abbr",
			"bdo",
			"bdi",
			"p",
			"s",
			"del",
			"ins",
			"mark",
		],
	};

	const parser = new DOMParser();
	const doc = parser.parseFromString(html, "text/html");
	const allowed = Array.isArray(allowedTags)
		? allowedTags.map((t) => t.toLowerCase())
		: (typeof allowedTags === "string" && whitelists[allowedTags]) || [];

	function processNode(node) {
		// Text nodes — keep as-is
		if (node.nodeType === Node.TEXT_NODE) {
			return node.textContent;
		}

		// Element nodes
		if (node.nodeType === Node.ELEMENT_NODE) {
			const tag = node.tagName.toLowerCase();
			const children = Array.from(node.childNodes).map(processNode).join("");

			if (allowed.includes(tag)) {
				// Rebuild the tag with its attributes
				let attrs = Array.from(node.attributes)
					.map((a) =>
						tag === "a" &&
						externalAnchors &&
						(["target", "rel", "href"].includes(a.name) ||
							a.name.startsWith("on"))
							? ""
							: allowedAttributes.includes(a.name)
								? `${a.name}="${escapeHtml(a.value)}"`
								: "",
					)
					.join(" ");

				if (tag === "a" && externalAnchors) {
					attrs += `${attrs ? " " : ""}href="${escapeHtml(node.href)}" target="_blank" rel="nofollow noopener noreferrer"`;
				}

				const openTag = attrs ? `<${tag} ${attrs}>` : `<${tag}>`;
				return `${openTag}${children}</${tag}>`;
			}

			// Disallowed tag — drop the tag but keep its inner content
			return children;
		}

		return "";
	}

	return Array.from(doc.body.childNodes).map(processNode).join("");
};

/*-----------------------------------------------------------------------------------------------*/
