import {
  Select,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { BaseOption } from "@/types/CallReports";
import React from "react";

interface SelectFieldAdapterProps {
  id: string;
  options: BaseOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

const SelectFieldAdapter = React.memo(
  ({
    id,
    options,
    value,
    onChange,
    placeholder = "Select...",
    disabled = false,
  }: SelectFieldAdapterProps) => {
    const isValid = options?.some((option) => option?.value === value);
    return (
      <Select value={isValid ? value : ""} onValueChange={onChange}>
        <SelectTrigger
          id={id}
          aria-label={placeholder}
          className={cn(
            "rounded-lg border border-gray-300 shadow-sm",
            "focus:border-sky-500 focus:ring focus:ring-sky-200 focus:ring-opacity-50",
          )}
          disabled={disabled}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options?.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  },
);

export default SelectFieldAdapter;
