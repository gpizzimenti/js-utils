/*---------------------------------------------------------------------------------------*/

export const DecimaltoDMS = (coordinate) => {
	const absolute = Math.abs(coordinate);
	const degrees = Math.floor(absolute);
	const minutesNotTruncated = (absolute - degrees) * 60;
	const minutes = Math.floor(minutesNotTruncated);
	const seconds = Math.floor((minutesNotTruncated - minutes) * 60);

	return {
		deg: degrees,
		min: minutes,
		sec: seconds,
		text: `${degrees}° ${minutes}′ ${seconds}″`,
		html: `${degrees}&#176; ${minutes}&#180; ${seconds}&#733;`,
	};
};

/*---------------------------------------------------------------------------------------*/

export const DMSToDecimal = (degrees, minutes, seconds, direction) => {
	let dd = Number(degrees) + Number(minutes) / 60 + Number(seconds) / (60 * 60);

	if (direction === "S" || direction === "W") {
		dd = dd * -1;
	} // Don't do anything for N or E
	return dd;
};

/*---------------------------------------------------------------------------------------*/

export const formatDecimalToDMS = (lat, lng) => {
	const latitude = DecimaltoDMS(lat);
	const latitudeCardinal = lat >= 0 ? "N" : "S";
	const longitude = DecimaltoDMS(lng);
	const longitudeCardinal = lng >= 0 ? "E" : "W";

	return {
		lat: latitude.text,
		lng: longitude.text,
		latCardinal: latitudeCardinal,
		lngCardinal: longitudeCardinal,
		text: `${latitude.text} ${latitudeCardinal} , ${longitude.text} ${longitudeCardinal}`,
		html: `${latitude.html} ${latitudeCardinal} , ${longitude.html} ${longitudeCardinal}`,
	};
};

/*---------------------------------------------------------------------------------------*/

export const formatDMSToDecimal = (lat, lng) => {
	let parts = lat.split(/[^\d\w]+/);
	const latDecimal = DMSToDecimal(parts[0], parts[1], parts[2], parts[3]);
	parts = lng.split(/[^\d\w]+/);
	const lngDecimal = DMSToDecimal(parts[0], parts[1], parts[2], parts[3]);

	return {
		lat: Number(latDecimal),
		lng: Number(lngDecimal),
		text: `${latDecimal},${lngDecimal}`,
	};
};

/*---------------------------------------------------------------------------------------*/
