import { Pencil, X, Hammer } from 'lucide-react';
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Button } from '../../button';
import ProfileSection from '../ProfileTabUI/ProfileSection';
import ResumeCard from '../ProfileTabUI/ResumeCard';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import EditableField from './EditableField';
import MultiSelectSearch from '../ProfileTabUI/MultiSelectSearch';
import { skills } from '@/data/skills';
import cn from 'classnames'
// import { locations } from '@/data/location';
import axios from 'axios';
import { update } from '@/store/authSlice';
import { User } from '@/types/User';

const ProfileTab: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const token = useSelector((state: RootState) => state.auth.token);
  const role = useSelector((state: RootState) => state.auth.role);
  const dispatch = useDispatch()

  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const { register, handleSubmit, control, reset, watch } = useForm({
    defaultValues: {
      firstName: user?.name?.split(' ')[0] || '',
      lastName: user?.name?.split(' ')[1] || '',
      email: user?.email || '',
      phone: user?.phone || '',
      address: user?.address || '',
      imageUrl: user?.imageUrl || '',
      disabilityType: user?.job_seeker?.disability_type || '',
      preferred_job_location: user?.job_seeker?.preferred_job_location || '',
      resume_url: user?.job_seeker?.resume_url || '',
      skills: user?.job_seeker?.skills || [],
    }
  });

  const onSubmit = async (data: any) => {
    const isSameAsCurrent = () => {
      const currentData = {
        firstName: user?.name?.split(' ')[0] || '',
        lastName: user?.name?.split(' ')[1] || '',
        email: user?.email || '',
        phone: user?.phone || '',
        address: user?.address || '',
        imageUrl: user?.imageUrl || '',
        disabilityType: user?.job_seeker?.disability_type || '',
        preferred_job_location: user?.job_seeker?.preferred_job_location || '',
        resume_url: user?.job_seeker?.resume_url || '',
        skills: JSON.stringify(user?.job_seeker?.skills || []),
      };

      const formValues = {
        ...data,
        skills: JSON.stringify(data.skills),
      };
      type CurrentDataKeys = keyof typeof currentData;

      return (Object.keys(currentData) as CurrentDataKeys[]).every(
        (key) => currentData[key] === formValues[key]
      ) && !resumeFile;
    };
    
    if (isSameAsCurrent()) {
      setIsEditing(false);
      return;
    }

    setIsLoading(true)
    try {
      let uploadedResumeUrl = data.resume_url;

      if (resumeFile) {
        const formData = new FormData();
        formData.append('file', resumeFile);

        const uploadResponse = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/files/upload?isUpdate=true&email=${user?.email}&bucketName=resumes`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data',
            },
          }
        );

        uploadedResumeUrl = uploadResponse.data.data.publicUrl;
      }

      const body = {
        name: `${data.firstName} ${data.lastName}`,
        email: data.email,
        phone: data.phone,
        address: data.address,
        imageUrl: data.imageUrl,
        disability_type: data.disabilityType,
        skills: data.skills,
        resumeUrl: uploadedResumeUrl,
        preferredLocation: data.preferred_job_location,
        role: role,
      };

      const response = await axios.patch(
        `${import.meta.env.VITE_BACKEND_URL}/auth/update`,
        body,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status !== 200) {
        throw new Error('Failed to update user');
      }

      setIsEditing(false);
      setResumeFile(null);

      const updatedUser: User = {
        uuid: user?.uuid,
        name: body.name,
        email: body.email,
        phone: body.phone,
        address: body.address,
        imageUrl: body.imageUrl,
        verificationStatus: user?.verificationStatus,
        job_seeker: {
          disability_type: body.disability_type,
          skills: body.skills,
          resume_url: body.resumeUrl,
          preferred_job_location: body.preferredLocation,
        },
      };

      console.log('updatedUser', updatedUser);
      dispatch(update({ user: { ...updatedUser } }));
    } catch (err) {
      console.error('Error updating user:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    reset({
      firstName: user?.name?.split(' ')[0] || '',
      lastName: user?.name?.split(' ')[1] || '',
      email: user?.email || '',
      phone: user?.phone || '',
      address: user?.address || '',
      imageUrl: user?.imageUrl || '',
      disabilityType: user?.job_seeker?.disability_type || '',
      preferred_job_location: user?.job_seeker?.preferred_job_location || '',
      resume_url: user?.job_seeker?.resume_url || '',
      skills: user?.job_seeker?.skills || [],
    });
    setIsEditing(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow-sm rounded-md">
      <section>
        <header className="flex justify-between items-center px-5 py-3 border-b-[1px]">
          <h1 className="font-semibold text-xl">Personal Information</h1>
          {isEditing ? (
            <Button
              className={
                cn(
                  "flex justify-end px-5 py-3 gap-2",
                  isLoading && 'pointer-events-none opacity-50'
                )
              }
              variant="destructive"
              type="button"
              onClick={handleCancel}
            >
              <X /> Cancel
            </Button>
          ) : (
            <Button variant="default" type="button" onClick={() => setIsEditing(true)}>
              <Pencil /> Edit
            </Button>
          )}
        </header>

        <main className="flex flex-col gap-6 px-5 py-3 border-b-[1px] pb-5">
          <EditableField
            type="text"
            title="First Name"
            placeholder="John"
            value={watch('firstName')}
            isEditing={isEditing}
            {...register('firstName')}
          />
          <EditableField
            type="text"
            title="Last Name"
            placeholder="Opoku"
            value={watch('lastName')}
            isEditing={isEditing}
            {...register('lastName')}
          />
          <EditableField
            type="email"
            title="Email"
            value={watch('email')}
            placeholder="opokujohn@example.com"
            isEditing={isEditing}
            {...register('email')}
          />
          <EditableField
            type="number"
            title="Phone Number"
            value={watch('phone')}
            placeholder="0123456789"
            minLength={10}
            maxLength={10}
            isEditing={isEditing}
            {...register('phone')}
          />
          <EditableField
            type="text"
            title="Disability Type"
            placeholder="None"
            isEditing={isEditing}
            value={watch('disabilityType')}
            {...register('disabilityType')}
          />
          <EditableField
            type="text"
            title="Address"
            value={watch('address')}
            placeholder="Accra, Ghana"
            isEditing={isEditing}
            {...register('address')}
          />
        </main>
      </section>

      <section>
        <header className="px-5 py-3">
          <h1 className="font-semibold text-xl">Job Preferences & Skills</h1>
        </header>
        <main className="flex flex-col gap-6 px-5 py-3 border-b-[1px] pb-5">
          <div>
            <p className='text-sm font-semibold text-gray-600'>Preferred Location</p>
            <EditableField
              type="text"
              // title="Preferred Location"
              value={watch('preferred_job_location')}
              placeholder="Accra, Ghana"
              isEditing={isEditing}
              {...register('preferred_job_location')}
            />
          </div>
          {/* <ProfileSection title="Job Location Preference">
            <Controller
              name="preferred_job_location"
              control={control}
              render={({ field }) => (
                <MultiSelectSearch
                  isEditing={isEditing}
                  selectedValues={field.value}
                  onSelectionChange={field.onChange}
                  options={locations}
                  placeholder="Select job locations..."
                  icon={<MapPin className="w-4 h-4" />}
                  searchPlaceholder="Search locations..."
                  emptyText="No locations found."
                />
              )}
            />
          </ProfileSection> */}

          <ProfileSection title="Skills">
            <Controller
              name="skills"
              control={control}
              render={({ field }) => (
                <MultiSelectSearch
                  isEditing={isEditing}
                  selectedValues={field.value}
                  onSelectionChange={field.onChange}
                  options={skills}
                  placeholder="Select skills..."
                  icon={<Hammer className="w-4 h-4" />}
                  searchPlaceholder="Search skills..."
                  emptyText="No skills found."
                />
              )}
            />
          </ProfileSection>
        </main>
      </section>

      <section className="flex flex-col gap-5 px-5 py-3">
        <h1 className="font-semibold text-xl">My Resume</h1>
        <p>Pre-fill job applications when you add a resume.</p>
        <p>Your resume can be visible to hiring employers or you can keep it hidden.</p>
        {user?.job_seeker?.resume_url ? (
          <ResumeCard
            user={user}
          />
        ) : (
          isEditing && (
            <>
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                id="resume-upload"
                style={{ display: 'none' }}
                onChange={(e) => {
                  if (e.target.files?.[0]) {
                    setResumeFile(e.target.files[0]);
                  }
                }}
              />
              
              <div className='w-full flex flex-col gap-1'>
                <Button
                  type="button"
                  onClick={() => document.getElementById('resume-upload')?.click()}
                  className={cn(isLoading && 'pointer-events-none opacity-50', 'w-full')}
                >
                  Upload a Resume
                </Button>
                {resumeFile && (
                  <p className="text-md text-black">{resumeFile.name}</p>
                )} 
              </div>
            </>
          )
        )}
      </section>

      {isEditing && (
        <div className={
            cn(
              "flex justify-end px-5 py-3 gap-2",
              isLoading && 'pointer-events-none opacity-50'
            )
          }>
          <Button type="submit">
            {
              isLoading
              ? <div className="w-5 h-5 border-2 border-t-white border-gray-400 rounded-full animate-spin"></div>
              : <p>Submit</p>
            }
          </Button>
          <Button type="button" variant="destructive" onClick={handleCancel}>
            <X /> Cancel
          </Button>
        </div>
      )}
    </form>
  );
};

export default ProfileTab;
