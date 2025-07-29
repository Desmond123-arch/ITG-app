"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Building2 } from "lucide-react"
// You may want to create a dedicated VerifyJobTab component for modularity, but for now, inline UI is used.

// Mock data for unverified jobs
const mockJobs = [
  {
    id: 3,
    title: "Frontend Developer",
    description: [
      "Develop and maintain user-facing features",
      "Ensure the technical feasibility of UI/UX designs"
    ],
    skills: [
      "React",
      "TypeScript",
      "CSS",
      "REST APIs"
    ],
    requirements: [
      "Bachelor’s degree in Computer Science or related field",
      "2+ years of experience in frontend development"
    ],
    location: "Accra, Ghana",
    yearsOfExperience: "2",
    salaryRange: "GHS 4,000 - GHS 6,000",
    jobType: "full_time",
    status: "pending",
    deadline: "2025-08-15T23:59:59.000Z",
    createdAt: "2025-07-14T16:21:21.973Z",
    updatedAt: "2025-07-14T16:21:21.973Z",
    employerId: 22,
    companyName: "RTG Ghana",
    companyLogo: "https://example.com/logo.png",
    companyEmail: "hr@techhub.com",
    companyWebsite: "https://techhub.com",
    companyDescription: "A leading tech startup solving African problems."
  }
]

const AdminVerifyJobs = () => {
  const [jobs, setJobs] = useState(mockJobs)

  const handleVerify = (id: number) => {
    setJobs(jobs.filter(job => job.id !== id))
    // Here you would call your API to verify the job
  }

  const handleReject = (id: number) => {
    setJobs(jobs.filter(job => job.id !== id))
    // Here you would call your API to reject the job
  }

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Unverified Jobs</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {jobs.map(job => (
          <Card key={job.id} className="p-6 flex flex-col gap-3">
            <div className="flex items-center gap-3 mb-2">
              <img src={job.companyLogo} alt={job.companyName} className="h-10 w-10 rounded-full object-cover" />
              <div>
                <div className="font-semibold">{job.companyName}</div>
                <div className="text-xs text-muted-foreground">{job.companyEmail}</div>
              </div>
            </div>
            <div className="font-bold text-lg">{job.title}</div>
            <div className="text-sm text-muted-foreground mb-1">{job.location} • {job.jobType.replace('_', ' ')}</div>
            <div className="mb-2">
              <span className="font-semibold">Salary:</span> {job.salaryRange}
            </div>
            <div className="mb-2">
              <span className="font-semibold">Skills:</span> {job.skills.join(', ')}
            </div>
            <div className="mb-2">
              <span className="font-semibold">Requirements:</span>
              <ul className="list-disc ml-5 text-sm">
                {job.requirements.map((req, idx) => (
                  <li key={idx}>{req}</li>
                ))}
              </ul>
            </div>
            <div className="mb-2">
              <span className="font-semibold">Description:</span>
              <ul className="list-disc ml-5 text-sm">
                {job.description.map((desc, idx) => (
                  <li key={idx}>{desc}</li>
                ))}
              </ul>
            </div>
            <div className="flex gap-2 mt-4">
              <button
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                onClick={() => handleVerify(job.id)}
              >
                Verify
              </button>
              <button
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                onClick={() => handleReject(job.id)}
              >
                Reject
              </button>
            </div>
          </Card>
        ))}
      </div>
      {jobs.length === 0 && (
        <div className="text-center text-muted-foreground mt-10">No unverified jobs at the moment.</div>
      )}
    </div>
  )
}

export default AdminVerifyJobs
