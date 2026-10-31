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

/*---------------------------------------------------------------------------------------*/

/* chunk* functions from https://www.30secondsofcode.org/js/s/split-array-into-chunks/ */

export const chunk = (arr, size) =>
	Array.from({ length: Math.ceil(arr.length / size) }, (_v, i) =>
		arr.slice(i * size, i * size + size),
	);

/*---------------------------------------------------------------------------------------*/

export const chunkIntoN = (arr, n) => {
	const size = Math.ceil(arr.length / n);
	return Array.from({ length: n }, (_v, i) =>
		arr.slice(i * size, i * size + size),
	);
};

/*---------------------------------------------------------------------------------------*/

export const chunkWithMinSize = (arr, chunkSize, minChunkSize = 0) => {
	const remainder = arr.length % chunkSize;
	const isLastChunkTooSmall = remainder < minChunkSize;
	const totalChunks = isLastChunkTooSmall
		? Math.floor(arr.length / chunkSize)
		: Math.ceil(arr.length / chunkSize);
	return Array.from({ length: totalChunks }, (_, i) => {
		const chunk = arr.slice(i * chunkSize, i * chunkSize + chunkSize);
		if (i === totalChunks - 1 && isLastChunkTooSmall)
			chunk.push(...arr.slice(-remainder));
		return chunk;
	});
};

/*---------------------------------------------------------------------------------------*/

export const chunkify = function* (itr, size) {
	let chunk = [];
	for (const v of itr) {
		chunk.push(v);
		if (chunk.length === size) {
			yield chunk;
			chunk = [];
		}
	}
	if (chunk.length) yield chunk;
};

/*---------------------------------------------------------------------------------------*/
