import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import FilterCheckboxGroup from "./FilterCheckboxGroup";
import FilterSection from "./FilterSection";
import { Button } from "../button";

interface FiltersState {
  location: string;
  showBy: string;
  remoteWorker: boolean;
  workTypes: string[];
  experience: string[];
}

const Filters: React.FC = () => {
  const [filters, setFilters] = useState<FiltersState>({
    location: "",
    showBy: "relevant",
    remoteWorker: false,
    workTypes: [],
    experience: [],
  });

  const workTypes = ["Remote", "Part-Time", "Contract", "Full-Time"];
  const experiences = ["Fresh Graduate", "1 - 3 years", "3 - 5 years", "5 - 10 years", "10+ years"];

  const handleChange = (name: keyof FiltersState, value: any) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (name: "workTypes" | "experience", value: string) => {
    setFilters((prev) => {
      const currentValues = Array.isArray(prev[name]) ? prev[name] : [];
      return {
        ...prev,
        [name]: currentValues.includes(value)
          ? currentValues.filter((v) => v !== value)
          : [...currentValues, value],
      };
    });
  };

  const handleSubmit = () => {
    console.log("Filters Applied:", filters);
  };

  return (
    <div className="flex-col gap-3 md:flex">
      <h1 className="text-xl font-semibold hidden md:block">Filter</h1>
      <div className="rounded-md bg-white md:shadow-md px-5 py-3 w-full md:w-[200px]">
        <FilterSection title="Location">
          <Input
            value={filters.location}
            onChange={(e) => handleChange("location", e.target.value)}
            placeholder="City"
            className="bg-[#f1f2f4]/70"
          />
        </FilterSection>
        <FilterSection title="Show By">
          <Select onValueChange={(value) => handleChange("showBy", value)}>
            <SelectTrigger className="w-full bg-[#f1f2f4]/70">
              <SelectValue placeholder="Relevant" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="latest">Latest</SelectItem>
              <SelectItem value="oldest">Oldest</SelectItem>
            </SelectContent>
          </Select>
        </FilterSection>
        <FilterSection title="Remote Worker" className="flex !flex-row justify-between">
          <Switch
            checked={filters.remoteWorker}
            onCheckedChange={(checked) => handleChange("remoteWorker", checked)}
            className="data-[state=checked]:bg-green-500"
          />
        </FilterSection>
        <FilterCheckboxGroup
          title="Type Works"
          options={workTypes}
          selected={filters.workTypes}
          onChange={(value) => handleCheckboxChange("workTypes", value)}
        />
        <FilterCheckboxGroup
          title="Experience"
          options={experiences}
          selected={filters.experience}
          onChange={(value) => handleCheckboxChange("experience", value)}
        />
        <Button
          onClick={handleSubmit}
          className="w-full mt-3 bg-[#0B5FAE] text-white py-2 rounded-md"
        >
          Apply Filters
        </Button>
      </div>
    </div>
  );
};

export default Filters;
