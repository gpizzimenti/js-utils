/*-----------------------------------------------------------------------------------------------*/

export const serializeForm = (form, skipBlanks = true) => {
	let formData = new FormData(form);

        if (skipBlanks) { 
            const filteredFormData = new FormData();
            for(var [key,value] of Array.from(formData.entries())){
                if (value !== '' && value !== null && value !== undefined) {
                  filteredFormData.append(key, value);
                }
            }
            formData =  filteredFormData;
        }
        
	const qsString = new URLSearchParams(formData).toString();

	return qsString;
};

/*-----------------------------------------------------------------------------------------------*/

export const serializeFormToJSON = (form) => {
	const formData = new FormData(form);

	const json = {};

	for (const entry of formData.entries()) {
		const params = json[entry[0]] || [];
		params.push(entry[1]);
		json[entry[0]] = params;
	}

	return json;
};

/*-----------------------------------------------------------------------------------------------*/

export const deserializeQueryStringToFormData = (qs) => {
	const formData = new FormData();
  
	const params = new URLSearchParams(qs || window.location.search);
  
	for (const [key, value] of params) {
	  formData.append(key, value);
	}
  
	return formData;
};

/*-----------------------------------------------------------------------------------------------*/

export const disableBlankInputs = (form, options = {}) => {
  const {
    excludeTypes = ['hidden', 'submit', 'button', 'reset'],
    excludeSelectors = []
  } = options;

  const inputs = form.querySelectorAll('input, textarea, select');

  inputs.forEach(input => {
    // Skip excluded input types
    if (excludeTypes.includes(input.type)) return;
    
    // Skip excluded selectors
    if (excludeSelectors.some(selector => input.matches(selector))) return;

    // Check if value is blank and disable
    if (isFormElementBlank(input)) {
      input.disabled = true;
    }
  });
};

/*-----------------------------------------------------------------------------------------------*/

export const isFormElementBlank = (element) => {
  // Empty string
  if (!element || !element.value || element.value.trim() === '') return true;
  
  // For select elements, check if no option is selected or default option
  if (element.tagName === 'SELECT') {
    return element.selectedIndex === 0 && element.options[0].value.trim() === "";
  }
  
  // For checkboxes/radio buttons, consider unchecked as blank
  if (element.type === 'checkbox' || element.type === 'radio') {
    return !element.checked;
  }
  
  return false;
};

/*-----------------------------------------------------------------------------------------------*/


export const escapeHtmlAttributeValue = (value) => {
	return value
	  .replace(/&/g, '&amp;')
	  .replace(/</g, '&lt;')
	  .replace(/>/g, '&gt;')
	  .replace(/"/g, '&quot;')
	  .replace(/'/g, '&#39;');
  };

  /*---------------------------------------------------------------------------------------*/
