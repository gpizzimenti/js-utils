export const traverse = (obj, path) => {
	//some code from https://stackoverflow.com/a/58314926

	return path
		.split(".")
		.filter(Boolean)
		.reduce((acc, curr) => (acc?.[curr] ? acc[curr] : undefined), obj);
};

/*---------------------------------------------------------------------------------------*/

export const intersection = (list1, list2) => {
	const set1 = list1 instanceof Set ? list1 : new Set(list1);
	const set2 = list2 instanceof Set ? list2 : new Set(list2);

	return [...set1].filter((item) => set2.has(item));
};
