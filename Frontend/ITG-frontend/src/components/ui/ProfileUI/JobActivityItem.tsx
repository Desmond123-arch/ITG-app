import React from 'react'
import { Button } from '../button'
import { ItgIcon } from '@/assets/images'
import { Bookmark, BookmarkCheck } from 'lucide-react'
import { Link } from 'react-router-dom'

interface Props{
  isSaved?: boolean
  isApplied?: boolean
}

const JobActivityItem: React.FC<Props> = ({isSaved, isApplied}) => {
  return (
    <div className='flex w-full justify-between gap-2 border-b-[1px] hover:bg-blue-50 transition-all'>
        <div className='flex-1 pl-4 py-2'>
            <Link to={`/job/1`} className='group'>
              <div className='flex gap-2 items-center'>
                  <img className='w-5 h-5 rounded-sm' src={ItgIcon}/>
                  <h1>CodenBox</h1>
              </div>
              <h1 className='font-semibold text-xl group-hover:text-blue-600 transition-colors'>Frontend Developer</h1>
              <p>Greater Accra</p>
              <p>Ghc 5000</p>
            </Link>
            {
              isApplied ?
                <Button disabled={true} className='mt-2 bg-gray-500'>Applied</Button>:
                <Button className='mt-2'>Apply Now</Button>
            }
            
        </div>
        <div className='flex flex-col justify-between items-end pr-4 py-2'>
            {
              isSaved ? <BookmarkCheck color='green'/> : <Bookmark/>
            }
            <p>30d+</p>
        </div>
    </div>
  )
}

export default JobActivityItem