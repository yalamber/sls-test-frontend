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
  password: [required, {min: 6, message: "Password must be atleast 6 characters."}],
  email: [email, required],
  client: [required],
  company: [required],
  role: [required],
  //TODO: in futue add linkedin specific regexp
  linkedin: [
    { required: true, message: "Linkedin URL is required" },
    { type: 'url', message: "Linkedin URL should be valid url." }
  ],
  resume: [
    { type: 'url', message: "Resume URL should be valid url." }
  ]
};
