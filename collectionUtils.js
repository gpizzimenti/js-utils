//some code from https://stackoverflow.com/a/58314926

export const traverse = (obj, path) => {
	return path
		.split(".")
		.filter(Boolean)
		.reduce((acc, curr) => (acc[curr] ? acc[curr] : undefined), obj);
};
