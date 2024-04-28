import { useId } from "react";
import { useFormContext, FieldValues, Path } from "react-hook-form";
import { cn } from "@/lib/utils";
import { BaseOption } from "@/types/CallReports";

interface FieldProps<
  TFieldValues extends FieldValues,
  OptionType extends BaseOption,
> {
  name: Path<TFieldValues>;
  options?: OptionType[];
}

export const useFormFields = <
  TFieldValues extends FieldValues,
  OptionType extends BaseOption = BaseOption,
>() => {
  const id = useId();
  const { control } = useFormContext<TFieldValues>();
  const getFieldProps = ({
    name,
    options,
  }: FieldProps<TFieldValues, OptionType>) => ({
    id: `${name}-${id}`,
    name,
    control,
    options: options?.map((option) => ({
      ...option,
      id: `${name}-${option.value}-${id}`,
    })),
  });

  const getFormItemClassName = (error?: string) =>
    cn("flex-1", { "border-red-500": !!error });
  return { getFieldProps, getFormItemClassName };
};
