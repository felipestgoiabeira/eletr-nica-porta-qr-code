
const validator = require("validator");
const moment = require('moment');

const isSameOrBefore = (startTime, endTime) => {
    return moment(startTime, 'HH:mm').isSameOrBefore(moment(endTime, 'HH:mm'));
  }

const validate = (data) =>{
    console.log(data.hour_start, data.hour_end)
    passwordValid = validator.equals(data.password, data.password2) ? true : false;
    hourValid = isSameOrBefore(data.hour_start, data.hour_end) ? true : false;
    
    return {password : passwordValid,
            hora : hourValid}
}

module.exports = validate;