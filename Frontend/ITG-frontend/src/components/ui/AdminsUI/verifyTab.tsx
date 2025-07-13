import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Building2, User, Check, X, Mail, Calendar } from "lucide-react"
import React from "react"

interface UserType {
  id: number
  name: string
  email: string
  type: string
  registeredAt: string
  description?: string
  website?: string
  employees?: string
  skills?: string[]
  experience?: string
  location?: string
}

interface VerifyTabProps {
  users: UserType[]
  activeTab: string
  setActiveTab: (tab: string) => void
  handleVerify: (userId: number) => void
  handleReject: (userId: number) => void
}

const VerifyTab: React.FC<VerifyTabProps> = ({ users, activeTab, setActiveTab, handleVerify, handleReject }) => {
  const filteredUsers = users.filter((user) => {
    if (activeTab === "all") return true
    return user.type === activeTab
  })
  const companies = users.filter((user) => user.type === "company")
  const jobSeekers = users.filter((user) => user.type === "jobseeker")

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab}>
      <TabsList>
        <TabsTrigger value="all">All Users ({users.length})</TabsTrigger>
        <TabsTrigger value="company">Companies ({companies.length})</TabsTrigger>
        <TabsTrigger value="jobseeker">Job Seekers ({jobSeekers.length})</TabsTrigger>
      </TabsList>
      <TabsContent value={activeTab} className="space-y-4">
        {filteredUsers.length === 0 ? (
          <Card>
            <CardContent className="flex items-center justify-center py-12">
              <div className="text-center">
                <Check className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold">All caught up!</h3>
                <p className="text-muted-foreground">No pending verifications in this category.</p>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-4 py-2 text-left">User</th>
                    <th className="px-4 py-2 text-left">Type</th>
                    <th className="px-4 py-2 text-left">Details</th>
                    <th className="px-4 py-2 text-left">Registered</th>
                    <th className="px-4 py-2 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="border-b">
                      <td className="px-4 py-2">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={`/placeholder.svg?height=40&width=40`} />
                            <AvatarFallback>
                              {user.type === "company" ? (
                                <Building2 className="h-4 w-4" />
                              ) : (
                                <User className="h-4 w-4" />
                              )}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{user.name}</p>
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <Mail className="h-3 w-3" />
                              {user.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-2">
                        <Badge variant={user.type === "company" ? "default" : "secondary"}>
                          {user.type === "company" ? "Company" : "Job Seeker"}
                        </Badge>
                      </td>
                      <td className="px-4 py-2">
                        {user.type === "company" ? (
                          <div className="space-y-1">
                            <p className="text-sm">{user.description}</p>
                            <p className="text-xs text-muted-foreground">
                              {user.website} • {user.employees} employees
                            </p>
                          </div>
                        ) : (
                          <div className="space-y-1">
                            <div className="flex flex-wrap gap-1">
                              {user.skills?.slice(0, 3).map((skill) => (
                                <Badge key={skill} variant="outline" className="text-xs">
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                            <p className="text-xs text-muted-foreground">
                              {user.experience} • {user.location}
                            </p>
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-2">
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          {new Date(user.registeredAt).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-4 py-2">
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            onClick={() => handleVerify(user.id)}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <Check className="h-4 w-4 mr-1" />
                            Verify
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleReject(user.id)}
                            className="text-red-600 border-red-200 hover:bg-red-50"
                          >
                            <X className="h-4 w-4 mr-1" />
                            Reject
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}
      </TabsContent>
    </Tabs>
  )
}

export default VerifyTab
