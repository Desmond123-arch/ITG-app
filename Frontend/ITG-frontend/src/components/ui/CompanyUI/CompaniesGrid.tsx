import React from 'react'
import CompanyCard from './CompanyCard'
import Company from '@/types/Company'

interface Props{
    companies: Array<Company>
}

const CompaniesGrid: React.FC<Props> = ({ companies }) => {
    return (
        <div className='flex flex-col gap-3 w-full'>
            <div className='flex flex-col md:flex-row md:justify-between md:items-center'>
                <h1 className='text-xl font-semibold'>Companies</h1>
            </div>
            <div className='grid grid-cols-1 lg:grid-cols-4 md:grid-cols-3 gap-3'>
                {
                    companies.map((company, index) => (
                        <CompanyCard company={company} key={index}/>
                    ))
                }
            </div>
        </div>
    )
}

export default CompaniesGrid