export interface User {
    uuid: string;
    name: string;
    email: string;
    phone: string;
    disabilityType: string;
    location: string;
    employmentStatus: string;
    university: string;
    degree: string;
    jobLocationPreferences: string[];
    skills: string[];
    resumeUrl: string;
    imageUrl: string;
}