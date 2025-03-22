import React from 'react'
import { ProfilePic } from '@/assets/images'
import { LogOut, Pencil } from 'lucide-react'
import classNames from 'classnames'

interface Props{
    currentTab: string
    setCurrentTab: React.Dispatch<React.SetStateAction<string>>
}

const ProfileSidebar: React.FC<Props> = ({currentTab, setCurrentTab}) => {
    const tabs = ["Profile", "Job activity", "Notifications", "Account Settings"]

    return (
        <div className='rounded-md h-full shadow-sm px-5 py-3 flex w-full flex-col gap-3 bg-white'>
            <section className='flex flex-col gap-3 border-b-[1.5px] pb-5'>
                <div className='relative'>
                    <div className='relative w-[130px] shadow-[0_5px_5px_#00000060,0_-1px_5px_#00000030]  h-[130px] rounded-full overflow-hidden'>
                        <img src={ProfilePic} className='w-full h-full object-cover' alt='Profile Picture'/>
                    </div>
                    <button className='absolute bottom-0 hover:shadow-md left-[95px] border-[1px] p-1 border-black rounded-full bg-white'>
                        <Pencil size={20}/>
                    </button>
                </div>
                <h1 className='font-semibold text-2xl'>John Doe</h1>
                <p>Student at Some University</p>
            </section>
            <section className='flex flex-col gap-3 border-b-[1.5px] pb-5'>
                <ul className='flex flex-col w-full gap-2'>
                    {
                        tabs.map((tab, index) => (
                            <li
                                key={index}
                                className={classNames('py-2 pl-3 transition-all cursor-pointer', {
                                    "border-l-4 font-semibold text-black": tab == currentTab
                                })}
                                onClick={() => {setCurrentTab(tab)}}
                                >
                                {tab}
                            </li>
                        ))
                    }
                </ul>
            </section>
            <div className='flex justify-between items-center cursor-pointer'>
                <p>Sign out</p>
                <LogOut size={20}/>
            </div>
        </div>
    )
}

export default ProfileSidebar