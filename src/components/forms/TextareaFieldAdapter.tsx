import React from "react";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface TextareaFieldAdapterProps {
  id?: string;
  placeholder?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  className?: string;
}

const TextareaFieldAdapter = React.memo(
  React.forwardRef<HTMLTextAreaElement, TextareaFieldAdapterProps>(
    ({ id, placeholder, value, onChange, className, ...rest }, ref) => {
      return (
        <Textarea
          ref={ref}
          id={id}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={cn(
            "rounded-lg border border-gray-300 shadow-sm focus:border-sky-500 focus:ring focus:ring-sky-200 focus:ring-opacity-50",
            className,
          )}
          {...rest}
        />
      );
    },
  ),
);

TextareaFieldAdapter.displayName = "TextareaFieldAdapter";

export default TextareaFieldAdapter;
