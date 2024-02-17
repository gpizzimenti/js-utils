/*---------------------------------------------------------------------------------------*/

export const isTouchDevice = () =>
	window.matchMedia?.("(any-pointer:coarse)").matches ||
	"ontouchstart" in window ||
	!!(window?.DocumentTouch && window.document instanceof DocumentTouch) ||
	!!window?.navigator?.maxTouchPoints ||
	!!window.navigator.msMaxTouchPoints;

/*---------------------------------------------------------------------------------------*/

export const isPortrait = () =>
	window.matchMedia?.("(orientation: portrait)").matches;

/*---------------------------------------------------------------------------------------*/

export const isSmallFormat = (trigger = 800) => {
	return window.matchMedia(`(max-width: ${trigger}px)`).matches;
};

/*---------------------------------------------------------------------------------------*/

export const browserData = () =>
	new Promise((resolve, reject) => {
		if (navigator.userAgentData) {
			const hints = [
				"architecture",
				"model",
				"platform",
				"platformVersion",
				"uaFullVersion",
			];
			navigator.userAgentData
				.getHighEntropyValues(hints)
				.then((ua) => {
					resolve(ua);
				})
				.catch(() => {
					resolve(navigator);
				});
		} else {
			resolve(navigator);
		}
	});

/*************************** USAGE ************************** */
/*
  <script type="module">
    import { browserData } from "./browserData.js";

    browserData().then((data) => {
      const isApple = /(Mac|iPhone|iPod|iPad)/i.test(data.platform);
      const url = isApple
        ? `https://maps.apple.com/maps`
        : `https://www.google.com/maps`;

      window.open(url);
    });
  </script>
*/

/*---------------------------------------------------------------------------------------*/
