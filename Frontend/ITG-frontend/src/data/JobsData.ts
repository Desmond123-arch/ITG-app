const jobs: any[] = [
    {
        id: 1,
        employerId: 101,
        title: "Senior Frontend Developer",
        description: "We are looking for an experienced React developer to join our team.",
        location: "New York, USA",
        salaryRange: "$90,000 - $120,000",
        jobType: "full_time",
        disabilityFriendly: true,
        status: "published",
        createdAt: new Date("2024-03-01T10:00:00Z"),
        updatedAt: new Date("2024-03-05T12:00:00Z"),
        deadline: new Date("2024-04-01T23:59:59Z"),
    },
    {
        id: 2,
        employerId: 102,
        title: "Graphic Designer",
        description: "A creative designer needed for branding and marketing materials.",
        location: "Remote",
        salaryRange: "$50,000 - $70,000",
        jobType: "remote",
        disabilityFriendly: false,
        status: "published",
        createdAt: new Date("2024-03-02T09:30:00Z"),
        updatedAt: new Date("2024-03-06T11:45:00Z"),
        deadline: new Date("2024-04-05T23:59:59Z"),
    },
    {
        id: 3,
        employerId: 103,
        title: "Product Manager",
        description: "Seeking an experienced PM to drive product strategy and execution.",
        location: "San Francisco, USA",
        salaryRange: "$110,000 - $140,000",
        jobType: "full_time",
        disabilityFriendly: true,
        status: "published",
        createdAt: new Date("2024-03-04T14:00:00Z"),
        updatedAt: new Date("2024-03-08T15:00:00Z"),
        deadline: new Date("2024-04-10T23:59:59Z"),
    },
    {
        id: 4,
        employerId: 104,
        title: "Freelance Content Writer",
        description: "We need a talented writer for blog posts, articles, and web content.",
        location: "London, UK",
        salaryRange: "$30/hour",
        jobType: "contract",
        disabilityFriendly: false,
        status: "draft",
        createdAt: new Date("2024-03-10T08:00:00Z"),
        updatedAt: new Date("2024-03-10T08:00:00Z"),
        deadline: new Date("2024-04-15T23:59:59Z"),
    },
    {
        id: 5,
        employerId: 105,
        title: "Software Engineer - Backend",
        description: "We are hiring a backend engineer with expertise in Node.js and PostgreSQL.",
        location: "Berlin, Germany",
        salaryRange: "€70,000 - €95,000",
        jobType: "full_time",
        disabilityFriendly: true,
        status: "archived",
        createdAt: new Date("2023-12-01T10:00:00Z"),
        updatedAt: new Date("2024-02-01T12:00:00Z"),
        deadline: new Date("2024-02-15T23:59:59Z"),
    },
];

export default jobs