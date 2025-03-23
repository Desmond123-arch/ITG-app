import { Pencil } from 'lucide-react';
import React from 'react';
import { Button } from '../../button';
import InfoItem from './InfoItem';
import ProfileSection from '../ProfileTabUI/ProfileSection';
import ResumeCard from '../ProfileTabUI/ResumeCard';
import TagList from '../ProfileTabUI/TagList';

const ProfileTab: React.FC = () => {
    return (
        <div className="bg-white shadow-sm rounded-md">
            <section>
                <header className="flex justify-between items-center px-5 py-3 border-b-[1px]">
                    <h1 className="font-semibold text-xl">Personal Information</h1>
                    <Button><Pencil /> Edit</Button>
                </header>
                <main className="flex flex-col w-full gap-6 px-5 py-3 border-b-[1px] pb-5">
                    <InfoItem title="First Name" value="John" />
                    <InfoItem title="Last Name" value="John" />
                    <InfoItem title="Email" value="johndoeagain@gmail.com" />
                    <InfoItem title="Phone Number" value="0123456789" />
                    <InfoItem title="Disability Type" value="Something" />
                    <InfoItem title="Location" value="Accra, Ghana" />
                </main>
            </section>
            <section>
                <header className="px-5 py-3">
                    <h1 className="font-semibold text-xl">Education & Employment</h1>
                </header>
                <main className="flex flex-col w-full gap-6 px-5 py-3 border-b-[1px] pb-5">
                    <InfoItem title="Employment Status" value="Unemployed" />
                    <InfoItem title="University or College" value="Dropout" />
                    <InfoItem title="Degree Type" value="---" />
                </main>
            </section>
            <section>
                <header className="px-5 py-3">
                    <h1 className="font-semibold text-xl">Job Preferences & Skills</h1>
                </header>
                <main className="flex flex-col w-full gap-6 px-5 py-3 border-b-[1px] pb-5">
            <ProfileSection title="Job Location Preference">
                <TagList items={["Remote", "Accra"]} />
            </ProfileSection>
            
            <ProfileSection title="Skills">
                <TagList items={["Construction", "Programming"]} />
            </ProfileSection>
        </main>
            </section>
            <section className="flex flex-col w-full gap-6 px-5 py-3">
                <h1 className="font-semibold text-xl">My Resume</h1>
                <p>Pre-fill job applications when you add a resume.</p>
                <p>Your resume can be visible to hiring employers or you can keep it hidden.</p>
                <ResumeCard />
            </section>
        </div>
    );
};

export default ProfileTab;
