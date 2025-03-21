import { Button } from "@/components/ui/button";
import FiltersDesktop from "@/components/ui/HomeUI/FiltersDesktop";
import RecommendedJobs from "@/components/ui/HomeUI/RecommendedJobs";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";

const Home: React.FC = () => {
  const [search, setSearch] = useState("")
  const [country, setCountry] = useState("")

  const handleSubmit = () => {
    console.log('submitted data')
    console.log(search)
    console.log(country)
  }

  return (
    <div onSubmit={handleSubmit} className="flex flex-col gap-5">
      <form className="flex gap-2 sm:gap-3 md:gap-5 flex-col sm:flex-row">
        <div className="flex-1">
          <Input onChange={(e) => {setSearch(e.target.value)}} className="bg-white/60" placeholder="Search Keyword" type="text"/>
        </div>
        <div className="flex-1">
          <Input onChange={(e) => {setCountry(e.target.value)}} className="bg-white/60" placeholder="Country" type="text"/>
        </div>
        <Button className="bg-[#0B5FAE] sm:w-32 w-full">Search</Button>
      </form>
      <div className="flex gap-5 sm:flex-col lg:flex-row">
        <FiltersDesktop/>
        <RecommendedJobs/>
      </div>
    </div>
  );
};

export default Home;
