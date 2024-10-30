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

export const index = element => Array.from(element.parentElement.children).indexOf(element);

/*-----------------------------------------------------------------------------------------------*/

export const isScrollable = (element) => {  
	const overflowY = window.getComputedStyle(element)['overflow-y'];
  	const overflowX = window.getComputedStyle(element)['overflow-x'];
  	const _hasV =
	    (overflowY === 'scroll' || overflowY === 'auto') &&
	    element.scrollHeight > element.offsetHeight;
	const _hasH =
	    (overflowX === 'scroll' || overflowX === 'auto') &&
	    element.scrollWidth > element.offsetWidth;

	return { vertical: _hasV, horizontal: _hasH, both: _hasV && _hasH };
}

/*-----------------------------------------------------------------------------------------------*/
