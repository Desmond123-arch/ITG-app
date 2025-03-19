import { ItgIcon } from '@/assets/images'
import Company from '@/types/Company'
import { Bookmark, MapPin } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

interface Props{
    company: Company
}
const CompanyCard: React.FC<Props> = ({company}) => {
  return (
    <Link to={`/company/${company.id}`} className='group rounded-md bg-white shadow-sm p-3 flex flex-col gap-4 w-[260px] min-h-[170px] max-w-[285px] hover:shadow-lg transition-all justify-between'>
        <div className='flex gap-2'>
            <div className='rounded-full overflow-hidden w-12 h-12'>
                <img className='w-full h-full object-cover' src={ItgIcon} alt="company Image" />
            </div>
            <div className='flex flex-col'>
                <h1 className='font-semibold group-hover:text-blue-600 transition-colors'>{company.name}</h1>
                <p className='text-gray-500 text-sm'>{company.type}</p>
            </div>
        </div>
        <p className='text-gray-800 text-[16px]'>
            {company.vacancy} Employee Vacancy
        </p>
        <div className='flex justify-between'>
            <div className='flex items-center gap-1'>
                <MapPin size={20} className='text-black/50'/>
                <span className='text-sm'>{company.location}</span>
            </div>
            <Bookmark size={20} className='text-black/50'/>
        </div>
    </Link>
  )
}

export default CompanyCard