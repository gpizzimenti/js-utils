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

/*---------------------------------------------------------------------------------------*/

export const sortStruct = (struct, comparator) => {
	const sortedArray = Array.from(struct).sort(
		comparator && comparator instanceof Function ? comparator : undefined,
	);
	let sortedStruct;

	if (struct instanceof Map) sortedStruct = new Map(sortedArray);
	else if (struct instanceof Set) sortedStruct = new Set(sortedArray);

	return sortedStruct;
};
