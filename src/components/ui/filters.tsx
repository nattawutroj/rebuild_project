import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CheckIcon, PlusCircleIcon, XIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface FilterOption {
  value: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
}

interface FilterProps {
  options: FilterOption[];
  onChange: (selectedStatuses: string | Set<string>) => void;
  title: string;
  showIcon?: boolean;
  multiple?: boolean;
  defaultValue?: string[];
}

const Filter: React.FC<FilterProps> = ({
  options,
  onChange,
  title = "",
  showIcon = false,
  multiple = true,
  defaultValue = [],
}) => {
  const [selectedValues, setSelectedValues] = useState<Set<string>>(
    new Set(defaultValue),
  );
  const toggleValue = (value: string) => {
    if (multiple) {
      const updatedValues = new Set(selectedValues);
      if (updatedValues.has(value)) {
        updatedValues.delete(value);
      } else {
        updatedValues.add(value);
      }
      setSelectedValues(updatedValues);
      onChange(updatedValues);
    } else {
      setSelectedValues(new Set([value]));
      onChange(value);
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm">
          {showIcon && <PlusCircleIcon className="mr-2 h-4 w-4" />}
          {title}
          {selectedValues.size > 0 && (
            <>
              <Separator orientation="vertical" className="mx-2 h-4" />
              <span className="ml-2 flex items-center gap-1">
                {Array.from(selectedValues).map((value) => (
                  <span
                    key={value}
                    className="flex items-center gap-1 rounded bg-gray-200 p-1 text-xs"
                  >
                    {options.find((option) => option.value === value)?.label}
                    <XIcon
                      className="h-3 w-3 cursor-pointer"
                      onClick={() => toggleValue(value)}
                    />
                  </span>
                ))}
              </span>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <Command>
          <CommandInput placeholder={`Filter ${title}...`} />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => {
                const isSelected = selectedValues.has(option.value);
                return (
                  <CommandItem
                    key={option.value}
                    onSelect={() => toggleValue(option.value)}
                  >
                    <div
                      className={cn(
                        "mr-2 flex h-4 w-4 items-center justify-center rounded-full",
                        isSelected
                          ? "bg-primary text-primary-foreground"
                          : "bg-transparent",
                      )}
                    >
                      {isSelected && <CheckIcon className="h-4 w-4" />}
                    </div>
                    {option.icon && (
                      <option.icon className="mr-2 h-4 w-4 text-muted-foreground" />
                    )}
                    <span>{option.label}</span>
                  </CommandItem>
                );
              })}
            </CommandGroup>
            {selectedValues.size > 0 && (
              <CommandGroup>
                <CommandItem onSelect={() => setSelectedValues(new Set())}>
                  Clear filters
                </CommandItem>
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default Filter;
