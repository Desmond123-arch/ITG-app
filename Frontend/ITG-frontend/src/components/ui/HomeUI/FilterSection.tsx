import classNames from "classnames";
import FilterTitle from "./FilterTitle";

const FilterSection: React.FC<{ title: string; children: React.ReactNode, className?: string }> = ({
    title,
    children,
    className
  }) => {
    return (
      <div className={classNames("flex flex-col gap-1 border-b py-4", className)}>
        <FilterTitle title={title} />
        {children}
      </div>
    );
  };

export default FilterSection