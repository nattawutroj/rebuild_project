import React from "react";
import { cn } from "@/lib/utils";

interface HeaderProps {
  title: string;
  subTitle?: string;
  className?: string;
}

const PageHeader: React.FC<HeaderProps> = ({ title, subTitle, className }) => {
  const headerClass = cn("text-2xl font-semibold", className);
  const containerClass = cn("flex flex-row items-center", className);
  const dividerClass = cn("mt-2 w-28 h-1 bg-sky-600", className);
  const subTitleClass = cn(
    "pl-4 justify-center items-center flex text-sky-600 text-2xl font-semibold tracking-wide",
    className,
  );

  return (
    <>
      <div className={containerClass}>
        <h1 className={headerClass}>{title}</h1>
        {subTitle && <h1 className={subTitleClass}>{subTitle}</h1>}
      </div>
      <div className={dividerClass} />
    </>
  );
};

export default PageHeader;
