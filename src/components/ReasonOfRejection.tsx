import React from "react";
import { cn } from "@/lib/utils";
interface ResonOfRejectionProps {
  remarks: string | null | undefined;
  className?: string;
}

export const ResonOfRejection: React.FC<ResonOfRejectionProps> = ({
  remarks,
  className,
}) => {
  const containerClass = cn(
    "w-full h-[74px] px-4 py-2 bg-rose-200 rounded border border-red-600 flex-col justify-start items-start inline-flex",
    className,
  );
  const dividerClass = cn("p-1 justify-center items-center gap-1 inline-flex");
  return (
    <div className={containerClass}>
      <div className={dividerClass}>
        <div className="text-sm font-medium text-red-600">
          Reason of Rejection
        </div>
      </div>
      <div className={dividerClass}>
        <div className="text-sm font-normal text-slate-900">{remarks}</div>
      </div>
    </div>
  );
};
