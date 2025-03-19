import React from 'react'
import JobItem from './JobItem'

const JobsGrid: React.FC = () => {
  return (
    <div className='flex flex-wrap gap-3'>
      {
        Array.from({length: 12}).map((_job, index) => (
            <JobItem key={index}/>
        ))
      }
    </div>
  )
}

export default JobsGrid