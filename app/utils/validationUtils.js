const EMAIL_VALIDATION = 'email';
const REQUIRED_VALIDATION = 'required';
const PHONE_VALIDATION = 'phone';

const isEmail = email => {
  const regex = /^([A-Za-z0-9_\-.+])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,})$/;

  return regex.test(email);
};

const isPhoneNumber = phone => {
  const regex = /^(?:254|\+254|0)?(7(?:(?:[0-9][0-9])|(?:0[0-8])|(4[0-1]))[0-9]{6})$/;

  return regex.test(phone);
};

export const validate = (value, validation) => {
  // console.log(value)
  switch (validation) {
    case EMAIL_VALIDATION:
      return isEmail(value);
    case PHONE_VALIDATION:
      return isPhoneNumber(value);
    case REQUIRED_VALIDATION:
      return value.trim().length > 0;
  }
};

export const handleValidation = (value, validations) =>
  validations
    .map(validation => validate(value, validation))
    .find(valid => valid === false) === false
);
