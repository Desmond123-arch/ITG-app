import React from 'react'
import JobItem from './JobItem'
import { Job } from '@/types/Job'

interface Props{
    jobs: Array<Job>
}

const JobsGrid: React.FC<Props> = ({ jobs }) => {
  return (
    <div className='grid grid-cols-1 lg:flex flex-wrap md:grid-cols-2 gap-3'>
      {
        jobs.map((job, index) => (
            <JobItem job={job} key={index}/>
        ))
      }
    </div>
  )
}

export default JobsGrid