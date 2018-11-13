import { post } from "../helpers/http-api-client";

export const signIn = (userCred) => {
  return post('auth/signin', userCred);
};
