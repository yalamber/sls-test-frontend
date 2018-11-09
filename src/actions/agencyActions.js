import { post, get, put, deleteRecord } from "../helpers/http";

export const createAgency = (company) => {
    return post('client', company)
};

export const getAgency = (agencyId) => {
  if (agencyId) {
    return get(`agency/${agencyId}`)
  }

  return get(`agency`)
};
