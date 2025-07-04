import { Button } from '@/components/ui/button';
import CustomLoader from '@/components/ui/CustomLoader';
import JobItem from '@/components/ui/HomeUI/JobItem';
import jobs from '@/data/JobsData';
import { RootState } from '@/store';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Bookmark } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

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
        `${import.meta.env.VITE_BACKEND_URL}/jobs?limit=5`,
        {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        }
    );
    console.log("Jobs list fetched :", jobs_list_response.data);

    if (current_job_response.status !== 200) {
        throw new Error("Failed to fetch job details");
    }

    console.log("Job details fetched :", current_job_response.data);
    return {
        current_job: current_job_response.data.data,
        jobs_list: jobs_list_response.data.data
    };
}

const JobDescription = () => {
    const token = useSelector((state: RootState) => state.auth.token)
    const {id} = useParams<{id: string}>();

    const {data, isLoading, isError} = useQuery({
        queryKey: ['jobDetail', id],
        queryFn: () => fetchJobDetail(token, id),
        enabled: !!token,
    });

    if (isLoading) {
        return <CustomLoader/>;
    }

    if (isError || !data) {
        return <p className="text-center py-10 text-red-500">Failed to load job details.</p>;
    }

    return (
        <div className="flex justify-between lg:flex-row flex-col">
            {/* JOB DETAIL */}
            <div className='w-full md:w-[90%] mx-auto lg:w-[68%] flex flex-col gap-5'>
                <div className="flex flex-wrap bg-white rounded-md px-5 py-2 gap-6 items-center">
                    <div className='flex items-center gap-4'>
                        <div className="w-14 h-14 flex-shrink-0">
                            <img src={data.job.companyLogo} className="w-full h-full rounded-full object-center object-cover"  alt='Company logo'/>
                        </div>
                        <div className='flex flex-col'>
                            <h2 className='text-2xl font-semibold mb-2'>{data.job.title}</h2>
                            <dl className='flex gap-x-3 text-sm flex-wrap'>
                                <div>{data.job.companyName}</div>
                                <div className='flex items-center h-max gap-1'><dt className='bg-slate-600 h-1 w-1 rounded-full '></dt><dd>{data.job.location}</dd></div>
                                <div className='flex items-center h-max gap-1'><dt className='bg-slate-600 h-1 w-1 rounded-full '></dt><dd>{data.job.jobType.replace('_', ' ')}</dd></div>
                                <div className='flex items-center h-max gap-1'><dt className='bg-slate-600 h-1 w-1 rounded-full '></dt><dd>{data.job.yearsOfExperience}</dd></div>
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
                            {data.job.description.map((info: string, index: number) => (
                                <li className='flex items-center h-max gap-2' key={index}><span className='bg-gray-500 h-1 w-1 rounded-full '></span>{info}</li>
                            ))}
                        </ul>
                    </section>

                    {/* Skills */}
                    <section>
                        <h3 className='text-md font-semibold text-gray-700 mb-3 mt-3'>Skills</h3>
                        <ul className='flex gap-2 ml-2' role='list'>
                            {data.job.skills.map((skill: string, index: number) => (
                                <li className='bg-blue-200 rounded-md p-1 px-2 text-[#28246F]' key={index}>{skill}</li>
                            ))}
                        </ul>
                    </section>

                    {/* Requirements */}
                    <section>
                        <h3 className='text-md font-semibold text-gray-700 mt-4'>Requirements</h3>
                        <ul className='list-disc ml-4 mt-3'>
                            {data.job.requirements.map((detail: string, index: number) => (
                                <li className='flex items-center h-max gap-2' key={index}><span className='bg-gray-500 h-1 w-1 rounded-full '></span>{detail}</li>
                            ))}
                        </ul>
                    </section>

                    {/* About Company */}
                    <section>
                        <h3 className='text-md font-semibold text-gray-700 mt-4'>About Company</h3>
                        {data.job.companyDescription}
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