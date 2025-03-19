import { ItgIcon } from '@/assets/images'
import { Bookmark, MapPin, UsersRound } from 'lucide-react'
import React from 'react'

const JobItem: React.FC = () => {
  return (
    <div className='rounded-md bg-white shadow-sm p-3 flex flex-col gap-4 max-w-[285px]'>
        <div className='flex gap-2'>
            <div className='rounded-full overflow-hidden w-12 h-12'>
                <img className='w-full h-full object-cover' src={ItgIcon} alt="Job Image" />
            </div>
            <div className='flex flex-col'>
                <h1 className='font-semibold'>3D Illustrator</h1>
                <p className='text-gray-500 text-sm'>Gojek</p>
            </div>
        </div>
        <p className='text-gray-800 text-[16px]'>We're looking for top illustrators proficient in Cinema 4D</p>
        <div className='flex justify-between'>
            <div className='flex gap-5'>
                <div className='flex items-center gap-1'>
                    <UsersRound size={15} className='text-black/50'/>
                    <span className='text-sm'>120</span>
                </div>
                <div className='flex items-center gap-1'>
                    <MapPin size={15} className='text-black/50'/>
                    <span className='text-sm'>Singapore</span>
                </div>
            </div>
            <Bookmark size={15} className='text-black/50'/>
        </div>
    </div>
  )
}

export default JobItem