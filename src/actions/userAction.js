import {post} from "../helpers/http";

export const signIn = (userCred) => {
  return post('auth/signin', userCred)
};