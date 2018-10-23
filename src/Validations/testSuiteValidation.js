import {required} from './rules'

export const testSuiteValidation = {
  name: [required],
  status: [required],
  description: [required],
  envAccessDetails: [required],
  comments: [],
};