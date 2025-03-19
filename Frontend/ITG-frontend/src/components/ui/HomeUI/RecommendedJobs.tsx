import React from 'react'
import JobsGrid from './JobsGrid'

const RecommendedJobs: React.FC = () => {
    return (
        <div className='flex flex-col gap-3 w-full'>
            <div className='flex flex-col md:flex-row md:justify-between md:items-center'>
                <h1 className='text-xl font-semibold'>Recommended Job</h1>
                <h1 className='text-sm'>Remote Worker, Internship, Fresh graduate, Relevance</h1>
            </div>
            <JobsGrid/>
        </div>
    )
}

export default RecommendedJobs