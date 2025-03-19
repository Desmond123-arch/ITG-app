import React from 'react'
import { Input } from '@/components/ui/input'
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"

const Filters: React.FC = () => {
  return (
    <div className='flex flex-col gap-3'>
      <h1 className='text-xl font-semibold'>Filter</h1>
      <div className='rounded-md bg-white'>
        {
          Array.from({length: 2}).map((_item, index) => (
            <div className=''>
              <span>Location</span>
              <Input placeholder='City'/>
            </div>
          ))
        }
        <div>
          <span>Remote Worker</span>
          <Switch/>
        </div>
        <div>
          <span>Type Works</span>
          {
            Array.from({length: 4}).map((_item, index) => (
              <div key={index}>
                <Checkbox/>
                <span>Intenship</span>
              </div>
            ))
          }
        </div>
        <div>
          <span>Experience</span>
          {
            Array.from({length: 4}).map((_item, index) => (
              <div key={index}>
                <Checkbox/>
                <span>Fresh Graduate</span>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Filters