import { Button } from "@/components/ui/button";
import CustomPagination from "@/components/ui/CustomPagination";
import { Input } from "@/components/ui/input";
import SkeletonCard from "@/components/ui/SkeletonCard";
import { RootState } from "@/store";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import JobItem from "@/components/ui/HomeUI/JobItem";

const fetchApplications = async (
  token: string | null,
  search: string,
  page: string
) => {
  if (!token) throw new Error("No token provided");

  const params = new URLSearchParams();
  if (search) params.append("search", search);
  params.append("page", page);
  params.append("limit", "10");

  const response = await axios.get(
    `${import.meta.env.VITE_BACKEND_URL}/applications?${params.toString()}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (response.status !== 200) {
    throw new Error("Failed to fetch applications");
  }

  return response.data;
};

const SavedJobs: React.FC = () => {
  const token = useSelector((state: RootState) => state.auth.token);
  // const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const pageParam = searchParams.get("page");
  const currentPage = pageParam && pageParam !== "0" ? pageParam : "1";

  const [searchInput, setSearchInput] = useState("");
  const [activeSearch, setActiveSearch] = useState("");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["applications", activeSearch, currentPage],
    queryFn: () => fetchApplications(token, activeSearch, currentPage),
    enabled: !!token,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setActiveSearch(searchInput);
    setSearchParams({ page: "1" });
  };

  return (
    <div className="flex flex-col gap-5">
      <form
        onSubmit={handleSubmit}
        className="flex gap-2 sm:gap-3 md:gap-5 flex-col sm:flex-row"
      >
        <div className="flex-1">
          <Input
            onChange={(e) => setSearchInput(e.target.value)}
            value={searchInput}
            className="bg-white/60"
            placeholder="Search company name"
            type="text"
          />
        </div>
        <Button className="bg-[#0B5FAE] sm:w-32 w-full">Search</Button>
      </form>

      <div className="flex flex-col gap-5">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center">
          <h1 className="text-xl font-semibold">Bookmarked Jobs</h1>
        </div>

        {isLoading && (
          <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        )}

        {isError && <p>Error loading applications.</p>}

        {!isLoading && data?.data?.jobs?.length === 0 && (
          <p>No applications found.</p>
        )}

        {data?.data?.jobs && (
          <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-3">
            {data.data.jobs.map((job: any, index: number) => (
              <JobItem key={index} job={job} page="applications" />
            ))}
          </div>
        )}
      </div>

      {data?.meta && (
        <div className="flex justify-center mt-5 relative">
          <CustomPagination
            baseUrl="/applications"
            currentPage={Number(currentPage)}
            totalPages={data.meta.totalPages}
            count={data.meta.count}
          />
        </div>
      )}
    </div>
  );
};

export default SavedJobs;
