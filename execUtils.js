/*---------------------------------------------------------------------------------------*/

export const nextFrame = (fn) =>
	//https://dev.to/nikitadmitr/the-other-side-of-using-requestanimationframe-4jk6
	requestAnimationFrame(() => {
		requestAnimationFrame(fn);
	});

/*---------------------------------------------------------------------------------------*/

export const softExec = (fn, wait = 5000) => {
	if ("requestIdleCallback" in window) {
		requestIdleCallback(fn, {
			timeout: wait,
		});
	} else if ("requestAnimationFrame" in window) {
		nextFrame(fn);
	} else {
		setTimeout(fn, 1);
	}
};

/*---------------------------------------------------------------------------------------*/

export const debounce = (fn, timeout = 300) => {
	let timer;
	return (...args) => {
		clearTimeout(timer);
		timer = setTimeout(() => {
			fn.apply(this, args);
		}, timeout);
	};
};

/*---------------------------------------------------------------------------------------*/

export const throttle = (fn, timeout = 300) => {
	let waiting = false;
	return (...args) => {
		if (!waiting) {
			fn.apply(this, args);
			waiting = true;
			setTimeout(() => {
				waiting = false;
			}, timeout);
		}
	};
};

/*---------------------------------------------------------------------------------------*/
