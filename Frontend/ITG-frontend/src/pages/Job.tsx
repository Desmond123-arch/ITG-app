import { Button } from '@/components/ui/button';
import CustomLoader from '@/components/ui/CustomLoader';
import JobItem from '@/components/ui/HomeUI/JobItem';
import { RootState } from '@/store';
import { Job } from '@/types/Job';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Bookmark, BookmarkCheck } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';

import { addSavedJob, removeSavedJob } from '@/store/savedJobsSlice';
import { addAppliedJob } from '@/store/seekerApplicationSlice';

const fetchJobDetail = async (token: string | null, jobId: string | undefined) => {
  if (!token) throw new Error("No token provided");
  if (!jobId) throw new Error("No job ID provided");

  const current_job_response = await axios.get(
    `${import.meta.env.VITE_BACKEND_URL}/jobs/${jobId}`,
    { headers: { Authorization: `Bearer ${token}` } }
  );

  const jobs_list_response = await axios.get(
    `${import.meta.env.VITE_BACKEND_URL}/jobs?limit=6`,
    { headers: { Authorization: `Bearer ${token}` } }
  );

  if (current_job_response.status !== 200) {
    throw new Error("Failed to fetch job details");
  }

  return {
    current_job: current_job_response.data.data.job,
    jobs_list: jobs_list_response.data.data.jobs,
  };
};

const JobDescription = () => {
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.auth.token);
  const savedIds = useSelector((state: RootState) => state.savedJobs.jobIds);
  const appliedIds = useSelector((state: RootState) => state.seekerApplications.appliedJobIds);
  const { id } = useParams<{ id: string }>();

  const [isApplying, setIsApplying] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isApplied, setIsApplied] = useState(false);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['jobDetail', id],
    queryFn: () => fetchJobDetail(token, id),
    enabled: !!token,
  });

  // Set initial toggle state from store or fetch endpoint if needed
  useEffect(() => {
    if (id) {
      setIsSaved(savedIds.includes(id));
      setIsApplied(appliedIds.includes(id));
    }
  }, [id, savedIds, appliedIds]);

  const handleApply = async () => {
    if (!token || !id || isApplied) return;
    try {
      setIsApplying(true);
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/applications`,
        { jobId: id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      setIsApplied(true);
      dispatch(addAppliedJob(id));
      toast.success("Successfully applied for the job!");
    } catch (err) {
      console.error("Failed to apply:", err);
      toast.error("Failed to apply for the job.");
    } finally {
      setIsApplying(false);
    }
  };

  const handleSaveJob = async () => {
    if (!token || !id) return;
    try {
      setIsSaving(true);
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/jobseeker/save`,
        { jobId: id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      const newState = res.data.saved;
      setIsSaved(newState);
      if (newState) {
        dispatch(addSavedJob(id));
      } else {
        dispatch(removeSavedJob(id));
      }
      toast.success(newState ? 'Job saved!' : 'Job removed from saved list');
    } catch (error) {
      console.error("Toggle save failed:", error);
      toast.error("Could not update saved status.");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) return <CustomLoader />;
  if (isError || !data) return <p className="text-center py-10 text-red-500">Failed to load job details.</p>;

  const { current_job, jobs_list } = data;

  return (
    <div className="flex justify-between lg:flex-row flex-col">
      {/* JOB DETAIL */}
      <div className='w-full md:w-[90%] mx-auto lg:w-[68%] flex flex-col gap-5'>
        <div className="flex flex-wrap bg-white rounded-md px-5 py-2 gap-6 items-center border lg:min-h-[90px]">
          <div className='flex items-center gap-4'>
            <div className="w-14 h-14 flex-shrink-0">
              <img src={current_job.companyLogo} alt='Company logo' className="w-full h-full shadow rounded-sm object-cover" />
            </div>
            <div className='flex flex-col'>
              <h2 className='text-2xl font-semibold mb-2'>{current_job.title}</h2>
              <dl className='flex gap-x-3 text-sm flex-wrap'>
                <div>{current_job.companyName}</div>
                <div className='flex items-center gap-1'><dt className='bg-slate-600 h-1 w-1 rounded-full'/><dd>{current_job.location}</dd></div>
                <div className='flex items-center gap-1'><dt className='bg-slate-600 h-1 w-1 rounded-full'/><dd>{current_job.jobType.replace('_',' ').toUpperCase()}</dd></div>
                <div className='flex items-center gap-1'><dt className='bg-slate-600 h-1 w-1 rounded-full'/><dd>{current_job.yearsOfExperience} Year(s) of Experience</dd></div>
              </dl>
            </div>
          </div>
          <div className='ml-auto flex items-center gap-2 w-[90%] md:w-[20%]'>
            <button
              onClick={handleSaveJob}
              disabled={isSaving}
              aria-label="Toggle job bookmark"
              className="hover:cursor-pointer md:order-1 sm:order-2"
            >
              {isSaved ? <BookmarkCheck color='green' size={25} /> : <Bookmark color='gray' size={25} />}
            </button>
            <Button
              className='p-5 w-[80%] md:order-2 sm:order-1'
              aria-label='Apply for job'
              onClick={handleApply}
              disabled={isApplying || isApplied}
            >
              {isApplied ? "Applied" : isApplying ? "Applying..." : "Apply"}
            </Button>
          </div>
        </div>

        <div className='bg-white rounded-md p-5 flex flex-col gap-4'>
          <section>
            <h3 className='text-md font-semibold text-gray-700'>Job Descriptions</h3>
            <ul className='list-disc ml-4 mt-3'>
              {current_job.description.map((info, idx) => (
                <li key={idx} className='flex items-center gap-2'><span className='bg-gray-500 h-1 w-1 rounded-full'/>{info}</li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className='text-md font-semibold text-gray-700 mb-3 mt-3'>Skills</h3>
            <ul className='flex gap-2 ml-2'>
              {current_job.skills.map((skill, idx) => (
                <li key={idx} className='bg-blue-200 rounded-md p-1 px-2 text-[#28246F]'>{skill}</li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className='text-md font-semibold text-gray-700 mt-4'>Requirements</h3>
            <ul className='list-disc ml-4 mt-3'>
              {current_job.requirements.map((detail, idx) => (
                <li key={idx} className='flex items-center gap-2'><span className='bg-gray-500 h-1 w-1 rounded-full'/>{detail}</li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className='text-md font-semibold text-gray-700 mt-4'>Deadline</h3>
            {new Date(current_job.deadline).toLocaleDateString(undefined, {
              year: 'numeric', month: 'long', day: 'numeric',
            })}
          </section>

          <section>
            <h3 className='text-md font-semibold text-gray-700 mt-4'>About Company</h3>
            <p>{current_job.companyDescription}</p>
            <a href={`mailto:${current_job.companyEmail}`} className='text-blue-500 hover:underline'>{current_job.companyEmail}</a>
          </section>
        </div>
      </div>

      {/* RELATED JOBS */}
      <div className='lg:mr-1 lg:w-[30%] w-full'>
        <h3 className='text-md font-bold text-gray-700 mt-4 md:mt-0'>Related jobs</h3>
        <div className="flex hidden_scrollbar lg:h-[450px] overflow-x-scroll md:grid sm:grid-cols-3 md:grid-cols-2 lg:flex flex-col lg:grid-cols-1 gap-3 mt-3 mx-auto md:w-full place-items-stretch">
          {jobs_list.filter((job: Job) => job && job.id !== id).slice(0, 5).map((job, idx) => (
            <JobItem key={idx} job={job} page="job" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default JobDescription;
