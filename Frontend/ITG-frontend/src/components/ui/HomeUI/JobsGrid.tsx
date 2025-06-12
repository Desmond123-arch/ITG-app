import React from 'react'
import JobItem from './JobItem'
import jobs from '@/data/JobsData'

const JobsGrid: React.FC = () => {
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