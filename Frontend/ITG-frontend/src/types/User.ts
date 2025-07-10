export interface User {
    uuid: string;
    name: string;
    email: string;
    phone: string;
    disability_type: string;
    location: string;
    employment_status: string;
    university: string;
    degree: string;
    job_location_preferences: string[];
    skills: string[];
    resume_url: string;
    image_url: string;
}