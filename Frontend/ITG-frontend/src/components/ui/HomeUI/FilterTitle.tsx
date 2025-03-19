import React from 'react'

interface Props{
    title: string
}

const FilterTitle: React.FC<Props> = ({title}) => {
  return (
    <span className='text-sm font-semibold'>{title}</span>
  )
}

export default FilterTitle