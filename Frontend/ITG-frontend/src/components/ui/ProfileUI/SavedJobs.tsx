import React from 'react'
import JobActivityItem from './JobActivityItem'

const SavedJobs: React.FC = () => {
    return (
        <main className='flex flex-col'>
            {
                Array.from({length: 10}).map((_i, index) => (
                    <JobActivityItem key={index} isSaved={true}/>
                ))
            }
        </main>
    )
}

export default SavedJobs