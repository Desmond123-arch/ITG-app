import { Button } from "@/components/ui/button";
import FiltersDesktop from "@/components/ui/HomeUI/FiltersDesktop";
import RecommendedJobs from "@/components/ui/HomeUI/RecommendedJobs";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { useQuery } from '@tanstack/react-query';
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import CustomPagination from "@/components/ui/CustomPagination";
import { NavigateFunction, useNavigate, useSearchParams } from "react-router-dom";

const fetchJobs = async (
    token: string | null,
    search: string,
    country: string,
    currentPage: string,
    navigate: NavigateFunction
  ) => {
  if (!token) throw new Error("No token provided");

  const params = new URLSearchParams();
  if (search) params.append('search', search);
  if (country) params.append('country', country);
  console.log('sending current page: ', currentPage)
  params.append('page', currentPage || '1');

  const response = await axios.get(
    `${import.meta.env.VITE_BACKEND_URL}/jobs?${params.toString()}&limit=12`,
    {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    }
  );

  if (response.status !== 200) {
    throw new Error("Failed to fetch jobs");
  }
  if(response.data.meta.totalPages < Number(currentPage)) {
    navigate(`/?page=${response.data.meta.totalPages}`);
  }
  return response.data;
};

const Home: React.FC = () => {
  const [search, setSearch] = useState("")
  const [country, setCountry] = useState("")
  const navigate = useNavigate()
  const token = useSelector((state: RootState) => state.auth.token)
  const searchParams = useSearchParams()[0];
  const pageParam = searchParams.get('page');
  const currentPage =  pageParam && pageParam !== '0' ? pageParam : '1';

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['jobs', search, country, currentPage],
    queryFn: () => fetchJobs(token, search, country, currentPage, navigate),
    enabled: !!token,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    refetch();
  };

  return (
    <div className="flex flex-col gap-5">
      <form onSubmit={handleSubmit} className="flex gap-2 sm:gap-3 md:gap-5 flex-col sm:flex-row">
        <div className="flex-1">
          <Input onChange={(e) => { setSearch(e.target.value) }} className="bg-white/90" placeholder="Search Keyword" type="text" />
        </div>
        <div className="flex-1">
          <Input onChange={(e) => { setCountry(e.target.value) }} className="bg-white/90" placeholder="Country" type="text" />
        </div>
        <Button className="bg-[#0B5FAE] sm:w-32 w-full">Search</Button>
      </form>
      <div className="flex gap-5 sm:flex-col lg:flex-row">
        <FiltersDesktop />
        <div className="flex-1">
          {isLoading && <p>Loading jobs...</p>}
          {isError && <p>Error loading jobs.</p>}
          {data?.data?.jobs && <RecommendedJobs jobs={data.data.jobs} />}
        </div>
      </div>
      {
        data &&
        <div className="flex justify-center mt-5 relative">
          <CustomPagination baseUrl={'/'} currentPage={Number(currentPage)} totalPages={data?.meta?.totalPages} count={data?.meta?.count} />
        </div>
      }
    </div>
  );
};

export default Home;
