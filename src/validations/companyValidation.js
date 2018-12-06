import {required} from "./rules";

export const companyValidation = {
  name: [
    {min: 5, message: "Company Name should be at least 5 character."},
    {max: 25, message: "Company Name should not more than 25 character"},
    {required: true, message: "Company Name is required"}
    ],
  location: [required]
};