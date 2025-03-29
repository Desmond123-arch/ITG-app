import { Pencil, StopCircle } from 'lucide-react';
import React, { useState } from 'react';
import { Button } from '../../button';
import InfoItem from './InfoItem';
import ActionItem from '../SettingsTabUI/ActionItem';
import FormItem from '../FormItem';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { editAccountSettingSchema } from '@/validationSchemas/accountSettingSchema';
import { zodResolver } from '@hookform/resolvers/zod';

type FormDataType = z.infer<typeof editAccountSettingSchema>

const AccountSettings: React.FC = () => {
    const [editData, setEditData] = useState<boolean>(true)
    const [userData, setTempUserData] = useState<{email:string, password: string}>({
        email:'johndoeagain@gmail.com',
        password: 'someone'
    })
    const [tempData, setTempData] = useState<FormDataType>({
        email:'johndoeagain@gmail.com',
        oldPassword: '',
        confirmPassword: '',
        newPassword: ''
    })

    const {register, handleSubmit, formState: {errors}} = useForm<FormDataType>({
        resolver: zodResolver(editAccountSettingSchema)
    })

    const onSubmit = handleSubmit((data) => {
        console.log('submitting data')
    })

    return (
        <div className="bg-white shadow-sm rounded-md h-min">
            <header className="flex justify-between items-center px-5 py-3 border-b-[1px]">
                <h1 className="font-semibold text-xl">Account Settings</h1>
                {
                    editData
                    ?<Button variant={'destructive'} onClick={() => {setEditData(false)}}><StopCircle /> Cancel</Button>
                    :<Button onClick={() => {setEditData(true)}}><Pencil /> Edit</Button>
                }
            </header>
            {
                editData ? 
                <form onSubmit={onSubmit} className="flex flex-col w-full gap-6 px-5 py-3 border-b-[1px] pb-5">
                    <div className="flex flex-col gap-1">
                        <label className="text-sm">email</label>
                        <input {...register('email')} className='border rounded-sm px-2 py-1' placeholder='enter email' value={tempData.email}/>
                    </div>
                    <FormItem label='Email' value={tempData.email} type='text' placeholder='JohnDoe@gmail.com'/>
                    <FormItem label='Confirm Password' value={tempData.confirmPassword} type='password' placeholder='Confirm password'/>
                    <FormItem label='New Password' value={tempData.newPassword} type='password' placeholder='New password'/>
                    <FormItem label='Current Password' value={tempData.oldPassword} type='password' placeholder='Current Password'/>
                    <div className='w-full flex justify-end'>
                        <Button className='min-w-[100px]'>Save</Button>
                    </div>
                </form>
                : <section className="flex flex-col w-full gap-6 px-5 py-3 border-b-[1px] pb-5">
                    <InfoItem title="Email" value={userData.email} />
                    <InfoItem title="Current Password"  isHidden={true} value={userData.password} />
                </section>
            }
            
            <section className="flex flex-col w-full gap-6 px-5 py-3">
                <h1 className="font-semibold text-lg">Account Control</h1>
                <ActionItem 
                    title="Deactivate Account" 
                    description="Temporarily disable your account, restricting access and visibility. You can reactivate it anytime." 
                    actionLabel="Deactivate" 
                    actionVariant="destructive" 
                />
                <ActionItem 
                    title="Delete Account" 
                    description="Permanently delete your account. This action cannot be undone." 
                    actionLabel="Delete" 
                    actionVariant="destructive" 
                />
            </section>
        </div>
    );
};

export default AccountSettings;
