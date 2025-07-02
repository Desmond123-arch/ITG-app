import { Button } from "@/components/ui/button";
import CompaniesGrid from "@/components/ui/CompanyUI/CompaniesGrid";
import CustomPagination from "@/components/ui/CustomPagination";
import { Input } from "@/components/ui/input";
import { RootState } from "@/store";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { NavigateFunction, useNavigate, useSearchParams } from "react-router-dom";

const fetchCompanies = async (
    token: string | null,
    search: string,
    country: string,
    currentPage: string,
    navigate: NavigateFunction
  ) => {
  if(!token) {throw new Error("No token provided")}

  const params = new URLSearchParams()
  if(search) {params.append('search', search)}
  if(country) {params.append('country', country)}
  params.append('page', currentPage)
  console.log("Current page:", currentPage)

  const response = await axios.get(
    `${import.meta.env.VITE_BACKEND_URL}/employers?${params.toString()}&limit=12`,
    {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      }
    }
  )

  if (response.status !== 200) {
    throw new Error("Failed to fetch companies");
  }
  if(response.data.meta.totalPages < Number(currentPage)) {
    navigate(`/?page=${response.data.meta.totalPages}`);
  }

  console.log("Fetched companies:", response.data);
  return response.data;
}

const Company: React.FC = () => {
  const [search, setSearch] = useState("")
  const [country, setCountry] = useState("")
  const navigate = useNavigate()
  const token = useSelector((state: RootState) => state.auth.token)
  const currentPage = useSearchParams()[0].get('page') || '1'

  const {data, isLoading, isError, refetch} = useQuery({
    queryKey: ['companies', search, country, currentPage],
    queryFn: () => fetchCompanies(token, search, country, currentPage, navigate),
    enabled: !!token,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    refetch();
  }

  return (
    <div onSubmit={handleSubmit} className="flex flex-col gap-5">
      <form className="flex gap-2 sm:gap-3 md:gap-5 flex-col sm:flex-row">
        <div className="flex-1">
          <Input onChange={(e) => {setCountry(e.target.value)}} className="bg-white/60" placeholder="Country" type="text"/>
        </div>
        <div className="flex-1">
          <Input onChange={(e) => {setSearch(e.target.value)}} className="bg-white/60" placeholder="Search Company" type="text"/>
        </div>
        <Button className="bg-[#0B5FAE] sm:w-32 w-full">Search</Button>
      </form>
      <div className="flex gap-5">
        {isLoading && <p>Loading companies...</p>}
          {isError && <p>Error loading companies.</p>}
          {data?.data?.employers && <CompaniesGrid companies={data.data.employers} />}
      </div>
      {
        data &&
        <div className="flex justify-center mt-5 relative">
          <CustomPagination baseUrl={'/company'} currentPage={Number(currentPage)} totalPages={data?.meta?.totalPages} count={data?.meta?.count} />
        </div>
      }
    </div>
  );
};

export default Company;
