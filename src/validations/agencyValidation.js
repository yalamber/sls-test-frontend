import { email } from './rules'

export const agencyValidation = {
    agencyName: [{
        required: true,
        message: "Agency Name is required"
    }],
    agencyAddress: [
        { required: true, message: "Agency Address is required" }
    ],
};