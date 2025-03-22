import React from 'react'
import JobActivityItem from './JobActivityItem'

const AppliedJobs: React.FC = () => {
    return (
        <main className='flex flex-col'>
            {
                Array.from({length: 4}).map((_i, index) => (
                    <JobActivityItem key={index} isApplied={true}/>
                ))
            }
        </main>
    )
}

export default AppliedJobs