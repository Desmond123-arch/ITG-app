"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import axios from "axios"
import { useSelector } from "react-redux"
import { RootState } from "@/store"
import { Loader2 } from "lucide-react"

interface Applicant {
  applicationId: number
  appliedAt: string
  userId: number
  uuid: string
  name: string
  email: string
  phone: string
  address: string
  imageUrl: string
  verificationStatus: string
  disabilityType: string
  skills: string[]
  resumeUrl: string | null
  preferredJobLocation: string | null
}

const Applicants = () => {
  const [applicants, setApplicants] = useState<Applicant[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const token = useSelector((state: RootState) => state.auth.token)

  useEffect(() => {
    const fetchApplicants = async () => {
      if (!token) return

      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/applications/employer-applicants`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        setApplicants(response.data.data || [])
      } catch (error) {
        console.error("Error fetching applicants", error)
      } finally {
        setLoading(false)
      }
    }

    fetchApplicants()
  }, [token])

  const handleAccept = (applicationId: number) => {
    setApplicants(applicants.filter(app => app.applicationId !== applicationId))
    // TODO: API call to accept/verify
  }

  const handleReject = (applicationId: number) => {
    setApplicants(applicants.filter(app => app.applicationId !== applicationId))
    // TODO: API call to reject/remove
  }

  return (
    <div>
      <h2 className="text-xl mb-2">Applicants Management</h2>

      {loading ? (
        <div className="flex justify-center items-center py-10">
          <Loader2 className="animate-spin h-6 w-6 text-gray-500" />
        </div>
      ) : applicants.length === 0 ? (
        <div className="text-center text-muted-foreground mt-10">
          No applicants to manage at the moment.
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {applicants.map(applicant => (
            <Card key={applicant.applicationId} className="p-6 flex flex-col gap-3">
              <div className="flex items-center gap-3 mb-2">
                <img
                  src={applicant.imageUrl}
                  alt={applicant.name}
                  className="h-12 w-12 rounded-full object-cover"
                />
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
                <span className="font-semibold">Applied At:</span>{" "}
                {new Date(applicant.appliedAt).toLocaleString()}
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
      )}
    </div>
  )
}

export default Applicants
