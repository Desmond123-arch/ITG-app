import React, { useState } from 'react'
import classNames from 'classnames'
import SavedJobs from './SavedJobs'
import AppliedJobs from './AppliedJobs'

const JobActivityTab: React.FC = () => {
    const tabs = ["Saved", "Applied"]
    const [activeTab, setActiveTab] = useState<string>(tabs[0])

    return (
        <div className='bg-white shadow-sm rounded-md max-w-[500px]'>
            <header className='flex justify-between items-center px-5 py-3 border-b-[1px]'>
                <h1 className='font-semibold text-xl'>Job Activity</h1>
            </header>
            <div className="relative w-full">
                <ul className="flex w-full gap-6 px-5 border-b-[1px] relative">
                    {tabs.map((tab, index) => (
                        <li
                            key={index}
                            onClick={() => setActiveTab(tab)}
                            className={classNames(
                                "tab cursor-pointer px-3 py-3 relative transition-all",
                                { "active font-semibold": tab === activeTab }
                            )}
                        >
                            {tab}
                        </li>
                    ))}
                </ul>
            </div>
            {
                activeTab == "Saved" ? <SavedJobs/> : <AppliedJobs/>
            }
        </div>
    )
}

export default JobActivityTab