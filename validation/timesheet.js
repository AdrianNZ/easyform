const isEmpty = require('./is-empty');
const Validator = require('validator');

module.exports = function validateTimeSheetInput ( data ) {
    let errors = {};

    data.job = !isEmpty(data.job) ? data.job : '';
    data.name = !isEmpty(data.name) ? data.name : '';

    if ( Validator.isEmpty(data.job) ) {
        errors.job = 'Job field is required';
    }

    if ( Validator.isEmpty(data.name) ) {
        errors.name = 'Name field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
};
