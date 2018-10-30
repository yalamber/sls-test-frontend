import {required, email} from './rules'

export const userValidation = {
  status: [required],
  username: [required],
  email: [email, required],
  client: [required],
  company: [required],
  team: [required]
};

