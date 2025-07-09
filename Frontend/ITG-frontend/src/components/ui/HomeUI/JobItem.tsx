import { Job } from '@/types/Job'
import { Bookmark, MapPin, UsersRound } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

interface Props{
    job: Job
    page?: string;
}

const JobItem: React.FC<Props> = ({job, page}) => {
  return (
    <Link to={`/job/${job.jobId}`} className={`group rounded-md bg-white shadow-sm p-3 flex flex-col gap-4 min-w-[275px] ${page == "job" ? "" : "lg:w-[calc(33.33333%-12px)]"} hover:shadow-lg transition-all justify-between`}>
        <div className='flex gap-2'>
            <div className='rounded-full overflow-hidden w-12 h-12'>
                <img className='w-full h-full object-cover' src={job.companyLogo} alt="Job Image" />
            </div>
            <div className='flex flex-col'>
                <h1 className='font-semibold group-hover:text-blue-600 transition-colors leading-4'>{job.title}</h1>
                <p className='text-gray-500 text-sm'>{job.companyName}</p>
            </div>
        </div>
        <p className='text-gray-800 text-[16px]'>{job.description}</p>
        <div className='flex justify-between'>
            <div className='flex gap-2'>
                <div className='flex items-center gap-[2px]'>
                    <UsersRound size={20} className='text-black/50'/>
                    <span className='text-sm'>{job.status}</span>
                </div>
                <div className='flex items-center gap-1'>
                    <MapPin size={20} className='text-black/50'/>
                    <span className='text-sm'>{job.location}</span>
                </div>
            </div>
            <Bookmark size={20} className='text-black/50'/>
        </div>
    </Link>
  )
}

export default JobItem