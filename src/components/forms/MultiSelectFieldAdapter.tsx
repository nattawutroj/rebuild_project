import React from "react";
import MultipleSelector, { Option } from "@/components/ui/multiselect";

interface MultiSelectFieldAdapterProps {
  options: Option[];
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  disabled?: boolean;
}

const MultiSelectFieldAdapter = React.memo(
  React.forwardRef<HTMLDivElement, MultiSelectFieldAdapterProps>(
    ({ options, value, onChange, placeholder, disabled }, ref) => {
      const handleChange = (selectedOptions: Option[]) => {
        const newValue = selectedOptions.map((option) => option.value);
        onChange(newValue);
      };

      const selectedValues = options.filter((option) =>
        value.includes(option.value),
      );

      return (
        <div ref={ref}>
          <MultipleSelector
            options={options}
            value={selectedValues}
            onChange={handleChange}
            placeholder={placeholder}
            disabled={disabled}
            emptyIndicator={
              <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                No results found.
              </p>
            }
          />
        </div>
      );
    },
  ),
);

MultiSelectFieldAdapter.displayName = "MultiSelectFieldAdapter";

export default MultiSelectFieldAdapter;
