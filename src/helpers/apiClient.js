import SWQA from './swqa-sdk';
import { getUserToken, getCompanyToken } from './utility';

let baseURL = "https://usqxdzop5m.execute-api.us-east-1.amazonaws.com/dev/";
baseURL = "http://localhost:8080/";

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
