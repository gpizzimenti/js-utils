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

export const hasScrollbars = (element) => {
  const _hasV = element.scrollHeight > element.clientHeight;
  const _hasH = element.scrollWidth > element.clientWidth;

  return { vertical: _hasV, horizontal: _hasH, both: _hasV && _hasH };
}

/*-----------------------------------------------------------------------------------------------*/
