import SWQA from './swqa-sdk';
import { getUserToken, getCompanyToken } from './utility';

let baseURL = process.env.REACT_APP_API_BASE_URL;

let SWQAClient = new SWQA({
  baseURL,
  getToken: () => {
    //check if Company Token is set
    let token = getCompanyToken();
    if (!token) {
      token = getUserToken();
    }
    return token;
  }
});

export default SWQAClient;
