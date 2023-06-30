// const validator = require('validator');
// const isEmpty = require('./isEmpty');

// const validateLoginInput = (data) => {
//   const errors = {};

//   data.userName = !isEmpty(data.userName) ? data.userName : '';
//   data.password = !isEmpty(data.password) ? data.password : '';

//   if (validator.isEmpty(data.userName)) {
//     errors.userName = 'Username is required';
//   }

//   if (validator.isEmpty(data.password)) {
//     errors.password = 'Password is required';
//   }

//   return {
//     errors,
//     isValid: isEmpty(errors),
//   };
// };

// module.exports = validateLoginInput;
