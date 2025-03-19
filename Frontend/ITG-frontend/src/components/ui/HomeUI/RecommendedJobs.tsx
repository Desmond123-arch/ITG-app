import React from 'react'
import JobsGrid from './JobsGrid'
import FilterDrawer from './FilterDrawer'

const RecommendedJobs: React.FC = () => {
    return (
        <div className='flex flex-col gap-3 w-full'>
            <div className='flex justify-between'>
                <h1 className='text-xl font-semibold'>Recommended Job</h1>
                <h1 className='text-sm hidden md:block'>Remote Worker, Internship, Fresh graduate, Relevance</h1>
                <FilterDrawer/>
            </div>
            <JobsGrid/>
        </div>
    )
}

export default RecommendedJobs