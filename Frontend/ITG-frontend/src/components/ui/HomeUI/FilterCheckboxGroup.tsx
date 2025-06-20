import { Checkbox } from "../checkbox";
import FilterSection from "./FilterSection";

interface FilterCheckboxGroupProps {
    title: string;
    options: string[];
    selected: string[];
    onChange: (value: string) => void;
  }
  
  const FilterCheckboxGroup: React.FC<FilterCheckboxGroupProps> = ({
    title,
    options,
    selected,
    onChange,
  }) => {
    return (
      <FilterSection title={title} checkboxStyles="flex !flex-row flex-wrap gap-x-5">
        {options.map((option, index) => (
          <div key={index} className="flex items-center gap-2">
            <Checkbox
              className="border-black/50"
              checked={selected.includes(option)}
              onCheckedChange={() => onChange(option)}
            />
            <span>{option}</span>
          </div>
        ))}
      </FilterSection>
    );
  };

export default FilterCheckboxGroup