/*-----------------------------------------------------------------------------------------------*/

export const serializeForm = (form) => {
	const formData = new FormData(form);
	const qsString = new URLSearchParams(formData).toString();

	return qsString;
};

/*-----------------------------------------------------------------------------------------------*/

export const serializeFormToJSON = (form) => {
	const formData = new FormData(form);

	const json = {};

	for (const entry of formData.entries()) {
		const params = json[entry[0]] || [];
		params.push(entry[1]);
		json[entry[0]] = params;
	}

	return json;
};

/*-----------------------------------------------------------------------------------------------*/

export const deserializeQueryStringToFormData = (qs) => {
	const formData = new FormData();

	const params = new URLSearchParams(qs || window.location.search);

	for (const [key, value] of params) {
		formData.append(key, value);
	}

	return formData;
};

/*-----------------------------------------------------------------------------------------------*/

export const escapeHtmlAttributeValue = (value) => {
	return value
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&#39;");
};

/*---------------------------------------------------------------------------------------*/
