import FilterTitle from "./FilterTitle";

const FilterSection: React.FC<{ title: string; children: React.ReactNode }> = ({
    title,
    children,
  }) => {
    return (
      <div className="flex flex-col gap-1 border-b py-4">
        <FilterTitle title={title} />
        {children}
      </div>
    );
  };

export default FilterSection