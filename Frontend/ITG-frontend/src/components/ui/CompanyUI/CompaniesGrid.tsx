import React from 'react'
import CompanyCard from './CompanyCard'
import companies from '@/data/CompaniesData'

const CompaniesGrid: React.FC = () => {
    return (
        <div className='flex flex-col gap-3 w-full'>
            <div className='flex flex-col md:flex-row md:justify-between md:items-center'>
                <h1 className='text-xl font-semibold'>Companies</h1>
            </div>
            <div className='flex flex-wrap gap-3'>
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