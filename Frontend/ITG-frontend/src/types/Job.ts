type JobTypeEnum = "full_time" | "part_time" | "remote" | "contract";
type JobStatusEnum = "draft" | "published" | "archived";

export type Job = {
  jobId?: number;
  employerId: number;
  title: string;
  description: Array<string>;
  skills: Array<string>;
  requirements: Array<string>;
  location: string;
  yearsOfExperience: string;
  salaryRange: string;
  jobType: JobTypeEnum;
  status: JobStatusEnum;
  deadline?: Date;
  createdAt?: Date;
  updatedAt?: Date;

  companyName: string;
  companyDescription: string;
  companyEmail: string;
  companyLogo: string;
  companyWebsite: string;
};
