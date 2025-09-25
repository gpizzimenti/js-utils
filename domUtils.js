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
	(typeof window !== "undefined") && window.getComputedStyle(context || document.documentElement)?.getPropertyValue(name);

/*----------------------------------------------------------------*/

export function getLang(dflt) {
	const locale = new Intl.Locale(navigator.language);
	let lang = dflt || "en";

	if (locale?.language) lang = locale.language;
	else if (document.querySelector("html").getAttribute("lang"))
		lang = document
			.querySelector("html")
			.getAttribute("lang")
			.toLowerCase()
			.split("-")[0];

	return lang;
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
        const _canScrollLeft =  scrollLeft > 0;
        const _canScrollRight =  scrollLeft < (scrollWidth - clientWidth);
        const _canScrollTop = scrollTop > 0;
        const _canScrollDown = scrollTop < (scrollHeight - clientHeight);
        
	return { vertical: _hasV, horizontal: _hasH, both: _hasV && _hasH, up: _canScrollTop, down: _canScrollDown, left: _canScrollLeft, right: _canScrollRight   };
};

/*-----------------------------------------------------------------------------------------------*/
