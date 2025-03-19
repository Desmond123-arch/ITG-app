import classNames from 'classnames'
import { LucideProps } from 'lucide-react'
import React from 'react'
import { NavLink } from 'react-router-dom'

interface Props{
    item: {
        url: string,
        title: string,
        icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>
    }
}
const LinkItem: React.FC<Props> = ({item}) => {
  return (
    <li>
            <NavLink
              to={item.url}
              className={({ isActive }) =>
                classNames(
                  "flex items-center gap-3 font-normal leading-5 rounded-md p-2 transition-colors",
                  {
                    "bg-white text-[#110d59] font-semibold": isActive,
                    "hover:bg-white/20": !isActive
                  }
                )
              }
            >
              <item.icon />
              <span className='text-sm'>{item.title}</span>
            </NavLink>
          </li>
  )
}

export default LinkItem