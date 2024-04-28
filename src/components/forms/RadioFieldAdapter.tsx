import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { BaseOption } from "@/types/CallReports";
import { cn } from "@/lib/utils";

const yesNoOptions = [
  { label: "Yes", value: "true" },
  { label: "No", value: "false" },
];

interface RadioGroupFieldAdapterProps {
  id: string;
  options?: BaseOption[];
  value: string;
  onChange: (value: string) => void;
  name?: string;
}

const RadioGroupFieldAdapter = React.memo(
  React.forwardRef<HTMLDivElement, RadioGroupFieldAdapterProps>(
    ({ id, options = yesNoOptions, value, onChange, name }, ref) => {
      return (
        <RadioGroup
          id={id}
          name={name}
          value={value}
          onValueChange={onChange}
          ref={ref}
          className={cn("flex flex-row gap-2")}
        >
          {options?.map((option) => (
            <div key={option.value} className="flex items-center gap-2">
              <RadioGroupItem value={option.value} id={`${id}-${option.value}`}>
                {option.label}
              </RadioGroupItem>
              <label htmlFor={`${id}-${option.value}`}>{option.label}</label>
            </div>
          ))}
        </RadioGroup>
      );
    },
  ),
);

RadioGroupFieldAdapter.displayName = "RadioGroupFieldAdapter";

export default RadioGroupFieldAdapter;
