import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useSearchParams } from "react-router-dom";
import CustomPagination from "@/components/ui/CustomPagination";
import JobsGrid from "@/components/ui/HomeUI/JobsGrid";

const fetchEmployerJobs = async (
  token: string,
  currentPage: string
): Promise<any> => {
  const params = new URLSearchParams({
    page: currentPage || "1",
    limit: "10"
  });

  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/employers/jobs?${params.toString()}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status !== 200) {
      console.error("Unexpected response status:", response.status);
      throw new Error("Failed to fetch jobs");
    }

    console.log("Jobs fetched successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching employer jobs:", error);
    throw error;
  }
};

const JobListings: React.FC = () => {
  const token = useSelector((state: RootState) => state.auth.token);
  const [searchParams] = useSearchParams();
  const currentPage = searchParams.get("page") || "1";

  const { data, isLoading, isError, error } = useQuery<any>({
    queryKey: ["employerJobs", currentPage],
    queryFn: () => fetchEmployerJobs(token!, currentPage),
    enabled: !!token
  });

  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-xl font-semibold">Your Job Listings</h1>

      {isLoading && <p>Loading jobs...</p>}

      {isError && (
        <div className="text-red-600">
          Error loading jobs. Please try again later.
          {process.env.NODE_ENV === "development" && error instanceof Error && (
            <pre className="mt-2 text-xs text-red-500">{error.message}</pre>
          )}
        </div>
      )}

      {data?.data && data.data.length > 0 ? (
        <JobsGrid jobs={data.data} />
      ) : (
        !isLoading && <p>No jobs found.</p>
      )}

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
