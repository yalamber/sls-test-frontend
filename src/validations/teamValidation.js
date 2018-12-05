import {required} from './rules'

export const teamValidation = {
  companyName: [required],
  teamName: [
    {min: 5, message: "Team Name should be at least 5 character."},
    {max: 25, message: "Team Name should not be more than 25 character"},
    {required: true, message: "Team Name is required"}
  ],
  teamManager: [required],
};
