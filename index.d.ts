

declare interface ExtraUserDetails {
    gender: string;
    dateOfBirth: string | Date;
    marketingEmails: boolean;
    dataSharing: boolean;
}

declare interface SignupFormData {
    email: string;
    password: string;
    name: string;
    birthYear: string;
    birthMonth: string;
    birthDay: string;
    gender: string;
    marketingEmails: boolean;
    dataSharing: boolean;
}