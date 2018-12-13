import {required} from './rules'

export const testCaseValidation = {
  client: [required],
  team: [required],
  suite: [required],
  status: [required],
  title: [required],
  description: [required],
  developerComment: [],
  analystComment: [],
  steps: [],
};