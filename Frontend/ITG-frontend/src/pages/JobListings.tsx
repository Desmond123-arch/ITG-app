import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useNavigate, useSearchParams } from "react-router-dom";
import CustomPagination from "@/components/ui/CustomPagination";
import JobsGrid from "@/components/ui/HomeUI/JobsGrid";

const fetchEmployerJobs = async (token: string | null, currentPage: string) => {
  if (!token) throw new Error("No token provided");

  const params = new URLSearchParams();
  params.append("page", currentPage || "1");
  params.append("limit", "10");

  const response = await axios.get(
    `${import.meta.env.VITE_BACKEND_URL}/employers/jobs?${params.toString()}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (response.status !== 200) {
    throw new Error("Failed to fetch jobs");
  }
  return response.data;
};

const JobListings: React.FC = () => {
  const token = useSelector((state: RootState) => state.auth.token);
  const [searchParams] = useSearchParams();
  const currentPage = searchParams.get("page") || "1";

  const { data, isLoading, isError } = useQuery({
    queryKey: ["employerJobs", currentPage],
    queryFn: () => fetchEmployerJobs(token, currentPage),
    enabled: !!token,
  });

  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-2xl font-bold mb-4">Your Job Listings</h1>
      {isLoading && <p>Loading jobs...</p>}
      {isError && <p>Error loading jobs.</p>}
      {data?.data && <JobsGrid jobs={data.data} />}
      {data && (
        <div className="flex justify-center mt-5">
          <CustomPagination
            baseUrl={"/job_listings"}
            currentPage={Number(data.meta.page)}
            totalPages={data.meta.totalPages}
            count={data.meta.count}
          />
        </div>
      )}
    </div>
  );
};

export default JobListings;