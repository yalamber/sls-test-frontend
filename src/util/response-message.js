import { getNetworkError } from "../constants/alertMessage";

export const getErrorDataFromApiResponseError = caughtError => {
  if (caughtError) {
    let errors;
    if (caughtError.response && caughtError.response.data) {
      if (caughtError.response.data.details && caughtError.response.data.details.length) {
        errors = caughtError.response.data;
      } else {
        errors = {
          details: [
            {
              message: caughtError.response.statusText // payload too large
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
