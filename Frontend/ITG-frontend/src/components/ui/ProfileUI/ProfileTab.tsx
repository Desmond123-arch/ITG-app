import { Edit } from 'lucide-react'
import React from 'react'
import { Button } from '../button'

const ProfileTab: React.FC = () => {
    return (
        <div>
            <div>
            <header>
                <h1>Personal Information</h1>
                <Button><Edit/> Edit</Button>
            </header>
            <main className='grid grid-cols-2'>
                <div className='flex flex-col gap-2'>
                <h1>First Name</h1>
                <p>John</p>
                </div>
            </main>
            </div>
        </div>
    )
}

export default ProfileTab