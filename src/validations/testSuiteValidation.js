import {required} from './rules'

export const testSuiteValidation = {
  name: [required],
  status: [required],
  title: [
    {max: 250, message: "Title should not more than 250 character"},
    {required: true, message: "This field is required."}
  ],
  description: [required],
  envAccessDetails: [required],
  comments: [],
};