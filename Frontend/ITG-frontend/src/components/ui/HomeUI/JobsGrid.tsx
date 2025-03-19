import React from 'react'
import JobItem from './JobItem'

const JobsGrid: React.FC = () => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3'>
      {
        Array.from({length: 12}).map((_job, index) => (
            <JobItem key={index}/>
        ))
      }
    </div>
  )
}

export default JobsGrid