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

export const haversineDistance = (lat1, lng1, lat2, lng2) => {
	const rad = (x) => (x * Math.PI) / 180;

	const R = 6378137; // Earth’s mean radius in meter
	const dLat = rad(lat2 - lat1);
	const dLong = rad(lng2 - lng1);
	const a =
		Math.sin(dLat / 2) * Math.sin(dLat / 2) +
		Math.cos(rad(lat1)) *
			Math.cos(rad(lat2)) *
			Math.sin(dLong / 2) *
			Math.sin(dLong / 2);
	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	const d = R * c;
	return d; // returns the distance in meters
};

/*---------------------------------------------------------------------------------------*/

export const polylineSegment = (polylineCoords, startCoord, endCoord, tolerance = 0.00001) => {
    
  let startIndex = -1;
  let endIndex = -1;
  
  for (let i = 0; i < polylineCoords.length; i++) {
    const coord = polylineCoords[i];
    
    const lat = coord.lat || coord[0];
    const lng = coord.lng || coord[1];
    
    const startLat = startCoord.lat || startCoord[0];
    const startLng = startCoord.lng || startCoord[1];

    const endLat = endCoord.lat || endCoord[0];
    const endLng = endCoord.lng || endCoord[1];
        
    if (Math.abs(lat - startLat) < tolerance && 
        Math.abs(lng - startLng) < tolerance) {
      startIndex = i;
    }
    
    if (Math.abs(lat - endLat) < tolerance && 
        Math.abs(lng - endLng) < tolerance) {
      endIndex = i;
    }
  }
  
  if (startIndex === -1 || endIndex === -1) {
    console.warn('Start or end coordinate not found in polyline');
    return [];
  }
  
  if (startIndex > endIndex) {
    [startIndex, endIndex] = [endIndex, startIndex];
  }
  
  return polylineCoords.slice(startIndex, endIndex + 1);
};

/*---------------------------------------------------------------------------------------*/

export const reverseCoordinates = (coords) => {
	if (!Array.isArray(coords)) {
		return coords;
	}

	if (typeof coords[0] === "number") {
		return [coords[1], coords[0]];
	}

	return coords.map((coord) => reverseCoordinates(coord));
};

/*---------------------------------------------------------------------------------------*/
