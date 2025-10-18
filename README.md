# A collection of vanilla js helpers in ES module format:

- **[browserUtils.js](https://github.com/gpizzimenti/js-utils/blob/main/browserUtils.js)** :
  - isTouchDevice
  - isPortrait
  - isSmallFormat
  - browserData
- **[collectionUtils.js](https://github.com/gpizzimenti/js-utils/blob/main/collectionUtils.js):**
  - intersection
  - sortStruct
  - traverse
- **[colorUtils.js](https://github.com/gpizzimenti/js-utils/blob/main/colorUtils.js):**
  - HexToRGB
  - HexToHSL
  - HSLToRGB
  - HSLToHex
  - invertColor
  - getColorForPositiveInteger
- **[domUtils.js](https://github.com/gpizzimenti/js-utils/blob/main/domUtils.js):**
  - escapeHtml
  - unescapeHtml
  - index
  - getCSSVariable
  - getLang
  - isScrollable
- **[execUtils.js](https://github.com/gpizzimenti/js-utils/blob/main/execUtils.js):**
  - nextFrame
  - softExec
  - debounce
  - throttle
- **[formUtils.js](https://github.com/gpizzimenti/js-utils/blob/main/formUtils.js):**
  - serializeForm
  - serializeFormToJSON
  - deserializeQueryStringToFormData
  - escapeHtmlAttributeValue
  - isFormElementBlank
  - disableBlankInputs
- **[geoUtils.js](https://github.com/gpizzimenti/js-utils/blob/main/geoUtils.js):**
  - DecimaltoDMS
  - DMSToDecimal
  - formatDecimalToDMS
  - formatDMSToDecimal
  - haversineDistance
  - polylineSegment
  - reverseCoordinates
- **[textUtils.js](https://github.com/gpizzimenti/js-utils/blob/main/textUtils.js):** <sup>1</sup>

  - emailify
  - urlify
  - normalizeDiacritics
  - nvl

  \
  <sup>1</sup> depends on _domUtils_
