import { post, get, put, deleteRecord } from "../helpers/http";

export const createAgency = (company) => {
    return post('client', company)
};
