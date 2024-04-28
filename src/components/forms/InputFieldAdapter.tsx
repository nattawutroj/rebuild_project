import React from "react";
import { Input } from "@/components/ui/input"; // Adjust the import path as needed
import { cn } from "@/lib/utils";

interface InputFieldAdapterProps {
  id?: string;
  type?: React.HTMLInputTypeAttribute;
  placeholder?: string;
  value?: string | number;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

const InputFieldAdapter = React.memo(
  React.forwardRef<HTMLInputElement, InputFieldAdapterProps>(
    (
      { id, type = "text", placeholder, value, onChange, className, ...rest },
      ref,
    ) => {
      const inputProps = ["file", "number"].some((x) => type === x)
      // ? { ...rest }
      ? { ...rest, value: undefined}
        : rest;
      return (
        <Input
          ref={ref}
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={cn(
            "rounded-lg border border-gray-300 shadow-sm focus:border-sky-500 focus:ring focus:ring-sky-200 focus:ring-opacity-50",
            className,
          )}
          {...inputProps}
        />
      );
    },
  ),
);

InputFieldAdapter.displayName = "InputFieldAdapter";

export default InputFieldAdapter;
