import { required, email } from './rules'

export const agencyValidation = {
    agencyName: [{
        required: true,
        message: "Agency Name is required"
    }],
    agencyAddress: [
        { required: true, message: "Agency Address is required" }
    ],
    username: [{
        required: true,
        message: "User Name is required"
    }],
    password: [
        { min: 5, message: "Password should be 5 characters or digits long" },
        { required: true, message: "Password is required" }
    ],
    postalAddress: [
        { required: true, message: "Postal Address is required" }
    ],
    email: [
        email,
        { required: true, message: "Email Address is required" }
    ],
    linkedin: [
        { required: true, message: "Linkedin URL is required" }
    ],
    resume: [
        { required: false }
    ],
    mobile: [
        { min: 10, message: "Please enter valid mobile address" },
        { max: 12, message: "Please enter valid mobile address" },
        { required: true, message: "Mobile address is required" }
    ],
    sms: [
        { required: true, message: "Message is required" }
    ],
    instantMessaging: [
        { required: true, message: "Instant Messaging is required" }
    ]
};