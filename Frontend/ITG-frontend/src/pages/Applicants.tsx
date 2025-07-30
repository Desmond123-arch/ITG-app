"use client"

import { useSelector } from "react-redux"
import { RootState } from "@/store"
import { useQuery } from "@tanstack/react-query"
import { useSearchParams, useNavigate } from "react-router-dom"
import axios from "axios"
import { Loader2 } from "lucide-react"
import { Card } from "@/components/ui/card"
import CustomPagination from "@/components/ui/CustomPagination"

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

const fetchApplicants = async (
  token: string | null,
  currentPage: string,
  navigate: ReturnType<typeof useNavigate>
) => {
  if (!token) throw new Error("No token provided")

  const params = new URLSearchParams()
  params.append("page", currentPage)
  params.append("limit", "12")

  const response = await axios.get(
    `${import.meta.env.VITE_BACKEND_URL}/applications/employer-applicants?${params.toString()}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )

  if (response.status !== 200) {
    throw new Error("Failed to fetch applicants")
  }

  if (response.data.meta.totalPages < Number(currentPage)) {
    navigate(`/dashboard/applicants?page=${response.data.meta.totalPages}`)
  }

  return response.data
}

const Applicants = () => {
  const token = useSelector((state: RootState) => state.auth.token)
  const navigate = useNavigate()
  const searchParams = useSearchParams()[0]
  const pageParam = searchParams.get("page")
  const currentPage = pageParam && pageParam !== "0" ? pageParam : "1"

  const {
    data,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["employer-applicants", currentPage],
    queryFn: () => fetchApplicants(token, currentPage, navigate),
    enabled: !!token,
  })

  const applicants: Applicant[] = data?.data || []
  const meta = data?.meta

  return (
    <div>
      <h2 className="text-xl mb-4 font-semibold">Applicants Management</h2>

      {isLoading ? (
        <div className="flex justify-center items-center py-10">
          <Loader2 className="animate-spin h-6 w-6 text-gray-500" />
        </div>
      ) : isError ? (
        <div className="text-center text-red-500 mt-10">
          Error loading applicants.
        </div>
      ) : applicants.length === 0 ? (
        <div className="text-center text-muted-foreground mt-10">
          No applicants to manage at the moment.
        </div>
      ) : (
        <>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {applicants.map((applicant) => (
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
                  <span className="font-semibold">Skills:</span> {applicant.skills.join(", ")}
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
                  >
                    Accept
                  </button>
                  <button
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    Reject
                  </button>
                </div>
              </Card>
            ))}
          </div>

          {meta && (
            <div className="flex justify-center mt-8">
              <CustomPagination
                baseUrl="/dashboard/applicants"
                currentPage={Number(currentPage)}
                totalPages={meta.totalPages}
                count={meta.count}
              />
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default Applicants
