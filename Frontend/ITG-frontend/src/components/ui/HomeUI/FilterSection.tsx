import classNames from "classnames";
import FilterTitle from "./FilterTitle";

const FilterSection: React.FC<{ title: string; children: React.ReactNode, className?: string, checkboxStyles?: string }> = ({
    title,
    children,
    className,
    checkboxStyles
  }) => {
    return (
      <div className={classNames("flex flex-col gap-1 lg:border-b py-4", className)}>
        <FilterTitle title={title} />
        <div className={checkboxStyles}>
          {children}
        </div>
      </div>
    );
  };

export default FilterSection