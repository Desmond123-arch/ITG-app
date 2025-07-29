import { Button } from '@/components/ui/button';
import CustomLoader from '@/components/ui/CustomLoader';
import JobItem from '@/components/ui/HomeUI/JobItem';
import { RootState } from '@/store';
import { Job } from '@/types/Job';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Bookmark } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useState } from 'react';

const fetchJobDetail = async(token: string | null, jobId: string | undefined) => {
    if (!token) throw new Error("No token provided");
    if (!jobId) throw new Error("No job ID provided");

    const current_job_response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/jobs/${jobId}`,
        {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        }
    );

    const jobs_list_response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/jobs?limit=6`,
        {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        }
    );
    console.log("Jobs list fetched :", jobs_list_response.data.data);

    if (current_job_response.status !== 200) {
        throw new Error("Failed to fetch job details");
    }

    console.log("Job details fetched :", current_job_response.data.data);
    return {
        current_job: current_job_response.data.data.job,
        jobs_list: jobs_list_response.data.data.jobs
    };
}

const JobDescription = () => {
    const token = useSelector((state: RootState) => state.auth.token)
    const {id} = useParams<{id: string}>();
    const [isApplying, setIsApplying] = useState(false);

    const {data, isLoading, isError} = useQuery({
        queryKey: ['jobDetail', id],
        queryFn: () => fetchJobDetail(token, id),
        enabled: !!token,
    });

    const handleApply = async () => {
        if (!token || !id) return;
        try {
            setIsApplying(true);
            const res = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/applications`,
                { jobId: id },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            console.log("Application response:", res.data);
            alert("Successfully applied for the job!");
        } catch (err) {
            console.error("Failed to apply for the job", err);
            alert("Failed to apply for the job.");
        } finally {
            setIsApplying(false);
        }
    };

    if (isLoading) {
        return <CustomLoader />;
    }

    if (isError || !data) {
        return <p className="text-center py-10 text-red-500">Failed to load job details.</p>;
    }

    return (
        <div className="flex justify-between lg:flex-row flex-col">
            {/* JOB DETAIL */}
            <div className='w-full md:w-[90%] mx-auto lg:w-[68%] flex flex-col gap-5'>
                <div className="flex flex-wrap bg-white rounded-md px-5 py-2 gap-6 items-center border lg:min-h-[90px]">
                    <div className='flex items-center gap-4'>
                        <div className="w-14 h-14 flex-shrink-0">
                            <img src={data.current_job.companyLogo} className="w-full h-full rounded-full object-center object-cover" alt='Company logo' />
                        </div>
                        <div className='flex flex-col'>
                            <h2 className='text-2xl font-semibold mb-2'>{data.current_job.title}</h2>
                            <dl className='flex gap-x-3 text-sm flex-wrap'>
                                <div>{data.current_job.companyName}</div>
                                <div className='flex items-center h-max gap-1'><dt className='bg-slate-600 h-1 w-1 rounded-full '></dt><dd>{data.current_job.location}</dd></div>
                                <div className='flex items-center h-max gap-1'><dt className='bg-slate-600 h-1 w-1 rounded-full '></dt><dd>{data.current_job.jobType.replace('_', ' ').toUpperCase()}</dd></div>
                                <div className='flex items-center h-max gap-1'><dt className='bg-slate-600 h-1 w-1 rounded-full '></dt><dd>{data.current_job.yearsOfExperience} Year(s) of Experience</dd></div>
                            </dl>
                        </div>
                    </div>
                    <div className='ml-auto flex items-center gap-2 w-[90%] md:w-[20%]'>
                        <Bookmark color='gray' size={25} className='hover:cursor-pointer md:order-1 sm:order-2' aria-label="Save job to bookmarks" />
                        <Button 
                            className='p-5 w-[80%] md:order-2 sm:order-1' 
                            aria-label='Apply for job' 
                            onClick={handleApply}
                            disabled={isApplying}
                        >
                            {isApplying ? "Applying..." : "Apply"}
                        </Button>
                    </div>
                </div>

                <div className='bg-white rounded-md p-5 flex flex-col gap-4'>
                    {/* Job Descriptions */}
                    <section>
                        <h3 className='text-md font-semibold text-gray-700'>Job Descriptions</h3>
                        <ul className='list-disc ml-4 mt-3' role='list'>
                            {data.current_job.description.map((info: string, index: number) => (
                                <li className='flex items-center h-max gap-2' key={index}><span className='bg-gray-500 h-1 w-1 rounded-full '></span>{info}</li>
                            ))}
                        </ul>
                    </section>

                    {/* Skills */}
                    <section>
                        <h3 className='text-md font-semibold text-gray-700 mb-3 mt-3'>Skills</h3>
                        <ul className='flex gap-2 ml-2' role='list'>
                            {data.current_job.skills.map((skill: string, index: number) => (
                                <li className='bg-blue-200 rounded-md p-1 px-2 text-[#28246F]' key={index}>{skill}</li>
                            ))}
                        </ul>
                    </section>

                    {/* Requirements */}
                    <section>
                        <h3 className='text-md font-semibold text-gray-700 mt-4'>Requirements</h3>
                        <ul className='list-disc ml-4 mt-3'>
                            {data.current_job.requirements.map((detail: string, index: number) => (
                                <li className='flex items-center h-max gap-2' key={index}><span className='bg-gray-500 h-1 w-1 rounded-full '></span>{detail}</li>
                            ))}
                        </ul>
                    </section>

                    {/* About Company */}
                    <section>
                        <h3 className='text-md font-semibold text-gray-700 mt-4'>About Company</h3>
                        {data.current_job.companyDescription}
                    </section>
                </div>
            </div>

            {/* RELATED JOBS */}
            <div className='lg:mr-1 lg:w-[30%] w-full'>
                <h3 className='text-md font-bold text-gray-700 mt-4 md:mt-0 self-baseline md:ml-0'>Related jobs</h3>
                <div className="flex hidden_scrollbar lg:h-[450px] rounded-lg overflow-x-scroll pb-3 lg:pb-0 md:grid sm:grid-cols-3 md:grid-cols-2 lg:flex lg:flex-col lg:grid-cols-1 gap-3 mt-3 mx-auto md:w-full place-items-stretch">
                    {data.jobs_list.filter((job: Job) => job && job.id !== id).slice(0, 5).map((job: Job, index: number) => (
                        <JobItem key={index} job={job} page="job" />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default JobDescription;
