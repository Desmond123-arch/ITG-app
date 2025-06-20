import { Pencil, X } from 'lucide-react';
import React, { useState } from 'react';
import { Button } from '../../button';
import ProfileSection from '../ProfileTabUI/ProfileSection';
import ResumeCard from '../ProfileTabUI/ResumeCard';
import TagList from '../ProfileTabUI/TagList';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import EditableField from './EditableField';

const ProfileTab: React.FC = () => {
    const user = useSelector((state: RootState) => state.auth.user);

    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        firstName: user?.name?.split(' ')[0] || '',
        lastName: user?.name?.split(' ')[1] || '',
        email: user?.email || '',
        phone: user?.phone || '',
        disabilityType: 'Something',
        location: 'Accra, Ghana',
        employmentStatus: 'Unemployed',
        university: 'Dropout',
        degree: '---',
        jobLocationPreferences: ['Remote', 'Accra'],
        skills: ['Construction', 'Programming'],
    });

    const handleMultiSelectChange = (e: React.ChangeEvent<HTMLSelectElement>, field: 'skills' | 'jobLocationPreferences') => {
        const selected = Array.from(e.target.selectedOptions, (option) => option.value);
        setFormData((prev) => ({
            ...prev,
            [field]: [...new Set([...prev[field], ...selected])],
        }));
    };

    const handleRemoveItem = (field: 'skills' | 'jobLocationPreferences', valueToRemove: string) => {
        setFormData((prev) => ({
            ...prev,
            [field]: prev[field].filter((v) => v !== valueToRemove),
        }));
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
        setIsEditing(false);
    };

    return (
        <div className="bg-white shadow-sm rounded-md">
            <section>
                <header className="flex justify-between items-center px-5 py-3 border-b-[1px]">
                    <h1 className="font-semibold text-xl">Personal Information</h1>
                    {
                        isEditing ? (
                            <Button variant="destructive" onClick={() => setIsEditing(false)}>
                                <X /> Cancel
                            </Button>
                        ) : (
                            <Button variant="default" onClick={() => setIsEditing(true)}>
                                <Pencil /> Edit
                            </Button>
                        )
                    }
                </header>
                <main className="flex flex-col gap-6 px-5 py-3 border-b-[1px] pb-5">
                    <EditableField type='text' title="First Name" name="firstName" value={formData.firstName} isEditing={isEditing} onChange={handleChange} />
                    <EditableField type='text' title="Last Name" name="lastName" value={formData.lastName} isEditing={isEditing} onChange={handleChange} />
                    <EditableField type='email' title="Email" name="email" value={formData.email} isEditing={isEditing} onChange={handleChange} />
                    <EditableField type='number' minLength={10} maxLength={10} title="Phone Number" name="phone" value={formData.phone} isEditing={isEditing} onChange={handleChange} />
                    <EditableField type='text' title="Disability Type" name="disabilityType" value={formData.disabilityType} isEditing={isEditing} onChange={handleChange} />
                    <EditableField type='text' title="Location" name="location" value={formData.location} isEditing={isEditing} onChange={handleChange} />
                </main>
            </section>

            <section>
                <header className="px-5 py-3">
                    <h1 className="font-semibold text-xl">Education & Employment</h1>
                </header>
                <main className="flex flex-col gap-6 px-5 py-3 border-b-[1px] pb-5">
                    <EditableField type='text' title="Employment Status" name="employmentStatus" value={formData.employmentStatus} isEditing={isEditing} onChange={handleChange} />
                    <EditableField type='text' title="University or College" name="university" value={formData.university} isEditing={isEditing} onChange={handleChange} />
                    <EditableField type='text' title="Degree Type" name="degree" value={formData.degree} isEditing={isEditing} onChange={handleChange} />
                </main>
            </section>

            <section>
                <header className="px-5 py-3">
                    <h1 className="font-semibold text-xl">Job Preferences & Skills</h1>
                </header>
                <main className="flex flex-col gap-6 px-5 py-3 border-b-[1px] pb-5">
                    <ProfileSection title="Job Location Preference">
                        <TagList
                            items={formData.jobLocationPreferences}
                            onRemove={isEditing ? (item) => handleRemoveItem('jobLocationPreferences', item) : undefined}
                        />
                        {isEditing && (
                            <select
                                multiple
                                className="border border-gray-300 p-2 rounded mt-2"
                                onChange={(e) => handleMultiSelectChange(e, 'jobLocationPreferences')}
                            >
                                <option value="Remote">Remote</option>
                                <option value="Accra">Accra</option>
                                <option value="Kumasi">Kumasi</option>
                                <option value="Tamale">Tamale</option>
                            </select>
                        )}
                    </ProfileSection>

                    <ProfileSection title="Skills">
                        <TagList
                            items={formData.skills}
                            onRemove={isEditing ? (item) => handleRemoveItem('skills', item) : undefined}
                        />
                        {isEditing && (
                            <select
                                multiple
                                className="border border-gray-300 p-2 rounded mt-2"
                                onChange={(e) => handleMultiSelectChange(e, 'skills')}
                            >
                                <option value="Construction">Construction</option>
                                <option value="Programming">Programming</option>
                                <option value="Design">Design</option>
                                <option value="Writing">Writing</option>
                            </select>
                        )}
                    </ProfileSection>
                </main>
            </section>

            <section className="flex flex-col gap-6 px-5 py-3">
                <h1 className="font-semibold text-xl">My Resume</h1>
                <p>Pre-fill job applications when you add a resume.</p>
                <p>Your resume can be visible to hiring employers or you can keep it hidden.</p>
                <ResumeCard />
            </section>

            {isEditing && (
                <div className="flex justify-end px-5 py-3">
                    <Button onClick={handleSubmit}>Submit</Button>
                </div>
            )}
        </div>
    );
};

export default ProfileTab;
