import * as React from "react";
import { addDays, format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DatePickerProps {
  className?: string;
  onDateChange: (date: DateRange | undefined) => void;
}

export const DatePickerWithRange = ({
  className,
  onDateChange,
}: DatePickerProps) => {
  const [selectedDate, setSelectedDate] = React.useState<DateRange | undefined>(
    {
      from: new Date(),
      to: addDays(new Date(), 10),
    },
  );

  const handleSelectDate = (range: DateRange | undefined) => {
    if (range) {
      setSelectedDate(range);
      onDateChange(range);
    }
  };

  const displayText = React.useMemo(() => {
    if (selectedDate && selectedDate.from) {
      const fromText = format(selectedDate.from, "LLL dd, y");
      const toText = selectedDate.to
        ? format(selectedDate.to, "LLL dd, y")
        : "...";
      return `${fromText} - ${toText}`;
    }
    return "Pick a date";
  }, [selectedDate]);

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date-picker-button"
            variant="outline"
            className={cn(
              "w-[250px] justify-start text-left font-normal",
              "text-muted-foreground",
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {displayText}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={selectedDate ? selectedDate.from : new Date()}
            selected={selectedDate}
            onSelect={handleSelectDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};
