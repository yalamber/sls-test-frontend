import SWQA from './swqa-sdk';
import { getUserToken, getCompanyToken } from './utility';
//check if Company Token is set
let token = getCompanyToken();
if(!token) {
    token = getUserToken();
}

let baseURL = "https://usqxdzop5m.execute-api.us-east-1.amazonaws.com/dev/";
baseURL = "http://localhost:8080/";

let swqaClient = new SWQA({
    baseURL,
    token
});

export default swqaClient;