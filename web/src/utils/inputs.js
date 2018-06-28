export const inputs = {}

inputs.validate = async function(input, callback) {
  let format;
  // special case for email so we dont have
  // to set format for each email input
  input.props.type === "email" ? format = "email" : format = input.state.format;

  let hasError;
  let errorText;

  // if input is not empty and should adhere to
  // some type of format then check for errors
  if (input.state.value !== '' && format) {
    hasError = inputs.validateFormat[`${format}`](input.state.value);
    errorText = input.props.errorText || inputs.formatErrorText[`${format}`];
  } else {
    hasError = false;
    errorText = '';
  }

  return {error: hasError, errorText}
}

inputs.validateFormat = {
  email: function(value) {
    var pattern =/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return !pattern.test(value);  // returns a boolean
  },
  tel: function(value) {
    return value > 0 && value < 16;
  },
  zip: function(value) {
    var pattern = /^([0-9]{5})(?:[-\s]*([0-9]{4}))?$/;
    return !pattern.test(value);  // returns a boolean
  }
}

inputs.formatErrorText = {
  tel: 'Opps looks like this # is incorrect',
  email: 'Hmmm I don\'t recognize this type of email',
  zip: 'Hmmm I don\'t recognize this zip code'
}

inputs.format = {
  capitalize: function(value) {
    return value.charAt(0).toUpperCase() + value.slice(1);
  },
  tel: function(value){
    // Strip all characters from the input except digits
    value = value.replace(/\D/g,'');

    // Trim the remaining value to ten characters, to preserve phone number format
    value = value.substring(0,10);

    // Based upon the length of the string, we add formatting as necessary
    var size = value.length;
    if(size === 0){
      return value;
    } else if (size < 4) {
      value = '('+value;
    } else if (size < 7) {
      value = '('+value.substring(0,3)+') '+value.substring(3,6);
    } else {
      value = '('+value.substring(0,3)+') '+value.substring(3,6)+' - '+value.substring(6,10);
    }
    return value;
  },
  zip: function(value){
    // Strip all characters from the input except digits
    value = value.replace(/\D/g,'');
    return value;
  },
  number: function(value) {
    return value.replace(/\D/g,'');
  }
}
