import { getNetworkError } from "../constants/alertMessage";

// should work well with 422 and 500 http code axios response
export const getErrorDataFromApiResponseError = caughtError => {
  if (caughtError) {
    let errors;

    if (caughtError.response && caughtError.response.data) {
      if (
        caughtError.response.data.details &&
        caughtError.response.data.details.length
      ) {
        errors = caughtError.response.data;
      } else if (
        caughtError.response.data.errors &&
        caughtError.response.data.errors.length
      ) {
        errors = {
          details: caughtError.response.data.errors
        };
      } else {
         // Internal Server Error|Not Found|payload too large
        errors = {
          details: [
            {
              message: caughtError.response.statusText
            }
          ]
        };
      }
    } else {
      errors = {
        details: [
          {
            message: getNetworkError()
          }
        ]
      };
    }

    return errors;
  }

  return { details: [] };
};

export const getErrorMessageFromApiResponseError = caughtError => {
  let errorMessage = getErrorDataFromApiResponseError(caughtError);
  errorMessage =
    errorMessage && errorMessage.details && errorMessage.details[0]
      ? errorMessage.details[0].message
      : "";

  errorMessage = !errorMessage ? getNetworkError() : errorMessage;

  return errorMessage;
};
