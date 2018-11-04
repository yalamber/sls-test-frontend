import {required} from './rules'

export const testSuiteValidation = {
  name: [required],
  status: [required],
  title: [required],
  description: [required],
  envAccessDetails: [required],
  comments: [],
};