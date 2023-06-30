// const validator = require('validator');
// const isEmpty = require('./isEmpty');

// const validateRegisterInput = (data) => {
//   let errors = {};
//   data.userName = !isEmpty(data.userName) ? data.userName : '';
//   data.password = !isEmpty(data.password) ? data.password : '';

//   if (!validator.isLength(data.userName, { min: 2, max: 30 })) {
//     errors.userName = 'Username should be between 2 and 30 characters';
//   }

//   if (validator.isEmpty(data.userName)) {
//     errors.userName = 'Username is required';
//   }

//   if (validator.isEmpty(data.password)) {
//     errors.password = 'Password is required';
//   }

//   if (!validator.isLength(data.password, { min: 8, max: 30 })) {
//     errors.password = 'Password should be at least 8 characters';
//   }

//   return {
//     errors,
//     isValid: isEmpty(errors),
//   };
// };

// module.exports = validateRegisterInput;
