import { ItgIcon } from '@/assets/images'
import { Button } from '@/components/ui/button';
import JobItem from '@/components/ui/HomeUI/JobItem';
import { Bookmark } from 'lucide-react';

const jobDetail = {
    "id": 1,
    "employerId": 42,
    "title": "Software Engineer",
    "description": [
        "Develop and maintain web applications",
        "Collaborate with cross-functional teams"
    ],
    "skills": ["JavaScript", "React", "Node.js"],
    "requirements": [
        "Bachelor's degree in Computer Science",
        "3+ years of experience in software development"
    ],
    "experience": "1-3 years experience",
    "location": "Remote",
    "salaryRange": "$70,000 - $100,000",
    "jobType": "Full time",
    "disabilityFriendly": true,
    "status": "draft",
    "createdAt": "2025-03-19T12:00:00Z",
    "updatedAt": "2025-03-19T12:00:00Z",
    "deadline": "2025-04-01T23:59:59Z"
}

const JobDescription = () => {
    return (
        <div className="flex justify-between ">
            {/* JOB DETAIL */}
            <div className='w-[68%] flex flex-col gap-5'>
                <div className="flex  bg-white rounded-md px-5 py-2 gap-6 items-center">

                    <div className=" w-max ">
                        <img src={ItgIcon} className='w-14 h-14 rounded-full object-center object-cover' />
                    </div>
                    <div className='flex flex-col'>
                        <h2 className='text-2xl font-semibold mb-2'>{jobDetail.title}</h2>
                        <ul className='flex gap-2 text-sm flex-1'>
                            <li>Omicron</li>
                            <li className='flex items-center h-max gap-1'><span className='bg-slate-600 h-1 w-1 rounded-full '></span>{jobDetail.location}</li>
                            <li className='flex items-center h-max gap-1'><span className='bg-slate-600 h-1 w-1 rounded-full '></span>{jobDetail.jobType}</li>
                            <li className='flex items-center h-max gap-1'><span className='bg-slate-600 h-1 w-1 rounded-full '></span>{jobDetail.experience}</li>
                        </ul>
                    </div>
                    <div className='ml-auto flex items-center gap-2'>
                        <Bookmark color='gray' size={25} className='hover:cursor-pointer' />
                        <Button className='p-5'>Apply</Button>
                    </div>
                </div>
                <div className='bg-white rounded-md p-5 flex flex-col gap-4'>
                    {/* Job descriptions */}
                    <div>
                        <h3 className='text-md font-semibold text-gray-700'>Job Descriptions</h3>
                        <ul className='list-disc ml-4 mt-3'>
                            {jobDetail.description.map(job => (
                                <li className='flex items-center h-max gap-2'><span className='bg-gray-500 h-1 w-1 rounded-full '></span>{job}</li>
                            ))}
                        </ul>
                    </div>

                    {/* Skills */}
                    <div>
                        <h3 className='text-md font-semibold text-gray-700 mb-3 mt-3'>Skills</h3>
                        <ul className='flex gap-2 ml-2'>
                            {jobDetail.skills.map(skill => (
                                <li className='bg-blue-200 rounded-md p-1 px-2 text-[#28246F]'>{skill}</li>
                            ))}
                        </ul>
                    </div>

                    {/* Requirements */}
                    <div>
                        <h3 className='text-md font-semibold text-gray-700 mt-4'>Requirements</h3>
                        <ul className='list-disc ml-4 mt-3'>
                            {jobDetail.description.map(job => (
                                <li className='flex items-center h-max gap-2'><span className='bg-gray-500 h-1 w-1 rounded-full '></span>{job}</li>
                            ))}
                        </ul>
                    </div>

                    {/* About Company */}
                    <div>
                        <h3 className='text-md font-semibold text-gray-700 mt-4' A>About Company</h3>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore non amet reprehenderit asperiores accusantium hic, veritatis, pariatur ipsam minus omnis explicabo beatae recusandae aperiam, assumenda iure quaerat? Odio, quae obcaecati?
                        Fuga voluptatibus dolore numquam mollitia aperiam assumenda libero? Ipsam pariatur eos dolor tempora quisquam officia incidunt voluptatem debitis, accusantium repudiandae quia quasi quas itaque odit esse a neque aspernatur ullam.
                    </div>
                </div>
            </div>

            {/* RELATED JOBS */}
            <div className="flex flex-col w-[30%] gap-3">
                <h3 className='text-md font-bold text-gray-700 mt-4'>Related jobs</h3>
                {Array.from({ length:3 }).map((_job, index) => (
                    <JobItem key={index} />
                ))}
            </div>
        </div>
    );
}

export default JobDescription;