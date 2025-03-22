import { Ellipsis, Eye, FileBadge, Pencil } from 'lucide-react'
import React from 'react'
import { Button } from '../../button'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

const ProfileTab: React.FC = () => {
    return (
        <div className='bg-white shadow-sm rounded-md'>
            <header className='flex justify-between items-center px-5 py-3 border-b-[1px]'>
                <h1 className='font-semibold text-xl'>Personal Information</h1>
                <Button><Pencil/> Edit</Button>
            </header>
            <main className='flex flex-col w-full gap-6 px-5 py-3 border-b-[1px] pb-5'>
                <div className='flex flex-col'>
                    <h2 className='text-sm'>First Name</h2>
                    <h1 className='text-[18px] text-black'>John</h1>
                </div>
                <div className='flex flex-col'>
                    <h2 className='text-sm'>Last Name</h2>
                    <h1 className='text-[18px] text-black'>John</h1>
                </div>
                <div className='flex flex-col'>
                    <h2 className='text-sm'>Location</h2>
                    <h1 className='text-[18px] text-black'>Accra, Ghana</h1>
                </div>
                <div className='flex flex-col'>
                    <h2 className='text-sm'>Employment Status</h2>
                    <h1 className='text-[18px] text-black'>Unemployed</h1>
                </div>
                <div className='flex flex-col'>
                    <h2 className='text-sm'>University or College</h2>
                    <h1 className='text-[18px] text-black'>Dropout</h1>
                </div>
                <div className='flex flex-col'>
                    <h2 className='text-sm'>Degree Type</h2>
                    <h1 className='text-[18px] text-black'>---</h1>
                </div>
            </main>
            <div className='flex flex-col w-full gap-6 px-5 py-3'>
                <h1 className='font-semibold text-xl'>My Resume</h1>
                <p>Pre-fill job applications when you add a resume.</p>
                <p>Your resume can be visible to hiring employers or you can keep it hidden</p>
                <div className='border rounded-md flex p-5 w-max gap-5'>
                    <div className='relative top-1'>
                        <FileBadge/>
                    </div>
                    <div className='flex flex-col'>
                        <h1 className='font-semibold text-black text-xl'>
                            John Doe Resume.pdf
                        </h1>
                        <p>Date added: 12/1/2024</p>
                        <div className='flex gap-2'>
                            <Eye/>
                            <p>Visible to hiring employers</p>
                        </div>
                    </div>
                    <div>
                        <Popover>
                            <PopoverTrigger>
                                <Ellipsis/>
                            </PopoverTrigger>
                            <PopoverContent>
                                <h1>Preview</h1>
                                <h1>Change</h1>
                                <h1>Download</h1>
                                <h1 className='text-red-500'>Delete</h1>
                            </PopoverContent>
                        </Popover>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileTab