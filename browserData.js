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
