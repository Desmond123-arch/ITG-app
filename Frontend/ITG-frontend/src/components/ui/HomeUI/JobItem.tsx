import { ItgIcon } from '@/assets/images'
import { Job } from '@/types/Job'
import { Bookmark, MapPin, UsersRound } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

interface Props{
    job: Job
}

const JobItem: React.FC<Props> = ({job}) => {
  return (
    <Link to={`/job/${job.id}`} className='group rounded-md bg-white shadow-sm p-3 flex flex-col gap-4 min-h-[190px] md:w-[275px] w-full hover:shadow-lg transition-all justify-between'>
        <div className='flex gap-2'>
            <div className='rounded-full overflow-hidden w-12 h-12'>
                <img className='w-full h-full object-cover' src={ItgIcon} alt="Job Image" />
            </div>
            <div className='flex flex-col'>
                <h1 className='font-semibold group-hover:text-blue-600 transition-colors'>{job.title}</h1>
                <p className='text-gray-500 text-sm'>{job.employerId}</p>
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