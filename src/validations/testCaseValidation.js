import {required} from './rules'

export const testCaseValidation = {
  company: [required],
  team: [required],
  suite: [required],
  status: [required],
  title: [required],
  description: [required],
  developerComment: [],
  analystComment: [],
  steps: [],
};