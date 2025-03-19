import { Button } from "@/components/ui/button";
import Filters from "@/components/ui/HomeUI/Filters";
import RecommendedJobs from "@/components/ui/HomeUI/RecommendedJobs";
import { Input } from "@/components/ui/input";
import React from "react";

const Home: React.FC = () => {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex gap-5">
        <div className="flex-1">
          <Input className="bg-white/60" placeholder="Search Keyword" type="text"/>
        </div>
        <div className="flex-1">
          <Input className="bg-white/60" placeholder="Country" type="text"/>
        </div>
        <Button className="bg-[#0B5FAE] w-32">Search</Button>
      </div>
      <div className="flex gap-5">
        <Filters/>
        <RecommendedJobs/>
      </div>
    </div>
  );
};

export default Home;
