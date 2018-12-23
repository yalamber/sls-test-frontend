import { get } from 'lodash';
import jwtDecode from "jwt-decode";

export function setUserToken(token) {
  localStorage.setItem('user_token', token);
}

export function clearUserToken() {
  localStorage.removeItem('user_token');
}

export function getUserToken() {
  try {
    const token = localStorage.getItem('user_token');
    return token;
  } catch (err) {
    clearUserToken();
    return false;
  }
}

export function getUserTokenData() {
  try {
    const token = localStorage.getItem('user_token');
    return jwtDecode(token);
  } catch (err) {
    clearUserToken();
    return false;
  }
}

export function setCompanyToken(token) {
  localStorage.setItem('company_token', token);
}

export function clearCompanyToken() {
  localStorage.removeItem('company_token');
}

export function getCompanyToken() {
  try {
    const token = localStorage.getItem('company_token');
    return token;
  } catch (err) {
    clearUserToken();
    return false;
  }
}

export function getCompanyTokenData() {
  try {
    const token = localStorage.getItem('company_token');
    return jwtDecode(token);
  } catch (err) {
    clearCompanyToken();
    return false;
  }
}

export function timeDifference(givenTime) {
  givenTime = new Date(givenTime);
  const milliseconds = new Date().getTime() - givenTime.getTime();
  const numberEnding = number => {
    return number > 1 ? 's' : '';
  };
  const number = num => num > 9 ? '' + num : '0' + num;
  const getTime = () => {
    let temp = Math.floor(milliseconds / 1000);
    const years = Math.floor(temp / 31536000);
    if (years) {
      const month = number(givenTime.getUTCMonth() + 1);
      const day = number(givenTime.getUTCDate());
      const year = givenTime.getUTCFullYear() % 100;
      return `${day}-${month}-${year}`;
    }
    const days = Math.floor((temp %= 31536000) / 86400);
    if (days) {
      if (days < 28) {
        return days + ' day' + numberEnding(days);
      } else {
        const months = [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ];
        const month = months[givenTime.getUTCMonth()];
        const day = number(givenTime.getUTCDate());
        return `${day} ${month}`;
      }
    }
    const hours = Math.floor((temp %= 86400) / 3600);
    if (hours) {
      return `${hours} hour${numberEnding(hours)} ago`;
    }
    const minutes = Math.floor((temp %= 3600) / 60);
    if (minutes) {
      return `${minutes} minute${numberEnding(minutes)} ago`;
    }
    return 'a few seconds ago';
  };
  return getTime();
}

export function generateRandomPassword() {
  let length = 8,
    charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
    retVal = "";
  for (let i = 0, n = charset.length; i < length; ++i) {
    retVal += charset.charAt(Math.floor(Math.random() * n));
  }
  return retVal;
}


export function setFormValidaitonError(form, error) {
  const errorResponseData = get(error, 'response.data');
  //check if validation Error
  if(errorResponseData.name === 'ValidationError') {
    const validationObjectDetails = get(errorResponseData, 'validationObject.details');
    if(validationObjectDetails && validationObjectDetails.length > 0) {  
      let fieldObject = {};
      validationObjectDetails.forEach((errorField) => {
        fieldObject[errorField.path.join('.')] = { errors: [new Error(errorField.message)] };
      });
      form.setFields(fieldObject);
    }
  }
}