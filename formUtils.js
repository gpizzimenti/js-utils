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
