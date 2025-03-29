import JobActivityTab from '@/components/ui/ProfileUI/SidebarTabs/JobActivityTab'
import ProfileSidebar from '@/components/ui/ProfileUI/ProfileSidebar'
import ProfileTab from '@/components/ui/ProfileUI/SidebarTabs/ProfileTab'
import React, { useState } from 'react'
import NotificationsTab from '@/components/ui/ProfileUI/SidebarTabs/NotificationsTab'
import AccountSettings from '@/components/ui/ProfileUI/SidebarTabs/AccountSettings'

const Profile: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<string>("Profile")

  return (
    <div className='md:grid flex flex-col gap-5 grid-cols-[250px_auto]'>
      <ProfileSidebar currentTab={currentTab} setCurrentTab={setCurrentTab}/>
      {
        currentTab == "Profile" ? <ProfileTab/> :
        currentTab == "Job activity" ? <JobActivityTab/> :
        currentTab == "Notifications" ? <NotificationsTab/> : <AccountSettings/>
      }
    </div>
  )
}

export default Profile