import {required, email} from './rules'

export const userValidation = {
  genericRequiredRule: [required],
  status: [required],
  username: [
    {pattern: /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,30}$/i, message: "Username format Invalid."},
    {required: true, message: "This field is required."},
    {whitespace: true, message: "Username must not just have whitespace."}
  ],
  userId: [required],
  password: [required, {min: 6}],
  email: [email, required],
  client: [required],
  company: [required],
  role: [required]
};
