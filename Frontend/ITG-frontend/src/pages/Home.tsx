import { Button } from "@/components/ui/button";
import Filters from "@/components/ui/HomeUI/Filters";
import RecommendedJobs from "@/components/ui/HomeUI/RecommendedJobs";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";

const Home: React.FC = () => {
  const [search, setSearch] = useState("")
  const [country, setCountry] = useState("")

  return (
    <div className="flex flex-col gap-5">
      <div className="flex gap-2 md:gap-5 flex-col md:flex-row">
        <div className="flex-1">
          <Input onChange={(e) => {setSearch(e.target.value)}} className="bg-white/60" placeholder="Search Keyword" type="text"/>
        </div>
        <div className="flex-1">
          <Input onChange={(e) => {setCountry(e.target.value)}} className="bg-white/60" placeholder="Country" type="text"/>
        </div>
        <Button className="bg-[#0B5FAE] md:w-32 w-full">Search</Button>
      </div>
      <div className="flex gap-5">
        <Filters/>
        <RecommendedJobs/>
      </div>
    </div>
  );
};

export default Home;
