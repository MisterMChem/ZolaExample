import { createValidator, required, contains } from '../../utils/validation';

const isEmpty = value => value === undefined || value === null || value === '';

const emailValidation = (value) => {
  // Let's not start a debate on email regex. This is just for an example app!
  if (!isEmpty(value) && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    return 'Invalid email address';
  }
};

const passwordValidation = (value) => {
  if (!isEmpty(value)) {
	var code, i, len;
	var shouldError = true;
	for (i = 0, len = value.length; i < len; i++) {
		code = value.charCodeAt(i);
		if (code > 30 && code < 48) {
			shouldError = false;
		}
	}
	if (shouldError) {
		return "Password must contain an alphanumeric character";
	}
  }
};

export default {
	email(emailSent) {
		var message;
		message = emailValidation(emailSent);
		if (message) return message;
	},
	password(passwordSent) {
		var message;
		message = passwordValidation(passwordSent);
		if (message) return message;
	},
	required(value) {
  		if (isEmpty(value)) {
    		return 'This field is required.';
  		}
	}
};
