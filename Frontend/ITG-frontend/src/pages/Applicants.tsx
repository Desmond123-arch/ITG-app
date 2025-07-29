"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"

// Mock data for applicants
const mockApplicants = [
  {
    applicationId: 1,
    appliedAt: "2025-07-29T04:19:44.362Z",
    userId: 39,
    uuid: "662f003b-155e-4763-b2bc-fc86d388332e",
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "0240000001",
    address: "123 Main St, Accra, Ghana",
    imageUrl: "https://thumbs.dreamstime.com/b/creative-vector-illustration-default-avatar-profile-placeholder-isolated-background-art-design-grey-photo-blank-template-mo-118823351.jpg",
    verificationStatus: "pending",
    disabilityType: "Vision Impairment",
    skills: ["JavaScript", "Marketing"],
    resumeUrl: null,
    preferredJobLocation: null
  }
]

const Applicants = () => {
  const [applicants, setApplicants] = useState(mockApplicants)

  const handleAccept = (applicationId: number) => {
    setApplicants(applicants.filter(app => app.applicationId !== applicationId))
    // Here you would call your API to verify the applicant
  }

  const handleReject = (applicationId: number) => {
    setApplicants(applicants.filter(app => app.applicationId !== applicationId))
    // Here you would call your API to reject the applicant
  }

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Applicants Management</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {applicants.map(applicant => (
          <Card key={applicant.applicationId} className="p-6 flex flex-col gap-3">
            <div className="flex items-center gap-3 mb-2">
              <img src={applicant.imageUrl} alt={applicant.name} className="h-12 w-12 rounded-full object-cover" />
              <div>
                <div className="font-semibold">{applicant.name}</div>
                <div className="text-xs text-muted-foreground">{applicant.email}</div>
                <div className="text-xs text-muted-foreground">{applicant.phone}</div>
              </div>
            </div>
            <div className="text-sm mb-1">
              <span className="font-semibold">Disability Type:</span> {applicant.disabilityType}
            </div>
            <div className="text-sm mb-1">
              <span className="font-semibold">Skills:</span> {applicant.skills.join(', ')}
            </div>
            <div className="text-sm mb-1">
              <span className="font-semibold">Address:</span> {applicant.address}
            </div>
            <div className="text-sm mb-1">
              <span className="font-semibold">Applied At:</span> {new Date(applicant.appliedAt).toLocaleString()}
            </div>
            <div className="flex gap-2 mt-4">
              <button
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                onClick={() => handleAccept(applicant.applicationId)}
              >
                Accept
              </button>
              <button
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                onClick={() => handleReject(applicant.applicationId)}
              >
                Reject
              </button>
            </div>
          </Card>
        ))}
      </div>
      {applicants.length === 0 && (
        <div className="text-center text-muted-foreground mt-10">No applicants to manage at the moment.</div>
      )}
    </div>
  )
}

export default Applicants
