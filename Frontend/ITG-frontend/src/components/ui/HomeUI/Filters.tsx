import React from 'react'
import { Input } from '@/components/ui/input'
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import FilterTitle from './FilterTitle'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const Filters: React.FC = () => {
  const filters: Array<string> = ["Intership", "Part-Time", "Freelance", "Full-Time"]
  const experiences: Array<string> = ["Fresh Graduate", "1 - 3 years", "3 - 5 years", "5 - 10 years", "10+ years"]

  return (
    <div className='flex flex-col gap-3'>
      <h1 className='text-xl font-semibold'>Filter</h1>
      <div className='rounded-md bg-white shadow-md px-5 py-3 w-[200px]'>
        <div className='flex flex-col gap-1 border-b pb-4'>
          <FilterTitle title='Location'/>
          <Input placeholder='City' className='bg-[#f1f2f4]/70'/>
        </div>
        <div className='flex flex-col gap-1 border-b py-4'>
          <FilterTitle title='Show By'/>
          <Select>
            <SelectTrigger className="w-full bg-[#f1f2f4]/70">
              <SelectValue placeholder="Relevant"/>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="latest">Latest</SelectItem>
              <SelectItem value="oldest">Oldest</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className='py-4 border-b items-center flex justify-between'>
          <FilterTitle title='Remote Worker'/>
          <Switch className='data-[state=checked]:bg-green-500'/>
        </div>
        <div className='py-4 border-b flex flex-col gap-2'>
          <FilterTitle title='Type Works'/>
          <div>
            {
              filters.map((filter, index) => (
                <div key={index} className='flex items-center gap-2'>
                  <Checkbox className="border-black/50"/>
                  <span>{filter}</span>
                </div>
              ))
            }
          </div>
        </div>
        <div className='py-4 flex flex-col gap-2'>
        <FilterTitle title='Experience'/>
          <div>
            {
              experiences.map((experience, index) => (
                <div key={index} className='flex items-center gap-2'>
                  <Checkbox className="border-black/50"/>
                  <span>{experience}</span>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Filters