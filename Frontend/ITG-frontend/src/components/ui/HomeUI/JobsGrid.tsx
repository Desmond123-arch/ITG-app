import React from 'react'
import JobItem from './JobItem'
import jobs from '@/data/JobsData'

const JobsGrid: React.FC = () => {
  return (
    <div className='flex flex-wrap gap-3'>
      {
        jobs.map((job, index) => (
            <JobItem job={job} key={index}/>
        ))
      }
    </div>
  )
}

export default JobsGrid