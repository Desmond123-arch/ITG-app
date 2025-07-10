export interface User {
    uuid: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    imageUrl: string;
    verificationStatus: string;
    // employment_status: string;
    // university: string;
    // degree: string;
    job_seeker?: {
        disability_type: string;
        skills: Array<string>;
        resume_url: string;
        preferred_job_location: string[];
    }
}
