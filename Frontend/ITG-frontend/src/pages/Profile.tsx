import ProfileSidebar from '@/components/ui/ProfileUI/ProfileSidebar'
import ProfileTab from '@/components/ui/ProfileUI/ProfileTab'
import React, { useState } from 'react'

const Profile: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<string>("Profile")

  return (
    <div className='grid gap-5 grid-cols-[250px_auto]'>
      <ProfileSidebar currentTab={currentTab} setCurrentTab={setCurrentTab}/>
      <ProfileTab/>
    </div>
  )
}

export default Profile