import { Pencil, X, MapPin, Hammer } from 'lucide-react';
import React, { useState } from 'react';
import { Button } from '../../button';
import ProfileSection from '../ProfileTabUI/ProfileSection';
import ResumeCard from '../ProfileTabUI/ResumeCard';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import EditableField from './EditableField';
import MultiSelectSearch from '../ProfileTabUI/MultiSelectSearch';
import { skills } from '@/data/skills';
import { locations } from '@/data/location';

const ProfileTab: React.FC = () => {
    const user = useSelector((state: RootState) => state.auth.user);
    console.log('user: ', user);

    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        firstName: user?.name?.split(' ')[0] || '',
        lastName: user?.name?.split(' ')[1] || '',
        email: user?.email || '',
        phone: user?.phone || '',
        address: user?.address || '',
        // employmentStatus: user?.employmentStatus || '',
        // university: user?.university || '',
        // degree: user?.degree || '',
        imageUrl: user?.imageUrl,
        disabilityType: user?.job_seeker?.disability_type || '',
        preferred_job_location: user?.job_seeker?.preferred_job_location,
        resume_url: user?.job_seeker?.resume_url,
        skills: user?.job_seeker?.skills || [],
    });

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
                    <EditableField type='text' title="First Name" name="firstName" placeholder='John' value={formData.firstName} isEditing={isEditing} onChange={handleChange} />
                    <EditableField type='text' title="Last Name" name="lastName" placeholder='Opoku' value={formData.lastName} isEditing={isEditing} onChange={handleChange} />
                    <EditableField type='email' title="Email" name="email" placeholder='opokujohn@example.com' value={formData.email} isEditing={isEditing} onChange={handleChange} />
                    <EditableField type='number' minLength={10} maxLength={10} title="Phone Number" name="phone" placeholder='0123456789' value={formData.phone} isEditing={isEditing} onChange={handleChange} />
                    <EditableField type='text' title="Disability Type" name="disabilityType" placeholder='None' value={formData.disabilityType} isEditing={isEditing} onChange={handleChange} />
                    <EditableField type='text' title="Address" name="address" placeholder='Accra, Ghana' value={formData.address} isEditing={isEditing} onChange={handleChange} />
                </main>
            </section>

            <section>
                <header className="px-5 py-3">
                    <h1 className="font-semibold text-xl">Education & Employment</h1>
                </header>
                <main className="flex flex-col gap-6 px-5 py-3 border-b-[1px] pb-5">
                    <EditableField type='text' placeholder='Employed' title="Employment Status" name="employmentStatus" value={formData.employmentStatus} isEditing={isEditing} onChange={handleChange} />
                    <EditableField type='text' title="University or College" name="university" placeholder='University of Ghana' value={formData.university} isEditing={isEditing} onChange={handleChange} />
                    <EditableField type='text' title="Degree Type" name="degree" placeholder="Bachelor Degree" value={formData.degree} isEditing={isEditing} onChange={handleChange} />
                </main>
            </section>

            <section>
                <header className="px-5 py-3">
                    <h1 className="font-semibold text-xl">Job Preferences & Skills</h1>
                </header>
                <main className="flex flex-col gap-6 px-5 py-3 border-b-[1px] pb-5">
                    <ProfileSection title="Job Location Preference">
                        <MultiSelectSearch
                        isEditing={isEditing}
                        selectedValues={formData.preferred_job_location}
                        onSelectionChange={(values) =>
                            setFormData((prev) => ({ ...prev, preferred_job_location: values }))
                        }
                        options={locations}
                        placeholder="Select job locations..."
                        icon={<MapPin className="w-4 h-4" />}
                        searchPlaceholder="Search locations..."
                        emptyText="No locations found."
                        />
                    </ProfileSection>

                    <ProfileSection title="Skills">
                        <MultiSelectSearch
                        isEditing={isEditing}
                        selectedValues={formData.skills}
                        onSelectionChange={(values) =>
                            setFormData((prev) => ({ ...prev, skills: values }))
                        }
                        options={skills}
                        placeholder="Select skills..."
                        icon={<Hammer className="w-4 h-4" />}
                        searchPlaceholder="Search skills..."
                        emptyText="No skills found."
                        />
                    </ProfileSection>
                    </main>

            </section>

            <section className="flex flex-col gap-6 px-5 py-3">
                <h1 className="font-semibold text-xl">My Resume</h1>

                <p>Pre-fill job applications when you add a resume.</p>
                <p>Your resume can be visible to hiring employers or you can keep it hidden.</p>
                {
                    user?.job_seeker?.resume_url ?
                    <>
                        <ResumeCard user={user}/>
                    </>:
                    <Button>Upload a Resume</Button>
                }
                
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
