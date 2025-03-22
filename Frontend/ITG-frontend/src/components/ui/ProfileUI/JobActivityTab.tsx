import { Bookmark } from 'lucide-react'
import React from 'react'
import { Button } from '../button'
import { ItgIcon } from '@/assets/images'

const JobActivityTab: React.FC = () => {
    const tabs = ["Saved", "Applied"]

    return (
        <div className='bg-white shadow-sm rounded-md'>
            <header className='flex justify-between items-center px-5 py-3 border-b-[1px] pb-5'>
                <h1 className='font-semibold text-xl'>Job Activity</h1>
            </header>
            <ul className='flex w-full gap-6 px-5 py-3 border-b-[1px] pb-5'>
                {
                    tabs.map((tab, index) => (
                        <li key={index}>{tab}</li>
                    ))
                }
            </ul>
            <main className='flex flex-col gap-1'>
                {
                    Array.from({length: 10}).map((_i, index) => (
                        <div className='flex w-full justify-between gap-2 border-b-[1px] hover:bg-blue-50 transition-all'>
                            <div className='flex-1 pl-4 py-2'>
                                <div className='flex gap-2 items-center'>
                                    <img className='w-5 h-5 rounded-sm' src={ItgIcon}/>
                                    <h1>CodenBox</h1>
                                </div>
                                <h1 className='font-semibold text-xl'>Frontend Developer</h1>
                                <p>Greater Accra</p>
                                <p>Ghc 5.5</p>
                                <Button>Apply Now</Button>
                            </div>
                            <div className='flex flex-col justify-between items-end pr-4 py-2'>
                                <Bookmark/>
                                <p>30d+</p>
                            </div>
                        </div>
                    ))
                }
            </main>
        </div>
    )
}

export default JobActivityTab