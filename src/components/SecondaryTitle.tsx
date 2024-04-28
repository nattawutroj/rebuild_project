import React from "react";
import { cn } from "@/lib/utils";

interface SecondaryTitleProps {
  title: string;
  className?: string;
}

const SecondaryTitle: React.FC<SecondaryTitleProps> = ({
  title,
  className,
}) => {
  const containerClass = cn(
    "self-stretch flex-col justify-start items-start gap-1 flex",
    className,
  );
  const headerClass = cn(
    "pt-3 pb-3 justify-center items-center gap-1 inline-flex",
    className,
  );
  const dividerClass = cn(
    "text-slate-900 text-base font-medium tracking-tight",
    className,
  );

  return (
    <div className={containerClass}>
      <div className={headerClass}>
        <div className={dividerClass}>{title}</div>
      </div>
    </div>
  );
};

export default SecondaryTitle;
