export interface Role {
    roleId: number;
    roleName: "job_seeker" | "admin" | "employer" | null;
    description: string | null;
}