import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { TimePicker } from "./time-picker/time-picker";
import React from "react";

interface DateTimePickerProps {
  id?: string;
  selected: Date | undefined;
  onChange: (date: Date | undefined) => void;
  error?: boolean;
  includeTime?: boolean;
}

export const DateTimePicker = React.memo(
  ({
    id,
    selected,
    onChange,
    error,
    includeTime = false,
  }: DateTimePickerProps): JSX.Element => {
    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id={id}
            variant="outline"
            className={cn(
              "flex w-full flex-row items-center justify-between px-3 py-2",
              "rounded-lg border border-gray-300 text-sm shadow-sm",
              !selected && "text-gray-400",
              "focus:border-sky-500 focus:ring focus:ring-sky-200 focus:ring-opacity-50",
              { "border-red-500": error },
            )}
          >
            {selected ? (
              format(selected, includeTime ? "dd/MM/yyyy, HH:mm" : "dd/MM/yyyy")
            ) : (
              <span className="flex-1 text-left">Pick a date</span>
            )}
            <CalendarIcon className="h-5 w-5 text-gray-400" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className={cn("w-full p-0 md:w-auto", { "border-red-500": error })}
        >
          <Calendar
            mode="single"
            selected={selected}
            onSelect={onChange}
            initialFocus
          />
          {includeTime && (
            <div className="border-t border-border p-3">
              <TimePicker setDate={onChange} date={selected} />
            </div>
          )}
        </PopoverContent>
      </Popover>
    );
  },
);
