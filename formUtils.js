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
      if (options.className)
        if (options.className === true || options.className === 'true') {
          input.classList.add('hasbeen-blanked');
        } else {
          input.classList.add(options.className);
        }
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

export const getFormElementDisplayValue = (element) => {
  if (!element) return '';

  const tagName = element.tagName.toLowerCase();
  const type = element.type?.toLowerCase();

  // Input elements
  if (tagName === 'input') {
    switch (type) {
      case 'checkbox':
      case 'radio':
        if (!element.checked) return '';
        // Try to find associated label
        if (element.id) {
          const label = document.querySelector(`label[for="${element.id}"]`);
          if (label) return label.innerText.trim();
        }
        // Fallback to value or empty
        return element.value || '';

      case 'text':
      case 'search':
      case 'email':
      case 'password':
      case 'url':
      case 'tel':
      case 'number':
      case 'date':
      case 'time':
      case 'datetime-local':
      case 'month':
      case 'week':
      case 'color':
        return element.value || '';

      case 'file':
        return element.files.length > 0 
          ? Array.from(element.files).map(f => f.name).join(', ')
          : '';

      default:
        return element.value || '';
    }
  }

  // Select elements
  if (tagName === 'select') {
    // Multiple select
    if (element.multiple) {
      const selectedOptions = Array.from(element.options)
        .filter(option => option.selected && option.value)
        .map(option => option.innerText.trim());
      return selectedOptions.join(', ');
    }
    // Single select
    const selectedOption = element.options[element.selectedIndex];
    return selectedOption && selectedOption.value ? selectedOption.innerText.trim() : '';
  }

  // Textarea
  if (tagName === 'textarea') {
    return element.value || '';
  }

  // All other elements - return innerText
  return element.innerText?.trim() || '';
}

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
