import React from 'react'
import JobsGrid from './JobsGrid'
import FilterDrawer from './FilterDrawer'
import { Job } from '@/types/Job'

interface Props{
    jobs: Array<Job>
}

const RecommendedJobs: React.FC<Props> = ({jobs}) => {
    return (
        <div className='flex flex-col gap-3 w-full'>
            <div className='flex justify-between items-center'>
                <h1 className='text-xl font-semibold'>Recommended Job</h1>
                <h1 className='text-sm hidden md:block'>Remote Worker, Internship, Fresh graduate, Relevance</h1>
                <div className='sm:hidden'>
                    <FilterDrawer/>
                </div>
            </div>
            <JobsGrid jobs={jobs} />
        </div>
    )
}

export default RecommendedJobs