import React from "react";
import { FieldValues, Path } from "react-hook-form";
import { DateTimePicker } from "../ui/datetime-picker";

interface DateTimeAdapterProps<TFieldValues extends FieldValues> {
  name: Path<TFieldValues>;
  label: string;
  includeTime?: boolean;
  value?: Date;
  onChange: (date: Date | undefined) => void;
}

const DateTimeAdapter = React.memo(
  <TFieldValues extends FieldValues>({
    includeTime,
    value,
    onChange,
  }: DateTimeAdapterProps<TFieldValues>) => {
    return (
      <DateTimePicker
        selected={value}
        onChange={onChange}
        includeTime={includeTime}
      />
    );
  },
);

export default DateTimeAdapter;
