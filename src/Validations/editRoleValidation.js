import {required} from "./rules";

export const editRolesValidation = {
  name: [required],
  key: [required],
  type: [required],
  description: [required]
};