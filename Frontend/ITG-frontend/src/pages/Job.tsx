import { ItgIcon } from '@/assets/images'
import { Button } from '@/components/ui/button';
import JobItem from '@/components/ui/HomeUI/JobItem';
import jobs from '@/data/JobsData';
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
        <div className="flex justify-between lg:flex-row flex-col">
            {/* JOB DETAIL */}
            <div className='w-full md:w-[90%] mx-auto lg:w-[68%] flex flex-col gap-5'>
                <div className="flex flex-wrap bg-white rounded-md px-5 py-2 gap-6 items-center">
                    <div className='flex items-center gap-4'>
                        <div className="w-14 h-14 flex-shrink-0">
                            <img src={ItgIcon || "/placeholder.svg"} className="w-full h-full rounded-full object-center object-cover"  alt='Company logo'/>
                        </div>
                        <div className='flex flex-col'>
                            <h2 className='text-2xl font-semibold mb-2'>{jobDetail.title}</h2>
                            <dl className='flex gap-x-3 text-sm flex-wrap'>
                                <div>Omicron</div>
                                <div className='flex items-center h-max gap-1'><dt className='bg-slate-600 h-1 w-1 rounded-full '></dt><dd>{jobDetail.location}</dd></div>
                                <div className='flex items-center h-max gap-1'><dt className='bg-slate-600 h-1 w-1 rounded-full '></dt><dd>{jobDetail.jobType}</dd></div>
                                <div className='flex items-center h-max gap-1'><dt className='bg-slate-600 h-1 w-1 rounded-full '></dt><dd>{jobDetail.experience}</dd></div>
                            </dl>
                        </div>
                    </div>
                    <div className='ml-auto flex items-center gap-2 w-[90%] md:w-[20%]'>
                        <Bookmark color='gray' size={25} className='hover:cursor-pointer md: order-1 sm:order-2' aria-label="Save job to bookmarks"/>
                        <Button className='p-5 w-[80%] md:order-2 sm:order-1' aria-label='Apply for job'>Apply</Button>
                    </div>
                </div>
                <div className='bg-white rounded-md p-5 flex flex-col gap-4'>
                    {/* Job descriptions */}
                    <section>
                        <h3 className='text-md font-semibold text-gray-700'>Job Descriptions</h3>
                        <ul className='list-disc ml-4 mt-3' role='list'>
                            {jobDetail.description.map((job, idx) => (
                                <li className='flex items-center h-max gap-2' key={idx}><span className='bg-gray-500 h-1 w-1 rounded-full '></span>{job}</li>
                            ))}
                        </ul>
                    </section>

                    {/* Skills */}
                    <section>
                        <h3 className='text-md font-semibold text-gray-700 mb-3 mt-3'>Skills</h3>
                        <ul className='flex gap-2 ml-2' role='list'>
                            {jobDetail.skills.map((skill, idx) => (
                                <li className='bg-blue-200 rounded-md p-1 px-2 text-[#28246F]' key={idx}>{skill}</li>
                            ))}
                        </ul>
                    </section>

                    {/* Requirements */}
                    <section>
                        <h3 className='text-md font-semibold text-gray-700 mt-4'>Requirements</h3>
                        <ul className='list-disc ml-4 mt-3'>
                            {jobDetail.description.map((job, idx) => (
                                <li className='flex items-center h-max gap-2' key={idx}><span className='bg-gray-500 h-1 w-1 rounded-full '></span>{job}</li>
                            ))}
                        </ul>
                    </section>

                    {/* About Company */}
                    <section>
                        <h3 className='text-md font-semibold text-gray-700 mt-4'>About Company</h3>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore non amet reprehenderit asperiores accusantium hic, veritatis, pariatur ipsam minus omnis explicabo beatae recusandae aperiam, assumenda iure quaerat? Odio, quae obcaecati?
                        Fuga voluptatibus dolore numquam mollitia aperiam assumenda libero? Ipsam pariatur eos dolor tempora quisquam officia incidunt voluptatem debitis, accusantium repudiandae quia quasi quas itaque odit esse a neque aspernatur ullam.
                    </section>
                </div>
            </div>

            {/* RELATED JOBS */}
            <div className='lg:mr-1 lg:w-[30%] w-full'>
                <h3 className='text-md font-bold text-gray-700 mt-4 md:mt-0 self-baseline md:ml-0'>Related jobs</h3>
                <div className="flex hidden_scrollbar rounded-lg overflow-x-scroll md:grid sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-1 gap-3 mt-3 mx-auto md:w-full place-items-stretch">
                    {jobs.slice(0, 3).map((job, index) => (
                        <JobItem key={index} job={job} page="job" />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default JobDescription;