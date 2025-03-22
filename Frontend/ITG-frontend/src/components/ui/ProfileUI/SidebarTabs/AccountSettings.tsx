import { Pencil } from 'lucide-react';
import React from 'react';
import { Button } from '../../button';
import InfoItem from './InfoItem';
import ActionItem from '../SettingsTabUI/ActionItem';

const AccountSettings: React.FC = () => {
    return (
        <div className="bg-white shadow-sm rounded-md h-min">
            <header className="flex justify-between items-center px-5 py-3 border-b-[1px]">
                <h1 className="font-semibold text-xl">Account Settings</h1>
                <Button><Pencil /> Edit</Button>
            </header>
            <section className="flex flex-col w-full gap-6 px-5 py-3 border-b-[1px] pb-5">
                <InfoItem title="Email" value="johndoeagain@gmail.com" />
                <InfoItem title="Current Password" value="**********" />
            </section>
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
