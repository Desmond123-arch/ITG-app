type JobTypeEnum = "full_time" | "part_time" | "remote" | "contract";
type JobStatusEnum = "draft" | "published" | "archived";

export type Job = {
    id?: number;
    employerId?: number;
    title?: string;
    description?: string;
    location?: string;
    salaryRange?: string;
    jobType?: JobTypeEnum;
    disabilityFriendly?: boolean;
    status?: JobStatusEnum;
    createdAt?: Date;
    updatedAt?: Date;
    deadline?: Date;
};
