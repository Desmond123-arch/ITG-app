"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Building2, User } from "lucide-react"
import VerifyTab from "@/components/ui/AdminsUI/verifyTab"

// Mock data for unverified users
const mockUsers = [
  {
    id: 1,
    name: "TechCorp Solutions",
    email: "contact@techcorp.com",
    type: "company",
    registeredAt: "2024-01-15",
    description: "Software development company specializing in web applications",
    website: "techcorp.com",
    employees: "50-100",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    type: "jobseeker",
    registeredAt: "2024-01-14",
    skills: ["React", "Node.js", "TypeScript"],
    experience: "3 years",
    location: "New York, NY",
  },
  {
    id: 3,
    name: "InnovateLab Inc",
    email: "hr@innovatelab.com",
    type: "company",
    registeredAt: "2024-01-13",
    description: "AI and machine learning research company",
    website: "innovatelab.com",
    employees: "10-50",
  },
  {
    id: 4,
    name: "Michael Chen",
    email: "m.chen@email.com",
    type: "jobseeker",
    registeredAt: "2024-01-12",
    skills: ["Python", "Data Science", "Machine Learning"],
    experience: "5 years",
    location: "San Francisco, CA",
  },
  {
    id: 5,
    name: "GreenTech Ventures",
    email: "info@greentech.com",
    type: "company",
    registeredAt: "2024-01-11",
    description: "Sustainable technology solutions provider",
    website: "greentech.com",
    employees: "100-500",
  },
]

export default function AdminUsersPage() {
  const [users, setUsers] = useState(mockUsers)
  const [activeTab, setActiveTab] = useState("all")

  const handleVerify = (userId: number) => {
    setUsers(users.filter((user) => user.id !== userId))
    // In a real app, you would make an API call here
    console.log(`Verified user ${userId}`)
  }

  const handleReject = (userId: number) => {
    setUsers(users.filter((user) => user.id !== userId))
    // In a real app, you would make an API call here
    console.log(`Rejected user ${userId}`)
  }

  const companies = users.filter((user) => user.type === "company")
  const jobSeekers = users.filter((user) => user.type === "jobseeker")

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">User Verification</h1>
          <p className="text-muted-foreground">Review and verify pending user registrations</p>
        </div>
        <div className="flex gap-4">
          <Card className="p-4">
            <div className="flex items-center gap-2">
              <Building2 className="h-4 w-4 text-blue-600" />
              <div>
                <p className="text-sm font-medium">{companies.length}</p>
                <p className="text-xs text-muted-foreground">Companies</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-green-600" />
              <div>
                <p className="text-sm font-medium">{jobSeekers.length}</p>
                <p className="text-xs text-muted-foreground">Job Seekers</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
      <VerifyTab
        users={users}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        handleVerify={handleVerify}
        handleReject={handleReject}
      />
    </div>
  )
}
