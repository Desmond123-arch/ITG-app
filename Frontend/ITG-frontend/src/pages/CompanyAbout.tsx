"use client"
import { useState, useEffect } from "react"
import { ExternalLink } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { Link, useParams } from "react-router-dom"
import JobItem from "@/components/ui/HomeUI/JobItem"
import jobs from "@/data/JobsData"
import axios from "axios"
import { useQuery } from "@tanstack/react-query"
import { useSelector } from "react-redux"
import { RootState } from "@/store"

const fetchCompanyData = async (id: string, token: string | null) => {
    if (!token) throw new Error("No token provided");
    if (!id) throw new Error("No company ID provided");

    const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/employers/${id}`,
        {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        }
    )
    if(response.status !== 200) {
        throw new Error("Failed to fetch company data");
    }
    
    console.log("Company data fetched:", response.data.data)
    return response.data.data.employer
}

export default function CompanyAbout() {
    const [activeTab, setActiveTab] = useState("overview")
    const { id } = useParams() as {id: string}
    const token = useSelector((state: RootState) => state.auth.token)

    const {data, isLoading, isError} = useQuery({
        queryKey: ['company', id],
        queryFn: () => fetchCompanyData(id, token),
        enabled: !!id,
    })

    if (isLoading) {
        return <CompanyOverviewSkeleton />
    }

    if (isError || !data) {
        return <div className="max-w-5xl mx-auto p-4 md:p-6">Error loading company data.</div>
    }

    return (
        <div className="max-w-5xl mx-auto p-4 md:p-6">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="bg-green-900 h-20 relative"></div>

                <div className="px-4 md:px-6 pb-6 relative">
                    <div className="flex flex-col md:flex-row gap-4 items-start md:items-center -mt-10 md:-mt-16 mb-6">
                        <div className="relative h-20 w-20 md:h-24 md:w-24 rounded-lg overflow-hidden border-4 border-white bg-blue-500 flex items-center justify-center">
                            <img
                                src={data.company_logo || "/placeholder.svg"}
                                alt={`${data.company_name} logo`}
                                width={80}
                                height={80}
                                className="object-cover"
                            />
                        </div>

                        <div className="flex-1">
                            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{data.company_name}</h1>
                        </div>

                        <div className="flex gap-3 mt-4 md:mt-0 w-full md:w-auto">
                            <Button variant="default" className="flex-1 md:flex-none">
                                Contact
                            </Button>
                            <Button variant="outline" className="flex-1 md:flex-none" asChild>
                                <Link to={data.company_website_url} target="_blank" rel="noopener noreferrer">
                                    Visit Website <ExternalLink className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                        </div>
                    </div>

                    <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
                        <TabsList className="border-b w-full justify-start rounded-none bg-transparent h-auto p-0">
                            <TabsTrigger
                                value="overview"
                                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent py-2 px-4 font-medium"
                            >
                                Overview
                            </TabsTrigger>
                            <TabsTrigger
                                value="jobs"
                                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent py-2 px-4 font-medium"
                            >
                                Jobs
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="overview" className="pt-6">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                <div className="md:col-span-2 space-y-6">
                                    <div>
                                        <h2 className="text-xl font-semibold mb-3">About {data.company_name}</h2>
                                        <div className="text-gray-700 whitespace-pre-line">{data.company_description}</div>
                                    </div>

                                    {data.specialties && data.specialties.length > 0 && (
                                        <div>
                                            <h2 className="text-xl font-semibold mb-3">Specialties</h2>
                                            <div className="flex flex-wrap gap-2">
                                                {data.specialties.map((specialty: string, index: number) => (
                                                    <span key={index} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm">
                                                        {specialty}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-6">
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <h2 className="text-lg font-semibold mb-4">Company Details</h2>
                                        <dl className="space-y-3">
                                            <div>
                                                <dt className="text-sm text-gray-500">Website</dt>
                                                <dd className="text-sm">
                                                    <Link
                                                        to={data.company_website_url}
                                                        className="text-blue-600 hover:underline"
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        {data.company_website_url.replace(/^https?:\/\//, "")}
                                                    </Link>
                                                </dd>
                                            </div>

                                            <div>
                                                <dt className="text-sm text-gray-500">Email</dt>
                                                <dd className="text-sm">
                                                    <Link to={`mailto:${data.company_email}`} className="text-blue-600 hover:underline">
                                                        {data.company_email}
                                                    </Link>
                                                </dd>
                                            </div>

                                            {data.industry && (
                                                <div>
                                                    <dt className="text-sm text-gray-500">Industry</dt>
                                                    <dd className="text-sm">{data.industry}</dd>
                                                </div>
                                            )}

                                            {data.headquarters && (
                                                <div>
                                                    <dt className="text-sm text-gray-500">Headquarters</dt>
                                                    <dd className="text-sm">{data.headquarters}</dd>
                                                </div>
                                            )}

                                            {data.founded_year && (
                                                <div>
                                                    <dt className="text-sm text-gray-500">Founded</dt>
                                                    <dd className="text-sm">{data.founded_year}</dd>
                                                </div>
                                            )}

                                            {data.employee_count && (
                                                <div>
                                                    <dt className="text-sm text-gray-500">Company size</dt>
                                                    <dd className="text-sm">{data.employee_count} employees</dd>
                                                </div>
                                            )}
                                        </dl>
                                    </div>
                                </div>
                            </div>
                        </TabsContent>

                        <TabsContent value="jobs" className="w-full">
                            <div className='lg:mr-1 w-full'>
                                <h3 className='text-md font-bold text-gray-700 mt-4 md:mt-0 self-baseline ml-4 md:ml-0'>Related jobs</h3>
                                <div className="grid sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-3 mx-auto md:w-full place-items-center">
                                    {jobs.slice(0, 3).map((job, index) => (
                                        <JobItem key={index} job={job} />
                                    ))}
                                </div>
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    )
}

function CompanyOverviewSkeleton() {
    return (
        <div className="max-w-5xl mx-auto p-4 md:p-6">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="bg-gray-900 h-[150px]"></div>

                <div className="px-4 md:px-6 pb-6">
                    <div className="flex flex-col md:flex-row gap-4 items-start md:items-center -mt-10 md:-mt-16 mb-6">
                        <Skeleton className="h-20 w-20 md:h-24 md:w-24 rounded-lg" />

                        <div className="flex-1">
                            <Skeleton className="h-8 w-48 mb-2" />
                        </div>

                        <div className="flex gap-3 mt-4 md:mt-0 w-full md:w-auto">
                            <Skeleton className="h-10 w-24" />
                            <Skeleton className="h-10 w-32" />
                        </div>
                    </div>

                    <div className="border-b mb-6">
                        <div className="flex gap-4">
                            <Skeleton className="h-10 w-24" />
                            <Skeleton className="h-10 w-24" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="md:col-span-2 space-y-6">
                            <div>
                                <Skeleton className="h-6 w-40 mb-3" />
                                <div className="space-y-2">
                                    <Skeleton className="h-4 w-full" />
                                    <Skeleton className="h-4 w-full" />
                                    <Skeleton className="h-4 w-full" />
                                    <Skeleton className="h-4 w-3/4" />
                                </div>
                            </div>
                        </div>

                        <div>
                            <Skeleton className="h-64 w-full rounded-lg" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

