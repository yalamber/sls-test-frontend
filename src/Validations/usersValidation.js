import {required, email} from './rules'

export const userValidation = {
  status: [required],
  username: [
    {required: true, message: "This field is required."},
    {whitespace: true, message: "Username must not have whitespace."}
  ],
  password: [required, {min: 6}],
  email: [email, required],
  client: [required],
  company: [required],
  role: [required]
};
