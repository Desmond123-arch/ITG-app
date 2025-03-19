import { Button } from "@/components/ui/button";
import CompaniesGrid from "@/components/ui/CompanyUI/CompaniesGrid";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";

const Company: React.FC = () => {
  const [search, setSearch] = useState("")
  const [country, setCountry] = useState("")

  return (
    <div className="flex flex-col gap-5">
      <div className="flex gap-5">
        <div className="flex-1">
          <Input onChange={(e) => {setCountry(e.target.value)}} className="bg-white/60" placeholder="Country" type="text"/>
        </div>
        <div className="flex-1">
          <Input onChange={(e) => {setSearch(e.target.value)}} className="bg-white/60" placeholder="Search Company" type="text"/>
        </div>
        <Button className="bg-[#0B5FAE] w-32">Search</Button>
      </div>
      <div className="flex gap-5">
        <CompaniesGrid/>
      </div>
    </div>
  );
};

export default Company;
