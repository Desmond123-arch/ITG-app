import React, { useState } from 'react'
import { LogOut, Pencil } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DialogTrigger } from '@/components/ui/dialog'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store'
import { logout } from '@/store/authSlice'
import classNames from 'classnames'
import { ProfilePic } from '@/assets/images'
import ImageUploadModal from '../ImageUploadModal'

interface Props {
  currentTab: string
  setCurrentTab: React.Dispatch<React.SetStateAction<string>>
}

const ProfileSidebar: React.FC<Props> = ({ currentTab, setCurrentTab }) => {
  const user = useSelector((state: RootState) => state.auth.user)
  const dispatch = useDispatch()
  const tabs = ["Profile", "Job activity", "Notifications", "Account Settings"]

  const [previewImage, setPreviewImage] = useState<string>(ProfilePic)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const logoutUser = () => dispatch(logout())

  return (
    <>
      <div className='rounded-md shadow-sm px-5 py-3 flex w-full flex-col gap-3 bg-white h-min'>
        <section className='flex md:flex-col gap-4 md:gap-3 border-b-[1.5px] pb-5'>
          <div className='relative grid place-items-center'>
            <Avatar className="md:w-[130px] md:h-[130px] shadow-[0_5px_5px_#00000060,0_-1px_5px_#00000030] rounded-full overflow-hidden">
              <AvatarImage
                src={previewImage}
                className="w-full h-full object-cover object-center"
              />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>

            <button
              onClick={() => setIsModalOpen(true)}
              className='absolute bottom-0 hover:shadow-md left-[25px] md:left-[135px] p-[6px] border shadow-md rounded-full bg-white'
            >
              <Pencil className='w-3 h-3 md:w-6 md:h-6' />
            </button>
          </div>

          <div className='flex flex-col'>
            <h1 className='font-semibold text-2xl'>{user?.name}</h1>
            <p>Student at Some University</p>
          </div>
        </section>

        <section className='flex flex-col gap-3 border-b-[1.5px] pb-5'>
          <ul className='flex flex-col w-full gap-2'>
            {tabs.map((tab, index) => (
              <li
                key={index}
                className={classNames('py-2 pl-3 transition-all cursor-pointer', {
                  "border-l-4 font-semibold text-black": tab === currentTab
                })}
                onClick={() => setCurrentTab(tab)}
              >
                {tab}
              </li>
            ))}
          </ul>
        </section>

        <div className='flex justify-between items-center'>
          <p onClick={logoutUser} className='cursor-pointer'>Sign out</p>
          <LogOut onClick={logoutUser} className='cursor-pointer' size={20} />
        </div>
      </div>

      <ImageUploadModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        initialImage={previewImage}
        onUpdate={(img) => setPreviewImage(img)}
        title="Update Profile Picture"
      />
    </>
  )
}

export default ProfileSidebar
